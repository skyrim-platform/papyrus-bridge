/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "skyrimPlatform":
/*!*********************************!*\
  !*** external "skyrimPlatform" ***!
  \*********************************/
/***/ ((module) => {

module.exports = skyrimPlatform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getVersion": () => (/* binding */ getVersion),
/* harmony export */   "SkseModEvent": () => (/* binding */ SkseModEvent),
/* harmony export */   "PapyrusBridge": () => (/* binding */ PapyrusBridge),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getConnection": () => (/* binding */ getConnection),
/* harmony export */   "getPapyrusConnection": () => (/* binding */ getPapyrusConnection)
/* harmony export */ });
/* harmony import */ var skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! skyrimPlatform */ "skyrimPlatform");
/* harmony import */ var skyrimPlatform__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


var skyrimPlatformBridgeEsp = 'SkyrimPlatformBridge.esp';
var skyrimPlatformBridgeMessagesContainerId = 0xd66;
var skyrimPlatformBridgeQuestId = 0x800;
var skseModEventNamePrefix_ModEvent = 'SkyrimPlatformBridge_Event_';
var skseModEventNamePrefix_GlobalEvent = 'SkyrimPlatformBridge_Event_';
var skseModEventNamePrefix_Response = 'SkyrimPlatformBridge_Response_';
var skyrimPlatformBridgeEventMessageDelimiter = '<||>';
var messagePrefix_Event = '::SKYRIM_PLATFORM_BRIDGE_EVENT::';
var messagePrefix_Request = '::SKYRIM_PLATFORM_BRIDGE_REQUEST::';
var messagePrefix_Response = '::SKYRIM_PLATFORM_BRIDGE_RESPONSE::';
var skyrimPlatformBridgeJsonDataPrefix = '::SKYRIM_PLATFORM_BRIDGE_JSON::';
var skyrimPlatformBridgeConnectionRequestQueryName = 'SkyrimPlatformBridge_ConnectionRequest'.toLowerCase();
var skyrimPlatformBridgeConnectionRequestResponseText = 'CONNECTED';
function getVersion() {
    return '1.1';
}
var messageTypePrefixes = new Map([
    [messagePrefix_Event, 'event'],
    [messagePrefix_Request, 'request'],
    [messagePrefix_Response, 'response']
]);
var SkseModEvent = (function () {
    function SkseModEvent() {
    }
    return SkseModEvent;
}());

