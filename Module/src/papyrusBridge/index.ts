import { on, once, Game, Form, writeLogs, printConsole, Debug } from 'skyrimPlatform'
import * as sp from 'skyrimPlatform'

// todo add onConnection

const skyrimPlatformBridgeEsp = 'SkyrimPlatformBridge.esp'
const skyrimPlatformBridgeMessagesContainerId = 0xd66
const skyrimPlatformBridgeQuestId = 0x800
const skyrimPlatformBridgeDefaultMessageSkseModEventName = 'DEPRECATE_ME'
const skyrimPlatformBridgeModEventSkseModEventNamePrefix = 'SkyrimPlatformBridge_EventForMod_'
const skyrimPlatformBridgeCustomEventSkseModEventNamePrefix = 'SkyrimPlatformBridge_Event_'
const skyrimPlatformBridgeReplySkseModEventNamePrefix = 'SkyrimPlatformBridge_Response_'
const skyrimPlatformBridgeEventMessageDelimiter = '<||>'
const skyrimPlatformBridgeEventMessagePrefix = '::SKYRIM_PLATFORM_BRIDGE_EVENT::'
const skyrimPlatformBridgeRequestMessagePrefix = '::SKYRIM_PLATFORM_BRIDGE_REQUEST::'
const skyrimPlatformBridgeResponseMessagePrefix = '::SKYRIM_PLATFORM_BRIDGE_RESPONSE::'
const skyrimPlatformBridgeJsonDataPrefix = '::SKYRIM_PLATFORM_BRIDGE_JSON::'
const skyrimPlatformBridgeConnectionRequestEventName = 'SkyrimPlatform_ConnectionRequest'

export interface PapyrusEvent {
    eventName: string,
    source?: string,
    target?: string,
    data?: any
}

export interface PapyrusResponse {
    // status: string,
    query: string,
    source?: string,
    target?: string,
    data?: any
}

export interface PapyrusRequest {
    query: string,
    source?: string,
    target?: string,
    parameters?: any
}

interface PapyrusRequestWithReplyID extends PapyrusRequest {
    replyId: string
}

interface PapyrusResponseWithReplyID extends PapyrusResponse {
    replyId: string
}

interface PapyrusReply {
    response?: any,
    replyId: string
}

interface PapyrusMessageHandler {
    handler: (message: string) => void,
    receiveEvents: boolean
}

function log(...args: any[]) {
    writeLogs('papyrusBridge', Date.now(), args)
}

export class PapyrusBridge {
    modName?= ''
    messagesContainerFormId = 0
    questFormId = 0
    // questForm: Form | null = null // TODO
    isListening = false

    messageHandlers = new Array<PapyrusMessageHandler>()
    eventHandlers = new Array<(event: PapyrusEvent) => void>()
    sendResponseHandlers = new Map<string, ((event: PapyrusResponse) => void)>()

    constructor(modName: string = '') {
        this.modName = modName
    }

    public getMod(modName: string) {
        return new PapyrusBridge(modName)
    }

    public onMessage(handler: (message: string) => void, receiveEvents = false) {
        this.listenForMessages()
        this.messageHandlers.push({ handler, receiveEvents })
    }

    public onEvent(handler: (event: PapyrusEvent) => void) {
        this.listenForMessages()
        this.eventHandlers.push(handler)
    }

    public send(event: PapyrusEvent) {
        const target = event.target ?? this.modName
        const skseModEventName = target ? `${skyrimPlatformBridgeModEventSkseModEventNamePrefix}${target}` : `${skyrimPlatformBridgeCustomEventSkseModEventNamePrefix}${event.eventName}`
        this.sendModEvent(skseModEventName, (modEvent, handle) => {
            modEvent.pushString(handle, 'EVENT')
            modEvent.pushString(handle, event.eventName)
            modEvent.pushString(handle, event.source ?? this.modName ?? '')
            modEvent.pushString(handle, target ?? '')
            modEvent.pushString(handle, event.data ?? '')
            modEvent.pushString(handle, '') // No sendResponse ID
        })
    }

    public async request(event: PapyrusRequest): Promise<PapyrusResponse> {
        return new Promise<PapyrusResponse>(resolve => {
            const target = event.target ?? this.modName
            const skseModEventName = target ? `${skyrimPlatformBridgeModEventSkseModEventNamePrefix}${target}` : `${skyrimPlatformBridgeCustomEventSkseModEventNamePrefix}${event.query}`
            let parameterText = ''
            if (event.parameters)
                parameterText = (typeof event.parameters === 'string') ? event.parameters.toString() : `${skyrimPlatformBridgeJsonDataPrefix}${JSON.stringify(event.parameters)}`
            const replyId = this.GetUniqueReplyId()
            this.sendResponseHandlers.set(replyId, resolve)
            this.sendModEvent(skseModEventName, (modEvent, handle) => {
                modEvent.pushString(handle, 'REQUEST')
                modEvent.pushString(handle, event.query)
                modEvent.pushString(handle, event.source ?? this.modName ?? '')
                modEvent.pushString(handle, target ?? '')
                modEvent.pushString(handle, parameterText)
                modEvent.pushString(handle, replyId)
            })
        })
    }

