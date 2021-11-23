scriptName SkyrimPlatformBridge extends Quest  

ObjectReference property MessagesContainer auto
Form property SkyrimPlatformBridge_Message1 auto
Form property SkyrimPlatformBridge_Message2 auto
Form property SkyrimPlatformBridge_Message3 auto
Form property SkyrimPlatformBridge_Message4 auto
Form property SkyrimPlatformBridge_Message5 auto
Form property SkyrimPlatformBridge_Message6 auto
Form property SkyrimPlatformBridge_Message7 auto
Form property SkyrimPlatformBridge_Message8 auto
Form property SkyrimPlatformBridge_Message9 auto
Form property SkyrimPlatformBridge_Message10 auto
Form property SkyrimPlatformBridge_Message11 auto
Form property SkyrimPlatformBridge_Message12 auto
Form property SkyrimPlatformBridge_Message13 auto
Form property SkyrimPlatformBridge_Message14 auto
Form property SkyrimPlatformBridge_Message15 auto
Form property SkyrimPlatformBridge_Message16 auto
Form property SkyrimPlatformBridge_Message17 auto
Form property SkyrimPlatformBridge_Message18 auto
Form property SkyrimPlatformBridge_Message19 auto
Form property SkyrimPlatformBridge_Message20 auto
Form property SkyrimPlatformBridge_Message21 auto
Form property SkyrimPlatformBridge_Message22 auto
Form property SkyrimPlatformBridge_Message23 auto
Form property SkyrimPlatformBridge_Message24 auto
Form property SkyrimPlatformBridge_Message25 auto
Form property SkyrimPlatformBridge_Message26 auto
Form property SkyrimPlatformBridge_Message27 auto
Form property SkyrimPlatformBridge_Message28 auto
Form property SkyrimPlatformBridge_Message29 auto
Form property SkyrimPlatformBridge_Message30 auto
Form property SkyrimPlatformBridge_Message31 auto
Form property SkyrimPlatformBridge_Message32 auto
Form property SkyrimPlatformBridge_Message33 auto
Form property SkyrimPlatformBridge_Message34 auto
Form property SkyrimPlatformBridge_Message35 auto
Form property SkyrimPlatformBridge_Message36 auto
Form property SkyrimPlatformBridge_Message37 auto
Form property SkyrimPlatformBridge_Message38 auto
Form property SkyrimPlatformBridge_Message39 auto
Form property SkyrimPlatformBridge_Message40 auto
Form property SkyrimPlatformBridge_Message41 auto
Form property SkyrimPlatformBridge_Message42 auto
Form property SkyrimPlatformBridge_Message43 auto
Form property SkyrimPlatformBridge_Message44 auto
Form property SkyrimPlatformBridge_Message45 auto
Form property SkyrimPlatformBridge_Message46 auto
Form property SkyrimPlatformBridge_Message47 auto
Form property SkyrimPlatformBridge_Message48 auto
Form property SkyrimPlatformBridge_Message49 auto
Form property SkyrimPlatformBridge_Message50 auto
Form property SkyrimPlatformBridge_Message51 auto
Form property SkyrimPlatformBridge_Message52 auto
Form property SkyrimPlatformBridge_Message53 auto
Form property SkyrimPlatformBridge_Message54 auto
Form property SkyrimPlatformBridge_Message55 auto
Form property SkyrimPlatformBridge_Message56 auto
Form property SkyrimPlatformBridge_Message57 auto
Form property SkyrimPlatformBridge_Message58 auto
Form property SkyrimPlatformBridge_Message59 auto
Form property SkyrimPlatformBridge_Message60 auto
Form property SkyrimPlatformBridge_Message61 auto
Form property SkyrimPlatformBridge_Message62 auto
Form property SkyrimPlatformBridge_Message63 auto
Form property SkyrimPlatformBridge_Message64 auto
Form property SkyrimPlatformBridge_Message65 auto
Form property SkyrimPlatformBridge_Message66 auto
Form property SkyrimPlatformBridge_Message67 auto
Form property SkyrimPlatformBridge_Message68 auto
Form property SkyrimPlatformBridge_Message69 auto
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
    SkyrimPlatformBridge_Message1.SetName(text)
    MessagesContainer.AddItem(SkyrimPlatformBridge_Message1)
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
    SkyrimPlatformBridge_Message1.SetName(eventText)
    MessagesContainer.AddItem(SkyrimPlatformBridge_Message1)
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
    SkyrimPlatformBridge_Message1.SetName(eventText)
    MessagesContainer.AddItem(SkyrimPlatformBridge_Message1)
endFunction
