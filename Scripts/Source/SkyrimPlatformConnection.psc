scriptName SkyrimPlatformConnection extends ReferenceAlias

; BeginRequest()
; OnResponse()
; timedOut = true

string _connectionName
SkyrimPlatformBridge _bridgeAPI

bool property IsConnected auto
float property ConnectionTimeout auto
float property ConnectionAttemptTimeout auto

event OnInit()
    ConnectionTimeout = 30.0
    ConnectionAttemptTimeout = 1.0
    OnSetup()
    _bridgeAPI = SkyrimPlatformBridge.GetPrivateAPI()
    RegisterForModEvent("SkyrimPlatformBridge_ModEvent_" + ConnectionName, "HandleSkyrimPlatformEvent")
    ConnectToSkyrimPlatform(ConnectionTimeout)
endEvent

event OnPlayerLoadGame()
    OnSetup()
    RegisterForModEvent("SkyrimPlatformBridge_ModEvent_" + ConnectionName, "HandleSkyrimPlatformEvent")
    ConnectToSkyrimPlatform(ConnectionTimeout)
endEvent

function ConnectToSkyrimPlatform(float timeout)
    IsConnected = false
    float startTime = Utility.GetCurrentRealTime()
    while (! IsConnected) && (Utility.GetCurrentRealTime() - startTime) < timeout
        IsConnected = Request("SkyrimPlatformBridge_ConnectionRequest", timeout = ConnectionAttemptTimeout) == "CONNECTED"
    endWhile
    if IsConnected
        OnConnected()
    endIf
endFunction

; Use this to configure ConnectionName (defaults to name of the script, e.g. `Foo` for a script named `FooConnection`)
;
; ```
; scriptName MyModEvents extends ConnectedToSkyrimPlatform
;
; event OnSetup()
;   ConnectionName = "MyConnectionName"
; endEvent
; ```
;
string property ConnectionName
    string function get()
        if ! _connectionName
            ; ;;;;; ;
        endIf
        return _connectionName
    endFunction
    function set(string value)
        _connectionName = value
    endFunction
endProperty

; Use this to configure ConnectionName (defaults to name of mod file, e.g. "MyMod" for "MyMod.esp")
;
; ```
; scriptName MyModEvents extends ConnectedToSkyrimPlatform
;
; event OnSetup()
;   ConnectionName = "MyConnectionName"
; endEvent
; ```
;
event OnSetup()
endEvent

function Send(string eventName, string data = "", string target = "", string source = "")
    if ! target
        target = ConnectionName
    endIf
    if ! source
        source = ConnectionName
    endIf
    _bridgeAPI.SendEventAPI(eventName, source, target, data)
endFunction

string function Request(string query, string data = "", string target = "", string source = "", float waitInterval = 0.5, float timeout = 10.0) ; set back to 0.5 (the 3 interval)
    if ! source
        source = ConnectionName
    endIf
    if ! target
        target = ConnectionName
    endIf

    string replyID = _bridgeAPI.GetUniqueReplyID()
    xSkyrimPlatformBridge_Listener listener = _bridgeAPI.GetListener()
    listener.ListenForReply(replyID)

    float startQueryTime = Utility.GetCurrentRealTime()
    _bridgeAPI.BeginRequestAPI(query, source, target, data, replyID)

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

event OnEvent(string eventName, string data)
endEvent

event OnRequest(string query, string data, string replyId)
endEvent

event OnSkyrimPlatformEvent(string eventName, string source, string data)
    OnEvent(eventName, data)
endEvent

event OnSkyrimPlatformRequest(string query, string source, string data, string replyId)
    OnRequest(query, data, replyId)
endEvent

event OnConnected()
endEvent

event HandleSkyrimPlatformEvent(string messageType, string eventNameOrQuery, string source, string target, string data, string replyID)
    if messageType == "event"
        OnSkyrimPlatformEvent(eventNameOrQuery, source, data)
    elseIf messageType == "request"
        OnSkyrimPlatformRequest(eventNameOrQuery, source, data, replyID)
    endIf
endEvent

function Reply(string replyId, string data)
    _bridgeAPI.ReplyAPI(replyId, data)
endFunction
