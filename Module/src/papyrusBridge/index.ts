import { on, once, Game, printConsole } from 'skyrimPlatform'

const skyrimPlatformBridgeMessagesContainerEsp = 'SkyrimPlatformBridge.esp'
const skyrimPlatformBridgeMessagesContainerId = 0xd66

export interface PapyrusMessage {
    text: string
}

export class PapyrusBridge {
    messagesContainerFormId = 0
    isListening = false
    messageHandlers = new Array<(message: PapyrusMessage) => void>()

    public onMessage(handler: (message: PapyrusMessage) => void) {
        this.listenForMessages()
        this.messageHandlers.push(handler)
    }

    public listenForMessages() {
        if (!this.isListening) {
            on('containerChanged', changeInfo => {
                if (!this.messagesContainerFormId) {
                    const container = Game.getFormFromFile(skyrimPlatformBridgeMessagesContainerId, skyrimPlatformBridgeMessagesContainerEsp)
                    if (container) {
                        this.messagesContainerFormId = container.getFormID()
                    }
                }
                if (this.messagesContainerFormId && this.messagesContainerFormId == changeInfo.newContainer.getFormID()) {
                    const message: PapyrusMessage = { text: changeInfo.baseObj.getName() }
                    this.messageHandlers.forEach(handler => handler(message))
                }
            })
        }
    }
}

const defaultInstance = new PapyrusBridge()

export default defaultInstance