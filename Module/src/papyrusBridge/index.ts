import { on, once, Game, Form, writeLogs, printConsole, Debug } from 'skyrimPlatform'
import * as sp from 'skyrimPlatform'

const skyrimPlatformBridgeEsp = 'SkyrimPlatformBridge.esp'
const skyrimPlatformBridgeMessagesContainerId = 0xd66
const skyrimPlatformBridgeQuestId = 0x800

const skseModEventNamePrefix_ModEvent = 'SkyrimPlatformBridge_ModEvent_' // Target a particular mod
const skseModEventNamePrefix_GlobalEvent = 'SkyrimPlatformBridge_Event_' // Globally subscribe/publish
const skseModEventNamePrefix_Response = 'SkyrimPlatformBridge_Response_' // Reserved for Response/Reply management

const skyrimPlatformBridgeEventMessageDelimiter = '<||>'

const messagePrefix_Message = '::SKYRIM_PLATFORM_BRIDGE_MESSAGE::'
const messagePrefix_Event = '::SKYRIM_PLATFORM_BRIDGE_EVENT::'
const messagePrefix_Request = '::SKYRIM_PLATFORM_BRIDGE_REQUEST::'
const messagePrefix_Response = '::SKYRIM_PLATFORM_BRIDGE_RESPONSE::'

const skyrimPlatformBridgeJsonDataPrefix = '::SKYRIM_PLATFORM_BRIDGE_JSON::'
const skyrimPlatformBridgeConnectionRequestEventName = 'SkyrimPlatformBridge_ConnectionRequest'
const skyrimPlatformBridgeConnectionRequestResponseText = 'CONNECTED'