    sendResponse(event: PapyrusReply) {
        const skseModEventName = `${skyrimPlatformBridgeReplySkseModEventNamePrefix}${event.replyId}`
        this.sendModEvent(skseModEventName, (modEvent, handle) => {
            modEvent.pushString(handle, event.replyId)
            modEvent.pushString(handle, event.response ?? '')
        })
    }

    public sendMessage(text: string) {
        this.sendModEvent(skyrimPlatformBridgeDefaultMessageSkseModEventName, (modEvent, handle) => {
            modEvent.pushString(handle, text)
        })
    }

    public GetUniqueReplyId() {
        return `${Math.random()}_${Math.random()}`
    }

    sendModEvent(skseModEventName: string, parameterBuilder: (modEvent: any, handle: Number) => void) {
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
                const handle: any = (sp as any).ModEvent.create(skyrimPlatformBridgeDefaultMessageSkseModEventName)
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

    public isEventMessage(message: string): boolean {
        return message.startsWith(skyrimPlatformBridgeEventMessagePrefix)
    }

    public isRequestMessage(message: string): boolean {
        return message.startsWith(skyrimPlatformBridgeRequestMessagePrefix)
    }

    public isResponseMessage(message: string): boolean {
        return message.startsWith(skyrimPlatformBridgeResponseMessagePrefix)
    }

    public parseEventMessage(message: string): PapyrusEvent | undefined {
        const eventParts = message.split(skyrimPlatformBridgeEventMessageDelimiter)
        if (eventParts.length < 4)
            return
        return {
            eventName: eventParts[1],
            source: eventParts[2],
            target: eventParts[3],
            data: eventParts.slice(5).join('||')
        }
    }

    public parseRequestMessage(message: string): PapyrusRequestWithReplyID | undefined {
        const eventParts = message.split(skyrimPlatformBridgeEventMessageDelimiter)
        if (eventParts.length < 4)
            return
        return {
            query: eventParts[1],
            source: eventParts[2],
            target: eventParts[3],
            replyId: eventParts[4],
            parameters: eventParts.slice(5).join('||')
        }
    }

    public parseResponseMessage(message: string): PapyrusResponseWithReplyID | undefined {
        const eventParts = message.split(skyrimPlatformBridgeResponseMessagePrefix)
        if (eventParts.length < 4)
            return
        return {
            query: eventParts[1],
            source: eventParts[2],
            target: eventParts[3],
            replyId: eventParts[4],
            data: eventParts.slice(5).join('||')
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

    handleIncomingEvent(message: string) {
        const event = this.parseEventMessage(message)
        if (event && ((!this.modName) || this.modName.toLowerCase() == event.target?.toLowerCase())) {
            this.messageHandlers.forEach(handler => {
                if (handler.receiveEvents)
                    handler.handler(message)
            })
            this.eventHandlers.forEach(handler => handler(event))
        }
    }

    handleIncomingRequest(message: string) {
        const event = this.parseRequestMessage(message)
        if (event && ((!this.modName) || this.modName.toLowerCase() == event.target?.toLowerCase())) {
            this.messageHandlers.forEach(handler => {
                if (handler.receiveEvents)
                    handler.handler(message)
            })
            if (event.query == skyrimPlatformBridgeConnectionRequestEventName) {
                this.sendResponse({
                    replyId: event.replyId,
                    response: 'CONNECTED'
                })
            } else {
                // this.eventHandlers.forEach(handler => handler(event))
            }
        }
    }

    handleIncomingResponse(message: string) {
        const sendResponse = this.parseResponseMessage(message)
        if (sendResponse && sendResponse.replyId && ((!this.modName?.toLowerCase()) || this.modName == sendResponse.target?.toLowerCase())) {
            if (this.sendResponseHandlers.has(sendResponse.replyId)) {
                const sendResponseHandler = this.sendResponseHandlers.get(sendResponse.replyId)
                this.sendResponseHandlers.delete(sendResponse.replyId)
                if (sendResponseHandler)
                    sendResponseHandler(sendResponse)
            }
        }
    }

    listenForMessages() {
        if (!this.isListening) {
            this.isListening = true
            on('containerChanged', changeInfo => {
                printConsole(`ON CONTAINER CHANGE ${JSON.stringify(changeInfo)}`)
                const container = changeInfo.newContainer || changeInfo.oldContainer
                if (container) {
                    this.setMessagesContainerFormId()
                    if (this.messagesContainerFormId && this.messagesContainerFormId == container.getFormID()) {
                        const message = changeInfo.baseObj.getName()
                        if (this.isEventMessage(message)) {
                            this.handleIncomingEvent(message)
                        } else if (this.isRequestMessage(message)) {
                            this.handleIncomingRequest(message)
                        } else if (this.isResponseMessage(message)) {
                            this.handleIncomingResponse(message)
                        } else {
                            this.messageHandlers.forEach(handler => handler.handler(message))
                        }
                    }
                }
            })
        }
    }
}

const defaultInstance = new PapyrusBridge()

export default defaultInstance