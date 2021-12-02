import { on, once, Game, Form, writeLogs, printConsole, Debug } from 'skyrimPlatform'
import * as sp from 'skyrimPlatform'

const skyrimPlatformBridgeEsp = 'SkyrimPlatformBridge.esp'
const skyrimPlatformBridgeMessagesContainerId = 0xd66
const skyrimPlatformBridgeQuestId = 0x800

const skseModEventNamePrefix_ModEvent = 'SkyrimPlatformBridge_ModEvent_' // Target a particular mod
const skseModEventNamePrefix_GlobalEvent = 'SkyrimPlatformBridge_Event_' // Globally subscribe/publish
const skseModEventNamePrefix_Response = 'SkyrimPlatformBridge_Response_' // Reserved for Response/Reply management

const skyrimPlatformBridgeEventMessageDelimiter = '<||>'

const messagePrefix_Event = '::SKYRIM_PLATFORM_BRIDGE_EVENT::'
const messagePrefix_Request = '::SKYRIM_PLATFORM_BRIDGE_REQUEST::'
const messagePrefix_Response = '::SKYRIM_PLATFORM_BRIDGE_RESPONSE::'

const skyrimPlatformBridgeJsonDataPrefix = '::SKYRIM_PLATFORM_BRIDGE_JSON::'
const skyrimPlatformBridgeConnectionRequestQueryName = 'SkyrimPlatformBridge_ConnectionRequest'.toLowerCase()
const skyrimPlatformBridgeConnectionRequestResponseText = 'CONNECTED'

const messageTypePrefixes = new Map<string, string>([
    [messagePrefix_Event, 'event'],
    [messagePrefix_Request, 'request'],
    [messagePrefix_Response, 'response']
])

export interface PapyrusEvent {
    eventName: string,
    source?: string,
    target?: string,
    data?: any
}

export interface PapyrusResponse {
    source: string,
    target: string,
    data?: any,
    replyId: string
}

export interface PapyrusRequest {
    query: string,
    source?: string,
    target?: string,
    data?: any,
    replyId?: string
}

interface PapyrusReply {
    response?: any,
    replyId: string
}

interface PapyrusMessageHandler {
    handler: (message: string) => void,
    receiveEvents: boolean
}

interface MessageToSendToPapyrus {
    skseModEventName: string,
    messageType: string,
    eventNameOrQuery: string,
    source: string,
    target: string,
    dataText: string,
    replyId?: string
}

function log(...args: any[]) {
    writeLogs('papyrusBridge', Date.now(), args)
}

// TODO
export class SkseModEvent {

}

export class PapyrusBridge {
    activeConnections = new Set<string>()
    connectionName?= ''
    messagesContainerFormId = 0
    questFormId = 0
    isConnected = false
    isListening = false
    requestCallbacks = new Array<(request: PapyrusRequest, reply: (data: any) => void) => void>()
    eventCallbacks = new Array<(event: PapyrusEvent) => void>()
    connectionCallbacks = new Array<(source: string) => void>()
    requestResponsePromises = new Map<string, (response: PapyrusResponse) => void>()

    constructor(connectionName: string = '') {
        this.connectionName = connectionName.toLowerCase()
    }

    public getConnection(connectionName: string) {
        return new PapyrusBridge(connectionName.toLowerCase())
    }

    public getConnectionName() {
        return this.connectionName
    }

    public onRequest(callback: (request: PapyrusRequest, reply: (data: any) => void) => void) {
        this.listen()
        this.requestCallbacks.push(callback)
    }

    public onEvent(callback: (event: PapyrusEvent) => void) {
        this.listen()
        this.eventCallbacks.push(callback)
    }

    public onConnection(callback: (source: string) => void) {
        this.listen()
        this.connectionCallbacks.push(callback)
    }

    public listen() {
        if (!this.isListening) {
            this.isListening = true
            on('containerChanged', changeInfo => {
                const container = changeInfo.newContainer || changeInfo.oldContainer
                if (container) {
                    this.setMessagesContainerFormId()
                    if (this.messagesContainerFormId && this.messagesContainerFormId == container.getFormID()) {
                        const messageText = changeInfo.baseObj.getName()
                        if (messageText) {
                            const messageType = this.getMessageType(messageText)
                            if (messageType) {
                                const message = this.parse(messageType, messageText)
                                if (message) {
                                    this._onPapyrusMessage(messageType, message)
                                }
                            }
                        }
                    }
                }
            })
        }
    }