var PapyrusBridge = (function () {
    function PapyrusBridge(connectionName) {
        if (connectionName === void 0) { connectionName = ''; }
        this.activeConnections = new Set();
        this.connectionName = '';
        this.messagesContainerFormId = 0;
        this.questFormId = 0;
        this.isConnected = false;
        this.isListening = false;
        this.requestCallbacks = new Array();
        this.eventCallbacks = new Array();
        this.connectionCallbacks = new Array();
        this.requestResponsePromises = new Map();
        this.connectionName = connectionName.toLowerCase();
    }
    PapyrusBridge.prototype.getConnection = function (connectionName) {
        var connection = new PapyrusBridge(connectionName.toLowerCase());
        connection.listen();
        return connection;
    };
    PapyrusBridge.prototype.getConnectionName = function () {
        var _a;
        return (_a = this.connectionName) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    };
    PapyrusBridge.prototype.onRequest = function (callback) {
        this.listen();
        this.requestCallbacks.push(callback);
    };
    PapyrusBridge.prototype.onEvent = function (callback) {
        this.listen();
        this.eventCallbacks.push(callback);
    };
    PapyrusBridge.prototype.onConnected = function (callback) {
        this.listen();
        this.connectionCallbacks.push(callback);
    };
    PapyrusBridge.prototype.listen = function () {
        var _this = this;
        if (!this.isListening) {
            this.isListening = true;
            (0,skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.on)('containerChanged', function (changeInfo) {
                var container = changeInfo.newContainer || changeInfo.oldContainer;
                if (container) {
                    _this.setMessagesContainerFormId();
                    if (_this.messagesContainerFormId && _this.messagesContainerFormId == container.getFormID()) {
                        var messageText = changeInfo.baseObj.getName();
                        if (messageText) {
                            var messageType = _this.getMessageType(messageText);
                            if (messageType) {
                                var message = _this.parse(messageType, messageText);
                                if (message) {
                                    _this._onPapyrusMessage(messageType, message);
                                }
                            }
                        }
                    }
                }
            });
        }
    };
    PapyrusBridge.prototype.send = function (eventName, data, target, source) {
        this._sendEvent({ eventName: eventName, data: data, target: target, source: source });
    };
    PapyrusBridge.prototype.request = function (query, data, target, source) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._makeRequest({
                        query: query,
                        data: data,
                        target: target,
                        source: source
                    })];
            });
        });
    };
    PapyrusBridge.prototype._sendModEvent = function (skseModEventName, parameterBuilder) {
        var _this = this;
        (0,skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.once)('update', function () {
            var quest = null;
            if (!_this.questFormId) {
                quest = skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.Game.getFormFromFile(skyrimPlatformBridgeQuestId, skyrimPlatformBridgeEsp);
                if (quest) {
                    _this.questFormId = quest.getFormID();
                }
            }
            if (!quest) {
                quest = skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.Game.getFormFromFile(skyrimPlatformBridgeQuestId, skyrimPlatformBridgeEsp);
            }
            if (quest) {
                var handle = skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.ModEvent.create(skseModEventName);
                if (handle) {
                    var modEvent = skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.ModEvent;
                    var handle_1 = modEvent.Create(skseModEventName);
                    parameterBuilder(modEvent, handle_1);
                    modEvent.send(handle_1);
                }
            }
            else {
                (0,skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.writeLogs)('papyrusBridge', "Could not send message, Quest object ".concat(skyrimPlatformBridgeQuestId.toString(16), " not found."));
            }
        });
    };
    PapyrusBridge.prototype._sendEvent = function (event) {
        var messageToSend = this._prepareMessageForSending('event', event);
        if (messageToSend) {
            this._sendModEvent(messageToSend.skseModEventName, function (modEvent, handle) {
                modEvent.pushString(handle, messageToSend.messageType);
                modEvent.pushString(handle, messageToSend.eventNameOrQuery);
                modEvent.pushString(handle, messageToSend.source);
                modEvent.pushString(handle, messageToSend.target);
                modEvent.pushString(handle, messageToSend.dataText);
                modEvent.pushString(handle, messageToSend.replyId);
            });
        }
    };
    PapyrusBridge.prototype._makeRequest = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) {
                        try {
                            var messageToSend_1 = _this._prepareMessageForSending('request', request);
                            if (messageToSend_1) {
                                if (!messageToSend_1.replyId)
                                    messageToSend_1.replyId = _this.getUniqueReplyId();
                                _this.requestResponsePromises.set(messageToSend_1.replyId, resolve);
                                _this._sendModEvent(messageToSend_1.skseModEventName, function (modEvent, handle) {
                                    modEvent.pushString(handle, messageToSend_1.messageType);
                                    modEvent.pushString(handle, messageToSend_1.eventNameOrQuery);
                                    modEvent.pushString(handle, messageToSend_1.source);
                                    modEvent.pushString(handle, messageToSend_1.target);
                                    modEvent.pushString(handle, messageToSend_1.dataText);
                                    modEvent.pushString(handle, messageToSend_1.replyId);
                                });
                            }
                            else {
                                resolve(undefined);
                            }
                        }
                        catch (_a) {
                            resolve(undefined);
                        }
                    })];
            });
        });
    };
    PapyrusBridge.prototype._sendResponse = function (response) {
        var messageToSend = this._prepareMessageForSending('response', response);
        if (messageToSend) {
            this._sendModEvent(messageToSend.skseModEventName, function (modEvent, handle) {
                modEvent.pushString(handle, messageToSend.replyId);
                modEvent.pushString(handle, messageToSend.dataText);
            });
        }
    };
    PapyrusBridge.prototype._prepareMessageForSending = function (messageType, message) {
        var _a, _b, _c, _d;
        var target = (_b = (_a = message.target) !== null && _a !== void 0 ? _a : this.connectionName) !== null && _b !== void 0 ? _b : '';
        if (!target) {
            (0,skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.once)('update', function () {
                (0,skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.writeLogs)('papyrusBridge', "[PapyrusBridge] Tried sending event to null target ".concat(JSON.stringify(message)));
            });
            return;
        }
        var source = (_d = (_c = message.source) !== null && _c !== void 0 ? _c : this.connectionName) !== null && _d !== void 0 ? _d : '';
        var data;
        switch (messageType) {
            case 'event': {
                data = message.data;
                break;
            }
            case 'request': {
                data = message.data;
                break;
            }
            case 'response': {
                data = message.data;
                break;
            }
        }
        var dataText = '';
        if (typeof data === 'string')
            dataText = data.toString();
        else if (data === undefined)
            dataText = '';
        else
            dataText = "".concat(skyrimPlatformBridgeJsonDataPrefix).concat(JSON.stringify(data));
        var eventNameOrQuery = '';
        switch (messageType) {
            case 'event': {
                eventNameOrQuery = message.eventName;
                break;
            }
            case 'request': {
                eventNameOrQuery = message.query;
                break;
            }
        }
        var skseModEventName = "".concat(skseModEventNamePrefix_ModEvent).concat(target);
        if (messageType == 'response')
            skseModEventName = "".concat(skseModEventNamePrefix_Response).concat(message.replyId);
        return { skseModEventName: skseModEventName, messageType: messageType, eventNameOrQuery: eventNameOrQuery, source: source, target: target, dataText: dataText, replyId: message.replyId };
    };
    PapyrusBridge.prototype.parse = function (messageType, message) {
        var eventParts = message.split(skyrimPlatformBridgeEventMessageDelimiter);
        if (eventParts.length < 4)
            return;
        switch (messageType) {
            case 'event': {
                return { eventName: eventParts[1].toLowerCase(), source: eventParts[2].toLowerCase(), target: eventParts[3].toLowerCase(), data: eventParts.slice(5).join('||') };
            }
            case 'request': {
                return { query: eventParts[1].toLowerCase(), source: eventParts[2].toLowerCase(), target: eventParts[3].toLowerCase(), replyId: eventParts[4].toLowerCase(), data: eventParts.slice(5).join('||') };
            }
            case 'response': {
                return { source: eventParts[2].toLowerCase(), target: eventParts[3].toLowerCase(), replyId: eventParts[4].toLowerCase(), data: eventParts.slice(5).join('||') };
            }
        }
    };
    PapyrusBridge.prototype.getMessageType = function (receivedText) {
        var messageType;
        messageTypePrefixes.forEach(function (type, prefix) {
            if (receivedText.startsWith(prefix)) {
                messageType = type;
            }
        });
        return messageType;
    };
    PapyrusBridge.prototype.getUniqueReplyId = function () {
        return "".concat(Math.random(), "_").concat(Math.random());
    };
    PapyrusBridge.prototype._onPapyrusMessage = function (messageType, message) {
        switch (messageType) {
            case 'event': {
                this._onEvent(message);
                break;
            }
            case 'request': {
                this._onRequest(message);
                break;
            }
            case 'response': {
                this._onResponse(message);
                break;
            }
        }
    };
    PapyrusBridge.prototype._onEvent = function (event) {
        this.eventCallbacks.forEach(function (callback) { return callback(event); });
    };
    PapyrusBridge.prototype._onRequest = function (request) {
        var _this = this;
        if (request.query == skyrimPlatformBridgeConnectionRequestQueryName) {
            this._onConnectedRequest(request);
        }
        else {
            this.requestCallbacks.forEach(function (callback) {
                callback(request, function (data) {
                    _this._sendResponse({
                        replyId: request.replyId,
                        data: data
                    });
                });
            });
        }
    };
    PapyrusBridge.prototype._onConnectedRequest = function (request) {
        if ((!this.connectionName) || this.connectionName == request.source) {
            this._sendResponse({ data: skyrimPlatformBridgeConnectionRequestResponseText, replyId: request.replyId });
            if (this.connectionName && !this.isConnected) {
                this.isConnected = true;
            }
            if (!this.activeConnections.has(request.source)) {
                this.activeConnections.add(request.source);
                this.connectionCallbacks.forEach(function (callback) { return callback(request.source); });
            }
        }
    };
    PapyrusBridge.prototype._onResponse = function (response) {
        if (response.replyId) {
            if (this.requestResponsePromises.has(response.replyId)) {
                this.requestResponsePromises.get(response.replyId)(response);
                this.requestResponsePromises.delete(response.replyId);
            }
        }
    };
    PapyrusBridge.prototype.setMessagesContainerFormId = function () {
        if (!this.messagesContainerFormId) {
            var messagesContainer = skyrimPlatform__WEBPACK_IMPORTED_MODULE_0__.Game.getFormFromFile(skyrimPlatformBridgeMessagesContainerId, skyrimPlatformBridgeEsp);
            if (messagesContainer) {
                this.messagesContainerFormId = messagesContainer.getFormID();
            }
        }
    };
    return PapyrusBridge;
}());

