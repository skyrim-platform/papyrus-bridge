scriptName SkyrimPlatformConnection extends ReferenceAlias
{Extend to implement a 'connection' which can communicate with Skyrim Platform

```
scriptName MyConnection extends SkyrimPlatformConnection

event OnSetup()
    ; Defaults to the name of the script, e.g. MyConnection
    ConnectionName = "MyConnectionName"
endEvent

event OnConnected()
endEvent

event OnEvent(string eventName, string data)
endEvent

event OnRequest(string replyId, string query, string data)
    Reply(replyId, "Response Data")
endEvent
```
}

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
    SkyrimPlatformBridge.ListenForEvents_Alias(ConnectionName, self, "HandleSkyrimPlatformEvent")
    ConnectToSkyrimPlatform(ConnectionTimeout)
endEvent

event OnPlayerLoadGame()
    OnSetup()
    SkyrimPlatformBridge.ListenForEvents_Alias(ConnectionName, self, "HandleSkyrimPlatformEvent")
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
            ; Get the scriptName of the current script
            _connectionName = StringUtil.Substring(self, 1, StringUtil.Find(self, " ") - 1)
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
    return _bridgeAPI.MakeRequestAPI(query, source, target, data, waitInterval, timeout)
endFunction

event OnEvent(string eventName, string data)
endEvent

event OnRequest(string replyId, string query, string data)
endEvent

event OnSkyrimPlatformEvent(string eventName, string source, string data)
    OnEvent(eventName, data)
endEvent

event OnSkyrimPlatformRequest(string replyId, string query, string data, string source)
    OnRequest(replyId, query, data)
endEvent

event OnConnected()
endEvent

event HandleSkyrimPlatformEvent(string messageType, string eventNameOrQuery, string source, string target, string data, string replyID)
    if target == ConnectionName
        if messageType == "event"
            OnSkyrimPlatformEvent(eventNameOrQuery, source, data)
        elseIf messageType == "request"
            OnSkyrimPlatformRequest(replyId, eventNameOrQuery, data, source)
        endIf
    endIf
endEvent

function Reply(string replyId, string data)
    _bridgeAPI.ReplyAPI(replyId, data)
endFunction
