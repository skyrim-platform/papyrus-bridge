scriptName xSkyrimPlatformBridge_Listener extends ReferenceAlias

float _lock
bool _ready ; TODO
string[] _replyIDs
string[] _responses

event OnInit()
endEvent

event OnPlayerLoadGame()
endEvent

string function GetResponse(string replyID) ; SkyrimPlatformBridge_Response_
    int replyIndex = _replyIDs.Find(replyID)
    if _responses[replyIndex]
        Lock()
        replyIndex = _replyIDs.Find(replyID)
        string response = _responses[replyIndex]
        if response
            ; Remove item from _replyIDs and _responses
            string[] newReplyIDs = Utility.CreateStringArray(_replyIDs.Length - 1)
            string[] newResponses = Utility.CreateStringArray(_responses.Length - 1)
            int i = 0
            int newArrayIndex = 0
            while i < _replyIDs.Length
                if i != replyIndex
                    newReplyIDs[newArrayIndex] = _replyIDs[i]
                    newResponses[newArrayIndex] = _responses[i]
                    newArrayIndex += 1
                endIf
                i += 1
            endWhile
            _replyIDs = newReplyIDs
            _responses = newResponses
            return response
        endIf
        Unlock()
    endIf
    return ""
endFunction

; TODO add a timeout and use OnUpdate() to remove ones past their due date :)
function ListenForReply(string replyID)
    Lock()
    if ! _replyIDs
        _replyIDs = new string[1]
        _replyIDs[0] = replyID
        _responses = new string[1]
        _responses[0] = ""
    else
        _replyIDs = Utility.ResizeStringArray(_replyIDs, _replyIDs.Length + 1)
        _replyIDs[_replyIDs.Length - 1] = replyID
        _responses = Utility.ResizeStringArray(_responses, _responses.Length + 1)
    endIf
    RegisterForModEvent("SkyrimPlatformBridge_Response_" + replyID, "OnReply") ; Reminder, this will trigger for all 10 listeners
    Unlock()
endFunction

event OnReply(string replyID, string response)
    Debug.MessageBox("ON REPLY " + response)
    int replyIndex = _replyIDs.Find(replyID)
    if replyIndex != -1
        UnregisterForModEvent("SkyrimPlatformBridge_Response_" + replyID)
        Lock()
        _responses[replyIndex] = "RESPONSE:" + response ; 'RESPONSE:' to support empty responses as valid
        Unlock()
    endIf
endEvent

function Lock(float lock = 0.0, float waitInterval = 0.1)
    if ! lock
        lock = Utility.RandomFloat(100000, 1000000000)
    endIf
    while _lock
        Utility.WaitMenuMode(waitInterval)
    endWhile
    if ! _lock
        _lock = lock
        if _lock == lock
            if _lock == lock
                return ; Lock acquired
            else
                return Lock(lock, waitInterval)
            endIf
        else
            return Lock(lock, waitInterval)
        endIf
    else
        return Lock(lock, waitInterval)
    endIf
endFunction

function Unlock()
    _lock = 0.0
endFunction