    public sendModEvent(skseModEventName: string, parameterBuilder: (modEvent: any, handle: number) => void) {
        once('update', () => {
            let quest: Form | null = null
            if (!this.questFormId) {
                quest = Game.getFormFromFile(skyrimPlatformBridgeQuestId, skyrimPlatformBridgeEsp)
                if (quest) {
                    this.questFormId = quest.getFormID()
                }
            }
            if (!quest) {
                // Todo: cache object (and handle stale errors)
                quest = Game.getFormFromFile(skyrimPlatformBridgeQuestId, skyrimPlatformBridgeEsp)
            }
            if (quest) {
                const handle: any = (sp as any).ModEvent.create(skseModEventName)
                if (handle) {
                    const modEvent = (sp as any).ModEvent
                    const handle = modEvent.Create(skseModEventName)
                    parameterBuilder(modEvent, handle)
                    modEvent.send(handle)
                }
            } else {
                log(`Could not send message, Quest object ${skyrimPlatformBridgeQuestId.toString(16)} not found.`)
            }
        })
    }

    public send(eventName: string, data?: any, target?: string) {
        this.sendEvent({ eventName, data, target })
    }

    public sendEvent(event: PapyrusEvent) {
        const messageToSend = this._prepareMessageForSending('event', event)
        if (messageToSend) {
            this.sendModEvent(messageToSend.skseModEventName, (modEvent, handle) => {
                modEvent.pushString(handle, messageToSend.messageType)
                modEvent.pushString(handle, messageToSend.eventNameOrQuery)
                modEvent.pushString(handle, messageToSend.source)
                modEvent.pushString(handle, messageToSend.target)
                modEvent.pushString(handle, messageToSend.dataText)
                modEvent.pushString(handle, messageToSend.replyId)
            })
        }
    }

    public async request(query: string, data?: string, target?: string): Promise<PapyrusResponse | undefined> {
        return this.makeRequest({
            query, data, target
        })
    }

    public async makeRequest(request: PapyrusRequest): Promise<PapyrusResponse | undefined> {
        return new Promise<PapyrusResponse | undefined>(resolve => {
            try {
                const messageToSend = this._prepareMessageForSending('request', request)
                if (messageToSend) {
                    if (! messageToSend.replyId) messageToSend.replyId = this.getUniqueReplyId()
                    this.requestResponsePromises.set(messageToSend.replyId, resolve)
                    this.sendModEvent(messageToSend.skseModEventName, (modEvent, handle) => {
                        modEvent.pushString(handle, messageToSend.messageType)
                        modEvent.pushString(handle, messageToSend.eventNameOrQuery)
                        modEvent.pushString(handle, messageToSend.source)
                        modEvent.pushString(handle, messageToSend.target)
                        modEvent.pushString(handle, messageToSend.dataText)
                        modEvent.pushString(handle, messageToSend.replyId)
                    })
                } else {
                    resolve(undefined)
                }
            } catch {
                resolve(undefined)
            }
        })
    }

    _sendResponse(response: PapyrusResponse) {
        const messageToSend = this._prepareMessageForSending('response', response)
        if (messageToSend) {
            this.sendModEvent(messageToSend.skseModEventName, (modEvent, handle) => {
                modEvent.pushString(handle, messageToSend.replyId)
                modEvent.pushString(handle, messageToSend.dataText)
            })
        }
    }

    _prepareMessageForSending(messageType: string, message: any): MessageToSendToPapyrus | undefined {
        const target = message.target ?? this.connectionName ?? ''

        if (! target) {
            once('update', () => {
                printConsole(`[PapyrusBridge] Tried sending event to null target ${JSON.stringify(message)}`)
            })
            return
        }

        const source = message.source ?? this.connectionName ?? ''

        let data: any
        switch (messageType) {
            case 'event': { data = message.data; break }
            case 'request': { data = message.data; break }
            case 'response': { data = message.data; break }
        }

        let dataText = ''
        if (typeof data === 'string')
            dataText = data.toString()
        else if (data === undefined)
            dataText = ''
        else
            dataText = `${skyrimPlatformBridgeJsonDataPrefix}${JSON.stringify(data)}`

        let eventNameOrQuery = ''
        switch (messageType) {
            case 'event': { eventNameOrQuery = message.eventName; break }
            case 'request': { eventNameOrQuery = message.query; break }
        }

        let skseModEventName = `${skseModEventNamePrefix_ModEvent}${target}`
        if (messageType == 'response')
            skseModEventName = `${skseModEventNamePrefix_Response}${message.replyId}`
        
        return { skseModEventName, messageType, eventNameOrQuery, source, target, dataText, replyId: message.replyId }
    }

