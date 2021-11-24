.info
  .source "ConnectedToSkyrimPlatform.psc"
  .modifyTime 1637719265
  .compileTime 1637719267
  .user "mrowr"
  .computer "MROWR-PURR"
.endInfo
.userFlagsRef
  .flag conditional 1
  .flag hidden 0
.endUserFlagsRef
.objectTable
  .object ConnectedToSkyrimPlatform ReferenceAlias
    .userFlags 0
    .docString ""
    .autoState 
    .variableTable
      .variable _modName string
        .userFlags 0
        .initialValue None
      .endVariable
      .variable _bridgeAPI SkyrimPlatformBridge
        .userFlags 0
        .initialValue None
      .endVariable
    .endVariableTable
    .propertyTable
	  .property ModName string
	    .userFlags 0
	    .docString ""
	    .function get 
	      .userFlags 0
	      .docString ""
	      .return string
	      .paramTable
	      .endParamTable
	      .localTable
	        .local ::temp3 bool
	        .local ::temp4 quest
	        .local ::temp5 int
	        .local ::temp6 bool
	        .local ::temp8 string[]
	        .local modFile string
	        .local formId int
	        .local modIndex int
	        .local ::temp7 string
	        .local lightModIndex int
	        .local nameParts string[]
	        .local i int
	        .local ::temp9 bool
	        .local ::temp10 bool
	      .endLocalTable
	      .code
	        NOT ::temp3 _modName ;@line 33
	        JUMPF ::temp3 label8 ;@line 33
	        CALLMETHOD GetOwningQuest self ::temp4  ;@line 36
	        CALLMETHOD GetFormID ::temp4 ::temp5  ;@line 36
	        ASSIGN formId ::temp5 ;@line 36
	        CALLSTATIC math RightShift ::temp5 formId 24 ;@line 37
	        ASSIGN modIndex ::temp5 ;@line 37
	        COMPAREEQ ::temp6 modIndex 254 ;@line 38
	        JUMPF ::temp6 label2 ;@line 38
	        CALLSTATIC math RightShift ::temp5 formId 12 ;@line 39
	        CALLSTATIC math LogicalAnd ::temp5 ::temp5 4095 ;@line 39
	        ASSIGN lightModIndex ::temp5 ;@line 39
	        CALLSTATIC game GetLightModName ::temp7 lightModIndex ;@line 40
	        ASSIGN modFile ::temp7 ;@line 40
	        JUMP label1
	        label2:
	        CALLSTATIC game GetModName ::temp7 modIndex ;@line 42
	        ASSIGN modFile ::temp7 ;@line 42
	        label1:
	        CALLSTATIC stringutil Split ::temp8 modFile "." ;@line 45
	        ASSIGN nameParts ::temp8 ;@line 45
	        ASSIGN i 0 ;@line 46
	        label3:
	        ARRAYLENGTH ::temp5 nameParts ;@line 47
	        COMPARELT ::temp6 i ::temp5 ;@line 47
	        JUMPF ::temp6 label4 ;@line 47
	        COMPAREEQ ::temp9 i 0 ;@line 48
	        JUMPF ::temp9 label7 ;@line 48
	        ARRAYGETELEMENT ::temp7 nameParts i ;@line 49
	        ASSIGN _modName ::temp7 ;@line 49
	        JUMP label5
	        label7:
	        ARRAYLENGTH ::temp5 nameParts ;@line 50
	        ISUBTRACT ::temp5 ::temp5 1 ;@line 50
	        COMPAREEQ ::temp10 i ::temp5 ;@line 50
	        JUMPF ::temp10 label6 ;@line 50
	        JUMP label5
	        label6:
	        ARRAYGETELEMENT ::temp7 nameParts i ;@line 54
	        STRCAT ::temp7 "." ::temp7 ;@line 54
	        STRCAT ::temp7 _modName ::temp7 ;@line 54
	        ASSIGN _modName ::temp7 ;@line 54
	        label5:
	        IADD ::temp5 i 1 ;@line 56
	        ASSIGN i ::temp5 ;@line 56
	        JUMP label3
	        label4:
	        JUMP label0
	        label8:
	        label0:
	        RETURN _modName ;@line 59
	      .endCode
	    .endFunction
	    .function set 
	      .userFlags 0
	      .docString ""
	      .return NONE
	      .paramTable
	        .param value string
	      .endParamTable
	      .localTable
	      .endLocalTable
	      .code
	        ASSIGN _modName value ;@line 62
	      .endCode
	    .endFunction
	  .endProperty
    .endPropertyTable
    .stateTable
      .state
        .function GetState
          .userFlags 0
          .docString "Function that returns the current state"
          .return String
          .paramTable
          .endParamTable
          .localTable
          .endLocalTable
          .code
            RETURN ::state
          .endCode
        .endFunction
        .function GotoState
          .userFlags 0
          .docString "Function that switches this object to the specified state"
          .return None
          .paramTable
            .param newState String
          .endParamTable
          .localTable
            .local ::NoneVar None
          .endLocalTable
          .code
            CALLMETHOD onEndState self ::NoneVar
            ASSIGN ::state newState
            CALLMETHOD onBeginState self ::NoneVar
          .endCode
        .endFunction
        .function OnInit 
          .userFlags 0
          .docString ""
          .return NONE
          .paramTable
          .endParamTable
          .localTable
            .local ::nonevar none
            .local ::temp0 skyrimplatformbridge
            .local ::temp1 string
          .endLocalTable
          .code
            CALLMETHOD OnSetup self ::nonevar  ;@line 7
            CALLSTATIC skyrimplatformbridge GetPrivateAPI ::temp0  ;@line 8
            ASSIGN _bridgeAPI ::temp0 ;@line 8
            PROPGET ModName self ::temp1 ;@line 9
            STRCAT ::temp1 "Listening for 'SkyrimPlatformBridge_ModEvent_" ::temp1 ;@line 9
            STRCAT ::temp1 ::temp1 "'" ;@line 9
            CALLSTATIC debug MessageBox ::nonevar ::temp1 ;@line 9
            PROPGET ModName self ::temp1 ;@line 10
            STRCAT ::temp1 "SkyrimPlatformBridge_ModEvent_" ::temp1 ;@line 10
            CALLMETHOD RegisterForModEvent self ::nonevar ::temp1 "OnSkyrimPlatformEvent" ;@line 10
            PROPGET ModName self ::temp1 ;@line 11
            STRCAT ::temp1 "Listening for events to " ::temp1 ;@line 11
            CALLSTATIC debug MessageBox ::nonevar ::temp1 ;@line 11
            CALLMETHOD SendModEvent self ::nonevar "SkyrimPlatform_RequestConnection" "" 0.0 ;@line 12
          .endCode
        .endFunction
        .function OnPlayerLoadGame 
          .userFlags 0
          .docString ""
          .return NONE
          .paramTable
          .endParamTable
          .localTable
            .local ::nonevar none
            .local ::temp2 string
          .endLocalTable
          .code
            CALLMETHOD OnSetup self ::nonevar  ;@line 16
            PROPGET ModName self ::temp2 ;@line 17
            STRCAT ::temp2 "SkyrimPlatformBridge_ModEvent_" ::temp2 ;@line 17
            CALLMETHOD RegisterForModEvent self ::nonevar ::temp2 "OnSkyrimPlatformEvent" ;@line 17
            CALLMETHOD SendModEvent self ::nonevar "SkyrimPlatform_RequestConnection" "" 0.0 ;@line 18
          .endCode
        .endFunction
        .function OnSetup 
          .userFlags 0
          .docString ""
          .return NONE
          .paramTable
          .endParamTable
          .localTable
          .endLocalTable
          .code
          .endCode
        .endFunction
        .function SendEvent 
          .userFlags 0
          .docString ""
          .return NONE
          .paramTable
            .param eventName string
            .param data string
            .param target string
            .param source string
          .endParamTable
          .localTable
          .endLocalTable
          .code
          .endCode
        .endFunction
        .function GetData 
          .userFlags 0
          .docString ""
          .return NONE
          .paramTable
            .param dataName string
            .param parameter string
            .param target string
            .param source string
          .endParamTable
          .localTable
          .endLocalTable
          .code
          .endCode
        .endFunction
        .function OnEvent 
          .userFlags 0
          .docString ""
          .return NONE
          .paramTable
            .param eventName string
            .param source string
            .param data string
            .param replyId string
          .endParamTable
          .localTable
          .endLocalTable
          .code
          .endCode
        .endFunction
        .function OnConnected 
          .userFlags 0
          .docString ""
          .return NONE
          .paramTable
          .endParamTable
          .localTable
          .endLocalTable
          .code
          .endCode
        .endFunction
        .function OnSkyrimPlatformEvent 
          .userFlags 0
          .docString ""
          .return NONE
          .paramTable
            .param eventName string
            .param source string
            .param target string
            .param data string
            .param replyID string
          .endParamTable
          .localTable
            .local ::temp11 string
            .local ::nonevar none
            .local ::temp12 bool
          .endLocalTable
          .code
            STRCAT ::temp11 "Got an event! " eventName ;@line 92
            CALLSTATIC debug MessageBox ::nonevar ::temp11 ;@line 92
            COMPAREEQ ::temp12 eventName "SkyrimPlatform_Connected" ;@line 93
            JUMPF ::temp12 label10 ;@line 93
            CALLMETHOD OnConnected self ::nonevar  ;@line 94
            JUMP label9
            label10:
            CALLSTATIC debug MessageBox ::nonevar "Calling OnEvent..." ;@line 96
            CALLMETHOD OnEvent self ::nonevar eventName source data replyID ;@line 97
            label9:
          .endCode
        .endFunction
      .endState
    .endStateTable
  .endObject
.endObjectTable