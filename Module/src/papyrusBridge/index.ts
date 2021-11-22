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
            // once('tick', () => {
            //     if (! this.messagesContainerFormId) {
            //         const container = Game.getFormFromFile(skyrimPlatformBridgeMessagesContainerId, skyrimPlatformBridgeMessagesContainerEsp)
            //         if (container)
            //             this.messagesContainerFormId = container.getFormID()
            //     }
            // })
            on('containerChanged', changeInfo => {
                printConsole(`Container changed: ${changeInfo.baseObj.getName()}`)
                // if (changeInfo.newContainer.getFormID() ==)
            })
        }
    }
}

const defaultInstance = new PapyrusBridge()

export default defaultInstance