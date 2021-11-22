scriptName SkyrimPlatformBridge extends Quest  

ObjectReference property MessagesContainer auto
Form property SkyrimPlatformBridge_Message0 auto

SkyrimPlatformBridge function GetAPI() global
    return Game.GetFormFromFile(0x800, "SkyrimPlatformBridge.esp") as SkyrimPlatformBridge
endFunction

function SendMessage(string text) global
    GetAPI().Send(text)
endFunction

function Send(string text)
    MessagesContainer.RemoveAllItems()
    SkyrimPlatformBridge_Message0.SetName(text)
    MessagesContainer.AddItem(SkyrimPlatformBridge_Message0)
endFunction