    parse(messageType: 'event', message: string): PapyrusEvent | undefined
    parse(messageType: 'request', message: string): PapyrusRequest | undefined
    parse(messageType: 'response', message: string): PapyrusResponse | undefined
    parse(messageType: string, message: string): any | undefined
    parse(messageType: string, message: string): any | undefined {
        const eventParts = message.split(skyrimPlatformBridgeEventMessageDelimiter)
        if (eventParts.length < 4)
            return
        switch (messageType) {
            case 'message': { return { source: eventParts[2].toLowerCase(), target: eventParts[3].toLowerCase(), text: eventParts.slice(5).join('||') } }
            case 'event': { return { eventName: eventParts[1].toLowerCase(), source: eventParts[2].toLowerCase(), target: eventParts[3].toLowerCase(), data: eventParts.slice(5).join('||') } }
            case 'request': { return { query: eventParts[1].toLowerCase(), source: eventParts[2].toLowerCase(), target: eventParts[3].toLowerCase(), replyId: eventParts[4], data: eventParts.slice(5).join('||') } }
            case 'response': { return { source: eventParts[2].toLowerCase(), target: eventParts[3].toLowerCase(), replyId: eventParts[4], data: eventParts.slice(5).join('||') } }
        }
    }

    public getMessageType(receivedText: string): string | undefined {
        let messageType: string | undefined
        messageTypePrefixes.forEach((type, prefix) => {
            if (receivedText.startsWith(prefix)) {
                messageType = type
            }
        })
        return messageType
    }

    public getUniqueReplyId() {
        return `${Math.random()}_${Math.random()}`
    }

    _onPapyrusMessage(messageType: string, message: any) {
        switch (messageType) {
            case 'event': { this._onEvent(message); break }
            case 'request': { this._onRequest(message); break }
            case 'response': { this._onResponse(message); break }
        }
    }

    _onEvent(event: PapyrusEvent) {
        this.eventCallbacks.forEach(callback => callback(event))
    }

    _onRequest(request: PapyrusRequest) {
        if (request.query == skyrimPlatformBridgeConnectionRequestQueryName) {
            this._onConnectionRequest(request)
        } else {
            this.requestCallbacks.forEach(callback => {
                callback(request, (data: any) => {
                    this._sendResponse({
                        replyId: request.replyId!,
                        target: request.source!,
                        source: this.connectionName ?? '',
                        data: data
                    })
                })
            })
        }
    }

    _onConnectionRequest(request: PapyrusRequest) {
        if ((! this.connectionName) || this.connectionName == request.source) {
            this._sendResponse({ data: skyrimPlatformBridgeConnectionRequestResponseText, replyId: request.replyId!, source: this.connectionName!, target: request.source! })
            if (this.connectionName && ! this.isConnected) {
                this.isConnected = true
            }
            if (! this.activeConnections.has(request.source!)) {
                this.activeConnections.add(request.source!)
                this.connectionCallbacks.forEach(callback => callback(request.source!))
            }
        }
    }

    _onResponse(response: PapyrusResponse) {
        if (response.replyId) {
            if (this.requestResponsePromises.has(response.replyId)) {
                this.requestResponsePromises.get(response.replyId)!(response)
                this.requestResponsePromises.delete(response.replyId)
            }
        }
    }

    setMessagesContainerFormId() {
        if (!this.messagesContainerFormId) {
            const messagesContainer = Game.getFormFromFile(skyrimPlatformBridgeMessagesContainerId, skyrimPlatformBridgeEsp)
            if (messagesContainer) {
                this.messagesContainerFormId = messagesContainer.getFormID()
            }
        }
    }
}

const defaultInstance = new PapyrusBridge()
export default defaultInstance

export function getConnection(connectionName: string) {
    return new PapyrusBridge(connectionName)
}

export function getPapyrusConnection(connectionName: string) {
    return new PapyrusBridge(connectionName)
}
