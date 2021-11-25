scriptName xSkyrimPlatformBridge_Listener extends Quest

float _lock
bool _ready
string[] _replyIDs
string[] _responses

event OnInit()
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

function ListenForReply(string replyID)
    RegisterForModEvent("SkyrimPlatformBridge_Response_" + replyID, "OnReply")
    Lock()
    _replyIDs = Utility.ResizeStringArray(_replyIDs, _replyIDs.Length + 1)
    _replyIDs[_replyIDs.Length - 1] = replyID
    _responses = Utility.ResizeStringArray(_responses, _responses.Length + 1)
    Unlock()
endFunction

event OnReply(string replyID, string response)
    UnregisterForModEvent("SkyrimPlatformBridge_Response_" + replyID)
    Lock()
    int replyIndex = _replyIDs.Find(replyID)
    _responses[replyIndex] = "RESPONSE:" + response ; 'RESPONSE:' to support empty responses as valid
    Unlock()
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
