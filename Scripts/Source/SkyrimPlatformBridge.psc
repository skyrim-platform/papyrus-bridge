scriptName SkyrimPlatformBridge extends Quest  

ObjectReference property MessagesContainer auto
Form property SkyrimPlatformBridge_Message0 auto

SkyrimPlatformBridge function GetAPI() global
    return Game.GetFormFromFile(0x800, "SkyrimPlatformBridge.esp") as SkyrimPlatformBridge
endFunction

function SendMessage(string text) global
    Debug.MessageBox(GetAPI())
    GetAPI().Send(text)
endFunction

function Send(string text)
    Debug.MessageBox("SENDING " + text  + " to Skyrim Platform")
    MessagesContainer.RemoveAllItems()
    SkyrimPlatformBridge_Message0.SetName(text)
    MessagesContainer.AddItem(SkyrimPlatformBridge_Message0)
    Debug.MessageBox("ADDED ITEM")
endFunction
