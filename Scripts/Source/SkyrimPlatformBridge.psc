scriptName SkyrimPlatformBridge extends Quest  

ObjectReference property MessagesContainer auto
Form property SkyrimPlatformBridge_Message0 auto
string property SkyrimPlatformGenericModEventName = "SkyrimPlatformBridge_Generic" autoReadonly
string property SkyrimPlatformBridgeEventMessageDelimiter = "<||>" autoReadonly
string property SkyrimPlatformBridgeEventMessagePrefix = "::SKYRIM_PLATFORM_BRIDGE_EVENT::" autoReadonly

SkyrimPlatformBridge function GetAPI() global
    return Game.GetFormFromFile(0x800, "SkyrimPlatformBridge.esp") as SkyrimPlatformBridge
endFunction

function SendMessage(string text) global
    GetAPI()._SendMessage(text)
endFunction

function SendEvent(string name, string source, string target, string data, string replyId = "") global
    GetAPI()._SendEvent(name, source, target, data, replyId)
endFunction

function _SendMessage(string text)
    MessagesContainer.RemoveAllItems()
    SkyrimPlatformBridge_Message0.SetName(text)
    MessagesContainer.AddItem(SkyrimPlatformBridge_Message0)
endFunction

string function GetUniqueReplyId()
    return Utility.RandomFloat(0, 100000000) + "_" + Utility.RandomFloat(0, 100000000)
endFunction

; GET LOCK ON FORK - AND HAVE MANY FORKS!
function _SendEvent(string name, string source, string target, string data, string replyId = "")
    if ! replyId
        replyId = GetUniqueReplyId()
    endIf
    MessagesContainer.RemoveAllItems()
    string[] eventParts = new string[6]
    eventParts[0] = SkyrimPlatformBridgeEventMessagePrefix
    eventParts[1] = name
    eventParts[2] = source
    eventParts[3] = target
    eventParts[4] = replyId
    eventParts[5] = data
    string eventText = ""
    int i = 0
    while i < eventParts.Length
        if i == 0
            eventText += eventParts[i]
        else
            eventText += SkyrimPlatformBridgeEventMessageDelimiter + eventParts[i]
        endIf
        i += 1
    endWhile
    SkyrimPlatformBridge_Message0.SetName(eventText)
    MessagesContainer.AddItem(SkyrimPlatformBridge_Message0)
endFunction

function ListenForMessage(Alias aliasListener) global
    aliasListener.RegisterForModEvent("SkyrimPlatformBridge_Generic", "OnSkyrimPlatformMessage")
endFunction