const messageTypePrefixes = new Map<string, string>([
    [messagePrefix_Message, 'message'],
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

export interface PapyrusMessage {
    text: string,
    source?: string,
    target?: string
}

export interface PapyrusResponse {
    source?: string,
    target?: string,
    data?: any,
    replyId?: string
}

export interface PapyrusRequest {
    query: string,
    source?: string,
    target?: string,
    parameters?: any,
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

export interface MessageToSendToPapyrus {
    modEventName?: string,
    messageType: string,
    eventNameOrQuery: string,
    source?: string,
    target?: string,
    data?: string,
    replyId?: string
}

function log(...args: any[]) {
    writeLogs('papyrusBridge', Date.now(), args)
}

// TODO
export class SkseModEvent {

}

export class PapyrusBridge {
    connectionName?= ''
    messagesContainerFormId = 0
    questFormId = 0
    isConnected = false
    isListening = false
    messageCallbacks = new Map<string, Array<(message: any) => void>>([
        ['message', new Array<(message: any) => void>()],
        ['event', new Array<(message: any) => void>()],
        ['request', new Array<(message: any) => void>()],
        ['response', new Array<(message: any) => void>()],
        ['connected', new Array<(message: any) => void>()],
        ['raw', new Array<(message: any) => void>()]
    ])
    requestResponsePromises = new Map<string, (message: PapyrusRequest) => void>()

    constructor(connectionName: string = '') {
        this.connectionName = connectionName
    }

    public getConnection(connectionName: string) {
        return new PapyrusBridge(connectionName)
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
                                // Handle special case: Connection Request
                                if (this.connectionName && messageType == 'request' && message.query == skyrimPlatformBridgeConnectionRequestEventName && this.connectionName == message.source) {
                                    this.send('response', { data: skyrimPlatformBridgeConnectionRequestResponseText, replyId: message.replyId, source: this.connectionName, target: message.source })
                                    if (!this.isConnected) {
                                        this.isConnected = true
                                        const callbacks = this.messageCallbacks.get('connected')
                                        printConsole(`Trigger connected callbacks ${callbacks?.length}`)
                                        if (callbacks)
                                            callbacks.forEach(callback => callback(message))
                                    }
                                } else if (message) {
                                    if (this.messageCallbacks.has(messageType)) {
                                        const callbacks = this.messageCallbacks.get(messageType)
                                        if (callbacks)
                                            callbacks.forEach(callback => callback(message))
                                    }
                                    if (messageType == 'response' && message.replyId) {
                                        if (this.requestResponsePromises.has(message.replyId)) {
                                            this.requestResponsePromises.get(message.replyId)!(message)
                                            this.requestResponsePromises.delete(message.replyId)
                                        }
                                    }
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

    public async send(messageType: 'message', message: PapyrusMessage): Promise<undefined>
    public async send(messageType: 'event', message: PapyrusEvent): Promise<undefined>
    public async send(messageType: 'request', message: PapyrusRequest): Promise<PapyrusResponse>
    public async send(messageType: 'response', message: PapyrusResponse): Promise<undefined>
    public async send(messageType: 'raw', message: MessageToSendToPapyrus): Promise<undefined>
    public async send(messageType: string, message: any): Promise<any>
    public async send(messageType: string, message: any): Promise<any> {
        // TODO - queue if connectionName but not isConnected

        const target = message.target ?? this.connectionName ?? ''
        const source = message.source ?? this.connectionName ?? ''

        let data: any
        switch (messageType) {
            case 'message': { data = message.text; break }
            case 'event': { data = message.data; break }
            case 'request': { data = message.data; break }
            case 'response': { data = message.data; break }
            case 'raw': { data = message.data; break }
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
            case 'raw': { eventNameOrQuery = message.eventNameOrQuery; break }
        }

        // SKSE Mod Event Name (either send globally, or send to specific mod, or it's a reply to a specific message)
        let skseModEventName = this.connectionName ? `${skseModEventNamePrefix_ModEvent}${this.connectionName}` : skseModEventNamePrefix_GlobalEvent
        if (messageType == 'response')
            skseModEventName = `${skseModEventNamePrefix_Response}${message.replyId}`

        let replyId = message.replyId
        if (!replyId && messageType == 'request')
            replyId = this.getUniqueReplyId()

        if (messageType == 'response') {
            return new Promise<undefined>(resolve => {
                this.sendModEvent(skseModEventName, (modEvent, handle) => {
                    modEvent.pushString(handle, replyId)
                    modEvent.pushString(handle, dataText)
                })
                resolve(undefined)
            })
        } else if (messageType == 'request') {
            return new Promise<PapyrusResponse>(resolve => {
                this.requestResponsePromises.set(message.replyId, resolve) // <--- store Promise
                this.sendModEvent(skseModEventName, (modEvent, handle) => {
                    modEvent.pushString(handle, messageType)
                    modEvent.pushString(handle, eventNameOrQuery)
                    modEvent.pushString(handle, source)
                    modEvent.pushString(handle, target)
                    modEvent.pushString(handle, dataText)
                    modEvent.pushString(handle, replyId)
                })
            })
        } else {
            return new Promise<undefined>(resolve => {
                this.sendModEvent(skseModEventName, (modEvent, handle) => {
                    modEvent.pushString(handle, messageType)
                    modEvent.pushString(handle, eventNameOrQuery)
                    modEvent.pushString(handle, source)
                    modEvent.pushString(handle, target)
                    modEvent.pushString(handle, dataText)
                    modEvent.pushString(handle, replyId)
                })
                resolve(undefined)
            })
        }
    }

    public on(messageType: 'message', callback: (message: PapyrusMessage) => void): void
    public on(messageType: 'event', callback: (message: PapyrusEvent) => void): void
    public on(messageType: 'request', callback: (message: PapyrusRequest) => void): void
    public on(messageType: 'response', callback: (message: PapyrusResponse) => void): void
    public on(messageType: 'connected', callback: (message: PapyrusEvent) => void): void
    public on(messageType: 'raw', callback: (message: string) => void): void
    public on(messageType: string, callback: (message: any) => any): void {
        if (this.messageCallbacks.has(messageType)) {
            this.listen()
            this.messageCallbacks.get(messageType)?.push(callback)
        }
    }

    public parse(messageType: 'message', message: string): PapyrusMessage | undefined
    public parse(messageType: 'event', message: string): PapyrusEvent | undefined
    public parse(messageType: 'request', message: string): PapyrusRequest | undefined
    public parse(messageType: 'response', message: string): PapyrusResponse | undefined
    public parse(messageType: 'raw', message: string): any | undefined
    public parse(messageType: string, message: string): any | undefined
    public parse(messageType: string, message: string): any | undefined {
        const eventParts = message.split(skyrimPlatformBridgeEventMessageDelimiter)
        if (eventParts.length < 4)
            return
        switch (messageType) {
            case 'message': { return { source: eventParts[2], target: eventParts[3], text: eventParts.slice(5).join('||') } }
            case 'event': { return { eventName: eventParts[1], source: eventParts[2], target: eventParts[3], data: eventParts.slice(5).join('||') } }
            case 'request': { return { query: eventParts[1], source: eventParts[2], target: eventParts[3], replyId: eventParts[4], data: eventParts.slice(5).join('||') } }
            case 'response': { return { source: eventParts[2], target: eventParts[3], replyId: eventParts[4], data: eventParts.slice(5).join('||') } }
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

export function getPapyrusBridge(connectionName: string) {
    return new PapyrusBridge(connectionName)
}