scriptName SkyrimPlatformBridge extends Quest

string property CurrentlyInstalledVersion auto
ObjectReference property MessagesContainer auto
int NextMessageIndex = -1
Form[] Messages
bool[] MessageIsInMessagesContainer
float[] MessageLocks
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
string property SkyrimPlatformBridgeCustomEventSkseModEventNamePrefix = "SkyrimPlatformBridge_Event_" autoReadonly
string property SkyrimPlatformBridgeEventMessageDelimiter = "<||>" autoReadonly
string property SkyrimPlatformBridgeEventMessagePrefix = "::SKYRIM_PLATFORM_BRIDGE_EVENT::" autoReadonly
string property SkyrimPlatformBridgeRequestMessagePrefix = "::SKYRIM_PLATFORM_BRIDGE_REQUEST::" autoReadonly
string property SkyrimPlatformBridgeResponseMessagePrefix = "::SKYRIM_PLATFORM_BRIDGE_RESPONSE::" autoReadonly
xSkyrimPlatformBridge_Listener[] ListenerScripts
int NextListenerIndex
bool property IsReady auto

string function GetCurrentVersion() global
    return "1.0"
endFunction

SkyrimPlatformBridge function GetPrivateAPI() global
    return Game.GetFormFromFile(0x800, "SkyrimPlatformBridge.esp") as SkyrimPlatformBridge
endFunction