var defaultInstance = new PapyrusBridge();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (defaultInstance);
function getConnection(connectionName) {
    return defaultInstance.getConnection(connectionName);
}
function getPapyrusConnection(connectionName) {
    return defaultInstance.getConnection(connectionName);
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsbUZBQW1GO0FBQ3BIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1RUFBdUUsa0NBQWtDO0FBQ3pHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLGdFQUFvQjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ3dCO0FBQ3pCO0FBQ0EsaUVBQWUsZUFBZSxFQUFDO0FBQ3hCO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3NreXJpbVBsYXRmb3JtUGFweXJ1c0JyaWRnZS9leHRlcm5hbCB2YXIgXCJza3lyaW1QbGF0Zm9ybVwiIiwid2VicGFjazovL3NreXJpbVBsYXRmb3JtUGFweXJ1c0JyaWRnZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9za3lyaW1QbGF0Zm9ybVBhcHlydXNCcmlkZ2Uvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vc2t5cmltUGxhdGZvcm1QYXB5cnVzQnJpZGdlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9za3lyaW1QbGF0Zm9ybVBhcHlydXNCcmlkZ2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9za3lyaW1QbGF0Zm9ybVBhcHlydXNCcmlkZ2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9za3lyaW1QbGF0Zm9ybVBhcHlydXNCcmlkZ2UvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBza3lyaW1QbGF0Zm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn07XHJcbmltcG9ydCB7IG9uLCBvbmNlLCBHYW1lLCB3cml0ZUxvZ3MgfSBmcm9tICdza3lyaW1QbGF0Zm9ybSc7XHJcbmltcG9ydCAqIGFzIHNwIGZyb20gJ3NreXJpbVBsYXRmb3JtJztcclxudmFyIHNreXJpbVBsYXRmb3JtQnJpZGdlRXNwID0gJ1NreXJpbVBsYXRmb3JtQnJpZGdlLmVzcCc7XHJcbnZhciBza3lyaW1QbGF0Zm9ybUJyaWRnZU1lc3NhZ2VzQ29udGFpbmVySWQgPSAweGQ2NjtcclxudmFyIHNreXJpbVBsYXRmb3JtQnJpZGdlUXVlc3RJZCA9IDB4ODAwO1xyXG52YXIgc2tzZU1vZEV2ZW50TmFtZVByZWZpeF9Nb2RFdmVudCA9ICdTa3lyaW1QbGF0Zm9ybUJyaWRnZV9FdmVudF8nO1xyXG52YXIgc2tzZU1vZEV2ZW50TmFtZVByZWZpeF9HbG9iYWxFdmVudCA9ICdTa3lyaW1QbGF0Zm9ybUJyaWRnZV9FdmVudF8nO1xyXG52YXIgc2tzZU1vZEV2ZW50TmFtZVByZWZpeF9SZXNwb25zZSA9ICdTa3lyaW1QbGF0Zm9ybUJyaWRnZV9SZXNwb25zZV8nO1xyXG52YXIgc2t5cmltUGxhdGZvcm1CcmlkZ2VFdmVudE1lc3NhZ2VEZWxpbWl0ZXIgPSAnPHx8Pic7XHJcbnZhciBtZXNzYWdlUHJlZml4X0V2ZW50ID0gJzo6U0tZUklNX1BMQVRGT1JNX0JSSURHRV9FVkVOVDo6JztcclxudmFyIG1lc3NhZ2VQcmVmaXhfUmVxdWVzdCA9ICc6OlNLWVJJTV9QTEFURk9STV9CUklER0VfUkVRVUVTVDo6JztcclxudmFyIG1lc3NhZ2VQcmVmaXhfUmVzcG9uc2UgPSAnOjpTS1lSSU1fUExBVEZPUk1fQlJJREdFX1JFU1BPTlNFOjonO1xyXG52YXIgc2t5cmltUGxhdGZvcm1CcmlkZ2VKc29uRGF0YVByZWZpeCA9ICc6OlNLWVJJTV9QTEFURk9STV9CUklER0VfSlNPTjo6JztcclxudmFyIHNreXJpbVBsYXRmb3JtQnJpZGdlQ29ubmVjdGlvblJlcXVlc3RRdWVyeU5hbWUgPSAnU2t5cmltUGxhdGZvcm1CcmlkZ2VfQ29ubmVjdGlvblJlcXVlc3QnLnRvTG93ZXJDYXNlKCk7XHJcbnZhciBza3lyaW1QbGF0Zm9ybUJyaWRnZUNvbm5lY3Rpb25SZXF1ZXN0UmVzcG9uc2VUZXh0ID0gJ0NPTk5FQ1RFRCc7XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRWZXJzaW9uKCkge1xyXG4gICAgcmV0dXJuICcxLjEnO1xyXG59XHJcbnZhciBtZXNzYWdlVHlwZVByZWZpeGVzID0gbmV3IE1hcChbXHJcbiAgICBbbWVzc2FnZVByZWZpeF9FdmVudCwgJ2V2ZW50J10sXHJcbiAgICBbbWVzc2FnZVByZWZpeF9SZXF1ZXN0LCAncmVxdWVzdCddLFxyXG4gICAgW21lc3NhZ2VQcmVmaXhfUmVzcG9uc2UsICdyZXNwb25zZSddXHJcbl0pO1xyXG52YXIgU2tzZU1vZEV2ZW50ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFNrc2VNb2RFdmVudCgpIHtcclxuICAgIH1cclxuICAgIHJldHVybiBTa3NlTW9kRXZlbnQ7XHJcbn0oKSk7XHJcbmV4cG9ydCB7IFNrc2VNb2RFdmVudCB9O1xyXG52YXIgUGFweXJ1c0JyaWRnZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBQYXB5cnVzQnJpZGdlKGNvbm5lY3Rpb25OYW1lKSB7XHJcbiAgICAgICAgaWYgKGNvbm5lY3Rpb25OYW1lID09PSB2b2lkIDApIHsgY29ubmVjdGlvbk5hbWUgPSAnJzsgfVxyXG4gICAgICAgIHRoaXMuYWN0aXZlQ29ubmVjdGlvbnMgPSBuZXcgU2V0KCk7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uTmFtZSA9ICcnO1xyXG4gICAgICAgIHRoaXMubWVzc2FnZXNDb250YWluZXJGb3JtSWQgPSAwO1xyXG4gICAgICAgIHRoaXMucXVlc3RGb3JtSWQgPSAwO1xyXG4gICAgICAgIHRoaXMuaXNDb25uZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzTGlzdGVuaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yZXF1ZXN0Q2FsbGJhY2tzID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgdGhpcy5ldmVudENhbGxiYWNrcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIHRoaXMuY29ubmVjdGlvbkNhbGxiYWNrcyA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIHRoaXMucmVxdWVzdFJlc3BvbnNlUHJvbWlzZXMgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uTmFtZSA9IGNvbm5lY3Rpb25OYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICB9XHJcbiAgICBQYXB5cnVzQnJpZGdlLnByb3RvdHlwZS5nZXRDb25uZWN0aW9uID0gZnVuY3Rpb24gKGNvbm5lY3Rpb25OYW1lKSB7XHJcbiAgICAgICAgdmFyIGNvbm5lY3Rpb24gPSBuZXcgUGFweXJ1c0JyaWRnZShjb25uZWN0aW9uTmFtZS50b0xvd2VyQ2FzZSgpKTtcclxuICAgICAgICBjb25uZWN0aW9uLmxpc3RlbigpO1xyXG4gICAgICAgIHJldHVybiBjb25uZWN0aW9uO1xyXG4gICAgfTtcclxuICAgIFBhcHlydXNCcmlkZ2UucHJvdG90eXBlLmdldENvbm5lY3Rpb25OYW1lID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgICAgICByZXR1cm4gKF9hID0gdGhpcy5jb25uZWN0aW9uTmFtZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnRvTG93ZXJDYXNlKCk7XHJcbiAgICB9O1xyXG4gICAgUGFweXJ1c0JyaWRnZS5wcm90b3R5cGUub25SZXF1ZXN0ID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW4oKTtcclxuICAgICAgICB0aGlzLnJlcXVlc3RDYWxsYmFja3MucHVzaChjYWxsYmFjayk7XHJcbiAgICB9O1xyXG4gICAgUGFweXJ1c0JyaWRnZS5wcm90b3R5cGUub25FdmVudCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMubGlzdGVuKCk7XHJcbiAgICAgICAgdGhpcy5ldmVudENhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcclxuICAgIH07XHJcbiAgICBQYXB5cnVzQnJpZGdlLnByb3RvdHlwZS5vbkNvbm5lY3RlZCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMubGlzdGVuKCk7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uQ2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xyXG4gICAgfTtcclxuICAgIFBhcHlydXNCcmlkZ2UucHJvdG90eXBlLmxpc3RlbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmICghdGhpcy5pc0xpc3RlbmluZykge1xyXG4gICAgICAgICAgICB0aGlzLmlzTGlzdGVuaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgb24oJ2NvbnRhaW5lckNoYW5nZWQnLCBmdW5jdGlvbiAoY2hhbmdlSW5mbykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IGNoYW5nZUluZm8ubmV3Q29udGFpbmVyIHx8IGNoYW5nZUluZm8ub2xkQ29udGFpbmVyO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNldE1lc3NhZ2VzQ29udGFpbmVyRm9ybUlkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLm1lc3NhZ2VzQ29udGFpbmVyRm9ybUlkICYmIF90aGlzLm1lc3NhZ2VzQ29udGFpbmVyRm9ybUlkID09IGNvbnRhaW5lci5nZXRGb3JtSUQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZVRleHQgPSBjaGFuZ2VJbmZvLmJhc2VPYmouZ2V0TmFtZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWVzc2FnZVRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlVHlwZSA9IF90aGlzLmdldE1lc3NhZ2VUeXBlKG1lc3NhZ2VUZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gX3RoaXMucGFyc2UobWVzc2FnZVR5cGUsIG1lc3NhZ2VUZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fb25QYXB5cnVzTWVzc2FnZShtZXNzYWdlVHlwZSwgbWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgUGFweXJ1c0JyaWRnZS5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGRhdGEsIHRhcmdldCwgc291cmNlKSB7XHJcbiAgICAgICAgdGhpcy5fc2VuZEV2ZW50KHsgZXZlbnROYW1lOiBldmVudE5hbWUsIGRhdGE6IGRhdGEsIHRhcmdldDogdGFyZ2V0LCBzb3VyY2U6IHNvdXJjZSB9KTtcclxuICAgIH07XHJcbiAgICBQYXB5cnVzQnJpZGdlLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gKHF1ZXJ5LCBkYXRhLCB0YXJnZXQsIHNvdXJjZSkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyLCB0aGlzLl9tYWtlUmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZTogc291cmNlXHJcbiAgICAgICAgICAgICAgICAgICAgfSldO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBQYXB5cnVzQnJpZGdlLnByb3RvdHlwZS5fc2VuZE1vZEV2ZW50ID0gZnVuY3Rpb24gKHNrc2VNb2RFdmVudE5hbWUsIHBhcmFtZXRlckJ1aWxkZXIpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIG9uY2UoJ3VwZGF0ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHF1ZXN0ID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKCFfdGhpcy5xdWVzdEZvcm1JZCkge1xyXG4gICAgICAgICAgICAgICAgcXVlc3QgPSBHYW1lLmdldEZvcm1Gcm9tRmlsZShza3lyaW1QbGF0Zm9ybUJyaWRnZVF1ZXN0SWQsIHNreXJpbVBsYXRmb3JtQnJpZGdlRXNwKTtcclxuICAgICAgICAgICAgICAgIGlmIChxdWVzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnF1ZXN0Rm9ybUlkID0gcXVlc3QuZ2V0Rm9ybUlEKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFxdWVzdCkge1xyXG4gICAgICAgICAgICAgICAgcXVlc3QgPSBHYW1lLmdldEZvcm1Gcm9tRmlsZShza3lyaW1QbGF0Zm9ybUJyaWRnZVF1ZXN0SWQsIHNreXJpbVBsYXRmb3JtQnJpZGdlRXNwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocXVlc3QpIHtcclxuICAgICAgICAgICAgICAgIHZhciBoYW5kbGUgPSBzcC5Nb2RFdmVudC5jcmVhdGUoc2tzZU1vZEV2ZW50TmFtZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGFuZGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1vZEV2ZW50ID0gc3AuTW9kRXZlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhhbmRsZV8xID0gbW9kRXZlbnQuQ3JlYXRlKHNrc2VNb2RFdmVudE5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlckJ1aWxkZXIobW9kRXZlbnQsIGhhbmRsZV8xKTtcclxuICAgICAgICAgICAgICAgICAgICBtb2RFdmVudC5zZW5kKGhhbmRsZV8xKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdyaXRlTG9ncygncGFweXJ1c0JyaWRnZScsIFwiQ291bGQgbm90IHNlbmQgbWVzc2FnZSwgUXVlc3Qgb2JqZWN0IFwiLmNvbmNhdChza3lyaW1QbGF0Zm9ybUJyaWRnZVF1ZXN0SWQudG9TdHJpbmcoMTYpLCBcIiBub3QgZm91bmQuXCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFBhcHlydXNCcmlkZ2UucHJvdG90eXBlLl9zZW5kRXZlbnQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICB2YXIgbWVzc2FnZVRvU2VuZCA9IHRoaXMuX3ByZXBhcmVNZXNzYWdlRm9yU2VuZGluZygnZXZlbnQnLCBldmVudCk7XHJcbiAgICAgICAgaWYgKG1lc3NhZ2VUb1NlbmQpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2VuZE1vZEV2ZW50KG1lc3NhZ2VUb1NlbmQuc2tzZU1vZEV2ZW50TmFtZSwgZnVuY3Rpb24gKG1vZEV2ZW50LCBoYW5kbGUpIHtcclxuICAgICAgICAgICAgICAgIG1vZEV2ZW50LnB1c2hTdHJpbmcoaGFuZGxlLCBtZXNzYWdlVG9TZW5kLm1lc3NhZ2VUeXBlKTtcclxuICAgICAgICAgICAgICAgIG1vZEV2ZW50LnB1c2hTdHJpbmcoaGFuZGxlLCBtZXNzYWdlVG9TZW5kLmV2ZW50TmFtZU9yUXVlcnkpO1xyXG4gICAgICAgICAgICAgICAgbW9kRXZlbnQucHVzaFN0cmluZyhoYW5kbGUsIG1lc3NhZ2VUb1NlbmQuc291cmNlKTtcclxuICAgICAgICAgICAgICAgIG1vZEV2ZW50LnB1c2hTdHJpbmcoaGFuZGxlLCBtZXNzYWdlVG9TZW5kLnRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICBtb2RFdmVudC5wdXNoU3RyaW5nKGhhbmRsZSwgbWVzc2FnZVRvU2VuZC5kYXRhVGV4dCk7XHJcbiAgICAgICAgICAgICAgICBtb2RFdmVudC5wdXNoU3RyaW5nKGhhbmRsZSwgbWVzc2FnZVRvU2VuZC5yZXBseUlkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFBhcHlydXNCcmlkZ2UucHJvdG90eXBlLl9tYWtlUmVxdWVzdCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIsIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZVRvU2VuZF8xID0gX3RoaXMuX3ByZXBhcmVNZXNzYWdlRm9yU2VuZGluZygncmVxdWVzdCcsIHJlcXVlc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2VUb1NlbmRfMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbWVzc2FnZVRvU2VuZF8xLnJlcGx5SWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VUb1NlbmRfMS5yZXBseUlkID0gX3RoaXMuZ2V0VW5pcXVlUmVwbHlJZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnJlcXVlc3RSZXNwb25zZVByb21pc2VzLnNldChtZXNzYWdlVG9TZW5kXzEucmVwbHlJZCwgcmVzb2x2ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX3NlbmRNb2RFdmVudChtZXNzYWdlVG9TZW5kXzEuc2tzZU1vZEV2ZW50TmFtZSwgZnVuY3Rpb24gKG1vZEV2ZW50LCBoYW5kbGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kRXZlbnQucHVzaFN0cmluZyhoYW5kbGUsIG1lc3NhZ2VUb1NlbmRfMS5tZXNzYWdlVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZEV2ZW50LnB1c2hTdHJpbmcoaGFuZGxlLCBtZXNzYWdlVG9TZW5kXzEuZXZlbnROYW1lT3JRdWVyeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZEV2ZW50LnB1c2hTdHJpbmcoaGFuZGxlLCBtZXNzYWdlVG9TZW5kXzEuc291cmNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kRXZlbnQucHVzaFN0cmluZyhoYW5kbGUsIG1lc3NhZ2VUb1NlbmRfMS50YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RFdmVudC5wdXNoU3RyaW5nKGhhbmRsZSwgbWVzc2FnZVRvU2VuZF8xLmRhdGFUZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kRXZlbnQucHVzaFN0cmluZyhoYW5kbGUsIG1lc3NhZ2VUb1NlbmRfMS5yZXBseUlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoX2EpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodW5kZWZpbmVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgUGFweXJ1c0JyaWRnZS5wcm90b3R5cGUuX3NlbmRSZXNwb25zZSA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgIHZhciBtZXNzYWdlVG9TZW5kID0gdGhpcy5fcHJlcGFyZU1lc3NhZ2VGb3JTZW5kaW5nKCdyZXNwb25zZScsIHJlc3BvbnNlKTtcclxuICAgICAgICBpZiAobWVzc2FnZVRvU2VuZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zZW5kTW9kRXZlbnQobWVzc2FnZVRvU2VuZC5za3NlTW9kRXZlbnROYW1lLCBmdW5jdGlvbiAobW9kRXZlbnQsIGhhbmRsZSkge1xyXG4gICAgICAgICAgICAgICAgbW9kRXZlbnQucHVzaFN0cmluZyhoYW5kbGUsIG1lc3NhZ2VUb1NlbmQucmVwbHlJZCk7XHJcbiAgICAgICAgICAgICAgICBtb2RFdmVudC5wdXNoU3RyaW5nKGhhbmRsZSwgbWVzc2FnZVRvU2VuZC5kYXRhVGV4dCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBQYXB5cnVzQnJpZGdlLnByb3RvdHlwZS5fcHJlcGFyZU1lc3NhZ2VGb3JTZW5kaW5nID0gZnVuY3Rpb24gKG1lc3NhZ2VUeXBlLCBtZXNzYWdlKSB7XHJcbiAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xyXG4gICAgICAgIHZhciB0YXJnZXQgPSAoX2IgPSAoX2EgPSBtZXNzYWdlLnRhcmdldCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdGhpcy5jb25uZWN0aW9uTmFtZSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogJyc7XHJcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcclxuICAgICAgICAgICAgb25jZSgndXBkYXRlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgd3JpdGVMb2dzKCdwYXB5cnVzQnJpZGdlJywgXCJbUGFweXJ1c0JyaWRnZV0gVHJpZWQgc2VuZGluZyBldmVudCB0byBudWxsIHRhcmdldCBcIi5jb25jYXQoSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHNvdXJjZSA9IChfZCA9IChfYyA9IG1lc3NhZ2Uuc291cmNlKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiB0aGlzLmNvbm5lY3Rpb25OYW1lKSAhPT0gbnVsbCAmJiBfZCAhPT0gdm9pZCAwID8gX2QgOiAnJztcclxuICAgICAgICB2YXIgZGF0YTtcclxuICAgICAgICBzd2l0Y2ggKG1lc3NhZ2VUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2V2ZW50Jzoge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IG1lc3NhZ2UuZGF0YTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgJ3JlcXVlc3QnOiB7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gbWVzc2FnZS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAncmVzcG9uc2UnOiB7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gbWVzc2FnZS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGRhdGFUZXh0ID0gJyc7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJylcclxuICAgICAgICAgICAgZGF0YVRleHQgPSBkYXRhLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgZWxzZSBpZiAoZGF0YSA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBkYXRhVGV4dCA9ICcnO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgZGF0YVRleHQgPSBcIlwiLmNvbmNhdChza3lyaW1QbGF0Zm9ybUJyaWRnZUpzb25EYXRhUHJlZml4KS5jb25jYXQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgICAgIHZhciBldmVudE5hbWVPclF1ZXJ5ID0gJyc7XHJcbiAgICAgICAgc3dpdGNoIChtZXNzYWdlVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdldmVudCc6IHtcclxuICAgICAgICAgICAgICAgIGV2ZW50TmFtZU9yUXVlcnkgPSBtZXNzYWdlLmV2ZW50TmFtZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgJ3JlcXVlc3QnOiB7XHJcbiAgICAgICAgICAgICAgICBldmVudE5hbWVPclF1ZXJ5ID0gbWVzc2FnZS5xdWVyeTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBza3NlTW9kRXZlbnROYW1lID0gXCJcIi5jb25jYXQoc2tzZU1vZEV2ZW50TmFtZVByZWZpeF9Nb2RFdmVudCkuY29uY2F0KHRhcmdldCk7XHJcbiAgICAgICAgaWYgKG1lc3NhZ2VUeXBlID09ICdyZXNwb25zZScpXHJcbiAgICAgICAgICAgIHNrc2VNb2RFdmVudE5hbWUgPSBcIlwiLmNvbmNhdChza3NlTW9kRXZlbnROYW1lUHJlZml4X1Jlc3BvbnNlKS5jb25jYXQobWVzc2FnZS5yZXBseUlkKTtcclxuICAgICAgICByZXR1cm4geyBza3NlTW9kRXZlbnROYW1lOiBza3NlTW9kRXZlbnROYW1lLCBtZXNzYWdlVHlwZTogbWVzc2FnZVR5cGUsIGV2ZW50TmFtZU9yUXVlcnk6IGV2ZW50TmFtZU9yUXVlcnksIHNvdXJjZTogc291cmNlLCB0YXJnZXQ6IHRhcmdldCwgZGF0YVRleHQ6IGRhdGFUZXh0LCByZXBseUlkOiBtZXNzYWdlLnJlcGx5SWQgfTtcclxuICAgIH07XHJcbiAgICBQYXB5cnVzQnJpZGdlLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uIChtZXNzYWdlVHlwZSwgbWVzc2FnZSkge1xyXG4gICAgICAgIHZhciBldmVudFBhcnRzID0gbWVzc2FnZS5zcGxpdChza3lyaW1QbGF0Zm9ybUJyaWRnZUV2ZW50TWVzc2FnZURlbGltaXRlcik7XHJcbiAgICAgICAgaWYgKGV2ZW50UGFydHMubGVuZ3RoIDwgNClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHN3aXRjaCAobWVzc2FnZVR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnZXZlbnQnOiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4geyBldmVudE5hbWU6IGV2ZW50UGFydHNbMV0udG9Mb3dlckNhc2UoKSwgc291cmNlOiBldmVudFBhcnRzWzJdLnRvTG93ZXJDYXNlKCksIHRhcmdldDogZXZlbnRQYXJ0c1szXS50b0xvd2VyQ2FzZSgpLCBkYXRhOiBldmVudFBhcnRzLnNsaWNlKDUpLmpvaW4oJ3x8JykgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlICdyZXF1ZXN0Jzoge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgcXVlcnk6IGV2ZW50UGFydHNbMV0udG9Mb3dlckNhc2UoKSwgc291cmNlOiBldmVudFBhcnRzWzJdLnRvTG93ZXJDYXNlKCksIHRhcmdldDogZXZlbnRQYXJ0c1szXS50b0xvd2VyQ2FzZSgpLCByZXBseUlkOiBldmVudFBhcnRzWzRdLnRvTG93ZXJDYXNlKCksIGRhdGE6IGV2ZW50UGFydHMuc2xpY2UoNSkuam9pbignfHwnKSB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgJ3Jlc3BvbnNlJzoge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgc291cmNlOiBldmVudFBhcnRzWzJdLnRvTG93ZXJDYXNlKCksIHRhcmdldDogZXZlbnRQYXJ0c1szXS50b0xvd2VyQ2FzZSgpLCByZXBseUlkOiBldmVudFBhcnRzWzRdLnRvTG93ZXJDYXNlKCksIGRhdGE6IGV2ZW50UGFydHMuc2xpY2UoNSkuam9pbignfHwnKSB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFBhcHlydXNCcmlkZ2UucHJvdG90eXBlLmdldE1lc3NhZ2VUeXBlID0gZnVuY3Rpb24gKHJlY2VpdmVkVGV4dCkge1xyXG4gICAgICAgIHZhciBtZXNzYWdlVHlwZTtcclxuICAgICAgICBtZXNzYWdlVHlwZVByZWZpeGVzLmZvckVhY2goZnVuY3Rpb24gKHR5cGUsIHByZWZpeCkge1xyXG4gICAgICAgICAgICBpZiAocmVjZWl2ZWRUZXh0LnN0YXJ0c1dpdGgocHJlZml4KSkge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZVR5cGUgPSB0eXBlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2VUeXBlO1xyXG4gICAgfTtcclxuICAgIFBhcHlydXNCcmlkZ2UucHJvdG90eXBlLmdldFVuaXF1ZVJlcGx5SWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCIuY29uY2F0KE1hdGgucmFuZG9tKCksIFwiX1wiKS5jb25jYXQoTWF0aC5yYW5kb20oKSk7XHJcbiAgICB9O1xyXG4gICAgUGFweXJ1c0JyaWRnZS5wcm90b3R5cGUuX29uUGFweXJ1c01lc3NhZ2UgPSBmdW5jdGlvbiAobWVzc2FnZVR5cGUsIG1lc3NhZ2UpIHtcclxuICAgICAgICBzd2l0Y2ggKG1lc3NhZ2VUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2V2ZW50Jzoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb25FdmVudChtZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgJ3JlcXVlc3QnOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vblJlcXVlc3QobWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlICdyZXNwb25zZSc6IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX29uUmVzcG9uc2UobWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBQYXB5cnVzQnJpZGdlLnByb3RvdHlwZS5fb25FdmVudCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHRoaXMuZXZlbnRDYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbiAoY2FsbGJhY2spIHsgcmV0dXJuIGNhbGxiYWNrKGV2ZW50KTsgfSk7XHJcbiAgICB9O1xyXG4gICAgUGFweXJ1c0JyaWRnZS5wcm90b3R5cGUuX29uUmVxdWVzdCA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAocmVxdWVzdC5xdWVyeSA9PSBza3lyaW1QbGF0Zm9ybUJyaWRnZUNvbm5lY3Rpb25SZXF1ZXN0UXVlcnlOYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29uQ29ubmVjdGVkUmVxdWVzdChyZXF1ZXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdENhbGxiYWNrcy5mb3JFYWNoKGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2socmVxdWVzdCwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fc2VuZFJlc3BvbnNlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbHlJZDogcmVxdWVzdC5yZXBseUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFBhcHlydXNCcmlkZ2UucHJvdG90eXBlLl9vbkNvbm5lY3RlZFJlcXVlc3QgPSBmdW5jdGlvbiAocmVxdWVzdCkge1xyXG4gICAgICAgIGlmICgoIXRoaXMuY29ubmVjdGlvbk5hbWUpIHx8IHRoaXMuY29ubmVjdGlvbk5hbWUgPT0gcmVxdWVzdC5zb3VyY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2VuZFJlc3BvbnNlKHsgZGF0YTogc2t5cmltUGxhdGZvcm1CcmlkZ2VDb25uZWN0aW9uUmVxdWVzdFJlc3BvbnNlVGV4dCwgcmVwbHlJZDogcmVxdWVzdC5yZXBseUlkIH0pO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb25uZWN0aW9uTmFtZSAmJiAhdGhpcy5pc0Nvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0Nvbm5lY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0aGlzLmFjdGl2ZUNvbm5lY3Rpb25zLmhhcyhyZXF1ZXN0LnNvdXJjZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlQ29ubmVjdGlvbnMuYWRkKHJlcXVlc3Quc291cmNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbkNhbGxiYWNrcy5mb3JFYWNoKGZ1bmN0aW9uIChjYWxsYmFjaykgeyByZXR1cm4gY2FsbGJhY2socmVxdWVzdC5zb3VyY2UpOyB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBQYXB5cnVzQnJpZGdlLnByb3RvdHlwZS5fb25SZXNwb25zZSA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5yZXBseUlkKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJlcXVlc3RSZXNwb25zZVByb21pc2VzLmhhcyhyZXNwb25zZS5yZXBseUlkKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0UmVzcG9uc2VQcm9taXNlcy5nZXQocmVzcG9uc2UucmVwbHlJZCkocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0UmVzcG9uc2VQcm9taXNlcy5kZWxldGUocmVzcG9uc2UucmVwbHlJZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgUGFweXJ1c0JyaWRnZS5wcm90b3R5cGUuc2V0TWVzc2FnZXNDb250YWluZXJGb3JtSWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm1lc3NhZ2VzQ29udGFpbmVyRm9ybUlkKSB7XHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlc0NvbnRhaW5lciA9IEdhbWUuZ2V0Rm9ybUZyb21GaWxlKHNreXJpbVBsYXRmb3JtQnJpZGdlTWVzc2FnZXNDb250YWluZXJJZCwgc2t5cmltUGxhdGZvcm1CcmlkZ2VFc3ApO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZXNDb250YWluZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZXNDb250YWluZXJGb3JtSWQgPSBtZXNzYWdlc0NvbnRhaW5lci5nZXRGb3JtSUQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gUGFweXJ1c0JyaWRnZTtcclxufSgpKTtcclxuZXhwb3J0IHsgUGFweXJ1c0JyaWRnZSB9O1xyXG52YXIgZGVmYXVsdEluc3RhbmNlID0gbmV3IFBhcHlydXNCcmlkZ2UoKTtcclxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdEluc3RhbmNlO1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29ubmVjdGlvbihjb25uZWN0aW9uTmFtZSkge1xyXG4gICAgcmV0dXJuIGRlZmF1bHRJbnN0YW5jZS5nZXRDb25uZWN0aW9uKGNvbm5lY3Rpb25OYW1lKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGFweXJ1c0Nvbm5lY3Rpb24oY29ubmVjdGlvbk5hbWUpIHtcclxuICAgIHJldHVybiBkZWZhdWx0SW5zdGFuY2UuZ2V0Q29ubmVjdGlvbihjb25uZWN0aW9uTmFtZSk7XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9