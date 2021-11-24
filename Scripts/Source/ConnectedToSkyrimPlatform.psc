scriptName ConnectedToSkyrimPlatform extends ReferenceAlias

string _modName
SkyrimPlatformBridge _bridgeAPI

event OnInit()
    OnSetup()
    _bridgeAPI = SkyrimPlatformBridge.GetPrivateAPI()
    RegisterForModEvent("SkyrimPlatformBridge_ModEvent_" + ModName, "OnSkyrimPlatformEvent")
    SendModEvent("SkyrimPlatform_RequestConnection")
endEvent

event OnPlayerLoadGame()
    OnSetup()
    RegisterForModEvent("SkyrimPlatformBridge_ModEvent_" + ModName, "OnSkyrimPlatformEvent")
    SendModEvent("SkyrimPlatform_RequestConnection")
endEvent

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

function SendEvent(string eventName, string data = "", string target = "", string source = "")
    if ! target
        target = ModName
    endIf
    if ! source
        source = ModName
    endIf
    _bridgeAPI.SendEventAPI(eventName, source, target, data)
endFunction

function GetData(string dataName, string parameter = "", string target = "", string source = "")
endFunction

event OnEvent(string eventName, string source, string data, string replyId)
endEvent

event OnConnected()
endEvent

event OnSkyrimPlatformEvent(string eventName, string source, string target, string data, string replyID)
    if eventName == "SkyrimPlatform_Connected"
        OnConnected()
    else
        OnEvent(eventName, source, data, replyID)
    endIf
endEvent