event OnInit()
    CurrentlyInstalledVersion = GetCurrentVersion()
    MessageIsInMessagesContainer = new bool[69]
    MessageLocks = new float[69]
    Messages = new Form[69]
    Messages[0] = SkyrimPlatformBridge_Message1
    Messages[1] = SkyrimPlatformBridge_Message2
    Messages[2] = SkyrimPlatformBridge_Message3
    Messages[3] = SkyrimPlatformBridge_Message4
    Messages[4] = SkyrimPlatformBridge_Message5
    Messages[5] = SkyrimPlatformBridge_Message6
    Messages[6] = SkyrimPlatformBridge_Message7
    Messages[7] = SkyrimPlatformBridge_Message8
    Messages[8] = SkyrimPlatformBridge_Message9
    Messages[9] = SkyrimPlatformBridge_Message10
    Messages[10] = SkyrimPlatformBridge_Message11
    Messages[11] = SkyrimPlatformBridge_Message12
    Messages[12] = SkyrimPlatformBridge_Message13
    Messages[13] = SkyrimPlatformBridge_Message14
    Messages[14] = SkyrimPlatformBridge_Message15
    Messages[15] = SkyrimPlatformBridge_Message16
    Messages[16] = SkyrimPlatformBridge_Message17
    Messages[17] = SkyrimPlatformBridge_Message18
    Messages[18] = SkyrimPlatformBridge_Message19
    Messages[19] = SkyrimPlatformBridge_Message20
    Messages[20] = SkyrimPlatformBridge_Message21
    Messages[21] = SkyrimPlatformBridge_Message22
    Messages[22] = SkyrimPlatformBridge_Message23
    Messages[23] = SkyrimPlatformBridge_Message24
    Messages[24] = SkyrimPlatformBridge_Message25
    Messages[25] = SkyrimPlatformBridge_Message26
    Messages[26] = SkyrimPlatformBridge_Message27
    Messages[27] = SkyrimPlatformBridge_Message28
    Messages[28] = SkyrimPlatformBridge_Message29
    Messages[29] = SkyrimPlatformBridge_Message30
    Messages[30] = SkyrimPlatformBridge_Message31
    Messages[31] = SkyrimPlatformBridge_Message32
    Messages[32] = SkyrimPlatformBridge_Message33
    Messages[33] = SkyrimPlatformBridge_Message34
    Messages[34] = SkyrimPlatformBridge_Message35
    Messages[35] = SkyrimPlatformBridge_Message36
    Messages[36] = SkyrimPlatformBridge_Message37
    Messages[37] = SkyrimPlatformBridge_Message38
    Messages[38] = SkyrimPlatformBridge_Message39
    Messages[39] = SkyrimPlatformBridge_Message40
    Messages[40] = SkyrimPlatformBridge_Message41
    Messages[41] = SkyrimPlatformBridge_Message42
    Messages[42] = SkyrimPlatformBridge_Message43
    Messages[43] = SkyrimPlatformBridge_Message44
    Messages[44] = SkyrimPlatformBridge_Message45
    Messages[45] = SkyrimPlatformBridge_Message46
    Messages[46] = SkyrimPlatformBridge_Message47
    Messages[47] = SkyrimPlatformBridge_Message48
    Messages[48] = SkyrimPlatformBridge_Message49
    Messages[49] = SkyrimPlatformBridge_Message50
    Messages[50] = SkyrimPlatformBridge_Message51
    Messages[51] = SkyrimPlatformBridge_Message52
    Messages[52] = SkyrimPlatformBridge_Message53
    Messages[53] = SkyrimPlatformBridge_Message54
    Messages[54] = SkyrimPlatformBridge_Message55
    Messages[55] = SkyrimPlatformBridge_Message56
    Messages[56] = SkyrimPlatformBridge_Message57
    Messages[57] = SkyrimPlatformBridge_Message58
    Messages[58] = SkyrimPlatformBridge_Message59
    Messages[59] = SkyrimPlatformBridge_Message60
    Messages[60] = SkyrimPlatformBridge_Message61
    Messages[61] = SkyrimPlatformBridge_Message62
    Messages[62] = SkyrimPlatformBridge_Message63
    Messages[63] = SkyrimPlatformBridge_Message64
    Messages[64] = SkyrimPlatformBridge_Message65
    Messages[65] = SkyrimPlatformBridge_Message66
    Messages[66] = SkyrimPlatformBridge_Message67
    Messages[67] = SkyrimPlatformBridge_Message68
    Messages[68] = SkyrimPlatformBridge_Message69
    ListenerScripts = new xSkyrimPlatformBridge_Listener[10]
    ListenerScripts[0] = (Game.GetFormFromFile(0x846, "SkyrimPlatformBridge.esp") as Quest).GetAliasByName("PlayerRef") as xSkyrimPlatformBridge_Listener1
    ListenerScripts[1] = (Game.GetFormFromFile(0x847, "SkyrimPlatformBridge.esp") as Quest).GetAliasByName("PlayerRef") as xSkyrimPlatformBridge_Listener2
    ListenerScripts[2] = (Game.GetFormFromFile(0x848, "SkyrimPlatformBridge.esp") as Quest).GetAliasByName("PlayerRef") as xSkyrimPlatformBridge_Listener3
    ListenerScripts[3] = (Game.GetFormFromFile(0x849, "SkyrimPlatformBridge.esp") as Quest).GetAliasByName("PlayerRef") as xSkyrimPlatformBridge_Listener4
    ListenerScripts[4] = (Game.GetFormFromFile(0x84a, "SkyrimPlatformBridge.esp") as Quest).GetAliasByName("PlayerRef") as xSkyrimPlatformBridge_Listener5
    ListenerScripts[5] = (Game.GetFormFromFile(0x84b, "SkyrimPlatformBridge.esp") as Quest).GetAliasByName("PlayerRef") as xSkyrimPlatformBridge_Listener6
    ListenerScripts[6] = (Game.GetFormFromFile(0x84c, "SkyrimPlatformBridge.esp") as Quest).GetAliasByName("PlayerRef") as xSkyrimPlatformBridge_Listener7
    ListenerScripts[7] = (Game.GetFormFromFile(0x84d, "SkyrimPlatformBridge.esp") as Quest).GetAliasByName("PlayerRef") as xSkyrimPlatformBridge_Listener8
    ListenerScripts[8] = (Game.GetFormFromFile(0x84e, "SkyrimPlatformBridge.esp") as Quest).GetAliasByName("PlayerRef") as xSkyrimPlatformBridge_Listener9
    ListenerScripts[9] = (Game.GetFormFromFile(0x84f, "SkyrimPlatformBridge.esp") as Quest).GetAliasByName("PlayerRef") as xSkyrimPlatformBridge_Listener10
    IsReady = true
endEvent

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
; API Public Global Functions
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

function SendEvent(string eventName, string target, string data = "", string source = "") global
    GetPrivateAPI().SendEventAPI(eventName, source, target, data)
endFunction

function Reply(string data = "", string replyId) global
    GetPrivateAPI().ReplyAPI(data, replyID)
endFunction

string function Request(string query, string target, string data = "", string source = "", float waitInterval = 0.5, float timeout = 10.0) global
    return GetPrivateAPI().MakeRequestAPI(query, source, target, data, waitInterval, timeout)
endFunction

function ListenForEvents_Alias(string connectionName, Alias callbackAlias, string callbackFunction) global
    callbackAlias.RegisterForModEvent(GetEventsSkseModEventName(connectionName), callbackFunction)
endFunction

function ListenForEvents_Form(string connectionName, Form callbackForm, string callbackFunction) global
    callbackForm.RegisterForModEvent(GetEventsSkseModEventName(connectionName), callbackFunction)
endFunction

function ListenForEvents_ActiveMagicEffect(string connectionName, ActiveMagicEffect callbackAME, string callbackFunction) global
    callbackAME.RegisterForModEvent(GetEventsSkseModEventName(connectionName), callbackFunction)
endFunction

string function GetEventsSkseModEventName(string connectionName) global
    return "SkyrimPlatformBridge_Event_" + connectionName
