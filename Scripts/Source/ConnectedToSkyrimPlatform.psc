scriptName ConnectedToSkyrimPlatform extends ReferenceAlias

; BeginRequest()
; OnResponse()
; timedOut = true

string _modName
bool _connected
SkyrimPlatformBridge _bridgeAPI

float property ConnectionTimeout auto

event OnInit()
    ConnectionTimeout = 30.0
    OnSetup()
    _bridgeAPI = SkyrimPlatformBridge.GetPrivateAPI()
    RegisterForModEvent("SkyrimPlatformBridge_ModEvent_" + ModName, "OnSkyrimPlatformEvent")
    ConnectToSkyrimPlatform(ConnectionTimeout)
endEvent

event OnPlayerLoadGame()
    OnSetup()
    RegisterForModEvent("SkyrimPlatformBridge_ModEvent_" + ModName, "OnSkyrimPlatformEvent")
    ConnectToSkyrimPlatform(ConnectionTimeout)
endEvent

function ConnectToSkyrimPlatform(float timeout)
    float startTime = Utility.GetCurrentRealTime()
    _connected = Request("SkyrimPlatform_ConnectionRequest", timeout = 0.5) == "CONNECTED" ; Try once first with quick timeout
    while (! _connected) && (Utility.GetCurrentRealTime() - startTime) < timeout
        _connected = Request("SkyrimPlatform_ConnectionRequest", timeout = 1.0) == "CONNECTED"
    endWhile
    if _connected
        Debug.MessageBox("We are connected! " + ModName)
    else
        Debug.MessageBox("NOT CONNECTED :( " + ModName)
    endIf
endFunction

; Use this to configure ModName (defaults to name of mod file, e.g. "MyMod" for "MyMod.esp")
;
; ```
; scriptName MyModEvents extends ConnectedToSkyrimPlatform
;
; event OnSetup()
;   ModName = "MyModName"
; endEvent
; ```
;
string property ModName
    string function get()
        if ! _modName
            ; Set 'ModName' to the name of the plugin, e.g. MyMod for MyMod.esp
            string modFile
            int formId = GetOwningQuest().GetFormID()
            int modIndex = Math.RightShift(formId, 24)
            if modIndex == 0xFE
                int lightModIndex = Math.LogicalAnd(Math.RightShift(formId, 12), 0xFFF)
                modFile = Game.GetLightModName(lightModIndex)
            else
                modFile = Game.GetModName(modIndex)
            endIf
            ; Remove the training .esp/.esm/.esl extension
            string[] nameParts = StringUtil.Split(modFile, ".")
            int i = 0
            while i < nameParts.Length
                if i == 0
                    _modName = nameParts[i]
                elseIf i == nameParts.Length - 1
                    ; Skip the extension
                else
                    ; Allow filenames including .
                    _modName += "." + nameParts[i]
                endIf
                i += 1
            endWhile
        endIf
        return _modName
    endFunction
    function set(string value)
        _modName = value
    endFunction
endProperty

; Use this to configure ModName (defaults to name of mod file, e.g. "MyMod" for "MyMod.esp")
;
; ```
; scriptName MyModEvents extends ConnectedToSkyrimPlatform
;
; event OnSetup()
;   ModName = "MyModName"
; endEvent
; ```
;
event OnSetup()
endEvent

function Send(string eventName, string data = "", string target = "", string source = "")
    if ! target
        target = ModName
    endIf
    if ! source
        source = ModName
    endIf
    _bridgeAPI.SendEventAPI(eventName, source, target, data)
endFunction

string function Request(string query, string parameters = "", string target = "", string source = "", float waitInterval = 0.5, float timeout = 10.0)
    if ! source
        source = ModName
    endIf
    if ! target
        target = ModName
    endIf

    string replyID = _bridgeAPI.GetUniqueReplyID()
    xSkyrimPlatformBridge_Listener listener = _bridgeAPI.ThreadManager.GetListener()
    listener.ListenForReply(replyID)

    float startQueryTime = Utility.GetCurrentRealTime()
    _bridgeAPI.BeginRequestAPI(query, source, target, parameters, replyID)

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
        return "SKYRIM_PLATFORM_REQUEST_TIMEOUT " + query + " " + parameters + " " + target + " " + source
    else
        ; Remove the 'RESPONSE:' prefix provided (so that Papyrus' GetResponse() works with empty responses)
        return StringUtil.Substring(response, 9)
    endIf
endFunction

event OnRawMessage(string eventName, string source, string target, string data, string replyID)
endEvent

event OnMessage(string eventName, string source, string data)
endEvent

event OnEvent(string eventName, string source, string data)
endEvent

event OnRequest(string query, string source, string data, string replyId)
endEvent

event OnConnected()
    Debug.MessageBox("CONNECTED")
endEvent

event OnSkyrimPlatformEvent(string messageType, string eventName, string source, string target, string data, string replyID)
    Debug.MessageBox("PAPYRUS RECEIVED: " + messageType + " " + eventName)
    ; if messageType == "REPLY"
    if eventName == "SkyrimPlatform_Connected"
        _connected = true
        OnConnected()
    else
        OnEvent(eventName, source, data)
    endIf
endEvent
