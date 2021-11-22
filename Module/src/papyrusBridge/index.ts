import { on, once, Game, Form, writeLogs, printConsole, Debug } from 'skyrimPlatform'
import * as sp from 'skyrimPlatform'

const skyrimPlatformBridgeEsp = 'SkyrimPlatformBridge.esp'
const skyrimPlatformBridgeMessagesContainerId = 0xd66
const skyrimPlatformBridgeQuestId = 0x800
const skyrimPlatformBridgeDefaultMessageSkseModEventName = 'SkyrimPlatformBridge_Generic'
const skyrimPlatformBridgeEventMessageDelimiter = '<||>'
const skyrimPlatformBridgeEventMessagePrefix = '::SKYRIM_PLATFORM_BRIDGE_EVENT::'

export interface PapyrusEvent {
    name: string,
    source: string,
    target: string,
    data: any,
    replyID: string
}

interface PapyrusMessageHandler {
    handler: (message: string) => void,
    receiveEvents: boolean
}

function log(...args: any[]) {
    writeLogs('papyrusBridge', Date.now(), args)
}

export class PapyrusBridge {
    modName = ''
    messagesContainerFormId = 0
    questFormId = 0
    // questForm: Form | null = null // TODO
    isListening = false
    messageHandlers = new Array<PapyrusMessageHandler>()
    eventHandlers = new Array<(event: PapyrusEvent) => void>()

    constructor(modName: string = '') {
        this.modName = modName
    }

    public onMessage(handler: (message: string) => void, receiveEvents = false) {
        this.listenForMessages()
        this.messageHandlers.push({ handler, receiveEvents })
    }

    public onEvent(handler: (event: PapyrusEvent) => void) {
        this.listenForMessages()
        this.eventHandlers.push(handler)
    }

    public sendMessage(text: string) {
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
                printConsole(`the handle is: ${handle}`)
                if (handle) {
                    printConsole("SENDING...");
                    (sp as any).ModEvent.pushString(handle, "Hello, world!");
                    (sp as any).ModEvent.send(handle)
                    printConsole("SENT")
                }
            } else {
                log(`Could not send message, Quest object ${skyrimPlatformBridgeQuestId.toString(16)} not found. Message: ${text}`)
            }
        })
    }

    public isEventMessage(message: string): boolean {
        return message.startsWith(skyrimPlatformBridgeEventMessagePrefix)
    }

    public parseEventMessage(message: string): PapyrusEvent | undefined {
        const eventParts = message.split(skyrimPlatformBridgeEventMessageDelimiter)
        if (eventParts.length < 4)
            return
        return {
            name: eventParts[1],
            source: eventParts[2],
            target: eventParts[3],
            replyID: eventParts[4],
            data: eventParts.slice(5).join('||')
        }
    }

    // TODO
    // public mod(modName: string): PapyrusBridge {
    //     return new PapyrusBridge(modName)
    // }

    listenForMessages() {
        if (!this.isListening) {
            this.isListening = true
            on('containerChanged', changeInfo => {
                if (changeInfo.newContainer) {
                    if (!this.messagesContainerFormId) {
                        const container = Game.getFormFromFile(skyrimPlatformBridgeMessagesContainerId, skyrimPlatformBridgeEsp)
                        if (container) {
                            this.messagesContainerFormId = container.getFormID()
                        }
                    }
                    if (this.messagesContainerFormId && this.messagesContainerFormId == changeInfo.newContainer.getFormID()) {
                        const message = changeInfo.baseObj.getName()
                        if (this.isEventMessage(message)) {
                            const event = this.parseEventMessage(message)
                            if (event) {
                                this.messageHandlers.forEach(handler => {
                                    if (handler.receiveEvents)
                                        handler.handler(message)
                                })
                                this.eventHandlers.forEach(handler => handler(event))
                            }
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