endFunction

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
; API Instance Functions
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

function SendRawMessageAPI(string text)
    int messageIndex = _getAndLockNextAvailableMessageIndex()
    bool messageInContainer = MessageIsInMessagesContainer[messageIndex]
    Form messageEnvelope = Messages[messageIndex]
    messageEnvelope.SetName(text)
    if messageInContainer
        MessagesContainer.RemoveItem(messageEnvelope)
        MessageIsInMessagesContainer[messageIndex] = false
    else
        MessagesContainer.AddItem(messageEnvelope)
        MessageIsInMessagesContainer[messageIndex] = true
    endIf
    _unlockMessage(messageIndex)
endFunction

function SendEventAPI(string eventName, string source, string target, string data, string replyID = "")
    if ! replyID
        replyID = _getUniqueReplyId() ; Change so there's a diff method for sending event with expected reply
    endIf
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
    SendRawMessageAPI(eventText)
endFunction

function ReplyAPI(string replyId, string data)
    string[] eventParts = new string[6]
    eventParts[0] = SkyrimPlatformBridgeResponseMessagePrefix
    eventParts[1] = ""
    eventParts[2] = ""
    eventParts[3] = ""
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
    SendRawMessageAPI(eventText)
endFunction

string function MakeRequestAPI(string query, string source, string target, string data, float waitInterval = 0.5, float timeout = 10.0)
    string replyID = GetUniqueReplyID()
    xSkyrimPlatformBridge_Listener listener = GetListener()
    listener.ListenForReply(replyID)

    float startQueryTime = Utility.GetCurrentRealTime()
    BeginRequestAPI(query, source, target, data, replyID)

    string response = listener.GetResponse(replyID)
    bool timedOut = ! response
    while (! response) && (Utility.GetCurrentRealTime() - startQueryTime) < timeout
        response = listener.GetResponse(replyID)
        if response
            timedOut = false
        else
            Utility.WaitMenuMode(waitInterval)
        endIf
    endWhile

    if timedOut
        return "SKYRIM_PLATFORM_REQUEST_TIMEOUT Exceeded " + timeout + " seconds"
    else
        ; Remove the 'RESPONSE:' prefix provided (so that Papyrus' GetResponse() works with empty responses)
        return StringUtil.Substring(response, 9)
    endIf
endFunction

string function BeginRequestAPI(string query, string source, string target, string data, string replyID)
    string[] eventParts = new string[6]
    eventParts[0] = SkyrimPlatformBridgeRequestMessagePrefix
    eventParts[1] = query
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
    SendRawMessageAPI(eventText)
endFunction

string function GetUniqueReplyID()
    return Utility.RandomFloat(100000, 10000000000) + "_" + Utility.RandomFloat(100000, 10000000000)
endFunction

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
; Private Functions
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

function _unlockMessage(int messageIndex)
    MessageLocks[messageIndex] = 0
endFunction

int function _getAndLockNextAvailableMessageIndex()
    float messageLock = Utility.RandomFloat(10000, 10000000000)
    int messageIndex = _tryLockNextAvailableMessageIndex(messageLock)
    while messageIndex == -1
        messageIndex = _tryLockNextAvailableMessageIndex(messageLock)
    endWhile
    return messageIndex
endFunction

int function _incrementOrFloorNextMessageIndex()
    NextMessageIndex += 1
    if NextMessageIndex >= 69
        NextMessageIndex = 0
    endIf
    return NextMessageIndex
endFunction

int function _tryLockNextAvailableMessageIndex(float lock)
    int messageIndex = _incrementOrFloorNextMessageIndex()
    while MessageLocks[messageIndex]
        messageIndex = _incrementOrFloorNextMessageIndex() ; Increment until we get an UNLOCKED ont
    endWhile
    if ! MessageLocks[messageIndex] ; Make sure that it is STILL unlocked
        MessageLocks[messageIndex] = lock ; Try to lock!
        if MessageLocks[messageIndex] == lock ; We did it! Or did we? Check one more time...
            if MessageLocks[messageIndex] == lock ; We did it! Or did we? Check one more time...
                return messageIndex
            else
                return -1
            endIf
        else
            return -1
        endIf
    else
        return -1
    endIf
endFunction

string function _getUniqueReplyId()
    return Utility.RandomFloat(0, 100000000) + "_" + Utility.RandomFloat(0, 100000000)
endFunction

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
; Event Listeners
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

xSkyrimPlatformBridge_Listener function GetListener()
    ; Simple round-robin distribution, we don't lock or anything, each listener supports N ConnectedToSkyrimPlatform scripts
    xSkyrimPlatformBridge_Listener listener = ListenerScripts[NextListenerIndex]
    NextListenerIndex += 1
    return listener
endFunction
