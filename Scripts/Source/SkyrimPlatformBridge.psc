scriptName SkyrimPlatformBridge extends Quest  

ObjectReference property MessagesContainer auto
Form property SkyrimPlatformBridge_Message0 auto
string property SkyrimPlatformGenericModEventName = "SkyrimPlatformBridge_Generic" autoReadonly
string property SkyrimPlatformBridgeCustomEventSkseModEventNamePrefix = "SkyrimPlatformBridge_Custom_" autoReadonly
string property SkyrimPlatformBridgeEventMessageDelimiter = "<||>" autoReadonly
string property SkyrimPlatformBridgeEventMessagePrefix = "::SKYRIM_PLATFORM_BRIDGE_EVENT::" autoReadonly
string property SkyrimPlatformBridgeEventReplyMessagePrefix = "::SKYRIM_PLATFORM_BRIDGE_REPLY::" autoReadonly

SkyrimPlatformBridge function GetAPI() global
    return Game.GetFormFromFile(0x800, "SkyrimPlatformBridge.esp") as SkyrimPlatformBridge
endFunction

function SendMessage(string text) global
    GetAPI()._SendMessage(text)
endFunction

function SendEvent(string eventName, string source, string target, string data, string replyID = "") global
    GetAPI()._SendEvent(eventName, source, target, data, replyID)
endFunction

function Reply(string eventName, string source, string target, string data, string replyId) global
    GetAPI()._Reply(eventName, source, target, data, replyID)
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
function _SendEvent(string eventName, string source, string target, string data, string replyID = "")
    if ! replyID
        replyID = GetUniqueReplyId() ; Change so there's a diff method for sending event with expected reply
    endIf
    MessagesContainer.RemoveAllItems()
    string[] eventParts = new string[6]
    eventParts[0] = SkyrimPlatformBridgeEventMessagePrefix
    eventParts[1] = eventName
    eventParts[2] = source
    eventParts[3] = target
    eventParts[4] = replyID
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

; TODO ListenForModMessage()

; TODO ListenForModEvent()

function ListenForMessage(Alias aliasListener) global
    aliasListener.RegisterForModEvent("SkyrimPlatformBridge_Generic", "OnSkyrimPlatformMessage")
endFunction

function ListenForEvent(Alias aliasListener, string eventName, string callbackFunction = "") global
    if ! callbackFunction
        string[] eventNameParts = StringUtil.Split(eventName, " ")
        if eventNameParts.Length > 1
            callbackFunction = "On"
            int i = 0
            while i < eventNameParts.Length
                callbackFunction += eventNameParts[i]
                i += 1
            endWhile
        else
            callbackFunction = "On" + eventName
        endIf
    endIf
    aliasListener.RegisterForModEvent("SkyrimPlatformBridge_Custom_" + eventName, callbackFunction)
endFunction

function _Reply(string eventName, string source, string target, string data, string replyId)
    MessagesContainer.RemoveAllItems()
    string[] eventParts = new string[6]
    eventParts[0] = SkyrimPlatformBridgeEventReplyMessagePrefix
    eventParts[1] = eventName
    eventParts[2] = source
    eventParts[3] = target
    eventParts[4] = replyID
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
