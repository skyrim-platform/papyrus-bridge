scriptName xSkyrimPlatformBridge_ListenerManager extends ReferenceAlias

bool _ready
int _nextListenerIndex = 0 ; Round-robin distribution

xSkyrimPlatformBridge_Listener[] _listenerScripts

bool function IsReady()
    return _ready
endFunction

event OnInit()
    _listenerScripts = new xSkyrimPlatformBridge_Listener[10]
    _listenerScripts[0] = GetOwningQuest() as xSkyrimPlatformBridge_Listener1
    _listenerScripts[1] = GetOwningQuest() as xSkyrimPlatformBridge_Listener2
    _listenerScripts[2] = GetOwningQuest() as xSkyrimPlatformBridge_Listener3
    _listenerScripts[3] = GetOwningQuest() as xSkyrimPlatformBridge_Listener4
    _listenerScripts[4] = GetOwningQuest() as xSkyrimPlatformBridge_Listener5
    _listenerScripts[5] = GetOwningQuest() as xSkyrimPlatformBridge_Listener6
    _listenerScripts[6] = GetOwningQuest() as xSkyrimPlatformBridge_Listener7
    _listenerScripts[7] = GetOwningQuest() as xSkyrimPlatformBridge_Listener8
    _listenerScripts[8] = GetOwningQuest() as xSkyrimPlatformBridge_Listener9
    _listenerScripts[9] = GetOwningQuest() as xSkyrimPlatformBridge_Listener10
    _ready = true
endEvent

event OnPlayerLoadGame()
    ; _ready = false
    ; Reload listener event state...
endEvent

xSkyrimPlatformBridge_Listener function GetListener()
    ; Simple round-robin distribution, we don't lock or anything, each listener supports N ConnectedToSkyrimPlatform scripts
    xSkyrimPlatformBridge_Listener listener = _listenerScripts[_nextListenerIndex]
    _nextListenerIndex += 1
    return listener
endFunction
