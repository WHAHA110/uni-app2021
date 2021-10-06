(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"uni-app-test","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 111:
/*!*****************************************************************************************************!*\
  !*** D:/uni-app-test/uni_modules/uni-data-picker/components/uni-data-pickerview/uni-data-picker.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uniCloud) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default2 = {
  props: {
    localdata: {
      type: [Array, Object],
      default: function _default() {
        return [];
      } },

    collection: {
      type: String,
      default: '' },

    action: {
      type: String,
      default: '' },

    field: {
      type: String,
      default: '' },

    orderby: {
      type: String,
      default: '' },

    where: {
      type: [String, Object],
      default: '' },

    pageData: {
      type: String,
      default: 'add' },

    pageCurrent: {
      type: Number,
      default: 1 },

    pageSize: {
      type: Number,
      default: 20 },

    getcount: {
      type: [Boolean, String],
      default: false },

    getone: {
      type: [Boolean, String],
      default: false },

    gettree: {
      type: [Boolean, String],
      default: false },

    manual: {
      type: Boolean,
      default: false },

    value: {
      type: [Array, String, Number],
      default: function _default() {
        return [];
      } },

    modelValue: {
      type: [Array, String, Number],
      default: function _default() {
        return [];
      } },

    preload: {
      type: Boolean,
      default: false },

    stepSearh: {
      type: Boolean,
      default: true },

    selfField: {
      type: String,
      default: '' },

    parentField: {
      type: String,
      default: '' },

    multiple: {
      type: Boolean,
      default: false },

    map: {
      type: Object,
      default: function _default() {
        return {
          text: "text",
          value: "value" };

      } } },


  data: function data() {
    return {
      loading: false,
      errorMessage: '',
      loadMore: {
        contentdown: '',
        contentrefresh: '',
        contentnomore: '' },

      dataList: [],
      selected: [],
      selectedIndex: 0,
      page: {
        current: this.pageCurrent,
        size: this.pageSize,
        count: 0 } };


  },
  computed: {
    isLocaldata: function isLocaldata() {
      return !this.collection.length;
    },
    postField: function postField() {
      var fields = [this.field];
      if (this.parentField) {
        fields.push("".concat(this.parentField, " as parent_value"));
      }
      return fields.join(',');
    },
    dataValue: function dataValue() {
      var isarr = Array.isArray(this.value) && this.value.length === 0;
      var isstr = typeof this.value === 'string' && !this.value;
      var isnum = typeof this.value === 'number' && !this.value;

      if (isarr || isstr || isnum) {
        return this.modelValue;
      }

      return this.value;
    } },

  created: function created() {var _this = this;
    this.$watch(function () {
      var al = [];
      ['pageCurrent',
      'pageSize',
      'value',
      'modelValue',
      'localdata',
      'collection',
      'action',
      'field',
      'orderby',
      'where',
      'getont',
      'getcount',
      'gettree'].
      forEach(function (key) {
        al.push(_this[key]);
      });
      return al;
    }, function (newValue, oldValue) {
      var needReset = false;
      for (var i = 2; i < newValue.length; i++) {
        if (newValue[i] != oldValue[i]) {
          needReset = true;
          break;
        }
      }
      if (newValue[0] != oldValue[0]) {
        _this.page.current = _this.pageCurrent;
      }
      _this.page.size = _this.pageSize;

      _this.onPropsChange();
    });
    this._treeData = [];
  },
  methods: {
    onPropsChange: function onPropsChange() {
      this._treeData = [];
    },
    getCommand: function getCommand() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      /* eslint-disable no-undef */
      var db = uniCloud.database();

      var action = options.action || this.action;
      if (action) {
        db = db.action(action);
      }

      var collection = options.collection || this.collection;
      db = db.collection(collection);

      var where = options.where || this.where;
      if (!(!where || !Object.keys(where).length)) {
        db = db.where(where);
      }

      var field = options.field || this.field;
      if (field) {
        db = db.field(field);
      }

      var orderby = options.orderby || this.orderby;
      if (orderby) {
        db = db.orderBy(orderby);
      }

      var current = options.pageCurrent !== undefined ? options.pageCurrent : this.page.current;
      var size = options.pageSize !== undefined ? options.pageSize : this.page.size;
      var getCount = options.getcount !== undefined ? options.getcount : this.getcount;
      var getTree = options.gettree !== undefined ? options.gettree : this.gettree;

      var getOptions = {
        getCount: getCount,
        getTree: getTree };

      if (options.getTreePath) {
        getOptions.getTreePath = options.getTreePath;
      }

      db = db.skip(size * (current - 1)).limit(size).get(getOptions);

      return db;
    },
    getNodeData: function getNodeData(callback) {var _this2 = this;
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.getCommand({
        field: this.postField,
        where: this._pathWhere() }).
      then(function (res) {
        _this2.loading = false;
        _this2.selected = res.result.data;
        callback && callback();
      }).catch(function (err) {
        _this2.loading = false;
        _this2.errorMessage = err;
      });
    },
    getTreePath: function getTreePath(callback) {var _this3 = this;
      if (this.loading) {
        return;
      }
      this.loading = true;

      this.getCommand({
        field: this.postField,
        getTreePath: {
          startWith: "".concat(this.selfField, "=='").concat(this.dataValue, "'") } }).

      then(function (res) {
        _this3.loading = false;
        var treePath = [];
        _this3._extractTreePath(res.result.data, treePath);
        _this3.selected = treePath;
        callback && callback();
      }).catch(function (err) {
        _this3.loading = false;
        _this3.errorMessage = err;
      });
    },
    loadData: function loadData() {var _this4 = this;
      if (this.isLocaldata) {
        this._processLocalData();
        return;
      }

      if (this.dataValue.length) {
        this._loadNodeData(function (data) {
          _this4._treeData = data;
          _this4._updateBindData();
          _this4._updateSelected();
        });
        return;
      }

      if (this.stepSearh) {
        this._loadNodeData(function (data) {
          _this4._treeData = data;
          _this4._updateBindData();
        });
      } else {
        this._loadAllData(function (data) {
          _this4._treeData = [];
          _this4._extractTree(data, _this4._treeData, null);
          _this4._updateBindData();
        });
      }
    },
    _loadAllData: function _loadAllData(callback) {var _this5 = this;
      if (this.loading) {
        return;
      }
      this.loading = true;

      this.getCommand({
        field: this.postField,
        gettree: true,
        startwith: "".concat(this.selfField, "=='").concat(this.dataValue, "'") }).
      then(function (res) {
        _this5.loading = false;
        callback(res.result.data);
        _this5.onDataChange();
      }).catch(function (err) {
        _this5.loading = false;
        _this5.errorMessage = err;
      });
    },
    _loadNodeData: function _loadNodeData(callback, pw) {var _this6 = this;
      if (this.loading) {
        return;
      }
      this.loading = true;

      this.getCommand({
        field: this.postField,
        where: pw || this._postWhere(),
        pageSize: 500 }).
      then(function (res) {
        _this6.loading = false;
        callback(res.result.data);
        _this6.onDataChange();
      }).catch(function (err) {
        _this6.loading = false;
        _this6.errorMessage = err;
      });
    },
    _pathWhere: function _pathWhere() {
      var result = [];
      var where_field = this._getParentNameByField();
      if (where_field) {
        result.push("".concat(where_field, " == '").concat(this.dataValue, "'"));
      }

      if (this.where) {
        return "(".concat(this.where, ") && (").concat(result.join(' || '), ")");
      }

      return result.join(' || ');
    },
    _postWhere: function _postWhere() {
      var result = [];
      var selected = this.selected;
      var parentField = this.parentField;
      if (parentField) {
        result.push("".concat(parentField, " == null || ").concat(parentField, " == \"\""));
      }
      if (selected.length) {
        for (var i = 0; i < selected.length - 1; i++) {
          result.push("".concat(parentField, " == '").concat(selected[i].value, "'"));
        }
      }

      var where = [];
      if (this.where) {
        where.push("(".concat(this.where, ")"));
      }
      if (result.length) {
        where.push("(".concat(result.join(' || '), ")"));
      }

      return where.join(' && ');
    },
    _nodeWhere: function _nodeWhere() {
      var result = [];
      var selected = this.selected;
      if (selected.length) {
        result.push("".concat(this.parentField, " == '").concat(selected[selected.length - 1].value, "'"));
      }

      if (this.where) {
        return "(".concat(this.where, ") && (").concat(result.join(' || '), ")");
      }

      return result.join(' || ');
    },
    _getParentNameByField: function _getParentNameByField() {
      var fields = this.field.split(',');
      var where_field = null;
      for (var i = 0; i < fields.length; i++) {
        var items = fields[i].split('as');
        if (items.length < 2) {
          continue;
        }
        if (items[1].trim() === 'value') {
          where_field = items[0].trim();
          break;
        }
      }
      return where_field;
    },
    _isTreeView: function _isTreeView() {
      return this.parentField && this.selfField;
    },
    _updateSelected: function _updateSelected() {
      var dl = this.dataList;
      var sl = this.selected;
      var textField = this.map.text;
      var valueField = this.map.value;
      for (var i = 0; i < sl.length; i++) {
        var value = sl[i].value;
        var dl2 = dl[i];
        for (var j = 0; j < dl2.length; j++) {
          var item2 = dl2[j];
          if (item2[valueField] === value) {
            sl[i].text = item2[textField];
            break;
          }
        }
      }
    },
    _updateBindData: function _updateBindData(node) {var _this$_filterData =



      this._filterData(this._treeData, this.selected),dataList = _this$_filterData.dataList,hasNodes = _this$_filterData.hasNodes;

      var isleaf = this._stepSearh === false && !hasNodes;

      if (node) {
        node.isleaf = isleaf;
      }

      this.dataList = dataList;
      this.selectedIndex = dataList.length - 1;

      if (!isleaf && this.selected.length < dataList.length) {
        this.selected.push({
          value: null,
          text: "请选择" });

      }

      return {
        isleaf: isleaf,
        hasNodes: hasNodes };

    },
    _filterData: function _filterData(data, paths) {
      var dataList = [];
      var hasNodes = true;

      dataList.push(data.filter(function (item) {
        return item.parent_value === null || item.parent_value === undefined || item.parent_value === '';
      }));
      for (var i = 0; i < paths.length; i++) {
        var value = paths[i].value;
        var nodes = data.filter(function (item) {
          return item.parent_value === value;
        });

        if (nodes.length) {
          dataList.push(nodes);
        } else {
          hasNodes = false;
        }
      }

      return {
        dataList: dataList,
        hasNodes: hasNodes };

    },
    _extractTree: function _extractTree(nodes, result, parent_value) {
      var list = result || [];
      var valueField = this.map.value;
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];

        var child = {};
        for (var key in node) {
          if (key !== 'children') {
            child[key] = node[key];
          }
        }
        if (parent_value !== null && parent_value !== undefined && parent_value !== '') {
          child.parent_value = parent_value;
        }
        result.push(child);

        var children = node.children;
        if (children) {
          this._extractTree(children, result, node[valueField]);
        }
      }
    },
    _extractTreePath: function _extractTreePath(nodes, result) {
      var list = result || [];
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];

        var child = {};
        for (var key in node) {
          if (key !== 'children') {
            child[key] = node[key];
          }
        }
        result.push(child);

        var children = node.children;
        if (children) {
          this._extractTreePath(children, result);
        }
      }
    },
    _findNodePath: function _findNodePath(key, nodes) {var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var textField = this.map.text;
      var valueField = this.map.value;
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var children = node.children;
        var text = node[textField];
        var value = node[valueField];

        path.push({
          value: value,
          text: text });


        if (value === key) {
          return path;
        }

        if (children) {
          var p = this._findNodePath(key, children, path);
          if (p.length) {
            return p;
          }
        }

        path.pop();
      }
      return [];
    },
    _processLocalData: function _processLocalData() {
      this._treeData = [];
      this._extractTree(this.localdata, this._treeData);

      var inputValue = this.dataValue;
      if (inputValue === undefined) {
        return;
      }

      if (Array.isArray(inputValue)) {
        inputValue = inputValue[inputValue.length - 1];
        if (typeof inputValue === 'object' && inputValue[this.map.value]) {
          inputValue = inputValue[this.map.value];
        }
      }

      this.selected = this._findNodePath(inputValue, this.localdata);
    } } };exports.default = _default2;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 82)["default"]))

/***/ }),

/***/ 119:
/*!****************************************************************************************!*\
  !*** D:/uni-app-test/uni_modules/uni-load-more/components/uni-load-more/i18n/index.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _en = _interopRequireDefault(__webpack_require__(/*! ./en.json */ 120));
var _zhHans = _interopRequireDefault(__webpack_require__(/*! ./zh-Hans.json */ 121));
var _zhHant = _interopRequireDefault(__webpack_require__(/*! ./zh-Hant.json */ 122));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
{
  en: _en.default,
  'zh-Hans': _zhHans.default,
  'zh-Hant': _zhHant.default };exports.default = _default;

/***/ }),

/***/ 120:
/*!***************************************************************************************!*\
  !*** D:/uni-app-test/uni_modules/uni-load-more/components/uni-load-more/i18n/en.json ***!
  \***************************************************************************************/
/*! exports provided: uni-load-more.contentdown, uni-load-more.contentrefresh, uni-load-more.contentnomore, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-load-more.contentdown\":\"Pull up to show more\",\"uni-load-more.contentrefresh\":\"loading...\",\"uni-load-more.contentnomore\":\"No more data\"}");

/***/ }),

/***/ 121:
/*!********************************************************************************************!*\
  !*** D:/uni-app-test/uni_modules/uni-load-more/components/uni-load-more/i18n/zh-Hans.json ***!
  \********************************************************************************************/
/*! exports provided: uni-load-more.contentdown, uni-load-more.contentrefresh, uni-load-more.contentnomore, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-load-more.contentdown\":\"上拉显示更多\",\"uni-load-more.contentrefresh\":\"正在加载...\",\"uni-load-more.contentnomore\":\"没有更多数据了\"}");

/***/ }),

/***/ 122:
/*!********************************************************************************************!*\
  !*** D:/uni-app-test/uni_modules/uni-load-more/components/uni-load-more/i18n/zh-Hant.json ***!
  \********************************************************************************************/
/*! exports provided: uni-load-more.contentdown, uni-load-more.contentrefresh, uni-load-more.contentnomore, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"uni-load-more.contentdown\":\"上拉顯示更多\",\"uni-load-more.contentrefresh\":\"正在加載...\",\"uni-load-more.contentnomore\":\"沒有更多數據了\"}");

/***/ }),

/***/ 135:
/*!*******************************************!*\
  !*** D:/uni-app-test/pages/visit/city.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.citys = void 0;var citys = [
{
  value: '11',
  text: '北京市',
  children: [
  {
    value: '1101',
    text: '市辖区',
    children: [
    {
      value: '110101',
      text: '东城区' },

    {
      value: '110102',
      text: '西城区' },

    {
      value: '110105',
      text: '朝阳区' },

    {
      value: '110106',
      text: '丰台区' },

    {
      value: '110107',
      text: '石景山区' },

    {
      value: '110108',
      text: '海淀区' },

    {
      value: '110109',
      text: '门头沟区' },

    {
      value: '110111',
      text: '房山区' },

    {
      value: '110112',
      text: '通州区' },

    {
      value: '110113',
      text: '顺义区' },

    {
      value: '110114',
      text: '昌平区' },

    {
      value: '110115',
      text: '大兴区' },

    {
      value: '110116',
      text: '怀柔区' },

    {
      value: '110117',
      text: '平谷区' },

    {
      value: '110118',
      text: '密云区' },

    {
      value: '110119',
      text: '延庆区' }] }] },





{
  value: '12',
  text: '天津市',
  children: [
  {
    value: '1201',
    text: '市辖区',
    children: [
    {
      value: '120101',
      text: '和平区' },

    {
      value: '120102',
      text: '河东区' },

    {
      value: '120103',
      text: '河西区' },

    {
      value: '120104',
      text: '南开区' },

    {
      value: '120105',
      text: '河北区' },

    {
      value: '120106',
      text: '红桥区' },

    {
      value: '120110',
      text: '东丽区' },

    {
      value: '120111',
      text: '西青区' },

    {
      value: '120112',
      text: '津南区' },

    {
      value: '120113',
      text: '北辰区' },

    {
      value: '120114',
      text: '武清区' },

    {
      value: '120115',
      text: '宝坻区' },

    {
      value: '120116',
      text: '滨海新区' },

    {
      value: '120117',
      text: '宁河区' },

    {
      value: '120118',
      text: '静海区' },

    {
      value: '120119',
      text: '蓟州区' }] }] },





{
  value: '13',
  text: '河北省',
  children: [
  {
    value: '1301',
    text: '石家庄市',
    children: [
    {
      value: '130102',
      text: '长安区' },

    {
      value: '130104',
      text: '桥西区' },

    {
      value: '130105',
      text: '新华区' },

    {
      value: '130107',
      text: '井陉矿区' },

    {
      value: '130108',
      text: '裕华区' },

    {
      value: '130109',
      text: '藁城区' },

    {
      value: '130110',
      text: '鹿泉区' },

    {
      value: '130111',
      text: '栾城区' },

    {
      value: '130121',
      text: '井陉县' },

    {
      value: '130123',
      text: '正定县' },

    {
      value: '130125',
      text: '行唐县' },

    {
      value: '130126',
      text: '灵寿县' },

    {
      value: '130127',
      text: '高邑县' },

    {
      value: '130128',
      text: '深泽县' },

    {
      value: '130129',
      text: '赞皇县' },

    {
      value: '130130',
      text: '无极县' },

    {
      value: '130131',
      text: '平山县' },

    {
      value: '130132',
      text: '元氏县' },

    {
      value: '130133',
      text: '赵县' },

    {
      value: '130171',
      text: '石家庄高新技术产业开发区' },

    {
      value: '130172',
      text: '石家庄循环化工园区' },

    {
      value: '130181',
      text: '辛集市' },

    {
      value: '130183',
      text: '晋州市' },

    {
      value: '130184',
      text: '新乐市' }] },



  {
    value: '1302',
    text: '唐山市',
    children: [
    {
      value: '130202',
      text: '路南区' },

    {
      value: '130203',
      text: '路北区' },

    {
      value: '130204',
      text: '古冶区' },

    {
      value: '130205',
      text: '开平区' },

    {
      value: '130207',
      text: '丰南区' },

    {
      value: '130208',
      text: '丰润区' },

    {
      value: '130209',
      text: '曹妃甸区' },

    {
      value: '130224',
      text: '滦南县' },

    {
      value: '130225',
      text: '乐亭县' },

    {
      value: '130227',
      text: '迁西县' },

    {
      value: '130229',
      text: '玉田县' },

    {
      value: '130271',
      text: '河北唐山芦台经济开发区' },

    {
      value: '130272',
      text: '唐山市汉沽管理区' },

    {
      value: '130273',
      text: '唐山高新技术产业开发区' },

    {
      value: '130274',
      text: '河北唐山海港经济开发区' },

    {
      value: '130281',
      text: '遵化市' },

    {
      value: '130283',
      text: '迁安市' },

    {
      value: '130284',
      text: '滦州市' }] },



  {
    value: '1303',
    text: '秦皇岛市',
    children: [
    {
      value: '130302',
      text: '海港区' },

    {
      value: '130303',
      text: '山海关区' },

    {
      value: '130304',
      text: '北戴河区' },

    {
      value: '130306',
      text: '抚宁区' },

    {
      value: '130321',
      text: '青龙满族自治县' },

    {
      value: '130322',
      text: '昌黎县' },

    {
      value: '130324',
      text: '卢龙县' },

    {
      value: '130371',
      text: '秦皇岛市经济技术开发区' },

    {
      value: '130372',
      text: '北戴河新区' }] },



  {
    value: '1304',
    text: '邯郸市',
    children: [
    {
      value: '130402',
      text: '邯山区' },

    {
      value: '130403',
      text: '丛台区' },

    {
      value: '130404',
      text: '复兴区' },

    {
      value: '130406',
      text: '峰峰矿区' },

    {
      value: '130407',
      text: '肥乡区' },

    {
      value: '130408',
      text: '永年区' },

    {
      value: '130423',
      text: '临漳县' },

    {
      value: '130424',
      text: '成安县' },

    {
      value: '130425',
      text: '大名县' },

    {
      value: '130426',
      text: '涉县' },

    {
      value: '130427',
      text: '磁县' },

    {
      value: '130430',
      text: '邱县' },

    {
      value: '130431',
      text: '鸡泽县' },

    {
      value: '130432',
      text: '广平县' },

    {
      value: '130433',
      text: '馆陶县' },

    {
      value: '130434',
      text: '魏县' },

    {
      value: '130435',
      text: '曲周县' },

    {
      value: '130471',
      text: '邯郸经济技术开发区' },

    {
      value: '130473',
      text: '邯郸冀南新区' },

    {
      value: '130481',
      text: '武安市' }] },



  {
    value: '1305',
    text: '邢台市',
    children: [
    {
      value: '130502',
      text: '襄都区' },

    {
      value: '130503',
      text: '信都区' },

    {
      value: '130505',
      text: '任泽区' },

    {
      value: '130506',
      text: '南和区' },

    {
      value: '130522',
      text: '临城县' },

    {
      value: '130523',
      text: '内丘县' },

    {
      value: '130524',
      text: '柏乡县' },

    {
      value: '130525',
      text: '隆尧县' },

    {
      value: '130528',
      text: '宁晋县' },

    {
      value: '130529',
      text: '巨鹿县' },

    {
      value: '130530',
      text: '新河县' },

    {
      value: '130531',
      text: '广宗县' },

    {
      value: '130532',
      text: '平乡县' },

    {
      value: '130533',
      text: '威县' },

    {
      value: '130534',
      text: '清河县' },

    {
      value: '130535',
      text: '临西县' },

    {
      value: '130571',
      text: '河北邢台经济开发区' },

    {
      value: '130581',
      text: '南宫市' },

    {
      value: '130582',
      text: '沙河市' }] },



  {
    value: '1306',
    text: '保定市',
    children: [
    {
      value: '130602',
      text: '竞秀区' },

    {
      value: '130606',
      text: '莲池区' },

    {
      value: '130607',
      text: '满城区' },

    {
      value: '130608',
      text: '清苑区' },

    {
      value: '130609',
      text: '徐水区' },

    {
      value: '130623',
      text: '涞水县' },

    {
      value: '130624',
      text: '阜平县' },

    {
      value: '130626',
      text: '定兴县' },

    {
      value: '130627',
      text: '唐县' },

    {
      value: '130628',
      text: '高阳县' },

    {
      value: '130629',
      text: '容城县' },

    {
      value: '130630',
      text: '涞源县' },

    {
      value: '130631',
      text: '望都县' },

    {
      value: '130632',
      text: '安新县' },

    {
      value: '130633',
      text: '易县' },

    {
      value: '130634',
      text: '曲阳县' },

    {
      value: '130635',
      text: '蠡县' },

    {
      value: '130636',
      text: '顺平县' },

    {
      value: '130637',
      text: '博野县' },

    {
      value: '130638',
      text: '雄县' },

    {
      value: '130671',
      text: '保定高新技术产业开发区' },

    {
      value: '130672',
      text: '保定白沟新城' },

    {
      value: '130681',
      text: '涿州市' },

    {
      value: '130682',
      text: '定州市' },

    {
      value: '130683',
      text: '安国市' },

    {
      value: '130684',
      text: '高碑店市' }] },



  {
    value: '1307',
    text: '张家口市',
    children: [
    {
      value: '130702',
      text: '桥东区' },

    {
      value: '130703',
      text: '桥西区' },

    {
      value: '130705',
      text: '宣化区' },

    {
      value: '130706',
      text: '下花园区' },

    {
      value: '130708',
      text: '万全区' },

    {
      value: '130709',
      text: '崇礼区' },

    {
      value: '130722',
      text: '张北县' },

    {
      value: '130723',
      text: '康保县' },

    {
      value: '130724',
      text: '沽源县' },

    {
      value: '130725',
      text: '尚义县' },

    {
      value: '130726',
      text: '蔚县' },

    {
      value: '130727',
      text: '阳原县' },

    {
      value: '130728',
      text: '怀安县' },

    {
      value: '130730',
      text: '怀来县' },

    {
      value: '130731',
      text: '涿鹿县' },

    {
      value: '130732',
      text: '赤城县' },

    {
      value: '130771',
      text: '张家口经济开发区' },

    {
      value: '130772',
      text: '张家口市察北管理区' },

    {
      value: '130773',
      text: '张家口市塞北管理区' }] },



  {
    value: '1308',
    text: '承德市',
    children: [
    {
      value: '130802',
      text: '双桥区' },

    {
      value: '130803',
      text: '双滦区' },

    {
      value: '130804',
      text: '鹰手营子矿区' },

    {
      value: '130821',
      text: '承德县' },

    {
      value: '130822',
      text: '兴隆县' },

    {
      value: '130824',
      text: '滦平县' },

    {
      value: '130825',
      text: '隆化县' },

    {
      value: '130826',
      text: '丰宁满族自治县' },

    {
      value: '130827',
      text: '宽城满族自治县' },

    {
      value: '130828',
      text: '围场满族蒙古族自治县' },

    {
      value: '130871',
      text: '承德高新技术产业开发区' },

    {
      value: '130881',
      text: '平泉市' }] },



  {
    value: '1309',
    text: '沧州市',
    children: [
    {
      value: '130902',
      text: '新华区' },

    {
      value: '130903',
      text: '运河区' },

    {
      value: '130921',
      text: '沧县' },

    {
      value: '130922',
      text: '青县' },

    {
      value: '130923',
      text: '东光县' },

    {
      value: '130924',
      text: '海兴县' },

    {
      value: '130925',
      text: '盐山县' },

    {
      value: '130926',
      text: '肃宁县' },

    {
      value: '130927',
      text: '南皮县' },

    {
      value: '130928',
      text: '吴桥县' },

    {
      value: '130929',
      text: '献县' },

    {
      value: '130930',
      text: '孟村回族自治县' },

    {
      value: '130971',
      text: '河北沧州经济开发区' },

    {
      value: '130972',
      text: '沧州高新技术产业开发区' },

    {
      value: '130973',
      text: '沧州渤海新区' },

    {
      value: '130981',
      text: '泊头市' },

    {
      value: '130982',
      text: '任丘市' },

    {
      value: '130983',
      text: '黄骅市' },

    {
      value: '130984',
      text: '河间市' }] },



  {
    value: '1310',
    text: '廊坊市',
    children: [
    {
      value: '131002',
      text: '安次区' },

    {
      value: '131003',
      text: '广阳区' },

    {
      value: '131022',
      text: '固安县' },

    {
      value: '131023',
      text: '永清县' },

    {
      value: '131024',
      text: '香河县' },

    {
      value: '131025',
      text: '大城县' },

    {
      value: '131026',
      text: '文安县' },

    {
      value: '131028',
      text: '大厂回族自治县' },

    {
      value: '131071',
      text: '廊坊经济技术开发区' },

    {
      value: '131081',
      text: '霸州市' },

    {
      value: '131082',
      text: '三河市' }] },



  {
    value: '1311',
    text: '衡水市',
    children: [
    {
      value: '131102',
      text: '桃城区' },

    {
      value: '131103',
      text: '冀州区' },

    {
      value: '131121',
      text: '枣强县' },

    {
      value: '131122',
      text: '武邑县' },

    {
      value: '131123',
      text: '武强县' },

    {
      value: '131124',
      text: '饶阳县' },

    {
      value: '131125',
      text: '安平县' },

    {
      value: '131126',
      text: '故城县' },

    {
      value: '131127',
      text: '景县' },

    {
      value: '131128',
      text: '阜城县' },

    {
      value: '131171',
      text: '河北衡水高新技术产业开发区' },

    {
      value: '131172',
      text: '衡水滨湖新区' },

    {
      value: '131182',
      text: '深州市' }] }] },





{
  value: '14',
  text: '山西省',
  children: [
  {
    value: '1401',
    text: '太原市',
    children: [
    {
      value: '140105',
      text: '小店区' },

    {
      value: '140106',
      text: '迎泽区' },

    {
      value: '140107',
      text: '杏花岭区' },

    {
      value: '140108',
      text: '尖草坪区' },

    {
      value: '140109',
      text: '万柏林区' },

    {
      value: '140110',
      text: '晋源区' },

    {
      value: '140121',
      text: '清徐县' },

    {
      value: '140122',
      text: '阳曲县' },

    {
      value: '140123',
      text: '娄烦县' },

    {
      value: '140171',
      text: '山西转型综合改革示范区' },

    {
      value: '140181',
      text: '古交市' }] },



  {
    value: '1402',
    text: '大同市',
    children: [
    {
      value: '140212',
      text: '新荣区' },

    {
      value: '140213',
      text: '平城区' },

    {
      value: '140214',
      text: '云冈区' },

    {
      value: '140215',
      text: '云州区' },

    {
      value: '140221',
      text: '阳高县' },

    {
      value: '140222',
      text: '天镇县' },

    {
      value: '140223',
      text: '广灵县' },

    {
      value: '140224',
      text: '灵丘县' },

    {
      value: '140225',
      text: '浑源县' },

    {
      value: '140226',
      text: '左云县' },

    {
      value: '140271',
      text: '山西大同经济开发区' }] },



  {
    value: '1403',
    text: '阳泉市',
    children: [
    {
      value: '140302',
      text: '城区' },

    {
      value: '140303',
      text: '矿区' },

    {
      value: '140311',
      text: '郊区' },

    {
      value: '140321',
      text: '平定县' },

    {
      value: '140322',
      text: '盂县' }] },



  {
    value: '1404',
    text: '长治市',
    children: [
    {
      value: '140403',
      text: '潞州区' },

    {
      value: '140404',
      text: '上党区' },

    {
      value: '140405',
      text: '屯留区' },

    {
      value: '140406',
      text: '潞城区' },

    {
      value: '140423',
      text: '襄垣县' },

    {
      value: '140425',
      text: '平顺县' },

    {
      value: '140426',
      text: '黎城县' },

    {
      value: '140427',
      text: '壶关县' },

    {
      value: '140428',
      text: '长子县' },

    {
      value: '140429',
      text: '武乡县' },

    {
      value: '140430',
      text: '沁县' },

    {
      value: '140431',
      text: '沁源县' },

    {
      value: '140471',
      text: '山西长治高新技术产业园区' }] },



  {
    value: '1405',
    text: '晋城市',
    children: [
    {
      value: '140502',
      text: '城区' },

    {
      value: '140521',
      text: '沁水县' },

    {
      value: '140522',
      text: '阳城县' },

    {
      value: '140524',
      text: '陵川县' },

    {
      value: '140525',
      text: '泽州县' },

    {
      value: '140581',
      text: '高平市' }] },



  {
    value: '1406',
    text: '朔州市',
    children: [
    {
      value: '140602',
      text: '朔城区' },

    {
      value: '140603',
      text: '平鲁区' },

    {
      value: '140621',
      text: '山阴县' },

    {
      value: '140622',
      text: '应县' },

    {
      value: '140623',
      text: '右玉县' },

    {
      value: '140671',
      text: '山西朔州经济开发区' },

    {
      value: '140681',
      text: '怀仁市' }] },



  {
    value: '1407',
    text: '晋中市',
    children: [
    {
      value: '140702',
      text: '榆次区' },

    {
      value: '140703',
      text: '太谷区' },

    {
      value: '140721',
      text: '榆社县' },

    {
      value: '140722',
      text: '左权县' },

    {
      value: '140723',
      text: '和顺县' },

    {
      value: '140724',
      text: '昔阳县' },

    {
      value: '140725',
      text: '寿阳县' },

    {
      value: '140727',
      text: '祁县' },

    {
      value: '140728',
      text: '平遥县' },

    {
      value: '140729',
      text: '灵石县' },

    {
      value: '140781',
      text: '介休市' }] },



  {
    value: '1408',
    text: '运城市',
    children: [
    {
      value: '140802',
      text: '盐湖区' },

    {
      value: '140821',
      text: '临猗县' },

    {
      value: '140822',
      text: '万荣县' },

    {
      value: '140823',
      text: '闻喜县' },

    {
      value: '140824',
      text: '稷山县' },

    {
      value: '140825',
      text: '新绛县' },

    {
      value: '140826',
      text: '绛县' },

    {
      value: '140827',
      text: '垣曲县' },

    {
      value: '140828',
      text: '夏县' },

    {
      value: '140829',
      text: '平陆县' },

    {
      value: '140830',
      text: '芮城县' },

    {
      value: '140881',
      text: '永济市' },

    {
      value: '140882',
      text: '河津市' }] },



  {
    value: '1409',
    text: '忻州市',
    children: [
    {
      value: '140902',
      text: '忻府区' },

    {
      value: '140921',
      text: '定襄县' },

    {
      value: '140922',
      text: '五台县' },

    {
      value: '140923',
      text: '代县' },

    {
      value: '140924',
      text: '繁峙县' },

    {
      value: '140925',
      text: '宁武县' },

    {
      value: '140926',
      text: '静乐县' },

    {
      value: '140927',
      text: '神池县' },

    {
      value: '140928',
      text: '五寨县' },

    {
      value: '140929',
      text: '岢岚县' },

    {
      value: '140930',
      text: '河曲县' },

    {
      value: '140931',
      text: '保德县' },

    {
      value: '140932',
      text: '偏关县' },

    {
      value: '140971',
      text: '五台山风景名胜区' },

    {
      value: '140981',
      text: '原平市' }] },



  {
    value: '1410',
    text: '临汾市',
    children: [
    {
      value: '141002',
      text: '尧都区' },

    {
      value: '141021',
      text: '曲沃县' },

    {
      value: '141022',
      text: '翼城县' },

    {
      value: '141023',
      text: '襄汾县' },

    {
      value: '141024',
      text: '洪洞县' },

    {
      value: '141025',
      text: '古县' },

    {
      value: '141026',
      text: '安泽县' },

    {
      value: '141027',
      text: '浮山县' },

    {
      value: '141028',
      text: '吉县' },

    {
      value: '141029',
      text: '乡宁县' },

    {
      value: '141030',
      text: '大宁县' },

    {
      value: '141031',
      text: '隰县' },

    {
      value: '141032',
      text: '永和县' },

    {
      value: '141033',
      text: '蒲县' },

    {
      value: '141034',
      text: '汾西县' },

    {
      value: '141081',
      text: '侯马市' },

    {
      value: '141082',
      text: '霍州市' }] },



  {
    value: '1411',
    text: '吕梁市',
    children: [
    {
      value: '141102',
      text: '离石区' },

    {
      value: '141121',
      text: '文水县' },

    {
      value: '141122',
      text: '交城县' },

    {
      value: '141123',
      text: '兴县' },

    {
      value: '141124',
      text: '临县' },

    {
      value: '141125',
      text: '柳林县' },

    {
      value: '141126',
      text: '石楼县' },

    {
      value: '141127',
      text: '岚县' },

    {
      value: '141128',
      text: '方山县' },

    {
      value: '141129',
      text: '中阳县' },

    {
      value: '141130',
      text: '交口县' },

    {
      value: '141181',
      text: '孝义市' },

    {
      value: '141182',
      text: '汾阳市' }] }] },





{
  value: '15',
  text: '内蒙古自治区',
  children: [
  {
    value: '1501',
    text: '呼和浩特市',
    children: [
    {
      value: '150102',
      text: '新城区' },

    {
      value: '150103',
      text: '回民区' },

    {
      value: '150104',
      text: '玉泉区' },

    {
      value: '150105',
      text: '赛罕区' },

    {
      value: '150121',
      text: '土默特左旗' },

    {
      value: '150122',
      text: '托克托县' },

    {
      value: '150123',
      text: '和林格尔县' },

    {
      value: '150124',
      text: '清水河县' },

    {
      value: '150125',
      text: '武川县' },

    {
      value: '150172',
      text: '呼和浩特经济技术开发区' }] },



  {
    value: '1502',
    text: '包头市',
    children: [
    {
      value: '150202',
      text: '东河区' },

    {
      value: '150203',
      text: '昆都仑区' },

    {
      value: '150204',
      text: '青山区' },

    {
      value: '150205',
      text: '石拐区' },

    {
      value: '150206',
      text: '白云鄂博矿区' },

    {
      value: '150207',
      text: '九原区' },

    {
      value: '150221',
      text: '土默特右旗' },

    {
      value: '150222',
      text: '固阳县' },

    {
      value: '150223',
      text: '达尔罕茂明安联合旗' },

    {
      value: '150271',
      text: '包头稀土高新技术产业开发区' }] },



  {
    value: '1503',
    text: '乌海市',
    children: [
    {
      value: '150302',
      text: '海勃湾区' },

    {
      value: '150303',
      text: '海南区' },

    {
      value: '150304',
      text: '乌达区' }] },



  {
    value: '1504',
    text: '赤峰市',
    children: [
    {
      value: '150402',
      text: '红山区' },

    {
      value: '150403',
      text: '元宝山区' },

    {
      value: '150404',
      text: '松山区' },

    {
      value: '150421',
      text: '阿鲁科尔沁旗' },

    {
      value: '150422',
      text: '巴林左旗' },

    {
      value: '150423',
      text: '巴林右旗' },

    {
      value: '150424',
      text: '林西县' },

    {
      value: '150425',
      text: '克什克腾旗' },

    {
      value: '150426',
      text: '翁牛特旗' },

    {
      value: '150428',
      text: '喀喇沁旗' },

    {
      value: '150429',
      text: '宁城县' },

    {
      value: '150430',
      text: '敖汉旗' }] },



  {
    value: '1505',
    text: '通辽市',
    children: [
    {
      value: '150502',
      text: '科尔沁区' },

    {
      value: '150521',
      text: '科尔沁左翼中旗' },

    {
      value: '150522',
      text: '科尔沁左翼后旗' },

    {
      value: '150523',
      text: '开鲁县' },

    {
      value: '150524',
      text: '库伦旗' },

    {
      value: '150525',
      text: '奈曼旗' },

    {
      value: '150526',
      text: '扎鲁特旗' },

    {
      value: '150571',
      text: '通辽经济技术开发区' },

    {
      value: '150581',
      text: '霍林郭勒市' }] },



  {
    value: '1506',
    text: '鄂尔多斯市',
    children: [
    {
      value: '150602',
      text: '东胜区' },

    {
      value: '150603',
      text: '康巴什区' },

    {
      value: '150621',
      text: '达拉特旗' },

    {
      value: '150622',
      text: '准格尔旗' },

    {
      value: '150623',
      text: '鄂托克前旗' },

    {
      value: '150624',
      text: '鄂托克旗' },

    {
      value: '150625',
      text: '杭锦旗' },

    {
      value: '150626',
      text: '乌审旗' },

    {
      value: '150627',
      text: '伊金霍洛旗' }] },



  {
    value: '1507',
    text: '呼伦贝尔市',
    children: [
    {
      value: '150702',
      text: '海拉尔区' },

    {
      value: '150703',
      text: '扎赉诺尔区' },

    {
      value: '150721',
      text: '阿荣旗' },

    {
      value: '150722',
      text: '莫力达瓦达斡尔族自治旗' },

    {
      value: '150723',
      text: '鄂伦春自治旗' },

    {
      value: '150724',
      text: '鄂温克族自治旗' },

    {
      value: '150725',
      text: '陈巴尔虎旗' },

    {
      value: '150726',
      text: '新巴尔虎左旗' },

    {
      value: '150727',
      text: '新巴尔虎右旗' },

    {
      value: '150781',
      text: '满洲里市' },

    {
      value: '150782',
      text: '牙克石市' },

    {
      value: '150783',
      text: '扎兰屯市' },

    {
      value: '150784',
      text: '额尔古纳市' },

    {
      value: '150785',
      text: '根河市' }] },



  {
    value: '1508',
    text: '巴彦淖尔市',
    children: [
    {
      value: '150802',
      text: '临河区' },

    {
      value: '150821',
      text: '五原县' },

    {
      value: '150822',
      text: '磴口县' },

    {
      value: '150823',
      text: '乌拉特前旗' },

    {
      value: '150824',
      text: '乌拉特中旗' },

    {
      value: '150825',
      text: '乌拉特后旗' },

    {
      value: '150826',
      text: '杭锦后旗' }] },



  {
    value: '1509',
    text: '乌兰察布市',
    children: [
    {
      value: '150902',
      text: '集宁区' },

    {
      value: '150921',
      text: '卓资县' },

    {
      value: '150922',
      text: '化德县' },

    {
      value: '150923',
      text: '商都县' },

    {
      value: '150924',
      text: '兴和县' },

    {
      value: '150925',
      text: '凉城县' },

    {
      value: '150926',
      text: '察哈尔右翼前旗' },

    {
      value: '150927',
      text: '察哈尔右翼中旗' },

    {
      value: '150928',
      text: '察哈尔右翼后旗' },

    {
      value: '150929',
      text: '四子王旗' },

    {
      value: '150981',
      text: '丰镇市' }] },



  {
    value: '1522',
    text: '兴安盟',
    children: [
    {
      value: '152201',
      text: '乌兰浩特市' },

    {
      value: '152202',
      text: '阿尔山市' },

    {
      value: '152221',
      text: '科尔沁右翼前旗' },

    {
      value: '152222',
      text: '科尔沁右翼中旗' },

    {
      value: '152223',
      text: '扎赉特旗' },

    {
      value: '152224',
      text: '突泉县' }] },



  {
    value: '1525',
    text: '锡林郭勒盟',
    children: [
    {
      value: '152501',
      text: '二连浩特市' },

    {
      value: '152502',
      text: '锡林浩特市' },

    {
      value: '152522',
      text: '阿巴嘎旗' },

    {
      value: '152523',
      text: '苏尼特左旗' },

    {
      value: '152524',
      text: '苏尼特右旗' },

    {
      value: '152525',
      text: '东乌珠穆沁旗' },

    {
      value: '152526',
      text: '西乌珠穆沁旗' },

    {
      value: '152527',
      text: '太仆寺旗' },

    {
      value: '152528',
      text: '镶黄旗' },

    {
      value: '152529',
      text: '正镶白旗' },

    {
      value: '152530',
      text: '正蓝旗' },

    {
      value: '152531',
      text: '多伦县' },

    {
      value: '152571',
      text: '乌拉盖管委会' }] },



  {
    value: '1529',
    text: '阿拉善盟',
    children: [
    {
      value: '152921',
      text: '阿拉善左旗' },

    {
      value: '152922',
      text: '阿拉善右旗' },

    {
      value: '152923',
      text: '额济纳旗' },

    {
      value: '152971',
      text: '内蒙古阿拉善经济开发区' }] }] },





{
  value: '21',
  text: '辽宁省',
  children: [
  {
    value: '2101',
    text: '沈阳市',
    children: [
    {
      value: '210102',
      text: '和平区' },

    {
      value: '210103',
      text: '沈河区' },

    {
      value: '210104',
      text: '大东区' },

    {
      value: '210105',
      text: '皇姑区' },

    {
      value: '210106',
      text: '铁西区' },

    {
      value: '210111',
      text: '苏家屯区' },

    {
      value: '210112',
      text: '浑南区' },

    {
      value: '210113',
      text: '沈北新区' },

    {
      value: '210114',
      text: '于洪区' },

    {
      value: '210115',
      text: '辽中区' },

    {
      value: '210123',
      text: '康平县' },

    {
      value: '210124',
      text: '法库县' },

    {
      value: '210181',
      text: '新民市' }] },



  {
    value: '2102',
    text: '大连市',
    children: [
    {
      value: '210202',
      text: '中山区' },

    {
      value: '210203',
      text: '西岗区' },

    {
      value: '210204',
      text: '沙河口区' },

    {
      value: '210211',
      text: '甘井子区' },

    {
      value: '210212',
      text: '旅顺口区' },

    {
      value: '210213',
      text: '金州区' },

    {
      value: '210214',
      text: '普兰店区' },

    {
      value: '210224',
      text: '长海县' },

    {
      value: '210281',
      text: '瓦房店市' },

    {
      value: '210283',
      text: '庄河市' }] },



  {
    value: '2103',
    text: '鞍山市',
    children: [
    {
      value: '210302',
      text: '铁东区' },

    {
      value: '210303',
      text: '铁西区' },

    {
      value: '210304',
      text: '立山区' },

    {
      value: '210311',
      text: '千山区' },

    {
      value: '210321',
      text: '台安县' },

    {
      value: '210323',
      text: '岫岩满族自治县' },

    {
      value: '210381',
      text: '海城市' }] },



  {
    value: '2104',
    text: '抚顺市',
    children: [
    {
      value: '210402',
      text: '新抚区' },

    {
      value: '210403',
      text: '东洲区' },

    {
      value: '210404',
      text: '望花区' },

    {
      value: '210411',
      text: '顺城区' },

    {
      value: '210421',
      text: '抚顺县' },

    {
      value: '210422',
      text: '新宾满族自治县' },

    {
      value: '210423',
      text: '清原满族自治县' }] },



  {
    value: '2105',
    text: '本溪市',
    children: [
    {
      value: '210502',
      text: '平山区' },

    {
      value: '210503',
      text: '溪湖区' },

    {
      value: '210504',
      text: '明山区' },

    {
      value: '210505',
      text: '南芬区' },

    {
      value: '210521',
      text: '本溪满族自治县' },

    {
      value: '210522',
      text: '桓仁满族自治县' }] },



  {
    value: '2106',
    text: '丹东市',
    children: [
    {
      value: '210602',
      text: '元宝区' },

    {
      value: '210603',
      text: '振兴区' },

    {
      value: '210604',
      text: '振安区' },

    {
      value: '210624',
      text: '宽甸满族自治县' },

    {
      value: '210681',
      text: '东港市' },

    {
      value: '210682',
      text: '凤城市' }] },



  {
    value: '2107',
    text: '锦州市',
    children: [
    {
      value: '210702',
      text: '古塔区' },

    {
      value: '210703',
      text: '凌河区' },

    {
      value: '210711',
      text: '太和区' },

    {
      value: '210726',
      text: '黑山县' },

    {
      value: '210727',
      text: '义县' },

    {
      value: '210781',
      text: '凌海市' },

    {
      value: '210782',
      text: '北镇市' }] },



  {
    value: '2108',
    text: '营口市',
    children: [
    {
      value: '210802',
      text: '站前区' },

    {
      value: '210803',
      text: '西市区' },

    {
      value: '210804',
      text: '鲅鱼圈区' },

    {
      value: '210811',
      text: '老边区' },

    {
      value: '210881',
      text: '盖州市' },

    {
      value: '210882',
      text: '大石桥市' }] },



  {
    value: '2109',
    text: '阜新市',
    children: [
    {
      value: '210902',
      text: '海州区' },

    {
      value: '210903',
      text: '新邱区' },

    {
      value: '210904',
      text: '太平区' },

    {
      value: '210905',
      text: '清河门区' },

    {
      value: '210911',
      text: '细河区' },

    {
      value: '210921',
      text: '阜新蒙古族自治县' },

    {
      value: '210922',
      text: '彰武县' }] },



  {
    value: '2110',
    text: '辽阳市',
    children: [
    {
      value: '211002',
      text: '白塔区' },

    {
      value: '211003',
      text: '文圣区' },

    {
      value: '211004',
      text: '宏伟区' },

    {
      value: '211005',
      text: '弓长岭区' },

    {
      value: '211011',
      text: '太子河区' },

    {
      value: '211021',
      text: '辽阳县' },

    {
      value: '211081',
      text: '灯塔市' }] },



  {
    value: '2111',
    text: '盘锦市',
    children: [
    {
      value: '211102',
      text: '双台子区' },

    {
      value: '211103',
      text: '兴隆台区' },

    {
      value: '211104',
      text: '大洼区' },

    {
      value: '211122',
      text: '盘山县' }] },



  {
    value: '2112',
    text: '铁岭市',
    children: [
    {
      value: '211202',
      text: '银州区' },

    {
      value: '211204',
      text: '清河区' },

    {
      value: '211221',
      text: '铁岭县' },

    {
      value: '211223',
      text: '西丰县' },

    {
      value: '211224',
      text: '昌图县' },

    {
      value: '211281',
      text: '调兵山市' },

    {
      value: '211282',
      text: '开原市' }] },



  {
    value: '2113',
    text: '朝阳市',
    children: [
    {
      value: '211302',
      text: '双塔区' },

    {
      value: '211303',
      text: '龙城区' },

    {
      value: '211321',
      text: '朝阳县' },

    {
      value: '211322',
      text: '建平县' },

    {
      value: '211324',
      text: '喀喇沁左翼蒙古族自治县' },

    {
      value: '211381',
      text: '北票市' },

    {
      value: '211382',
      text: '凌源市' }] },



  {
    value: '2114',
    text: '葫芦岛市',
    children: [
    {
      value: '211402',
      text: '连山区' },

    {
      value: '211403',
      text: '龙港区' },

    {
      value: '211404',
      text: '南票区' },

    {
      value: '211421',
      text: '绥中县' },

    {
      value: '211422',
      text: '建昌县' },

    {
      value: '211481',
      text: '兴城市' }] }] },





{
  value: '22',
  text: '吉林省',
  children: [
  {
    value: '2201',
    text: '长春市',
    children: [
    {
      value: '220102',
      text: '南关区' },

    {
      value: '220103',
      text: '宽城区' },

    {
      value: '220104',
      text: '朝阳区' },

    {
      value: '220105',
      text: '二道区' },

    {
      value: '220106',
      text: '绿园区' },

    {
      value: '220112',
      text: '双阳区' },

    {
      value: '220113',
      text: '九台区' },

    {
      value: '220122',
      text: '农安县' },

    {
      value: '220171',
      text: '长春经济技术开发区' },

    {
      value: '220172',
      text: '长春净月高新技术产业开发区' },

    {
      value: '220173',
      text: '长春高新技术产业开发区' },

    {
      value: '220174',
      text: '长春汽车经济技术开发区' },

    {
      value: '220182',
      text: '榆树市' },

    {
      value: '220183',
      text: '德惠市' },

    {
      value: '220184',
      text: '公主岭市' }] },



  {
    value: '2202',
    text: '吉林市',
    children: [
    {
      value: '220202',
      text: '昌邑区' },

    {
      value: '220203',
      text: '龙潭区' },

    {
      value: '220204',
      text: '船营区' },

    {
      value: '220211',
      text: '丰满区' },

    {
      value: '220221',
      text: '永吉县' },

    {
      value: '220271',
      text: '吉林经济开发区' },

    {
      value: '220272',
      text: '吉林高新技术产业开发区' },

    {
      value: '220273',
      text: '吉林中国新加坡食品区' },

    {
      value: '220281',
      text: '蛟河市' },

    {
      value: '220282',
      text: '桦甸市' },

    {
      value: '220283',
      text: '舒兰市' },

    {
      value: '220284',
      text: '磐石市' }] },



  {
    value: '2203',
    text: '四平市',
    children: [
    {
      value: '220302',
      text: '铁西区' },

    {
      value: '220303',
      text: '铁东区' },

    {
      value: '220322',
      text: '梨树县' },

    {
      value: '220323',
      text: '伊通满族自治县' },

    {
      value: '220382',
      text: '双辽市' }] },



  {
    value: '2204',
    text: '辽源市',
    children: [
    {
      value: '220402',
      text: '龙山区' },

    {
      value: '220403',
      text: '西安区' },

    {
      value: '220421',
      text: '东丰县' },

    {
      value: '220422',
      text: '东辽县' }] },



  {
    value: '2205',
    text: '通化市',
    children: [
    {
      value: '220502',
      text: '东昌区' },

    {
      value: '220503',
      text: '二道江区' },

    {
      value: '220521',
      text: '通化县' },

    {
      value: '220523',
      text: '辉南县' },

    {
      value: '220524',
      text: '柳河县' },

    {
      value: '220581',
      text: '梅河口市' },

    {
      value: '220582',
      text: '集安市' }] },



  {
    value: '2206',
    text: '白山市',
    children: [
    {
      value: '220602',
      text: '浑江区' },

    {
      value: '220605',
      text: '江源区' },

    {
      value: '220621',
      text: '抚松县' },

    {
      value: '220622',
      text: '靖宇县' },

    {
      value: '220623',
      text: '长白朝鲜族自治县' },

    {
      value: '220681',
      text: '临江市' }] },



  {
    value: '2207',
    text: '松原市',
    children: [
    {
      value: '220702',
      text: '宁江区' },

    {
      value: '220721',
      text: '前郭尔罗斯蒙古族自治县' },

    {
      value: '220722',
      text: '长岭县' },

    {
      value: '220723',
      text: '乾安县' },

    {
      value: '220771',
      text: '吉林松原经济开发区' },

    {
      value: '220781',
      text: '扶余市' }] },



  {
    value: '2208',
    text: '白城市',
    children: [
    {
      value: '220802',
      text: '洮北区' },

    {
      value: '220821',
      text: '镇赉县' },

    {
      value: '220822',
      text: '通榆县' },

    {
      value: '220871',
      text: '吉林白城经济开发区' },

    {
      value: '220881',
      text: '洮南市' },

    {
      value: '220882',
      text: '大安市' }] },



  {
    value: '2224',
    text: '延边朝鲜族自治州',
    children: [
    {
      value: '222401',
      text: '延吉市' },

    {
      value: '222402',
      text: '图们市' },

    {
      value: '222403',
      text: '敦化市' },

    {
      value: '222404',
      text: '珲春市' },

    {
      value: '222405',
      text: '龙井市' },

    {
      value: '222406',
      text: '和龙市' },

    {
      value: '222424',
      text: '汪清县' },

    {
      value: '222426',
      text: '安图县' }] }] },





{
  value: '23',
  text: '黑龙江省',
  children: [
  {
    value: '2301',
    text: '哈尔滨市',
    children: [
    {
      value: '230102',
      text: '道里区' },

    {
      value: '230103',
      text: '南岗区' },

    {
      value: '230104',
      text: '道外区' },

    {
      value: '230108',
      text: '平房区' },

    {
      value: '230109',
      text: '松北区' },

    {
      value: '230110',
      text: '香坊区' },

    {
      value: '230111',
      text: '呼兰区' },

    {
      value: '230112',
      text: '阿城区' },

    {
      value: '230113',
      text: '双城区' },

    {
      value: '230123',
      text: '依兰县' },

    {
      value: '230124',
      text: '方正县' },

    {
      value: '230125',
      text: '宾县' },

    {
      value: '230126',
      text: '巴彦县' },

    {
      value: '230127',
      text: '木兰县' },

    {
      value: '230128',
      text: '通河县' },

    {
      value: '230129',
      text: '延寿县' },

    {
      value: '230183',
      text: '尚志市' },

    {
      value: '230184',
      text: '五常市' }] },



  {
    value: '2302',
    text: '齐齐哈尔市',
    children: [
    {
      value: '230202',
      text: '龙沙区' },

    {
      value: '230203',
      text: '建华区' },

    {
      value: '230204',
      text: '铁锋区' },

    {
      value: '230205',
      text: '昂昂溪区' },

    {
      value: '230206',
      text: '富拉尔基区' },

    {
      value: '230207',
      text: '碾子山区' },

    {
      value: '230208',
      text: '梅里斯达斡尔族区' },

    {
      value: '230221',
      text: '龙江县' },

    {
      value: '230223',
      text: '依安县' },

    {
      value: '230224',
      text: '泰来县' },

    {
      value: '230225',
      text: '甘南县' },

    {
      value: '230227',
      text: '富裕县' },

    {
      value: '230229',
      text: '克山县' },

    {
      value: '230230',
      text: '克东县' },

    {
      value: '230231',
      text: '拜泉县' },

    {
      value: '230281',
      text: '讷河市' }] },



  {
    value: '2303',
    text: '鸡西市',
    children: [
    {
      value: '230302',
      text: '鸡冠区' },

    {
      value: '230303',
      text: '恒山区' },

    {
      value: '230304',
      text: '滴道区' },

    {
      value: '230305',
      text: '梨树区' },

    {
      value: '230306',
      text: '城子河区' },

    {
      value: '230307',
      text: '麻山区' },

    {
      value: '230321',
      text: '鸡东县' },

    {
      value: '230381',
      text: '虎林市' },

    {
      value: '230382',
      text: '密山市' }] },



  {
    value: '2304',
    text: '鹤岗市',
    children: [
    {
      value: '230402',
      text: '向阳区' },

    {
      value: '230403',
      text: '工农区' },

    {
      value: '230404',
      text: '南山区' },

    {
      value: '230405',
      text: '兴安区' },

    {
      value: '230406',
      text: '东山区' },

    {
      value: '230407',
      text: '兴山区' },

    {
      value: '230421',
      text: '萝北县' },

    {
      value: '230422',
      text: '绥滨县' }] },



  {
    value: '2305',
    text: '双鸭山市',
    children: [
    {
      value: '230502',
      text: '尖山区' },

    {
      value: '230503',
      text: '岭东区' },

    {
      value: '230505',
      text: '四方台区' },

    {
      value: '230506',
      text: '宝山区' },

    {
      value: '230521',
      text: '集贤县' },

    {
      value: '230522',
      text: '友谊县' },

    {
      value: '230523',
      text: '宝清县' },

    {
      value: '230524',
      text: '饶河县' }] },



  {
    value: '2306',
    text: '大庆市',
    children: [
    {
      value: '230602',
      text: '萨尔图区' },

    {
      value: '230603',
      text: '龙凤区' },

    {
      value: '230604',
      text: '让胡路区' },

    {
      value: '230605',
      text: '红岗区' },

    {
      value: '230606',
      text: '大同区' },

    {
      value: '230621',
      text: '肇州县' },

    {
      value: '230622',
      text: '肇源县' },

    {
      value: '230623',
      text: '林甸县' },

    {
      value: '230624',
      text: '杜尔伯特蒙古族自治县' },

    {
      value: '230671',
      text: '大庆高新技术产业开发区' }] },



  {
    value: '2307',
    text: '伊春市',
    children: [
    {
      value: '230717',
      text: '伊美区' },

    {
      value: '230718',
      text: '乌翠区' },

    {
      value: '230719',
      text: '友好区' },

    {
      value: '230722',
      text: '嘉荫县' },

    {
      value: '230723',
      text: '汤旺县' },

    {
      value: '230724',
      text: '丰林县' },

    {
      value: '230725',
      text: '大箐山县' },

    {
      value: '230726',
      text: '南岔县' },

    {
      value: '230751',
      text: '金林区' },

    {
      value: '230781',
      text: '铁力市' }] },



  {
    value: '2308',
    text: '佳木斯市',
    children: [
    {
      value: '230803',
      text: '向阳区' },

    {
      value: '230804',
      text: '前进区' },

    {
      value: '230805',
      text: '东风区' },

    {
      value: '230811',
      text: '郊区' },

    {
      value: '230822',
      text: '桦南县' },

    {
      value: '230826',
      text: '桦川县' },

    {
      value: '230828',
      text: '汤原县' },

    {
      value: '230881',
      text: '同江市' },

    {
      value: '230882',
      text: '富锦市' },

    {
      value: '230883',
      text: '抚远市' }] },



  {
    value: '2309',
    text: '七台河市',
    children: [
    {
      value: '230902',
      text: '新兴区' },

    {
      value: '230903',
      text: '桃山区' },

    {
      value: '230904',
      text: '茄子河区' },

    {
      value: '230921',
      text: '勃利县' }] },



  {
    value: '2310',
    text: '牡丹江市',
    children: [
    {
      value: '231002',
      text: '东安区' },

    {
      value: '231003',
      text: '阳明区' },

    {
      value: '231004',
      text: '爱民区' },

    {
      value: '231005',
      text: '西安区' },

    {
      value: '231025',
      text: '林口县' },

    {
      value: '231071',
      text: '牡丹江经济技术开发区' },

    {
      value: '231081',
      text: '绥芬河市' },

    {
      value: '231083',
      text: '海林市' },

    {
      value: '231084',
      text: '宁安市' },

    {
      value: '231085',
      text: '穆棱市' },

    {
      value: '231086',
      text: '东宁市' }] },



  {
    value: '2311',
    text: '黑河市',
    children: [
    {
      value: '231102',
      text: '爱辉区' },

    {
      value: '231123',
      text: '逊克县' },

    {
      value: '231124',
      text: '孙吴县' },

    {
      value: '231181',
      text: '北安市' },

    {
      value: '231182',
      text: '五大连池市' },

    {
      value: '231183',
      text: '嫩江市' }] },



  {
    value: '2312',
    text: '绥化市',
    children: [
    {
      value: '231202',
      text: '北林区' },

    {
      value: '231221',
      text: '望奎县' },

    {
      value: '231222',
      text: '兰西县' },

    {
      value: '231223',
      text: '青冈县' },

    {
      value: '231224',
      text: '庆安县' },

    {
      value: '231225',
      text: '明水县' },

    {
      value: '231226',
      text: '绥棱县' },

    {
      value: '231281',
      text: '安达市' },

    {
      value: '231282',
      text: '肇东市' },

    {
      value: '231283',
      text: '海伦市' }] },



  {
    value: '2327',
    text: '大兴安岭地区',
    children: [
    {
      value: '232701',
      text: '漠河市' },

    {
      value: '232721',
      text: '呼玛县' },

    {
      value: '232722',
      text: '塔河县' },

    {
      value: '232761',
      text: '加格达奇区' },

    {
      value: '232762',
      text: '松岭区' },

    {
      value: '232763',
      text: '新林区' },

    {
      value: '232764',
      text: '呼中区' }] }] },





{
  value: '31',
  text: '上海市',
  children: [
  {
    value: '3101',
    text: '市辖区',
    children: [
    {
      value: '310101',
      text: '黄浦区' },

    {
      value: '310104',
      text: '徐汇区' },

    {
      value: '310105',
      text: '长宁区' },

    {
      value: '310106',
      text: '静安区' },

    {
      value: '310107',
      text: '普陀区' },

    {
      value: '310109',
      text: '虹口区' },

    {
      value: '310110',
      text: '杨浦区' },

    {
      value: '310112',
      text: '闵行区' },

    {
      value: '310113',
      text: '宝山区' },

    {
      value: '310114',
      text: '嘉定区' },

    {
      value: '310115',
      text: '浦东新区' },

    {
      value: '310116',
      text: '金山区' },

    {
      value: '310117',
      text: '松江区' },

    {
      value: '310118',
      text: '青浦区' },

    {
      value: '310120',
      text: '奉贤区' },

    {
      value: '310151',
      text: '崇明区' }] }] },





{
  value: '32',
  text: '江苏省',
  children: [
  {
    value: '3201',
    text: '南京市',
    children: [
    {
      value: '320102',
      text: '玄武区' },

    {
      value: '320104',
      text: '秦淮区' },

    {
      value: '320105',
      text: '建邺区' },

    {
      value: '320106',
      text: '鼓楼区' },

    {
      value: '320111',
      text: '浦口区' },

    {
      value: '320113',
      text: '栖霞区' },

    {
      value: '320114',
      text: '雨花台区' },

    {
      value: '320115',
      text: '江宁区' },

    {
      value: '320116',
      text: '六合区' },

    {
      value: '320117',
      text: '溧水区' },

    {
      value: '320118',
      text: '高淳区' }] },



  {
    value: '3202',
    text: '无锡市',
    children: [
    {
      value: '320205',
      text: '锡山区' },

    {
      value: '320206',
      text: '惠山区' },

    {
      value: '320211',
      text: '滨湖区' },

    {
      value: '320213',
      text: '梁溪区' },

    {
      value: '320214',
      text: '新吴区' },

    {
      value: '320281',
      text: '江阴市' },

    {
      value: '320282',
      text: '宜兴市' }] },



  {
    value: '3203',
    text: '徐州市',
    children: [
    {
      value: '320302',
      text: '鼓楼区' },

    {
      value: '320303',
      text: '云龙区' },

    {
      value: '320305',
      text: '贾汪区' },

    {
      value: '320311',
      text: '泉山区' },

    {
      value: '320312',
      text: '铜山区' },

    {
      value: '320321',
      text: '丰县' },

    {
      value: '320322',
      text: '沛县' },

    {
      value: '320324',
      text: '睢宁县' },

    {
      value: '320371',
      text: '徐州经济技术开发区' },

    {
      value: '320381',
      text: '新沂市' },

    {
      value: '320382',
      text: '邳州市' }] },



  {
    value: '3204',
    text: '常州市',
    children: [
    {
      value: '320402',
      text: '天宁区' },

    {
      value: '320404',
      text: '钟楼区' },

    {
      value: '320411',
      text: '新北区' },

    {
      value: '320412',
      text: '武进区' },

    {
      value: '320413',
      text: '金坛区' },

    {
      value: '320481',
      text: '溧阳市' }] },



  {
    value: '3205',
    text: '苏州市',
    children: [
    {
      value: '320505',
      text: '虎丘区' },

    {
      value: '320506',
      text: '吴中区' },

    {
      value: '320507',
      text: '相城区' },

    {
      value: '320508',
      text: '姑苏区' },

    {
      value: '320509',
      text: '吴江区' },

    {
      value: '320571',
      text: '苏州工业园区' },

    {
      value: '320581',
      text: '常熟市' },

    {
      value: '320582',
      text: '张家港市' },

    {
      value: '320583',
      text: '昆山市' },

    {
      value: '320585',
      text: '太仓市' }] },



  {
    value: '3206',
    text: '南通市',
    children: [
    {
      value: '320602',
      text: '崇川区' },

    {
      value: '320611',
      text: '港闸区' },

    {
      value: '320612',
      text: '通州区' },

    {
      value: '320623',
      text: '如东县' },

    {
      value: '320671',
      text: '南通经济技术开发区' },

    {
      value: '320681',
      text: '启东市' },

    {
      value: '320682',
      text: '如皋市' },

    {
      value: '320684',
      text: '海门市' },

    {
      value: '320685',
      text: '海安市' }] },



  {
    value: '3207',
    text: '连云港市',
    children: [
    {
      value: '320703',
      text: '连云区' },

    {
      value: '320706',
      text: '海州区' },

    {
      value: '320707',
      text: '赣榆区' },

    {
      value: '320722',
      text: '东海县' },

    {
      value: '320723',
      text: '灌云县' },

    {
      value: '320724',
      text: '灌南县' },

    {
      value: '320771',
      text: '连云港经济技术开发区' },

    {
      value: '320772',
      text: '连云港高新技术产业开发区' }] },



  {
    value: '3208',
    text: '淮安市',
    children: [
    {
      value: '320803',
      text: '淮安区' },

    {
      value: '320804',
      text: '淮阴区' },

    {
      value: '320812',
      text: '清江浦区' },

    {
      value: '320813',
      text: '洪泽区' },

    {
      value: '320826',
      text: '涟水县' },

    {
      value: '320830',
      text: '盱眙县' },

    {
      value: '320831',
      text: '金湖县' },

    {
      value: '320871',
      text: '淮安经济技术开发区' }] },



  {
    value: '3209',
    text: '盐城市',
    children: [
    {
      value: '320902',
      text: '亭湖区' },

    {
      value: '320903',
      text: '盐都区' },

    {
      value: '320904',
      text: '大丰区' },

    {
      value: '320921',
      text: '响水县' },

    {
      value: '320922',
      text: '滨海县' },

    {
      value: '320923',
      text: '阜宁县' },

    {
      value: '320924',
      text: '射阳县' },

    {
      value: '320925',
      text: '建湖县' },

    {
      value: '320971',
      text: '盐城经济技术开发区' },

    {
      value: '320981',
      text: '东台市' }] },



  {
    value: '3210',
    text: '扬州市',
    children: [
    {
      value: '321002',
      text: '广陵区' },

    {
      value: '321003',
      text: '邗江区' },

    {
      value: '321012',
      text: '江都区' },

    {
      value: '321023',
      text: '宝应县' },

    {
      value: '321071',
      text: '扬州经济技术开发区' },

    {
      value: '321081',
      text: '仪征市' },

    {
      value: '321084',
      text: '高邮市' }] },



  {
    value: '3211',
    text: '镇江市',
    children: [
    {
      value: '321102',
      text: '京口区' },

    {
      value: '321111',
      text: '润州区' },

    {
      value: '321112',
      text: '丹徒区' },

    {
      value: '321171',
      text: '镇江新区' },

    {
      value: '321181',
      text: '丹阳市' },

    {
      value: '321182',
      text: '扬中市' },

    {
      value: '321183',
      text: '句容市' }] },



  {
    value: '3212',
    text: '泰州市',
    children: [
    {
      value: '321202',
      text: '海陵区' },

    {
      value: '321203',
      text: '高港区' },

    {
      value: '321204',
      text: '姜堰区' },

    {
      value: '321271',
      text: '泰州医药高新技术产业开发区' },

    {
      value: '321281',
      text: '兴化市' },

    {
      value: '321282',
      text: '靖江市' },

    {
      value: '321283',
      text: '泰兴市' }] },



  {
    value: '3213',
    text: '宿迁市',
    children: [
    {
      value: '321302',
      text: '宿城区' },

    {
      value: '321311',
      text: '宿豫区' },

    {
      value: '321322',
      text: '沭阳县' },

    {
      value: '321323',
      text: '泗阳县' },

    {
      value: '321324',
      text: '泗洪县' },

    {
      value: '321371',
      text: '宿迁经济技术开发区' }] }] },





{
  value: '33',
  text: '浙江省',
  children: [
  {
    value: '3301',
    text: '杭州市',
    children: [
    {
      value: '330102',
      text: '上城区' },

    {
      value: '330103',
      text: '下城区' },

    {
      value: '330104',
      text: '江干区' },

    {
      value: '330105',
      text: '拱墅区' },

    {
      value: '330106',
      text: '西湖区' },

    {
      value: '330108',
      text: '滨江区' },

    {
      value: '330109',
      text: '萧山区' },

    {
      value: '330110',
      text: '余杭区' },

    {
      value: '330111',
      text: '富阳区' },

    {
      value: '330112',
      text: '临安区' },

    {
      value: '330122',
      text: '桐庐县' },

    {
      value: '330127',
      text: '淳安县' },

    {
      value: '330182',
      text: '建德市' }] },



  {
    value: '3302',
    text: '宁波市',
    children: [
    {
      value: '330203',
      text: '海曙区' },

    {
      value: '330205',
      text: '江北区' },

    {
      value: '330206',
      text: '北仑区' },

    {
      value: '330211',
      text: '镇海区' },

    {
      value: '330212',
      text: '鄞州区' },

    {
      value: '330213',
      text: '奉化区' },

    {
      value: '330225',
      text: '象山县' },

    {
      value: '330226',
      text: '宁海县' },

    {
      value: '330281',
      text: '余姚市' },

    {
      value: '330282',
      text: '慈溪市' }] },



  {
    value: '3303',
    text: '温州市',
    children: [
    {
      value: '330302',
      text: '鹿城区' },

    {
      value: '330303',
      text: '龙湾区' },

    {
      value: '330304',
      text: '瓯海区' },

    {
      value: '330305',
      text: '洞头区' },

    {
      value: '330324',
      text: '永嘉县' },

    {
      value: '330326',
      text: '平阳县' },

    {
      value: '330327',
      text: '苍南县' },

    {
      value: '330328',
      text: '文成县' },

    {
      value: '330329',
      text: '泰顺县' },

    {
      value: '330371',
      text: '温州经济技术开发区' },

    {
      value: '330381',
      text: '瑞安市' },

    {
      value: '330382',
      text: '乐清市' },

    {
      value: '330383',
      text: '龙港市' }] },



  {
    value: '3304',
    text: '嘉兴市',
    children: [
    {
      value: '330402',
      text: '南湖区' },

    {
      value: '330411',
      text: '秀洲区' },

    {
      value: '330421',
      text: '嘉善县' },

    {
      value: '330424',
      text: '海盐县' },

    {
      value: '330481',
      text: '海宁市' },

    {
      value: '330482',
      text: '平湖市' },

    {
      value: '330483',
      text: '桐乡市' }] },



  {
    value: '3305',
    text: '湖州市',
    children: [
    {
      value: '330502',
      text: '吴兴区' },

    {
      value: '330503',
      text: '南浔区' },

    {
      value: '330521',
      text: '德清县' },

    {
      value: '330522',
      text: '长兴县' },

    {
      value: '330523',
      text: '安吉县' }] },



  {
    value: '3306',
    text: '绍兴市',
    children: [
    {
      value: '330602',
      text: '越城区' },

    {
      value: '330603',
      text: '柯桥区' },

    {
      value: '330604',
      text: '上虞区' },

    {
      value: '330624',
      text: '新昌县' },

    {
      value: '330681',
      text: '诸暨市' },

    {
      value: '330683',
      text: '嵊州市' }] },



  {
    value: '3307',
    text: '金华市',
    children: [
    {
      value: '330702',
      text: '婺城区' },

    {
      value: '330703',
      text: '金东区' },

    {
      value: '330723',
      text: '武义县' },

    {
      value: '330726',
      text: '浦江县' },

    {
      value: '330727',
      text: '磐安县' },

    {
      value: '330781',
      text: '兰溪市' },

    {
      value: '330782',
      text: '义乌市' },

    {
      value: '330783',
      text: '东阳市' },

    {
      value: '330784',
      text: '永康市' }] },



  {
    value: '3308',
    text: '衢州市',
    children: [
    {
      value: '330802',
      text: '柯城区' },

    {
      value: '330803',
      text: '衢江区' },

    {
      value: '330822',
      text: '常山县' },

    {
      value: '330824',
      text: '开化县' },

    {
      value: '330825',
      text: '龙游县' },

    {
      value: '330881',
      text: '江山市' }] },



  {
    value: '3309',
    text: '舟山市',
    children: [
    {
      value: '330902',
      text: '定海区' },

    {
      value: '330903',
      text: '普陀区' },

    {
      value: '330921',
      text: '岱山县' },

    {
      value: '330922',
      text: '嵊泗县' }] },



  {
    value: '3310',
    text: '台州市',
    children: [
    {
      value: '331002',
      text: '椒江区' },

    {
      value: '331003',
      text: '黄岩区' },

    {
      value: '331004',
      text: '路桥区' },

    {
      value: '331022',
      text: '三门县' },

    {
      value: '331023',
      text: '天台县' },

    {
      value: '331024',
      text: '仙居县' },

    {
      value: '331081',
      text: '温岭市' },

    {
      value: '331082',
      text: '临海市' },

    {
      value: '331083',
      text: '玉环市' }] },



  {
    value: '3311',
    text: '丽水市',
    children: [
    {
      value: '331102',
      text: '莲都区' },

    {
      value: '331121',
      text: '青田县' },

    {
      value: '331122',
      text: '缙云县' },

    {
      value: '331123',
      text: '遂昌县' },

    {
      value: '331124',
      text: '松阳县' },

    {
      value: '331125',
      text: '云和县' },

    {
      value: '331126',
      text: '庆元县' },

    {
      value: '331127',
      text: '景宁畲族自治县' },

    {
      value: '331181',
      text: '龙泉市' }] }] },





{
  value: '34',
  text: '安徽省',
  children: [
  {
    value: '3401',
    text: '合肥市',
    children: [
    {
      value: '340102',
      text: '瑶海区' },

    {
      value: '340103',
      text: '庐阳区' },

    {
      value: '340104',
      text: '蜀山区' },

    {
      value: '340111',
      text: '包河区' },

    {
      value: '340121',
      text: '长丰县' },

    {
      value: '340122',
      text: '肥东县' },

    {
      value: '340123',
      text: '肥西县' },

    {
      value: '340124',
      text: '庐江县' },

    {
      value: '340171',
      text: '合肥高新技术产业开发区' },

    {
      value: '340172',
      text: '合肥经济技术开发区' },

    {
      value: '340173',
      text: '合肥新站高新技术产业开发区' },

    {
      value: '340181',
      text: '巢湖市' }] },



  {
    value: '3402',
    text: '芜湖市',
    children: [
    {
      value: '340202',
      text: '镜湖区' },

    {
      value: '340203',
      text: '弋江区' },

    {
      value: '340207',
      text: '鸠江区' },

    {
      value: '340208',
      text: '三山区' },

    {
      value: '340221',
      text: '芜湖县' },

    {
      value: '340222',
      text: '繁昌县' },

    {
      value: '340223',
      text: '南陵县' },

    {
      value: '340271',
      text: '芜湖经济技术开发区' },

    {
      value: '340272',
      text: '安徽芜湖长江大桥经济开发区' },

    {
      value: '340281',
      text: '无为市' }] },



  {
    value: '3403',
    text: '蚌埠市',
    children: [
    {
      value: '340302',
      text: '龙子湖区' },

    {
      value: '340303',
      text: '蚌山区' },

    {
      value: '340304',
      text: '禹会区' },

    {
      value: '340311',
      text: '淮上区' },

    {
      value: '340321',
      text: '怀远县' },

    {
      value: '340322',
      text: '五河县' },

    {
      value: '340323',
      text: '固镇县' },

    {
      value: '340371',
      text: '蚌埠市高新技术开发区' },

    {
      value: '340372',
      text: '蚌埠市经济开发区' }] },



  {
    value: '3404',
    text: '淮南市',
    children: [
    {
      value: '340402',
      text: '大通区' },

    {
      value: '340403',
      text: '田家庵区' },

    {
      value: '340404',
      text: '谢家集区' },

    {
      value: '340405',
      text: '八公山区' },

    {
      value: '340406',
      text: '潘集区' },

    {
      value: '340421',
      text: '凤台县' },

    {
      value: '340422',
      text: '寿县' }] },



  {
    value: '3405',
    text: '马鞍山市',
    children: [
    {
      value: '340503',
      text: '花山区' },

    {
      value: '340504',
      text: '雨山区' },

    {
      value: '340506',
      text: '博望区' },

    {
      value: '340521',
      text: '当涂县' },

    {
      value: '340522',
      text: '含山县' },

    {
      value: '340523',
      text: '和县' }] },



  {
    value: '3406',
    text: '淮北市',
    children: [
    {
      value: '340602',
      text: '杜集区' },

    {
      value: '340603',
      text: '相山区' },

    {
      value: '340604',
      text: '烈山区' },

    {
      value: '340621',
      text: '濉溪县' }] },



  {
    value: '3407',
    text: '铜陵市',
    children: [
    {
      value: '340705',
      text: '铜官区' },

    {
      value: '340706',
      text: '义安区' },

    {
      value: '340711',
      text: '郊区' },

    {
      value: '340722',
      text: '枞阳县' }] },



  {
    value: '3408',
    text: '安庆市',
    children: [
    {
      value: '340802',
      text: '迎江区' },

    {
      value: '340803',
      text: '大观区' },

    {
      value: '340811',
      text: '宜秀区' },

    {
      value: '340822',
      text: '怀宁县' },

    {
      value: '340825',
      text: '太湖县' },

    {
      value: '340826',
      text: '宿松县' },

    {
      value: '340827',
      text: '望江县' },

    {
      value: '340828',
      text: '岳西县' },

    {
      value: '340871',
      text: '安徽安庆经济开发区' },

    {
      value: '340881',
      text: '桐城市' },

    {
      value: '340882',
      text: '潜山市' }] },



  {
    value: '3410',
    text: '黄山市',
    children: [
    {
      value: '341002',
      text: '屯溪区' },

    {
      value: '341003',
      text: '黄山区' },

    {
      value: '341004',
      text: '徽州区' },

    {
      value: '341021',
      text: '歙县' },

    {
      value: '341022',
      text: '休宁县' },

    {
      value: '341023',
      text: '黟县' },

    {
      value: '341024',
      text: '祁门县' }] },



  {
    value: '3411',
    text: '滁州市',
    children: [
    {
      value: '341102',
      text: '琅琊区' },

    {
      value: '341103',
      text: '南谯区' },

    {
      value: '341122',
      text: '来安县' },

    {
      value: '341124',
      text: '全椒县' },

    {
      value: '341125',
      text: '定远县' },

    {
      value: '341126',
      text: '凤阳县' },

    {
      value: '341171',
      text: '苏滁现代产业园' },

    {
      value: '341172',
      text: '滁州经济技术开发区' },

    {
      value: '341181',
      text: '天长市' },

    {
      value: '341182',
      text: '明光市' }] },



  {
    value: '3412',
    text: '阜阳市',
    children: [
    {
      value: '341202',
      text: '颍州区' },

    {
      value: '341203',
      text: '颍东区' },

    {
      value: '341204',
      text: '颍泉区' },

    {
      value: '341221',
      text: '临泉县' },

    {
      value: '341222',
      text: '太和县' },

    {
      value: '341225',
      text: '阜南县' },

    {
      value: '341226',
      text: '颍上县' },

    {
      value: '341271',
      text: '阜阳合肥现代产业园区' },

    {
      value: '341272',
      text: '阜阳经济技术开发区' },

    {
      value: '341282',
      text: '界首市' }] },



  {
    value: '3413',
    text: '宿州市',
    children: [
    {
      value: '341302',
      text: '埇桥区' },

    {
      value: '341321',
      text: '砀山县' },

    {
      value: '341322',
      text: '萧县' },

    {
      value: '341323',
      text: '灵璧县' },

    {
      value: '341324',
      text: '泗县' },

    {
      value: '341371',
      text: '宿州马鞍山现代产业园区' },

    {
      value: '341372',
      text: '宿州经济技术开发区' }] },



  {
    value: '3415',
    text: '六安市',
    children: [
    {
      value: '341502',
      text: '金安区' },

    {
      value: '341503',
      text: '裕安区' },

    {
      value: '341504',
      text: '叶集区' },

    {
      value: '341522',
      text: '霍邱县' },

    {
      value: '341523',
      text: '舒城县' },

    {
      value: '341524',
      text: '金寨县' },

    {
      value: '341525',
      text: '霍山县' }] },



  {
    value: '3416',
    text: '亳州市',
    children: [
    {
      value: '341602',
      text: '谯城区' },

    {
      value: '341621',
      text: '涡阳县' },

    {
      value: '341622',
      text: '蒙城县' },

    {
      value: '341623',
      text: '利辛县' }] },



  {
    value: '3417',
    text: '池州市',
    children: [
    {
      value: '341702',
      text: '贵池区' },

    {
      value: '341721',
      text: '东至县' },

    {
      value: '341722',
      text: '石台县' },

    {
      value: '341723',
      text: '青阳县' }] },



  {
    value: '3418',
    text: '宣城市',
    children: [
    {
      value: '341802',
      text: '宣州区' },

    {
      value: '341821',
      text: '郎溪县' },

    {
      value: '341823',
      text: '泾县' },

    {
      value: '341824',
      text: '绩溪县' },

    {
      value: '341825',
      text: '旌德县' },

    {
      value: '341871',
      text: '宣城市经济开发区' },

    {
      value: '341881',
      text: '宁国市' },

    {
      value: '341882',
      text: '广德市' }] }] },





{
  value: '35',
  text: '福建省',
  children: [
  {
    value: '3501',
    text: '福州市',
    children: [
    {
      value: '350102',
      text: '鼓楼区' },

    {
      value: '350103',
      text: '台江区' },

    {
      value: '350104',
      text: '仓山区' },

    {
      value: '350105',
      text: '马尾区' },

    {
      value: '350111',
      text: '晋安区' },

    {
      value: '350112',
      text: '长乐区' },

    {
      value: '350121',
      text: '闽侯县' },

    {
      value: '350122',
      text: '连江县' },

    {
      value: '350123',
      text: '罗源县' },

    {
      value: '350124',
      text: '闽清县' },

    {
      value: '350125',
      text: '永泰县' },

    {
      value: '350128',
      text: '平潭县' },

    {
      value: '350181',
      text: '福清市' }] },



  {
    value: '3502',
    text: '厦门市',
    children: [
    {
      value: '350203',
      text: '思明区' },

    {
      value: '350205',
      text: '海沧区' },

    {
      value: '350206',
      text: '湖里区' },

    {
      value: '350211',
      text: '集美区' },

    {
      value: '350212',
      text: '同安区' },

    {
      value: '350213',
      text: '翔安区' }] },



  {
    value: '3503',
    text: '莆田市',
    children: [
    {
      value: '350302',
      text: '城厢区' },

    {
      value: '350303',
      text: '涵江区' },

    {
      value: '350304',
      text: '荔城区' },

    {
      value: '350305',
      text: '秀屿区' },

    {
      value: '350322',
      text: '仙游县' }] },



  {
    value: '3504',
    text: '三明市',
    children: [
    {
      value: '350402',
      text: '梅列区' },

    {
      value: '350403',
      text: '三元区' },

    {
      value: '350421',
      text: '明溪县' },

    {
      value: '350423',
      text: '清流县' },

    {
      value: '350424',
      text: '宁化县' },

    {
      value: '350425',
      text: '大田县' },

    {
      value: '350426',
      text: '尤溪县' },

    {
      value: '350427',
      text: '沙县' },

    {
      value: '350428',
      text: '将乐县' },

    {
      value: '350429',
      text: '泰宁县' },

    {
      value: '350430',
      text: '建宁县' },

    {
      value: '350481',
      text: '永安市' }] },



  {
    value: '3505',
    text: '泉州市',
    children: [
    {
      value: '350502',
      text: '鲤城区' },

    {
      value: '350503',
      text: '丰泽区' },

    {
      value: '350504',
      text: '洛江区' },

    {
      value: '350505',
      text: '泉港区' },

    {
      value: '350521',
      text: '惠安县' },

    {
      value: '350524',
      text: '安溪县' },

    {
      value: '350525',
      text: '永春县' },

    {
      value: '350526',
      text: '德化县' },

    {
      value: '350527',
      text: '金门县' },

    {
      value: '350581',
      text: '石狮市' },

    {
      value: '350582',
      text: '晋江市' },

    {
      value: '350583',
      text: '南安市' }] },



  {
    value: '3506',
    text: '漳州市',
    children: [
    {
      value: '350602',
      text: '芗城区' },

    {
      value: '350603',
      text: '龙文区' },

    {
      value: '350622',
      text: '云霄县' },

    {
      value: '350623',
      text: '漳浦县' },

    {
      value: '350624',
      text: '诏安县' },

    {
      value: '350625',
      text: '长泰县' },

    {
      value: '350626',
      text: '东山县' },

    {
      value: '350627',
      text: '南靖县' },

    {
      value: '350628',
      text: '平和县' },

    {
      value: '350629',
      text: '华安县' },

    {
      value: '350681',
      text: '龙海市' }] },



  {
    value: '3507',
    text: '南平市',
    children: [
    {
      value: '350702',
      text: '延平区' },

    {
      value: '350703',
      text: '建阳区' },

    {
      value: '350721',
      text: '顺昌县' },

    {
      value: '350722',
      text: '浦城县' },

    {
      value: '350723',
      text: '光泽县' },

    {
      value: '350724',
      text: '松溪县' },

    {
      value: '350725',
      text: '政和县' },

    {
      value: '350781',
      text: '邵武市' },

    {
      value: '350782',
      text: '武夷山市' },

    {
      value: '350783',
      text: '建瓯市' }] },



  {
    value: '3508',
    text: '龙岩市',
    children: [
    {
      value: '350802',
      text: '新罗区' },

    {
      value: '350803',
      text: '永定区' },

    {
      value: '350821',
      text: '长汀县' },

    {
      value: '350823',
      text: '上杭县' },

    {
      value: '350824',
      text: '武平县' },

    {
      value: '350825',
      text: '连城县' },

    {
      value: '350881',
      text: '漳平市' }] },



  {
    value: '3509',
    text: '宁德市',
    children: [
    {
      value: '350902',
      text: '蕉城区' },

    {
      value: '350921',
      text: '霞浦县' },

    {
      value: '350922',
      text: '古田县' },

    {
      value: '350923',
      text: '屏南县' },

    {
      value: '350924',
      text: '寿宁县' },

    {
      value: '350925',
      text: '周宁县' },

    {
      value: '350926',
      text: '柘荣县' },

    {
      value: '350981',
      text: '福安市' },

    {
      value: '350982',
      text: '福鼎市' }] }] },





{
  value: '36',
  text: '江西省',
  children: [
  {
    value: '3601',
    text: '南昌市',
    children: [
    {
      value: '360102',
      text: '东湖区' },

    {
      value: '360103',
      text: '西湖区' },

    {
      value: '360104',
      text: '青云谱区' },

    {
      value: '360111',
      text: '青山湖区' },

    {
      value: '360112',
      text: '新建区' },

    {
      value: '360113',
      text: '红谷滩区' },

    {
      value: '360121',
      text: '南昌县' },

    {
      value: '360123',
      text: '安义县' },

    {
      value: '360124',
      text: '进贤县' }] },



  {
    value: '3602',
    text: '景德镇市',
    children: [
    {
      value: '360202',
      text: '昌江区' },

    {
      value: '360203',
      text: '珠山区' },

    {
      value: '360222',
      text: '浮梁县' },

    {
      value: '360281',
      text: '乐平市' }] },



  {
    value: '3603',
    text: '萍乡市',
    children: [
    {
      value: '360302',
      text: '安源区' },

    {
      value: '360313',
      text: '湘东区' },

    {
      value: '360321',
      text: '莲花县' },

    {
      value: '360322',
      text: '上栗县' },

    {
      value: '360323',
      text: '芦溪县' }] },



  {
    value: '3604',
    text: '九江市',
    children: [
    {
      value: '360402',
      text: '濂溪区' },

    {
      value: '360403',
      text: '浔阳区' },

    {
      value: '360404',
      text: '柴桑区' },

    {
      value: '360423',
      text: '武宁县' },

    {
      value: '360424',
      text: '修水县' },

    {
      value: '360425',
      text: '永修县' },

    {
      value: '360426',
      text: '德安县' },

    {
      value: '360428',
      text: '都昌县' },

    {
      value: '360429',
      text: '湖口县' },

    {
      value: '360430',
      text: '彭泽县' },

    {
      value: '360481',
      text: '瑞昌市' },

    {
      value: '360482',
      text: '共青城市' },

    {
      value: '360483',
      text: '庐山市' }] },



  {
    value: '3605',
    text: '新余市',
    children: [
    {
      value: '360502',
      text: '渝水区' },

    {
      value: '360521',
      text: '分宜县' }] },



  {
    value: '3606',
    text: '鹰潭市',
    children: [
    {
      value: '360602',
      text: '月湖区' },

    {
      value: '360603',
      text: '余江区' },

    {
      value: '360681',
      text: '贵溪市' }] },



  {
    value: '3607',
    text: '赣州市',
    children: [
    {
      value: '360702',
      text: '章贡区' },

    {
      value: '360703',
      text: '南康区' },

    {
      value: '360704',
      text: '赣县区' },

    {
      value: '360722',
      text: '信丰县' },

    {
      value: '360723',
      text: '大余县' },

    {
      value: '360724',
      text: '上犹县' },

    {
      value: '360725',
      text: '崇义县' },

    {
      value: '360726',
      text: '安远县' },

    {
      value: '360728',
      text: '定南县' },

    {
      value: '360729',
      text: '全南县' },

    {
      value: '360730',
      text: '宁都县' },

    {
      value: '360731',
      text: '于都县' },

    {
      value: '360732',
      text: '兴国县' },

    {
      value: '360733',
      text: '会昌县' },

    {
      value: '360734',
      text: '寻乌县' },

    {
      value: '360735',
      text: '石城县' },

    {
      value: '360781',
      text: '瑞金市' },

    {
      value: '360783',
      text: '龙南市' }] },



  {
    value: '3608',
    text: '吉安市',
    children: [
    {
      value: '360802',
      text: '吉州区' },

    {
      value: '360803',
      text: '青原区' },

    {
      value: '360821',
      text: '吉安县' },

    {
      value: '360822',
      text: '吉水县' },

    {
      value: '360823',
      text: '峡江县' },

    {
      value: '360824',
      text: '新干县' },

    {
      value: '360825',
      text: '永丰县' },

    {
      value: '360826',
      text: '泰和县' },

    {
      value: '360827',
      text: '遂川县' },

    {
      value: '360828',
      text: '万安县' },

    {
      value: '360829',
      text: '安福县' },

    {
      value: '360830',
      text: '永新县' },

    {
      value: '360881',
      text: '井冈山市' }] },



  {
    value: '3609',
    text: '宜春市',
    children: [
    {
      value: '360902',
      text: '袁州区' },

    {
      value: '360921',
      text: '奉新县' },

    {
      value: '360922',
      text: '万载县' },

    {
      value: '360923',
      text: '上高县' },

    {
      value: '360924',
      text: '宜丰县' },

    {
      value: '360925',
      text: '靖安县' },

    {
      value: '360926',
      text: '铜鼓县' },

    {
      value: '360981',
      text: '丰城市' },

    {
      value: '360982',
      text: '樟树市' },

    {
      value: '360983',
      text: '高安市' }] },



  {
    value: '3610',
    text: '抚州市',
    children: [
    {
      value: '361002',
      text: '临川区' },

    {
      value: '361003',
      text: '东乡区' },

    {
      value: '361021',
      text: '南城县' },

    {
      value: '361022',
      text: '黎川县' },

    {
      value: '361023',
      text: '南丰县' },

    {
      value: '361024',
      text: '崇仁县' },

    {
      value: '361025',
      text: '乐安县' },

    {
      value: '361026',
      text: '宜黄县' },

    {
      value: '361027',
      text: '金溪县' },

    {
      value: '361028',
      text: '资溪县' },

    {
      value: '361030',
      text: '广昌县' }] },



  {
    value: '3611',
    text: '上饶市',
    children: [
    {
      value: '361102',
      text: '信州区' },

    {
      value: '361103',
      text: '广丰区' },

    {
      value: '361104',
      text: '广信区' },

    {
      value: '361123',
      text: '玉山县' },

    {
      value: '361124',
      text: '铅山县' },

    {
      value: '361125',
      text: '横峰县' },

    {
      value: '361126',
      text: '弋阳县' },

    {
      value: '361127',
      text: '余干县' },

    {
      value: '361128',
      text: '鄱阳县' },

    {
      value: '361129',
      text: '万年县' },

    {
      value: '361130',
      text: '婺源县' },

    {
      value: '361181',
      text: '德兴市' }] }] },





{
  value: '37',
  text: '山东省',
  children: [
  {
    value: '3701',
    text: '济南市',
    children: [
    {
      value: '370102',
      text: '历下区' },

    {
      value: '370103',
      text: '市中区' },

    {
      value: '370104',
      text: '槐荫区' },

    {
      value: '370105',
      text: '天桥区' },

    {
      value: '370112',
      text: '历城区' },

    {
      value: '370113',
      text: '长清区' },

    {
      value: '370114',
      text: '章丘区' },

    {
      value: '370115',
      text: '济阳区' },

    {
      value: '370116',
      text: '莱芜区' },

    {
      value: '370117',
      text: '钢城区' },

    {
      value: '370124',
      text: '平阴县' },

    {
      value: '370126',
      text: '商河县' },

    {
      value: '370171',
      text: '济南高新技术产业开发区' }] },



  {
    value: '3702',
    text: '青岛市',
    children: [
    {
      value: '370202',
      text: '市南区' },

    {
      value: '370203',
      text: '市北区' },

    {
      value: '370211',
      text: '黄岛区' },

    {
      value: '370212',
      text: '崂山区' },

    {
      value: '370213',
      text: '李沧区' },

    {
      value: '370214',
      text: '城阳区' },

    {
      value: '370215',
      text: '即墨区' },

    {
      value: '370271',
      text: '青岛高新技术产业开发区' },

    {
      value: '370281',
      text: '胶州市' },

    {
      value: '370283',
      text: '平度市' },

    {
      value: '370285',
      text: '莱西市' }] },



  {
    value: '3703',
    text: '淄博市',
    children: [
    {
      value: '370302',
      text: '淄川区' },

    {
      value: '370303',
      text: '张店区' },

    {
      value: '370304',
      text: '博山区' },

    {
      value: '370305',
      text: '临淄区' },

    {
      value: '370306',
      text: '周村区' },

    {
      value: '370321',
      text: '桓台县' },

    {
      value: '370322',
      text: '高青县' },

    {
      value: '370323',
      text: '沂源县' }] },



  {
    value: '3704',
    text: '枣庄市',
    children: [
    {
      value: '370402',
      text: '市中区' },

    {
      value: '370403',
      text: '薛城区' },

    {
      value: '370404',
      text: '峄城区' },

    {
      value: '370405',
      text: '台儿庄区' },

    {
      value: '370406',
      text: '山亭区' },

    {
      value: '370481',
      text: '滕州市' }] },



  {
    value: '3705',
    text: '东营市',
    children: [
    {
      value: '370502',
      text: '东营区' },

    {
      value: '370503',
      text: '河口区' },

    {
      value: '370505',
      text: '垦利区' },

    {
      value: '370522',
      text: '利津县' },

    {
      value: '370523',
      text: '广饶县' },

    {
      value: '370571',
      text: '东营经济技术开发区' },

    {
      value: '370572',
      text: '东营港经济开发区' }] },



  {
    value: '3706',
    text: '烟台市',
    children: [
    {
      value: '370602',
      text: '芝罘区' },

    {
      value: '370611',
      text: '福山区' },

    {
      value: '370612',
      text: '牟平区' },

    {
      value: '370613',
      text: '莱山区' },

    {
      value: '370614',
      text: '蓬莱区' },

    {
      value: '370671',
      text: '烟台高新技术产业开发区' },

    {
      value: '370672',
      text: '烟台经济技术开发区' },

    {
      value: '370681',
      text: '龙口市' },

    {
      value: '370682',
      text: '莱阳市' },

    {
      value: '370683',
      text: '莱州市' },

    {
      value: '370685',
      text: '招远市' },

    {
      value: '370686',
      text: '栖霞市' },

    {
      value: '370687',
      text: '海阳市' }] },



  {
    value: '3707',
    text: '潍坊市',
    children: [
    {
      value: '370702',
      text: '潍城区' },

    {
      value: '370703',
      text: '寒亭区' },

    {
      value: '370704',
      text: '坊子区' },

    {
      value: '370705',
      text: '奎文区' },

    {
      value: '370724',
      text: '临朐县' },

    {
      value: '370725',
      text: '昌乐县' },

    {
      value: '370772',
      text: '潍坊滨海经济技术开发区' },

    {
      value: '370781',
      text: '青州市' },

    {
      value: '370782',
      text: '诸城市' },

    {
      value: '370783',
      text: '寿光市' },

    {
      value: '370784',
      text: '安丘市' },

    {
      value: '370785',
      text: '高密市' },

    {
      value: '370786',
      text: '昌邑市' }] },



  {
    value: '3708',
    text: '济宁市',
    children: [
    {
      value: '370811',
      text: '任城区' },

    {
      value: '370812',
      text: '兖州区' },

    {
      value: '370826',
      text: '微山县' },

    {
      value: '370827',
      text: '鱼台县' },

    {
      value: '370828',
      text: '金乡县' },

    {
      value: '370829',
      text: '嘉祥县' },

    {
      value: '370830',
      text: '汶上县' },

    {
      value: '370831',
      text: '泗水县' },

    {
      value: '370832',
      text: '梁山县' },

    {
      value: '370871',
      text: '济宁高新技术产业开发区' },

    {
      value: '370881',
      text: '曲阜市' },

    {
      value: '370883',
      text: '邹城市' }] },



  {
    value: '3709',
    text: '泰安市',
    children: [
    {
      value: '370902',
      text: '泰山区' },

    {
      value: '370911',
      text: '岱岳区' },

    {
      value: '370921',
      text: '宁阳县' },

    {
      value: '370923',
      text: '东平县' },

    {
      value: '370982',
      text: '新泰市' },

    {
      value: '370983',
      text: '肥城市' }] },



  {
    value: '3710',
    text: '威海市',
    children: [
    {
      value: '371002',
      text: '环翠区' },

    {
      value: '371003',
      text: '文登区' },

    {
      value: '371071',
      text: '威海火炬高技术产业开发区' },

    {
      value: '371072',
      text: '威海经济技术开发区' },

    {
      value: '371073',
      text: '威海临港经济技术开发区' },

    {
      value: '371082',
      text: '荣成市' },

    {
      value: '371083',
      text: '乳山市' }] },



  {
    value: '3711',
    text: '日照市',
    children: [
    {
      value: '371102',
      text: '东港区' },

    {
      value: '371103',
      text: '岚山区' },

    {
      value: '371121',
      text: '五莲县' },

    {
      value: '371122',
      text: '莒县' },

    {
      value: '371171',
      text: '日照经济技术开发区' }] },



  {
    value: '3713',
    text: '临沂市',
    children: [
    {
      value: '371302',
      text: '兰山区' },

    {
      value: '371311',
      text: '罗庄区' },

    {
      value: '371312',
      text: '河东区' },

    {
      value: '371321',
      text: '沂南县' },

    {
      value: '371322',
      text: '郯城县' },

    {
      value: '371323',
      text: '沂水县' },

    {
      value: '371324',
      text: '兰陵县' },

    {
      value: '371325',
      text: '费县' },

    {
      value: '371326',
      text: '平邑县' },

    {
      value: '371327',
      text: '莒南县' },

    {
      value: '371328',
      text: '蒙阴县' },

    {
      value: '371329',
      text: '临沭县' },

    {
      value: '371371',
      text: '临沂高新技术产业开发区' }] },



  {
    value: '3714',
    text: '德州市',
    children: [
    {
      value: '371402',
      text: '德城区' },

    {
      value: '371403',
      text: '陵城区' },

    {
      value: '371422',
      text: '宁津县' },

    {
      value: '371423',
      text: '庆云县' },

    {
      value: '371424',
      text: '临邑县' },

    {
      value: '371425',
      text: '齐河县' },

    {
      value: '371426',
      text: '平原县' },

    {
      value: '371427',
      text: '夏津县' },

    {
      value: '371428',
      text: '武城县' },

    {
      value: '371471',
      text: '德州经济技术开发区' },

    {
      value: '371472',
      text: '德州运河经济开发区' },

    {
      value: '371481',
      text: '乐陵市' },

    {
      value: '371482',
      text: '禹城市' }] },



  {
    value: '3715',
    text: '聊城市',
    children: [
    {
      value: '371502',
      text: '东昌府区' },

    {
      value: '371503',
      text: '茌平区' },

    {
      value: '371521',
      text: '阳谷县' },

    {
      value: '371522',
      text: '莘县' },

    {
      value: '371524',
      text: '东阿县' },

    {
      value: '371525',
      text: '冠县' },

    {
      value: '371526',
      text: '高唐县' },

    {
      value: '371581',
      text: '临清市' }] },



  {
    value: '3716',
    text: '滨州市',
    children: [
    {
      value: '371602',
      text: '滨城区' },

    {
      value: '371603',
      text: '沾化区' },

    {
      value: '371621',
      text: '惠民县' },

    {
      value: '371622',
      text: '阳信县' },

    {
      value: '371623',
      text: '无棣县' },

    {
      value: '371625',
      text: '博兴县' },

    {
      value: '371681',
      text: '邹平市' }] },



  {
    value: '3717',
    text: '菏泽市',
    children: [
    {
      value: '371702',
      text: '牡丹区' },

    {
      value: '371703',
      text: '定陶区' },

    {
      value: '371721',
      text: '曹县' },

    {
      value: '371722',
      text: '单县' },

    {
      value: '371723',
      text: '成武县' },

    {
      value: '371724',
      text: '巨野县' },

    {
      value: '371725',
      text: '郓城县' },

    {
      value: '371726',
      text: '鄄城县' },

    {
      value: '371728',
      text: '东明县' },

    {
      value: '371771',
      text: '菏泽经济技术开发区' },

    {
      value: '371772',
      text: '菏泽高新技术开发区' }] }] },





{
  value: '41',
  text: '河南省',
  children: [
  {
    value: '4101',
    text: '郑州市',
    children: [
    {
      value: '410102',
      text: '中原区' },

    {
      value: '410103',
      text: '二七区' },

    {
      value: '410104',
      text: '管城回族区' },

    {
      value: '410105',
      text: '金水区' },

    {
      value: '410106',
      text: '上街区' },

    {
      value: '410108',
      text: '惠济区' },

    {
      value: '410122',
      text: '中牟县' },

    {
      value: '410171',
      text: '郑州经济技术开发区' },

    {
      value: '410172',
      text: '郑州高新技术产业开发区' },

    {
      value: '410173',
      text: '郑州航空港经济综合实验区' },

    {
      value: '410181',
      text: '巩义市' },

    {
      value: '410182',
      text: '荥阳市' },

    {
      value: '410183',
      text: '新密市' },

    {
      value: '410184',
      text: '新郑市' },

    {
      value: '410185',
      text: '登封市' }] },



  {
    value: '4102',
    text: '开封市',
    children: [
    {
      value: '410202',
      text: '龙亭区' },

    {
      value: '410203',
      text: '顺河回族区' },

    {
      value: '410204',
      text: '鼓楼区' },

    {
      value: '410205',
      text: '禹王台区' },

    {
      value: '410212',
      text: '祥符区' },

    {
      value: '410221',
      text: '杞县' },

    {
      value: '410222',
      text: '通许县' },

    {
      value: '410223',
      text: '尉氏县' },

    {
      value: '410225',
      text: '兰考县' }] },



  {
    value: '4103',
    text: '洛阳市',
    children: [
    {
      value: '410302',
      text: '老城区' },

    {
      value: '410303',
      text: '西工区' },

    {
      value: '410304',
      text: '瀍河回族区' },

    {
      value: '410305',
      text: '涧西区' },

    {
      value: '410306',
      text: '吉利区' },

    {
      value: '410311',
      text: '洛龙区' },

    {
      value: '410322',
      text: '孟津县' },

    {
      value: '410323',
      text: '新安县' },

    {
      value: '410324',
      text: '栾川县' },

    {
      value: '410325',
      text: '嵩县' },

    {
      value: '410326',
      text: '汝阳县' },

    {
      value: '410327',
      text: '宜阳县' },

    {
      value: '410328',
      text: '洛宁县' },

    {
      value: '410329',
      text: '伊川县' },

    {
      value: '410371',
      text: '洛阳高新技术产业开发区' },

    {
      value: '410381',
      text: '偃师市' }] },



  {
    value: '4104',
    text: '平顶山市',
    children: [
    {
      value: '410402',
      text: '新华区' },

    {
      value: '410403',
      text: '卫东区' },

    {
      value: '410404',
      text: '石龙区' },

    {
      value: '410411',
      text: '湛河区' },

    {
      value: '410421',
      text: '宝丰县' },

    {
      value: '410422',
      text: '叶县' },

    {
      value: '410423',
      text: '鲁山县' },

    {
      value: '410425',
      text: '郏县' },

    {
      value: '410471',
      text: '平顶山高新技术产业开发区' },

    {
      value: '410472',
      text: '平顶山市城乡一体化示范区' },

    {
      value: '410481',
      text: '舞钢市' },

    {
      value: '410482',
      text: '汝州市' }] },



  {
    value: '4105',
    text: '安阳市',
    children: [
    {
      value: '410502',
      text: '文峰区' },

    {
      value: '410503',
      text: '北关区' },

    {
      value: '410505',
      text: '殷都区' },

    {
      value: '410506',
      text: '龙安区' },

    {
      value: '410522',
      text: '安阳县' },

    {
      value: '410523',
      text: '汤阴县' },

    {
      value: '410526',
      text: '滑县' },

    {
      value: '410527',
      text: '内黄县' },

    {
      value: '410571',
      text: '安阳高新技术产业开发区' },

    {
      value: '410581',
      text: '林州市' }] },



  {
    value: '4106',
    text: '鹤壁市',
    children: [
    {
      value: '410602',
      text: '鹤山区' },

    {
      value: '410603',
      text: '山城区' },

    {
      value: '410611',
      text: '淇滨区' },

    {
      value: '410621',
      text: '浚县' },

    {
      value: '410622',
      text: '淇县' },

    {
      value: '410671',
      text: '鹤壁经济技术开发区' }] },



  {
    value: '4107',
    text: '新乡市',
    children: [
    {
      value: '410702',
      text: '红旗区' },

    {
      value: '410703',
      text: '卫滨区' },

    {
      value: '410704',
      text: '凤泉区' },

    {
      value: '410711',
      text: '牧野区' },

    {
      value: '410721',
      text: '新乡县' },

    {
      value: '410724',
      text: '获嘉县' },

    {
      value: '410725',
      text: '原阳县' },

    {
      value: '410726',
      text: '延津县' },

    {
      value: '410727',
      text: '封丘县' },

    {
      value: '410771',
      text: '新乡高新技术产业开发区' },

    {
      value: '410772',
      text: '新乡经济技术开发区' },

    {
      value: '410773',
      text: '新乡市平原城乡一体化示范区' },

    {
      value: '410781',
      text: '卫辉市' },

    {
      value: '410782',
      text: '辉县市' },

    {
      value: '410783',
      text: '长垣市' }] },



  {
    value: '4108',
    text: '焦作市',
    children: [
    {
      value: '410802',
      text: '解放区' },

    {
      value: '410803',
      text: '中站区' },

    {
      value: '410804',
      text: '马村区' },

    {
      value: '410811',
      text: '山阳区' },

    {
      value: '410821',
      text: '修武县' },

    {
      value: '410822',
      text: '博爱县' },

    {
      value: '410823',
      text: '武陟县' },

    {
      value: '410825',
      text: '温县' },

    {
      value: '410871',
      text: '焦作城乡一体化示范区' },

    {
      value: '410882',
      text: '沁阳市' },

    {
      value: '410883',
      text: '孟州市' }] },



  {
    value: '4109',
    text: '濮阳市',
    children: [
    {
      value: '410902',
      text: '华龙区' },

    {
      value: '410922',
      text: '清丰县' },

    {
      value: '410923',
      text: '南乐县' },

    {
      value: '410926',
      text: '范县' },

    {
      value: '410927',
      text: '台前县' },

    {
      value: '410928',
      text: '濮阳县' },

    {
      value: '410971',
      text: '河南濮阳工业园区' },

    {
      value: '410972',
      text: '濮阳经济技术开发区' }] },



  {
    value: '4110',
    text: '许昌市',
    children: [
    {
      value: '411002',
      text: '魏都区' },

    {
      value: '411003',
      text: '建安区' },

    {
      value: '411024',
      text: '鄢陵县' },

    {
      value: '411025',
      text: '襄城县' },

    {
      value: '411071',
      text: '许昌经济技术开发区' },

    {
      value: '411081',
      text: '禹州市' },

    {
      value: '411082',
      text: '长葛市' }] },



  {
    value: '4111',
    text: '漯河市',
    children: [
    {
      value: '411102',
      text: '源汇区' },

    {
      value: '411103',
      text: '郾城区' },

    {
      value: '411104',
      text: '召陵区' },

    {
      value: '411121',
      text: '舞阳县' },

    {
      value: '411122',
      text: '临颍县' },

    {
      value: '411171',
      text: '漯河经济技术开发区' }] },



  {
    value: '4112',
    text: '三门峡市',
    children: [
    {
      value: '411202',
      text: '湖滨区' },

    {
      value: '411203',
      text: '陕州区' },

    {
      value: '411221',
      text: '渑池县' },

    {
      value: '411224',
      text: '卢氏县' },

    {
      value: '411271',
      text: '河南三门峡经济开发区' },

    {
      value: '411281',
      text: '义马市' },

    {
      value: '411282',
      text: '灵宝市' }] },



  {
    value: '4113',
    text: '南阳市',
    children: [
    {
      value: '411302',
      text: '宛城区' },

    {
      value: '411303',
      text: '卧龙区' },

    {
      value: '411321',
      text: '南召县' },

    {
      value: '411322',
      text: '方城县' },

    {
      value: '411323',
      text: '西峡县' },

    {
      value: '411324',
      text: '镇平县' },

    {
      value: '411325',
      text: '内乡县' },

    {
      value: '411326',
      text: '淅川县' },

    {
      value: '411327',
      text: '社旗县' },

    {
      value: '411328',
      text: '唐河县' },

    {
      value: '411329',
      text: '新野县' },

    {
      value: '411330',
      text: '桐柏县' },

    {
      value: '411371',
      text: '南阳高新技术产业开发区' },

    {
      value: '411372',
      text: '南阳市城乡一体化示范区' },

    {
      value: '411381',
      text: '邓州市' }] },



  {
    value: '4114',
    text: '商丘市',
    children: [
    {
      value: '411402',
      text: '梁园区' },

    {
      value: '411403',
      text: '睢阳区' },

    {
      value: '411421',
      text: '民权县' },

    {
      value: '411422',
      text: '睢县' },

    {
      value: '411423',
      text: '宁陵县' },

    {
      value: '411424',
      text: '柘城县' },

    {
      value: '411425',
      text: '虞城县' },

    {
      value: '411426',
      text: '夏邑县' },

    {
      value: '411471',
      text: '豫东综合物流产业聚集区' },

    {
      value: '411472',
      text: '河南商丘经济开发区' },

    {
      value: '411481',
      text: '永城市' }] },



  {
    value: '4115',
    text: '信阳市',
    children: [
    {
      value: '411502',
      text: '浉河区' },

    {
      value: '411503',
      text: '平桥区' },

    {
      value: '411521',
      text: '罗山县' },

    {
      value: '411522',
      text: '光山县' },

    {
      value: '411523',
      text: '新县' },

    {
      value: '411524',
      text: '商城县' },

    {
      value: '411525',
      text: '固始县' },

    {
      value: '411526',
      text: '潢川县' },

    {
      value: '411527',
      text: '淮滨县' },

    {
      value: '411528',
      text: '息县' },

    {
      value: '411571',
      text: '信阳高新技术产业开发区' }] },



  {
    value: '4116',
    text: '周口市',
    children: [
    {
      value: '411602',
      text: '川汇区' },

    {
      value: '411603',
      text: '淮阳区' },

    {
      value: '411621',
      text: '扶沟县' },

    {
      value: '411622',
      text: '西华县' },

    {
      value: '411623',
      text: '商水县' },

    {
      value: '411624',
      text: '沈丘县' },

    {
      value: '411625',
      text: '郸城县' },

    {
      value: '411627',
      text: '太康县' },

    {
      value: '411628',
      text: '鹿邑县' },

    {
      value: '411671',
      text: '河南周口经济开发区' },

    {
      value: '411681',
      text: '项城市' }] },



  {
    value: '4117',
    text: '驻马店市',
    children: [
    {
      value: '411702',
      text: '驿城区' },

    {
      value: '411721',
      text: '西平县' },

    {
      value: '411722',
      text: '上蔡县' },

    {
      value: '411723',
      text: '平舆县' },

    {
      value: '411724',
      text: '正阳县' },

    {
      value: '411725',
      text: '确山县' },

    {
      value: '411726',
      text: '泌阳县' },

    {
      value: '411727',
      text: '汝南县' },

    {
      value: '411728',
      text: '遂平县' },

    {
      value: '411729',
      text: '新蔡县' },

    {
      value: '411771',
      text: '河南驻马店经济开发区' }] },



  {
    value: '4190',
    text: '省直辖县级行政区划',
    children: [
    {
      value: '419001',
      text: '济源市' }] }] },





{
  value: '42',
  text: '湖北省',
  children: [
  {
    value: '4201',
    text: '武汉市',
    children: [
    {
      value: '420102',
      text: '江岸区' },

    {
      value: '420103',
      text: '江汉区' },

    {
      value: '420104',
      text: '硚口区' },

    {
      value: '420105',
      text: '汉阳区' },

    {
      value: '420106',
      text: '武昌区' },

    {
      value: '420107',
      text: '青山区' },

    {
      value: '420111',
      text: '洪山区' },

    {
      value: '420112',
      text: '东西湖区' },

    {
      value: '420113',
      text: '汉南区' },

    {
      value: '420114',
      text: '蔡甸区' },

    {
      value: '420115',
      text: '江夏区' },

    {
      value: '420116',
      text: '黄陂区' },

    {
      value: '420117',
      text: '新洲区' }] },



  {
    value: '4202',
    text: '黄石市',
    children: [
    {
      value: '420202',
      text: '黄石港区' },

    {
      value: '420203',
      text: '西塞山区' },

    {
      value: '420204',
      text: '下陆区' },

    {
      value: '420205',
      text: '铁山区' },

    {
      value: '420222',
      text: '阳新县' },

    {
      value: '420281',
      text: '大冶市' }] },



  {
    value: '4203',
    text: '十堰市',
    children: [
    {
      value: '420302',
      text: '茅箭区' },

    {
      value: '420303',
      text: '张湾区' },

    {
      value: '420304',
      text: '郧阳区' },

    {
      value: '420322',
      text: '郧西县' },

    {
      value: '420323',
      text: '竹山县' },

    {
      value: '420324',
      text: '竹溪县' },

    {
      value: '420325',
      text: '房县' },

    {
      value: '420381',
      text: '丹江口市' }] },



  {
    value: '4205',
    text: '宜昌市',
    children: [
    {
      value: '420502',
      text: '西陵区' },

    {
      value: '420503',
      text: '伍家岗区' },

    {
      value: '420504',
      text: '点军区' },

    {
      value: '420505',
      text: '猇亭区' },

    {
      value: '420506',
      text: '夷陵区' },

    {
      value: '420525',
      text: '远安县' },

    {
      value: '420526',
      text: '兴山县' },

    {
      value: '420527',
      text: '秭归县' },

    {
      value: '420528',
      text: '长阳土家族自治县' },

    {
      value: '420529',
      text: '五峰土家族自治县' },

    {
      value: '420581',
      text: '宜都市' },

    {
      value: '420582',
      text: '当阳市' },

    {
      value: '420583',
      text: '枝江市' }] },



  {
    value: '4206',
    text: '襄阳市',
    children: [
    {
      value: '420602',
      text: '襄城区' },

    {
      value: '420606',
      text: '樊城区' },

    {
      value: '420607',
      text: '襄州区' },

    {
      value: '420624',
      text: '南漳县' },

    {
      value: '420625',
      text: '谷城县' },

    {
      value: '420626',
      text: '保康县' },

    {
      value: '420682',
      text: '老河口市' },

    {
      value: '420683',
      text: '枣阳市' },

    {
      value: '420684',
      text: '宜城市' }] },



  {
    value: '4207',
    text: '鄂州市',
    children: [
    {
      value: '420702',
      text: '梁子湖区' },

    {
      value: '420703',
      text: '华容区' },

    {
      value: '420704',
      text: '鄂城区' }] },



  {
    value: '4208',
    text: '荆门市',
    children: [
    {
      value: '420802',
      text: '东宝区' },

    {
      value: '420804',
      text: '掇刀区' },

    {
      value: '420822',
      text: '沙洋县' },

    {
      value: '420881',
      text: '钟祥市' },

    {
      value: '420882',
      text: '京山市' }] },



  {
    value: '4209',
    text: '孝感市',
    children: [
    {
      value: '420902',
      text: '孝南区' },

    {
      value: '420921',
      text: '孝昌县' },

    {
      value: '420922',
      text: '大悟县' },

    {
      value: '420923',
      text: '云梦县' },

    {
      value: '420981',
      text: '应城市' },

    {
      value: '420982',
      text: '安陆市' },

    {
      value: '420984',
      text: '汉川市' }] },



  {
    value: '4210',
    text: '荆州市',
    children: [
    {
      value: '421002',
      text: '沙市区' },

    {
      value: '421003',
      text: '荆州区' },

    {
      value: '421022',
      text: '公安县' },

    {
      value: '421023',
      text: '监利县' },

    {
      value: '421024',
      text: '江陵县' },

    {
      value: '421071',
      text: '荆州经济技术开发区' },

    {
      value: '421081',
      text: '石首市' },

    {
      value: '421083',
      text: '洪湖市' },

    {
      value: '421087',
      text: '松滋市' }] },



  {
    value: '4211',
    text: '黄冈市',
    children: [
    {
      value: '421102',
      text: '黄州区' },

    {
      value: '421121',
      text: '团风县' },

    {
      value: '421122',
      text: '红安县' },

    {
      value: '421123',
      text: '罗田县' },

    {
      value: '421124',
      text: '英山县' },

    {
      value: '421125',
      text: '浠水县' },

    {
      value: '421126',
      text: '蕲春县' },

    {
      value: '421127',
      text: '黄梅县' },

    {
      value: '421171',
      text: '龙感湖管理区' },

    {
      value: '421181',
      text: '麻城市' },

    {
      value: '421182',
      text: '武穴市' }] },



  {
    value: '4212',
    text: '咸宁市',
    children: [
    {
      value: '421202',
      text: '咸安区' },

    {
      value: '421221',
      text: '嘉鱼县' },

    {
      value: '421222',
      text: '通城县' },

    {
      value: '421223',
      text: '崇阳县' },

    {
      value: '421224',
      text: '通山县' },

    {
      value: '421281',
      text: '赤壁市' }] },



  {
    value: '4213',
    text: '随州市',
    children: [
    {
      value: '421303',
      text: '曾都区' },

    {
      value: '421321',
      text: '随县' },

    {
      value: '421381',
      text: '广水市' }] },



  {
    value: '4228',
    text: '恩施土家族苗族自治州',
    children: [
    {
      value: '422801',
      text: '恩施市' },

    {
      value: '422802',
      text: '利川市' },

    {
      value: '422822',
      text: '建始县' },

    {
      value: '422823',
      text: '巴东县' },

    {
      value: '422825',
      text: '宣恩县' },

    {
      value: '422826',
      text: '咸丰县' },

    {
      value: '422827',
      text: '来凤县' },

    {
      value: '422828',
      text: '鹤峰县' }] },



  {
    value: '4290',
    text: '省直辖县级行政区划',
    children: [
    {
      value: '429004',
      text: '仙桃市' },

    {
      value: '429005',
      text: '潜江市' },

    {
      value: '429006',
      text: '天门市' },

    {
      value: '429021',
      text: '神农架林区' }] }] },





{
  value: '43',
  text: '湖南省',
  children: [
  {
    value: '4301',
    text: '长沙市',
    children: [
    {
      value: '430102',
      text: '芙蓉区' },

    {
      value: '430103',
      text: '天心区' },

    {
      value: '430104',
      text: '岳麓区' },

    {
      value: '430105',
      text: '开福区' },

    {
      value: '430111',
      text: '雨花区' },

    {
      value: '430112',
      text: '望城区' },

    {
      value: '430121',
      text: '长沙县' },

    {
      value: '430181',
      text: '浏阳市' },

    {
      value: '430182',
      text: '宁乡市' }] },



  {
    value: '4302',
    text: '株洲市',
    children: [
    {
      value: '430202',
      text: '荷塘区' },

    {
      value: '430203',
      text: '芦淞区' },

    {
      value: '430204',
      text: '石峰区' },

    {
      value: '430211',
      text: '天元区' },

    {
      value: '430212',
      text: '渌口区' },

    {
      value: '430223',
      text: '攸县' },

    {
      value: '430224',
      text: '茶陵县' },

    {
      value: '430225',
      text: '炎陵县' },

    {
      value: '430271',
      text: '云龙示范区' },

    {
      value: '430281',
      text: '醴陵市' }] },



  {
    value: '4303',
    text: '湘潭市',
    children: [
    {
      value: '430302',
      text: '雨湖区' },

    {
      value: '430304',
      text: '岳塘区' },

    {
      value: '430321',
      text: '湘潭县' },

    {
      value: '430371',
      text: '湖南湘潭高新技术产业园区' },

    {
      value: '430372',
      text: '湘潭昭山示范区' },

    {
      value: '430373',
      text: '湘潭九华示范区' },

    {
      value: '430381',
      text: '湘乡市' },

    {
      value: '430382',
      text: '韶山市' }] },



  {
    value: '4304',
    text: '衡阳市',
    children: [
    {
      value: '430405',
      text: '珠晖区' },

    {
      value: '430406',
      text: '雁峰区' },

    {
      value: '430407',
      text: '石鼓区' },

    {
      value: '430408',
      text: '蒸湘区' },

    {
      value: '430412',
      text: '南岳区' },

    {
      value: '430421',
      text: '衡阳县' },

    {
      value: '430422',
      text: '衡南县' },

    {
      value: '430423',
      text: '衡山县' },

    {
      value: '430424',
      text: '衡东县' },

    {
      value: '430426',
      text: '祁东县' },

    {
      value: '430471',
      text: '衡阳综合保税区' },

    {
      value: '430472',
      text: '湖南衡阳高新技术产业园区' },

    {
      value: '430473',
      text: '湖南衡阳松木经济开发区' },

    {
      value: '430481',
      text: '耒阳市' },

    {
      value: '430482',
      text: '常宁市' }] },



  {
    value: '4305',
    text: '邵阳市',
    children: [
    {
      value: '430502',
      text: '双清区' },

    {
      value: '430503',
      text: '大祥区' },

    {
      value: '430511',
      text: '北塔区' },

    {
      value: '430522',
      text: '新邵县' },

    {
      value: '430523',
      text: '邵阳县' },

    {
      value: '430524',
      text: '隆回县' },

    {
      value: '430525',
      text: '洞口县' },

    {
      value: '430527',
      text: '绥宁县' },

    {
      value: '430528',
      text: '新宁县' },

    {
      value: '430529',
      text: '城步苗族自治县' },

    {
      value: '430581',
      text: '武冈市' },

    {
      value: '430582',
      text: '邵东市' }] },



  {
    value: '4306',
    text: '岳阳市',
    children: [
    {
      value: '430602',
      text: '岳阳楼区' },

    {
      value: '430603',
      text: '云溪区' },

    {
      value: '430611',
      text: '君山区' },

    {
      value: '430621',
      text: '岳阳县' },

    {
      value: '430623',
      text: '华容县' },

    {
      value: '430624',
      text: '湘阴县' },

    {
      value: '430626',
      text: '平江县' },

    {
      value: '430671',
      text: '岳阳市屈原管理区' },

    {
      value: '430681',
      text: '汨罗市' },

    {
      value: '430682',
      text: '临湘市' }] },



  {
    value: '4307',
    text: '常德市',
    children: [
    {
      value: '430702',
      text: '武陵区' },

    {
      value: '430703',
      text: '鼎城区' },

    {
      value: '430721',
      text: '安乡县' },

    {
      value: '430722',
      text: '汉寿县' },

    {
      value: '430723',
      text: '澧县' },

    {
      value: '430724',
      text: '临澧县' },

    {
      value: '430725',
      text: '桃源县' },

    {
      value: '430726',
      text: '石门县' },

    {
      value: '430771',
      text: '常德市西洞庭管理区' },

    {
      value: '430781',
      text: '津市市' }] },



  {
    value: '4308',
    text: '张家界市',
    children: [
    {
      value: '430802',
      text: '永定区' },

    {
      value: '430811',
      text: '武陵源区' },

    {
      value: '430821',
      text: '慈利县' },

    {
      value: '430822',
      text: '桑植县' }] },



  {
    value: '4309',
    text: '益阳市',
    children: [
    {
      value: '430902',
      text: '资阳区' },

    {
      value: '430903',
      text: '赫山区' },

    {
      value: '430921',
      text: '南县' },

    {
      value: '430922',
      text: '桃江县' },

    {
      value: '430923',
      text: '安化县' },

    {
      value: '430971',
      text: '益阳市大通湖管理区' },

    {
      value: '430972',
      text: '湖南益阳高新技术产业园区' },

    {
      value: '430981',
      text: '沅江市' }] },



  {
    value: '4310',
    text: '郴州市',
    children: [
    {
      value: '431002',
      text: '北湖区' },

    {
      value: '431003',
      text: '苏仙区' },

    {
      value: '431021',
      text: '桂阳县' },

    {
      value: '431022',
      text: '宜章县' },

    {
      value: '431023',
      text: '永兴县' },

    {
      value: '431024',
      text: '嘉禾县' },

    {
      value: '431025',
      text: '临武县' },

    {
      value: '431026',
      text: '汝城县' },

    {
      value: '431027',
      text: '桂东县' },

    {
      value: '431028',
      text: '安仁县' },

    {
      value: '431081',
      text: '资兴市' }] },



  {
    value: '4311',
    text: '永州市',
    children: [
    {
      value: '431102',
      text: '零陵区' },

    {
      value: '431103',
      text: '冷水滩区' },

    {
      value: '431121',
      text: '祁阳县' },

    {
      value: '431122',
      text: '东安县' },

    {
      value: '431123',
      text: '双牌县' },

    {
      value: '431124',
      text: '道县' },

    {
      value: '431125',
      text: '江永县' },

    {
      value: '431126',
      text: '宁远县' },

    {
      value: '431127',
      text: '蓝山县' },

    {
      value: '431128',
      text: '新田县' },

    {
      value: '431129',
      text: '江华瑶族自治县' },

    {
      value: '431171',
      text: '永州经济技术开发区' },

    {
      value: '431172',
      text: '永州市金洞管理区' },

    {
      value: '431173',
      text: '永州市回龙圩管理区' }] },



  {
    value: '4312',
    text: '怀化市',
    children: [
    {
      value: '431202',
      text: '鹤城区' },

    {
      value: '431221',
      text: '中方县' },

    {
      value: '431222',
      text: '沅陵县' },

    {
      value: '431223',
      text: '辰溪县' },

    {
      value: '431224',
      text: '溆浦县' },

    {
      value: '431225',
      text: '会同县' },

    {
      value: '431226',
      text: '麻阳苗族自治县' },

    {
      value: '431227',
      text: '新晃侗族自治县' },

    {
      value: '431228',
      text: '芷江侗族自治县' },

    {
      value: '431229',
      text: '靖州苗族侗族自治县' },

    {
      value: '431230',
      text: '通道侗族自治县' },

    {
      value: '431271',
      text: '怀化市洪江管理区' },

    {
      value: '431281',
      text: '洪江市' }] },



  {
    value: '4313',
    text: '娄底市',
    children: [
    {
      value: '431302',
      text: '娄星区' },

    {
      value: '431321',
      text: '双峰县' },

    {
      value: '431322',
      text: '新化县' },

    {
      value: '431381',
      text: '冷水江市' },

    {
      value: '431382',
      text: '涟源市' }] },



  {
    value: '4331',
    text: '湘西土家族苗族自治州',
    children: [
    {
      value: '433101',
      text: '吉首市' },

    {
      value: '433122',
      text: '泸溪县' },

    {
      value: '433123',
      text: '凤凰县' },

    {
      value: '433124',
      text: '花垣县' },

    {
      value: '433125',
      text: '保靖县' },

    {
      value: '433126',
      text: '古丈县' },

    {
      value: '433127',
      text: '永顺县' },

    {
      value: '433130',
      text: '龙山县' }] }] },





{
  value: '44',
  text: '广东省',
  children: [
  {
    value: '4401',
    text: '广州市',
    children: [
    {
      value: '440103',
      text: '荔湾区' },

    {
      value: '440104',
      text: '越秀区' },

    {
      value: '440105',
      text: '海珠区' },

    {
      value: '440106',
      text: '天河区' },

    {
      value: '440111',
      text: '白云区' },

    {
      value: '440112',
      text: '黄埔区' },

    {
      value: '440113',
      text: '番禺区' },

    {
      value: '440114',
      text: '花都区' },

    {
      value: '440115',
      text: '南沙区' },

    {
      value: '440117',
      text: '从化区' },

    {
      value: '440118',
      text: '增城区' }] },



  {
    value: '4402',
    text: '韶关市',
    children: [
    {
      value: '440203',
      text: '武江区' },

    {
      value: '440204',
      text: '浈江区' },

    {
      value: '440205',
      text: '曲江区' },

    {
      value: '440222',
      text: '始兴县' },

    {
      value: '440224',
      text: '仁化县' },

    {
      value: '440229',
      text: '翁源县' },

    {
      value: '440232',
      text: '乳源瑶族自治县' },

    {
      value: '440233',
      text: '新丰县' },

    {
      value: '440281',
      text: '乐昌市' },

    {
      value: '440282',
      text: '南雄市' }] },



  {
    value: '4403',
    text: '深圳市',
    children: [
    {
      value: '440303',
      text: '罗湖区' },

    {
      value: '440304',
      text: '福田区' },

    {
      value: '440305',
      text: '南山区' },

    {
      value: '440306',
      text: '宝安区' },

    {
      value: '440307',
      text: '龙岗区' },

    {
      value: '440308',
      text: '盐田区' },

    {
      value: '440309',
      text: '龙华区' },

    {
      value: '440310',
      text: '坪山区' },

    {
      value: '440311',
      text: '光明区' }] },



  {
    value: '4404',
    text: '珠海市',
    children: [
    {
      value: '440402',
      text: '香洲区' },

    {
      value: '440403',
      text: '斗门区' },

    {
      value: '440404',
      text: '金湾区' }] },



  {
    value: '4405',
    text: '汕头市',
    children: [
    {
      value: '440507',
      text: '龙湖区' },

    {
      value: '440511',
      text: '金平区' },

    {
      value: '440512',
      text: '濠江区' },

    {
      value: '440513',
      text: '潮阳区' },

    {
      value: '440514',
      text: '潮南区' },

    {
      value: '440515',
      text: '澄海区' },

    {
      value: '440523',
      text: '南澳县' }] },



  {
    value: '4406',
    text: '佛山市',
    children: [
    {
      value: '440604',
      text: '禅城区' },

    {
      value: '440605',
      text: '南海区' },

    {
      value: '440606',
      text: '顺德区' },

    {
      value: '440607',
      text: '三水区' },

    {
      value: '440608',
      text: '高明区' }] },



  {
    value: '4407',
    text: '江门市',
    children: [
    {
      value: '440703',
      text: '蓬江区' },

    {
      value: '440704',
      text: '江海区' },

    {
      value: '440705',
      text: '新会区' },

    {
      value: '440781',
      text: '台山市' },

    {
      value: '440783',
      text: '开平市' },

    {
      value: '440784',
      text: '鹤山市' },

    {
      value: '440785',
      text: '恩平市' }] },



  {
    value: '4408',
    text: '湛江市',
    children: [
    {
      value: '440802',
      text: '赤坎区' },

    {
      value: '440803',
      text: '霞山区' },

    {
      value: '440804',
      text: '坡头区' },

    {
      value: '440811',
      text: '麻章区' },

    {
      value: '440823',
      text: '遂溪县' },

    {
      value: '440825',
      text: '徐闻县' },

    {
      value: '440881',
      text: '廉江市' },

    {
      value: '440882',
      text: '雷州市' },

    {
      value: '440883',
      text: '吴川市' }] },



  {
    value: '4409',
    text: '茂名市',
    children: [
    {
      value: '440902',
      text: '茂南区' },

    {
      value: '440904',
      text: '电白区' },

    {
      value: '440981',
      text: '高州市' },

    {
      value: '440982',
      text: '化州市' },

    {
      value: '440983',
      text: '信宜市' }] },



  {
    value: '4412',
    text: '肇庆市',
    children: [
    {
      value: '441202',
      text: '端州区' },

    {
      value: '441203',
      text: '鼎湖区' },

    {
      value: '441204',
      text: '高要区' },

    {
      value: '441223',
      text: '广宁县' },

    {
      value: '441224',
      text: '怀集县' },

    {
      value: '441225',
      text: '封开县' },

    {
      value: '441226',
      text: '德庆县' },

    {
      value: '441284',
      text: '四会市' }] },



  {
    value: '4413',
    text: '惠州市',
    children: [
    {
      value: '441302',
      text: '惠城区' },

    {
      value: '441303',
      text: '惠阳区' },

    {
      value: '441322',
      text: '博罗县' },

    {
      value: '441323',
      text: '惠东县' },

    {
      value: '441324',
      text: '龙门县' }] },



  {
    value: '4414',
    text: '梅州市',
    children: [
    {
      value: '441402',
      text: '梅江区' },

    {
      value: '441403',
      text: '梅县区' },

    {
      value: '441422',
      text: '大埔县' },

    {
      value: '441423',
      text: '丰顺县' },

    {
      value: '441424',
      text: '五华县' },

    {
      value: '441426',
      text: '平远县' },

    {
      value: '441427',
      text: '蕉岭县' },

    {
      value: '441481',
      text: '兴宁市' }] },



  {
    value: '4415',
    text: '汕尾市',
    children: [
    {
      value: '441502',
      text: '城区' },

    {
      value: '441521',
      text: '海丰县' },

    {
      value: '441523',
      text: '陆河县' },

    {
      value: '441581',
      text: '陆丰市' }] },



  {
    value: '4416',
    text: '河源市',
    children: [
    {
      value: '441602',
      text: '源城区' },

    {
      value: '441621',
      text: '紫金县' },

    {
      value: '441622',
      text: '龙川县' },

    {
      value: '441623',
      text: '连平县' },

    {
      value: '441624',
      text: '和平县' },

    {
      value: '441625',
      text: '东源县' }] },



  {
    value: '4417',
    text: '阳江市',
    children: [
    {
      value: '441702',
      text: '江城区' },

    {
      value: '441704',
      text: '阳东区' },

    {
      value: '441721',
      text: '阳西县' },

    {
      value: '441781',
      text: '阳春市' }] },



  {
    value: '4418',
    text: '清远市',
    children: [
    {
      value: '441802',
      text: '清城区' },

    {
      value: '441803',
      text: '清新区' },

    {
      value: '441821',
      text: '佛冈县' },

    {
      value: '441823',
      text: '阳山县' },

    {
      value: '441825',
      text: '连山壮族瑶族自治县' },

    {
      value: '441826',
      text: '连南瑶族自治县' },

    {
      value: '441881',
      text: '英德市' },

    {
      value: '441882',
      text: '连州市' }] },



  {
    value: '4419',
    text: '东莞市',
    children: [
    {
      value: '441900003',
      text: '东城街道' },

    {
      value: '441900004',
      text: '南城街道' },

    {
      value: '441900005',
      text: '万江街道' },

    {
      value: '441900006',
      text: '莞城街道' },

    {
      value: '441900101',
      text: '石碣镇' },

    {
      value: '441900102',
      text: '石龙镇' },

    {
      value: '441900103',
      text: '茶山镇' },

    {
      value: '441900104',
      text: '石排镇' },

    {
      value: '441900105',
      text: '企石镇' },

    {
      value: '441900106',
      text: '横沥镇' },

    {
      value: '441900107',
      text: '桥头镇' },

    {
      value: '441900108',
      text: '谢岗镇' },

    {
      value: '441900109',
      text: '东坑镇' },

    {
      value: '441900110',
      text: '常平镇' },

    {
      value: '441900111',
      text: '寮步镇' },

    {
      value: '441900112',
      text: '樟木头镇' },

    {
      value: '441900113',
      text: '大朗镇' },

    {
      value: '441900114',
      text: '黄江镇' },

    {
      value: '441900115',
      text: '清溪镇' },

    {
      value: '441900116',
      text: '塘厦镇' },

    {
      value: '441900117',
      text: '凤岗镇' },

    {
      value: '441900118',
      text: '大岭山镇' },

    {
      value: '441900119',
      text: '长安镇' },

    {
      value: '441900121',
      text: '虎门镇' },

    {
      value: '441900122',
      text: '厚街镇' },

    {
      value: '441900123',
      text: '沙田镇' },

    {
      value: '441900124',
      text: '道滘镇' },

    {
      value: '441900125',
      text: '洪梅镇' },

    {
      value: '441900126',
      text: '麻涌镇' },

    {
      value: '441900127',
      text: '望牛墩镇' },

    {
      value: '441900128',
      text: '中堂镇' },

    {
      value: '441900129',
      text: '高埗镇' },

    {
      value: '441900401',
      text: '松山湖' },

    {
      value: '441900402',
      text: '东莞港' },

    {
      value: '441900403',
      text: '东莞生态园' }] },



  {
    value: '4420',
    text: '中山市',
    children: [
    {
      value: '442000001',
      text: '石岐街道' },

    {
      value: '442000002',
      text: '东区街道' },

    {
      value: '442000003',
      text: '中山港街道' },

    {
      value: '442000004',
      text: '西区街道' },

    {
      value: '442000005',
      text: '南区街道' },

    {
      value: '442000006',
      text: '五桂山街道' },

    {
      value: '442000100',
      text: '小榄镇' },

    {
      value: '442000101',
      text: '黄圃镇' },

    {
      value: '442000102',
      text: '民众镇' },

    {
      value: '442000103',
      text: '东凤镇' },

    {
      value: '442000104',
      text: '东升镇' },

    {
      value: '442000105',
      text: '古镇镇' },

    {
      value: '442000106',
      text: '沙溪镇' },

    {
      value: '442000107',
      text: '坦洲镇' },

    {
      value: '442000108',
      text: '港口镇' },

    {
      value: '442000109',
      text: '三角镇' },

    {
      value: '442000110',
      text: '横栏镇' },

    {
      value: '442000111',
      text: '南头镇' },

    {
      value: '442000112',
      text: '阜沙镇' },

    {
      value: '442000113',
      text: '南朗镇' },

    {
      value: '442000114',
      text: '三乡镇' },

    {
      value: '442000115',
      text: '板芙镇' },

    {
      value: '442000116',
      text: '大涌镇' },

    {
      value: '442000117',
      text: '神湾镇' }] },



  {
    value: '4451',
    text: '潮州市',
    children: [
    {
      value: '445102',
      text: '湘桥区' },

    {
      value: '445103',
      text: '潮安区' },

    {
      value: '445122',
      text: '饶平县' }] },



  {
    value: '4452',
    text: '揭阳市',
    children: [
    {
      value: '445202',
      text: '榕城区' },

    {
      value: '445203',
      text: '揭东区' },

    {
      value: '445222',
      text: '揭西县' },

    {
      value: '445224',
      text: '惠来县' },

    {
      value: '445281',
      text: '普宁市' }] },



  {
    value: '4453',
    text: '云浮市',
    children: [
    {
      value: '445302',
      text: '云城区' },

    {
      value: '445303',
      text: '云安区' },

    {
      value: '445321',
      text: '新兴县' },

    {
      value: '445322',
      text: '郁南县' },

    {
      value: '445381',
      text: '罗定市' }] }] },





{
  value: '45',
  text: '广西壮族自治区',
  children: [
  {
    value: '4501',
    text: '南宁市',
    children: [
    {
      value: '450102',
      text: '兴宁区' },

    {
      value: '450103',
      text: '青秀区' },

    {
      value: '450105',
      text: '江南区' },

    {
      value: '450107',
      text: '西乡塘区' },

    {
      value: '450108',
      text: '良庆区' },

    {
      value: '450109',
      text: '邕宁区' },

    {
      value: '450110',
      text: '武鸣区' },

    {
      value: '450123',
      text: '隆安县' },

    {
      value: '450124',
      text: '马山县' },

    {
      value: '450125',
      text: '上林县' },

    {
      value: '450126',
      text: '宾阳县' },

    {
      value: '450127',
      text: '横县' }] },



  {
    value: '4502',
    text: '柳州市',
    children: [
    {
      value: '450202',
      text: '城中区' },

    {
      value: '450203',
      text: '鱼峰区' },

    {
      value: '450204',
      text: '柳南区' },

    {
      value: '450205',
      text: '柳北区' },

    {
      value: '450206',
      text: '柳江区' },

    {
      value: '450222',
      text: '柳城县' },

    {
      value: '450223',
      text: '鹿寨县' },

    {
      value: '450224',
      text: '融安县' },

    {
      value: '450225',
      text: '融水苗族自治县' },

    {
      value: '450226',
      text: '三江侗族自治县' }] },



  {
    value: '4503',
    text: '桂林市',
    children: [
    {
      value: '450302',
      text: '秀峰区' },

    {
      value: '450303',
      text: '叠彩区' },

    {
      value: '450304',
      text: '象山区' },

    {
      value: '450305',
      text: '七星区' },

    {
      value: '450311',
      text: '雁山区' },

    {
      value: '450312',
      text: '临桂区' },

    {
      value: '450321',
      text: '阳朔县' },

    {
      value: '450323',
      text: '灵川县' },

    {
      value: '450324',
      text: '全州县' },

    {
      value: '450325',
      text: '兴安县' },

    {
      value: '450326',
      text: '永福县' },

    {
      value: '450327',
      text: '灌阳县' },

    {
      value: '450328',
      text: '龙胜各族自治县' },

    {
      value: '450329',
      text: '资源县' },

    {
      value: '450330',
      text: '平乐县' },

    {
      value: '450332',
      text: '恭城瑶族自治县' },

    {
      value: '450381',
      text: '荔浦市' }] },



  {
    value: '4504',
    text: '梧州市',
    children: [
    {
      value: '450403',
      text: '万秀区' },

    {
      value: '450405',
      text: '长洲区' },

    {
      value: '450406',
      text: '龙圩区' },

    {
      value: '450421',
      text: '苍梧县' },

    {
      value: '450422',
      text: '藤县' },

    {
      value: '450423',
      text: '蒙山县' },

    {
      value: '450481',
      text: '岑溪市' }] },



  {
    value: '4505',
    text: '北海市',
    children: [
    {
      value: '450502',
      text: '海城区' },

    {
      value: '450503',
      text: '银海区' },

    {
      value: '450512',
      text: '铁山港区' },

    {
      value: '450521',
      text: '合浦县' }] },



  {
    value: '4506',
    text: '防城港市',
    children: [
    {
      value: '450602',
      text: '港口区' },

    {
      value: '450603',
      text: '防城区' },

    {
      value: '450621',
      text: '上思县' },

    {
      value: '450681',
      text: '东兴市' }] },



  {
    value: '4507',
    text: '钦州市',
    children: [
    {
      value: '450702',
      text: '钦南区' },

    {
      value: '450703',
      text: '钦北区' },

    {
      value: '450721',
      text: '灵山县' },

    {
      value: '450722',
      text: '浦北县' }] },



  {
    value: '4508',
    text: '贵港市',
    children: [
    {
      value: '450802',
      text: '港北区' },

    {
      value: '450803',
      text: '港南区' },

    {
      value: '450804',
      text: '覃塘区' },

    {
      value: '450821',
      text: '平南县' },

    {
      value: '450881',
      text: '桂平市' }] },



  {
    value: '4509',
    text: '玉林市',
    children: [
    {
      value: '450902',
      text: '玉州区' },

    {
      value: '450903',
      text: '福绵区' },

    {
      value: '450921',
      text: '容县' },

    {
      value: '450922',
      text: '陆川县' },

    {
      value: '450923',
      text: '博白县' },

    {
      value: '450924',
      text: '兴业县' },

    {
      value: '450981',
      text: '北流市' }] },



  {
    value: '4510',
    text: '百色市',
    children: [
    {
      value: '451002',
      text: '右江区' },

    {
      value: '451003',
      text: '田阳区' },

    {
      value: '451022',
      text: '田东县' },

    {
      value: '451024',
      text: '德保县' },

    {
      value: '451026',
      text: '那坡县' },

    {
      value: '451027',
      text: '凌云县' },

    {
      value: '451028',
      text: '乐业县' },

    {
      value: '451029',
      text: '田林县' },

    {
      value: '451030',
      text: '西林县' },

    {
      value: '451031',
      text: '隆林各族自治县' },

    {
      value: '451081',
      text: '靖西市' },

    {
      value: '451082',
      text: '平果市' }] },



  {
    value: '4511',
    text: '贺州市',
    children: [
    {
      value: '451102',
      text: '八步区' },

    {
      value: '451103',
      text: '平桂区' },

    {
      value: '451121',
      text: '昭平县' },

    {
      value: '451122',
      text: '钟山县' },

    {
      value: '451123',
      text: '富川瑶族自治县' }] },



  {
    value: '4512',
    text: '河池市',
    children: [
    {
      value: '451202',
      text: '金城江区' },

    {
      value: '451203',
      text: '宜州区' },

    {
      value: '451221',
      text: '南丹县' },

    {
      value: '451222',
      text: '天峨县' },

    {
      value: '451223',
      text: '凤山县' },

    {
      value: '451224',
      text: '东兰县' },

    {
      value: '451225',
      text: '罗城仫佬族自治县' },

    {
      value: '451226',
      text: '环江毛南族自治县' },

    {
      value: '451227',
      text: '巴马瑶族自治县' },

    {
      value: '451228',
      text: '都安瑶族自治县' },

    {
      value: '451229',
      text: '大化瑶族自治县' }] },



  {
    value: '4513',
    text: '来宾市',
    children: [
    {
      value: '451302',
      text: '兴宾区' },

    {
      value: '451321',
      text: '忻城县' },

    {
      value: '451322',
      text: '象州县' },

    {
      value: '451323',
      text: '武宣县' },

    {
      value: '451324',
      text: '金秀瑶族自治县' },

    {
      value: '451381',
      text: '合山市' }] },



  {
    value: '4514',
    text: '崇左市',
    children: [
    {
      value: '451402',
      text: '江州区' },

    {
      value: '451421',
      text: '扶绥县' },

    {
      value: '451422',
      text: '宁明县' },

    {
      value: '451423',
      text: '龙州县' },

    {
      value: '451424',
      text: '大新县' },

    {
      value: '451425',
      text: '天等县' },

    {
      value: '451481',
      text: '凭祥市' }] }] },





{
  value: '46',
  text: '海南省',
  children: [
  {
    value: '4601',
    text: '海口市',
    children: [
    {
      value: '460105',
      text: '秀英区' },

    {
      value: '460106',
      text: '龙华区' },

    {
      value: '460107',
      text: '琼山区' },

    {
      value: '460108',
      text: '美兰区' }] },



  {
    value: '4602',
    text: '三亚市',
    children: [
    {
      value: '460202',
      text: '海棠区' },

    {
      value: '460203',
      text: '吉阳区' },

    {
      value: '460204',
      text: '天涯区' },

    {
      value: '460205',
      text: '崖州区' }] },



  {
    value: '4603',
    text: '三沙市',
    children: [
    {
      value: '460321',
      text: '西沙群岛' },

    {
      value: '460322',
      text: '南沙群岛' },

    {
      value: '460323',
      text: '中沙群岛的岛礁及其海域' }] },



  {
    value: '4604',
    text: '儋州市',
    children: [
    {
      value: '460400100',
      text: '那大镇' },

    {
      value: '460400101',
      text: '和庆镇' },

    {
      value: '460400102',
      text: '南丰镇' },

    {
      value: '460400103',
      text: '大成镇' },

    {
      value: '460400104',
      text: '雅星镇' },

    {
      value: '460400105',
      text: '兰洋镇' },

    {
      value: '460400106',
      text: '光村镇' },

    {
      value: '460400107',
      text: '木棠镇' },

    {
      value: '460400108',
      text: '海头镇' },

    {
      value: '460400109',
      text: '峨蔓镇' },

    {
      value: '460400111',
      text: '王五镇' },

    {
      value: '460400112',
      text: '白马井镇' },

    {
      value: '460400113',
      text: '中和镇' },

    {
      value: '460400114',
      text: '排浦镇' },

    {
      value: '460400115',
      text: '东成镇' },

    {
      value: '460400116',
      text: '新州镇' },

    {
      value: '460400499',
      text: '洋浦经济开发区' },

    {
      value: '460400500',
      text: '华南热作学院' }] },



  {
    value: '4690',
    text: '省直辖县级行政区划',
    children: [
    {
      value: '469001',
      text: '五指山市' },

    {
      value: '469002',
      text: '琼海市' },

    {
      value: '469005',
      text: '文昌市' },

    {
      value: '469006',
      text: '万宁市' },

    {
      value: '469007',
      text: '东方市' },

    {
      value: '469021',
      text: '定安县' },

    {
      value: '469022',
      text: '屯昌县' },

    {
      value: '469023',
      text: '澄迈县' },

    {
      value: '469024',
      text: '临高县' },

    {
      value: '469025',
      text: '白沙黎族自治县' },

    {
      value: '469026',
      text: '昌江黎族自治县' },

    {
      value: '469027',
      text: '乐东黎族自治县' },

    {
      value: '469028',
      text: '陵水黎族自治县' },

    {
      value: '469029',
      text: '保亭黎族苗族自治县' },

    {
      value: '469030',
      text: '琼中黎族苗族自治县' }] }] },





{
  value: '50',
  text: '重庆市',
  children: [
  {
    value: '5001',
    text: '市辖区',
    children: [
    {
      value: '500101',
      text: '万州区' },

    {
      value: '500102',
      text: '涪陵区' },

    {
      value: '500103',
      text: '渝中区' },

    {
      value: '500104',
      text: '大渡口区' },

    {
      value: '500105',
      text: '江北区' },

    {
      value: '500106',
      text: '沙坪坝区' },

    {
      value: '500107',
      text: '九龙坡区' },

    {
      value: '500108',
      text: '南岸区' },

    {
      value: '500109',
      text: '北碚区' },

    {
      value: '500110',
      text: '綦江区' },

    {
      value: '500111',
      text: '大足区' },

    {
      value: '500112',
      text: '渝北区' },

    {
      value: '500113',
      text: '巴南区' },

    {
      value: '500114',
      text: '黔江区' },

    {
      value: '500115',
      text: '长寿区' },

    {
      value: '500116',
      text: '江津区' },

    {
      value: '500117',
      text: '合川区' },

    {
      value: '500118',
      text: '永川区' },

    {
      value: '500119',
      text: '南川区' },

    {
      value: '500120',
      text: '璧山区' },

    {
      value: '500151',
      text: '铜梁区' },

    {
      value: '500152',
      text: '潼南区' },

    {
      value: '500153',
      text: '荣昌区' },

    {
      value: '500154',
      text: '开州区' },

    {
      value: '500155',
      text: '梁平区' },

    {
      value: '500156',
      text: '武隆区' }] },



  {
    value: '5002',
    text: '县',
    children: [
    {
      value: '500229',
      text: '城口县' },

    {
      value: '500230',
      text: '丰都县' },

    {
      value: '500231',
      text: '垫江县' },

    {
      value: '500233',
      text: '忠县' },

    {
      value: '500235',
      text: '云阳县' },

    {
      value: '500236',
      text: '奉节县' },

    {
      value: '500237',
      text: '巫山县' },

    {
      value: '500238',
      text: '巫溪县' },

    {
      value: '500240',
      text: '石柱土家族自治县' },

    {
      value: '500241',
      text: '秀山土家族苗族自治县' },

    {
      value: '500242',
      text: '酉阳土家族苗族自治县' },

    {
      value: '500243',
      text: '彭水苗族土家族自治县' }] }] },





{
  value: '51',
  text: '四川省',
  children: [
  {
    value: '5101',
    text: '成都市',
    children: [
    {
      value: '510104',
      text: '锦江区' },

    {
      value: '510105',
      text: '青羊区' },

    {
      value: '510106',
      text: '金牛区' },

    {
      value: '510107',
      text: '武侯区' },

    {
      value: '510108',
      text: '成华区' },

    {
      value: '510112',
      text: '龙泉驿区' },

    {
      value: '510113',
      text: '青白江区' },

    {
      value: '510114',
      text: '新都区' },

    {
      value: '510115',
      text: '温江区' },

    {
      value: '510116',
      text: '双流区' },

    {
      value: '510117',
      text: '郫都区' },

    {
      value: '510118',
      text: '新津区' },

    {
      value: '510121',
      text: '金堂县' },

    {
      value: '510129',
      text: '大邑县' },

    {
      value: '510131',
      text: '蒲江县' },

    {
      value: '510181',
      text: '都江堰市' },

    {
      value: '510182',
      text: '彭州市' },

    {
      value: '510183',
      text: '邛崃市' },

    {
      value: '510184',
      text: '崇州市' },

    {
      value: '510185',
      text: '简阳市' }] },



  {
    value: '5103',
    text: '自贡市',
    children: [
    {
      value: '510302',
      text: '自流井区' },

    {
      value: '510303',
      text: '贡井区' },

    {
      value: '510304',
      text: '大安区' },

    {
      value: '510311',
      text: '沿滩区' },

    {
      value: '510321',
      text: '荣县' },

    {
      value: '510322',
      text: '富顺县' }] },



  {
    value: '5104',
    text: '攀枝花市',
    children: [
    {
      value: '510402',
      text: '东区' },

    {
      value: '510403',
      text: '西区' },

    {
      value: '510411',
      text: '仁和区' },

    {
      value: '510421',
      text: '米易县' },

    {
      value: '510422',
      text: '盐边县' }] },



  {
    value: '5105',
    text: '泸州市',
    children: [
    {
      value: '510502',
      text: '江阳区' },

    {
      value: '510503',
      text: '纳溪区' },

    {
      value: '510504',
      text: '龙马潭区' },

    {
      value: '510521',
      text: '泸县' },

    {
      value: '510522',
      text: '合江县' },

    {
      value: '510524',
      text: '叙永县' },

    {
      value: '510525',
      text: '古蔺县' }] },



  {
    value: '5106',
    text: '德阳市',
    children: [
    {
      value: '510603',
      text: '旌阳区' },

    {
      value: '510604',
      text: '罗江区' },

    {
      value: '510623',
      text: '中江县' },

    {
      value: '510681',
      text: '广汉市' },

    {
      value: '510682',
      text: '什邡市' },

    {
      value: '510683',
      text: '绵竹市' }] },



  {
    value: '5107',
    text: '绵阳市',
    children: [
    {
      value: '510703',
      text: '涪城区' },

    {
      value: '510704',
      text: '游仙区' },

    {
      value: '510705',
      text: '安州区' },

    {
      value: '510722',
      text: '三台县' },

    {
      value: '510723',
      text: '盐亭县' },

    {
      value: '510725',
      text: '梓潼县' },

    {
      value: '510726',
      text: '北川羌族自治县' },

    {
      value: '510727',
      text: '平武县' },

    {
      value: '510781',
      text: '江油市' }] },



  {
    value: '5108',
    text: '广元市',
    children: [
    {
      value: '510802',
      text: '利州区' },

    {
      value: '510811',
      text: '昭化区' },

    {
      value: '510812',
      text: '朝天区' },

    {
      value: '510821',
      text: '旺苍县' },

    {
      value: '510822',
      text: '青川县' },

    {
      value: '510823',
      text: '剑阁县' },

    {
      value: '510824',
      text: '苍溪县' }] },



  {
    value: '5109',
    text: '遂宁市',
    children: [
    {
      value: '510903',
      text: '船山区' },

    {
      value: '510904',
      text: '安居区' },

    {
      value: '510921',
      text: '蓬溪县' },

    {
      value: '510923',
      text: '大英县' },

    {
      value: '510981',
      text: '射洪市' }] },



  {
    value: '5110',
    text: '内江市',
    children: [
    {
      value: '511002',
      text: '市中区' },

    {
      value: '511011',
      text: '东兴区' },

    {
      value: '511024',
      text: '威远县' },

    {
      value: '511025',
      text: '资中县' },

    {
      value: '511071',
      text: '内江经济开发区' },

    {
      value: '511083',
      text: '隆昌市' }] },



  {
    value: '5111',
    text: '乐山市',
    children: [
    {
      value: '511102',
      text: '市中区' },

    {
      value: '511111',
      text: '沙湾区' },

    {
      value: '511112',
      text: '五通桥区' },

    {
      value: '511113',
      text: '金口河区' },

    {
      value: '511123',
      text: '犍为县' },

    {
      value: '511124',
      text: '井研县' },

    {
      value: '511126',
      text: '夹江县' },

    {
      value: '511129',
      text: '沐川县' },

    {
      value: '511132',
      text: '峨边彝族自治县' },

    {
      value: '511133',
      text: '马边彝族自治县' },

    {
      value: '511181',
      text: '峨眉山市' }] },



  {
    value: '5113',
    text: '南充市',
    children: [
    {
      value: '511302',
      text: '顺庆区' },

    {
      value: '511303',
      text: '高坪区' },

    {
      value: '511304',
      text: '嘉陵区' },

    {
      value: '511321',
      text: '南部县' },

    {
      value: '511322',
      text: '营山县' },

    {
      value: '511323',
      text: '蓬安县' },

    {
      value: '511324',
      text: '仪陇县' },

    {
      value: '511325',
      text: '西充县' },

    {
      value: '511381',
      text: '阆中市' }] },



  {
    value: '5114',
    text: '眉山市',
    children: [
    {
      value: '511402',
      text: '东坡区' },

    {
      value: '511403',
      text: '彭山区' },

    {
      value: '511421',
      text: '仁寿县' },

    {
      value: '511423',
      text: '洪雅县' },

    {
      value: '511424',
      text: '丹棱县' },

    {
      value: '511425',
      text: '青神县' }] },



  {
    value: '5115',
    text: '宜宾市',
    children: [
    {
      value: '511502',
      text: '翠屏区' },

    {
      value: '511503',
      text: '南溪区' },

    {
      value: '511504',
      text: '叙州区' },

    {
      value: '511523',
      text: '江安县' },

    {
      value: '511524',
      text: '长宁县' },

    {
      value: '511525',
      text: '高县' },

    {
      value: '511526',
      text: '珙县' },

    {
      value: '511527',
      text: '筠连县' },

    {
      value: '511528',
      text: '兴文县' },

    {
      value: '511529',
      text: '屏山县' }] },



  {
    value: '5116',
    text: '广安市',
    children: [
    {
      value: '511602',
      text: '广安区' },

    {
      value: '511603',
      text: '前锋区' },

    {
      value: '511621',
      text: '岳池县' },

    {
      value: '511622',
      text: '武胜县' },

    {
      value: '511623',
      text: '邻水县' },

    {
      value: '511681',
      text: '华蓥市' }] },



  {
    value: '5117',
    text: '达州市',
    children: [
    {
      value: '511702',
      text: '通川区' },

    {
      value: '511703',
      text: '达川区' },

    {
      value: '511722',
      text: '宣汉县' },

    {
      value: '511723',
      text: '开江县' },

    {
      value: '511724',
      text: '大竹县' },

    {
      value: '511725',
      text: '渠县' },

    {
      value: '511771',
      text: '达州经济开发区' },

    {
      value: '511781',
      text: '万源市' }] },



  {
    value: '5118',
    text: '雅安市',
    children: [
    {
      value: '511802',
      text: '雨城区' },

    {
      value: '511803',
      text: '名山区' },

    {
      value: '511822',
      text: '荥经县' },

    {
      value: '511823',
      text: '汉源县' },

    {
      value: '511824',
      text: '石棉县' },

    {
      value: '511825',
      text: '天全县' },

    {
      value: '511826',
      text: '芦山县' },

    {
      value: '511827',
      text: '宝兴县' }] },



  {
    value: '5119',
    text: '巴中市',
    children: [
    {
      value: '511902',
      text: '巴州区' },

    {
      value: '511903',
      text: '恩阳区' },

    {
      value: '511921',
      text: '通江县' },

    {
      value: '511922',
      text: '南江县' },

    {
      value: '511923',
      text: '平昌县' },

    {
      value: '511971',
      text: '巴中经济开发区' }] },



  {
    value: '5120',
    text: '资阳市',
    children: [
    {
      value: '512002',
      text: '雁江区' },

    {
      value: '512021',
      text: '安岳县' },

    {
      value: '512022',
      text: '乐至县' }] },



  {
    value: '5132',
    text: '阿坝藏族羌族自治州',
    children: [
    {
      value: '513201',
      text: '马尔康市' },

    {
      value: '513221',
      text: '汶川县' },

    {
      value: '513222',
      text: '理县' },

    {
      value: '513223',
      text: '茂县' },

    {
      value: '513224',
      text: '松潘县' },

    {
      value: '513225',
      text: '九寨沟县' },

    {
      value: '513226',
      text: '金川县' },

    {
      value: '513227',
      text: '小金县' },

    {
      value: '513228',
      text: '黑水县' },

    {
      value: '513230',
      text: '壤塘县' },

    {
      value: '513231',
      text: '阿坝县' },

    {
      value: '513232',
      text: '若尔盖县' },

    {
      value: '513233',
      text: '红原县' }] },



  {
    value: '5133',
    text: '甘孜藏族自治州',
    children: [
    {
      value: '513301',
      text: '康定市' },

    {
      value: '513322',
      text: '泸定县' },

    {
      value: '513323',
      text: '丹巴县' },

    {
      value: '513324',
      text: '九龙县' },

    {
      value: '513325',
      text: '雅江县' },

    {
      value: '513326',
      text: '道孚县' },

    {
      value: '513327',
      text: '炉霍县' },

    {
      value: '513328',
      text: '甘孜县' },

    {
      value: '513329',
      text: '新龙县' },

    {
      value: '513330',
      text: '德格县' },

    {
      value: '513331',
      text: '白玉县' },

    {
      value: '513332',
      text: '石渠县' },

    {
      value: '513333',
      text: '色达县' },

    {
      value: '513334',
      text: '理塘县' },

    {
      value: '513335',
      text: '巴塘县' },

    {
      value: '513336',
      text: '乡城县' },

    {
      value: '513337',
      text: '稻城县' },

    {
      value: '513338',
      text: '得荣县' }] },



  {
    value: '5134',
    text: '凉山彝族自治州',
    children: [
    {
      value: '513401',
      text: '西昌市' },

    {
      value: '513422',
      text: '木里藏族自治县' },

    {
      value: '513423',
      text: '盐源县' },

    {
      value: '513424',
      text: '德昌县' },

    {
      value: '513425',
      text: '会理县' },

    {
      value: '513426',
      text: '会东县' },

    {
      value: '513427',
      text: '宁南县' },

    {
      value: '513428',
      text: '普格县' },

    {
      value: '513429',
      text: '布拖县' },

    {
      value: '513430',
      text: '金阳县' },

    {
      value: '513431',
      text: '昭觉县' },

    {
      value: '513432',
      text: '喜德县' },

    {
      value: '513433',
      text: '冕宁县' },

    {
      value: '513434',
      text: '越西县' },

    {
      value: '513435',
      text: '甘洛县' },

    {
      value: '513436',
      text: '美姑县' },

    {
      value: '513437',
      text: '雷波县' }] }] },





{
  value: '52',
  text: '贵州省',
  children: [
  {
    value: '5201',
    text: '贵阳市',
    children: [
    {
      value: '520102',
      text: '南明区' },

    {
      value: '520103',
      text: '云岩区' },

    {
      value: '520111',
      text: '花溪区' },

    {
      value: '520112',
      text: '乌当区' },

    {
      value: '520113',
      text: '白云区' },

    {
      value: '520115',
      text: '观山湖区' },

    {
      value: '520121',
      text: '开阳县' },

    {
      value: '520122',
      text: '息烽县' },

    {
      value: '520123',
      text: '修文县' },

    {
      value: '520181',
      text: '清镇市' }] },



  {
    value: '5202',
    text: '六盘水市',
    children: [
    {
      value: '520201',
      text: '钟山区' },

    {
      value: '520203',
      text: '六枝特区' },

    {
      value: '520221',
      text: '水城县' },

    {
      value: '520281',
      text: '盘州市' }] },



  {
    value: '5203',
    text: '遵义市',
    children: [
    {
      value: '520302',
      text: '红花岗区' },

    {
      value: '520303',
      text: '汇川区' },

    {
      value: '520304',
      text: '播州区' },

    {
      value: '520322',
      text: '桐梓县' },

    {
      value: '520323',
      text: '绥阳县' },

    {
      value: '520324',
      text: '正安县' },

    {
      value: '520325',
      text: '道真仡佬族苗族自治县' },

    {
      value: '520326',
      text: '务川仡佬族苗族自治县' },

    {
      value: '520327',
      text: '凤冈县' },

    {
      value: '520328',
      text: '湄潭县' },

    {
      value: '520329',
      text: '余庆县' },

    {
      value: '520330',
      text: '习水县' },

    {
      value: '520381',
      text: '赤水市' },

    {
      value: '520382',
      text: '仁怀市' }] },



  {
    value: '5204',
    text: '安顺市',
    children: [
    {
      value: '520402',
      text: '西秀区' },

    {
      value: '520403',
      text: '平坝区' },

    {
      value: '520422',
      text: '普定县' },

    {
      value: '520423',
      text: '镇宁布依族苗族自治县' },

    {
      value: '520424',
      text: '关岭布依族苗族自治县' },

    {
      value: '520425',
      text: '紫云苗族布依族自治县' }] },



  {
    value: '5205',
    text: '毕节市',
    children: [
    {
      value: '520502',
      text: '七星关区' },

    {
      value: '520521',
      text: '大方县' },

    {
      value: '520522',
      text: '黔西县' },

    {
      value: '520523',
      text: '金沙县' },

    {
      value: '520524',
      text: '织金县' },

    {
      value: '520525',
      text: '纳雍县' },

    {
      value: '520526',
      text: '威宁彝族回族苗族自治县' },

    {
      value: '520527',
      text: '赫章县' }] },



  {
    value: '5206',
    text: '铜仁市',
    children: [
    {
      value: '520602',
      text: '碧江区' },

    {
      value: '520603',
      text: '万山区' },

    {
      value: '520621',
      text: '江口县' },

    {
      value: '520622',
      text: '玉屏侗族自治县' },

    {
      value: '520623',
      text: '石阡县' },

    {
      value: '520624',
      text: '思南县' },

    {
      value: '520625',
      text: '印江土家族苗族自治县' },

    {
      value: '520626',
      text: '德江县' },

    {
      value: '520627',
      text: '沿河土家族自治县' },

    {
      value: '520628',
      text: '松桃苗族自治县' }] },



  {
    value: '5223',
    text: '黔西南布依族苗族自治州',
    children: [
    {
      value: '522301',
      text: '兴义市' },

    {
      value: '522302',
      text: '兴仁市' },

    {
      value: '522323',
      text: '普安县' },

    {
      value: '522324',
      text: '晴隆县' },

    {
      value: '522325',
      text: '贞丰县' },

    {
      value: '522326',
      text: '望谟县' },

    {
      value: '522327',
      text: '册亨县' },

    {
      value: '522328',
      text: '安龙县' }] },



  {
    value: '5226',
    text: '黔东南苗族侗族自治州',
    children: [
    {
      value: '522601',
      text: '凯里市' },

    {
      value: '522622',
      text: '黄平县' },

    {
      value: '522623',
      text: '施秉县' },

    {
      value: '522624',
      text: '三穗县' },

    {
      value: '522625',
      text: '镇远县' },

    {
      value: '522626',
      text: '岑巩县' },

    {
      value: '522627',
      text: '天柱县' },

    {
      value: '522628',
      text: '锦屏县' },

    {
      value: '522629',
      text: '剑河县' },

    {
      value: '522630',
      text: '台江县' },

    {
      value: '522631',
      text: '黎平县' },

    {
      value: '522632',
      text: '榕江县' },

    {
      value: '522633',
      text: '从江县' },

    {
      value: '522634',
      text: '雷山县' },

    {
      value: '522635',
      text: '麻江县' },

    {
      value: '522636',
      text: '丹寨县' }] },



  {
    value: '5227',
    text: '黔南布依族苗族自治州',
    children: [
    {
      value: '522701',
      text: '都匀市' },

    {
      value: '522702',
      text: '福泉市' },

    {
      value: '522722',
      text: '荔波县' },

    {
      value: '522723',
      text: '贵定县' },

    {
      value: '522725',
      text: '瓮安县' },

    {
      value: '522726',
      text: '独山县' },

    {
      value: '522727',
      text: '平塘县' },

    {
      value: '522728',
      text: '罗甸县' },

    {
      value: '522729',
      text: '长顺县' },

    {
      value: '522730',
      text: '龙里县' },

    {
      value: '522731',
      text: '惠水县' },

    {
      value: '522732',
      text: '三都水族自治县' }] }] },





{
  value: '53',
  text: '云南省',
  children: [
  {
    value: '5301',
    text: '昆明市',
    children: [
    {
      value: '530102',
      text: '五华区' },

    {
      value: '530103',
      text: '盘龙区' },

    {
      value: '530111',
      text: '官渡区' },

    {
      value: '530112',
      text: '西山区' },

    {
      value: '530113',
      text: '东川区' },

    {
      value: '530114',
      text: '呈贡区' },

    {
      value: '530115',
      text: '晋宁区' },

    {
      value: '530124',
      text: '富民县' },

    {
      value: '530125',
      text: '宜良县' },

    {
      value: '530126',
      text: '石林彝族自治县' },

    {
      value: '530127',
      text: '嵩明县' },

    {
      value: '530128',
      text: '禄劝彝族苗族自治县' },

    {
      value: '530129',
      text: '寻甸回族彝族自治县' },

    {
      value: '530181',
      text: '安宁市' }] },



  {
    value: '5303',
    text: '曲靖市',
    children: [
    {
      value: '530302',
      text: '麒麟区' },

    {
      value: '530303',
      text: '沾益区' },

    {
      value: '530304',
      text: '马龙区' },

    {
      value: '530322',
      text: '陆良县' },

    {
      value: '530323',
      text: '师宗县' },

    {
      value: '530324',
      text: '罗平县' },

    {
      value: '530325',
      text: '富源县' },

    {
      value: '530326',
      text: '会泽县' },

    {
      value: '530381',
      text: '宣威市' }] },



  {
    value: '5304',
    text: '玉溪市',
    children: [
    {
      value: '530402',
      text: '红塔区' },

    {
      value: '530403',
      text: '江川区' },

    {
      value: '530423',
      text: '通海县' },

    {
      value: '530424',
      text: '华宁县' },

    {
      value: '530425',
      text: '易门县' },

    {
      value: '530426',
      text: '峨山彝族自治县' },

    {
      value: '530427',
      text: '新平彝族傣族自治县' },

    {
      value: '530428',
      text: '元江哈尼族彝族傣族自治县' },

    {
      value: '530481',
      text: '澄江市' }] },



  {
    value: '5305',
    text: '保山市',
    children: [
    {
      value: '530502',
      text: '隆阳区' },

    {
      value: '530521',
      text: '施甸县' },

    {
      value: '530523',
      text: '龙陵县' },

    {
      value: '530524',
      text: '昌宁县' },

    {
      value: '530581',
      text: '腾冲市' }] },



  {
    value: '5306',
    text: '昭通市',
    children: [
    {
      value: '530602',
      text: '昭阳区' },

    {
      value: '530621',
      text: '鲁甸县' },

    {
      value: '530622',
      text: '巧家县' },

    {
      value: '530623',
      text: '盐津县' },

    {
      value: '530624',
      text: '大关县' },

    {
      value: '530625',
      text: '永善县' },

    {
      value: '530626',
      text: '绥江县' },

    {
      value: '530627',
      text: '镇雄县' },

    {
      value: '530628',
      text: '彝良县' },

    {
      value: '530629',
      text: '威信县' },

    {
      value: '530681',
      text: '水富市' }] },



  {
    value: '5307',
    text: '丽江市',
    children: [
    {
      value: '530702',
      text: '古城区' },

    {
      value: '530721',
      text: '玉龙纳西族自治县' },

    {
      value: '530722',
      text: '永胜县' },

    {
      value: '530723',
      text: '华坪县' },

    {
      value: '530724',
      text: '宁蒗彝族自治县' }] },



  {
    value: '5308',
    text: '普洱市',
    children: [
    {
      value: '530802',
      text: '思茅区' },

    {
      value: '530821',
      text: '宁洱哈尼族彝族自治县' },

    {
      value: '530822',
      text: '墨江哈尼族自治县' },

    {
      value: '530823',
      text: '景东彝族自治县' },

    {
      value: '530824',
      text: '景谷傣族彝族自治县' },

    {
      value: '530825',
      text: '镇沅彝族哈尼族拉祜族自治县' },

    {
      value: '530826',
      text: '江城哈尼族彝族自治县' },

    {
      value: '530827',
      text: '孟连傣族拉祜族佤族自治县' },

    {
      value: '530828',
      text: '澜沧拉祜族自治县' },

    {
      value: '530829',
      text: '西盟佤族自治县' }] },



  {
    value: '5309',
    text: '临沧市',
    children: [
    {
      value: '530902',
      text: '临翔区' },

    {
      value: '530921',
      text: '凤庆县' },

    {
      value: '530922',
      text: '云县' },

    {
      value: '530923',
      text: '永德县' },

    {
      value: '530924',
      text: '镇康县' },

    {
      value: '530925',
      text: '双江拉祜族佤族布朗族傣族自治县' },

    {
      value: '530926',
      text: '耿马傣族佤族自治县' },

    {
      value: '530927',
      text: '沧源佤族自治县' }] },



  {
    value: '5323',
    text: '楚雄彝族自治州',
    children: [
    {
      value: '532301',
      text: '楚雄市' },

    {
      value: '532322',
      text: '双柏县' },

    {
      value: '532323',
      text: '牟定县' },

    {
      value: '532324',
      text: '南华县' },

    {
      value: '532325',
      text: '姚安县' },

    {
      value: '532326',
      text: '大姚县' },

    {
      value: '532327',
      text: '永仁县' },

    {
      value: '532328',
      text: '元谋县' },

    {
      value: '532329',
      text: '武定县' },

    {
      value: '532331',
      text: '禄丰县' }] },



  {
    value: '5325',
    text: '红河哈尼族彝族自治州',
    children: [
    {
      value: '532501',
      text: '个旧市' },

    {
      value: '532502',
      text: '开远市' },

    {
      value: '532503',
      text: '蒙自市' },

    {
      value: '532504',
      text: '弥勒市' },

    {
      value: '532523',
      text: '屏边苗族自治县' },

    {
      value: '532524',
      text: '建水县' },

    {
      value: '532525',
      text: '石屏县' },

    {
      value: '532527',
      text: '泸西县' },

    {
      value: '532528',
      text: '元阳县' },

    {
      value: '532529',
      text: '红河县' },

    {
      value: '532530',
      text: '金平苗族瑶族傣族自治县' },

    {
      value: '532531',
      text: '绿春县' },

    {
      value: '532532',
      text: '河口瑶族自治县' }] },



  {
    value: '5326',
    text: '文山壮族苗族自治州',
    children: [
    {
      value: '532601',
      text: '文山市' },

    {
      value: '532622',
      text: '砚山县' },

    {
      value: '532623',
      text: '西畴县' },

    {
      value: '532624',
      text: '麻栗坡县' },

    {
      value: '532625',
      text: '马关县' },

    {
      value: '532626',
      text: '丘北县' },

    {
      value: '532627',
      text: '广南县' },

    {
      value: '532628',
      text: '富宁县' }] },



  {
    value: '5328',
    text: '西双版纳傣族自治州',
    children: [
    {
      value: '532801',
      text: '景洪市' },

    {
      value: '532822',
      text: '勐海县' },

    {
      value: '532823',
      text: '勐腊县' }] },



  {
    value: '5329',
    text: '大理白族自治州',
    children: [
    {
      value: '532901',
      text: '大理市' },

    {
      value: '532922',
      text: '漾濞彝族自治县' },

    {
      value: '532923',
      text: '祥云县' },

    {
      value: '532924',
      text: '宾川县' },

    {
      value: '532925',
      text: '弥渡县' },

    {
      value: '532926',
      text: '南涧彝族自治县' },

    {
      value: '532927',
      text: '巍山彝族回族自治县' },

    {
      value: '532928',
      text: '永平县' },

    {
      value: '532929',
      text: '云龙县' },

    {
      value: '532930',
      text: '洱源县' },

    {
      value: '532931',
      text: '剑川县' },

    {
      value: '532932',
      text: '鹤庆县' }] },



  {
    value: '5331',
    text: '德宏傣族景颇族自治州',
    children: [
    {
      value: '533102',
      text: '瑞丽市' },

    {
      value: '533103',
      text: '芒市' },

    {
      value: '533122',
      text: '梁河县' },

    {
      value: '533123',
      text: '盈江县' },

    {
      value: '533124',
      text: '陇川县' }] },



  {
    value: '5333',
    text: '怒江傈僳族自治州',
    children: [
    {
      value: '533301',
      text: '泸水市' },

    {
      value: '533323',
      text: '福贡县' },

    {
      value: '533324',
      text: '贡山独龙族怒族自治县' },

    {
      value: '533325',
      text: '兰坪白族普米族自治县' }] },



  {
    value: '5334',
    text: '迪庆藏族自治州',
    children: [
    {
      value: '533401',
      text: '香格里拉市' },

    {
      value: '533422',
      text: '德钦县' },

    {
      value: '533423',
      text: '维西傈僳族自治县' }] }] },





{
  value: '54',
  text: '西藏自治区',
  children: [
  {
    value: '5401',
    text: '拉萨市',
    children: [
    {
      value: '540102',
      text: '城关区' },

    {
      value: '540103',
      text: '堆龙德庆区' },

    {
      value: '540104',
      text: '达孜区' },

    {
      value: '540121',
      text: '林周县' },

    {
      value: '540122',
      text: '当雄县' },

    {
      value: '540123',
      text: '尼木县' },

    {
      value: '540124',
      text: '曲水县' },

    {
      value: '540127',
      text: '墨竹工卡县' },

    {
      value: '540171',
      text: '格尔木藏青工业园区' },

    {
      value: '540172',
      text: '拉萨经济技术开发区' },

    {
      value: '540173',
      text: '西藏文化旅游创意园区' },

    {
      value: '540174',
      text: '达孜工业园区' }] },



  {
    value: '5402',
    text: '日喀则市',
    children: [
    {
      value: '540202',
      text: '桑珠孜区' },

    {
      value: '540221',
      text: '南木林县' },

    {
      value: '540222',
      text: '江孜县' },

    {
      value: '540223',
      text: '定日县' },

    {
      value: '540224',
      text: '萨迦县' },

    {
      value: '540225',
      text: '拉孜县' },

    {
      value: '540226',
      text: '昂仁县' },

    {
      value: '540227',
      text: '谢通门县' },

    {
      value: '540228',
      text: '白朗县' },

    {
      value: '540229',
      text: '仁布县' },

    {
      value: '540230',
      text: '康马县' },

    {
      value: '540231',
      text: '定结县' },

    {
      value: '540232',
      text: '仲巴县' },

    {
      value: '540233',
      text: '亚东县' },

    {
      value: '540234',
      text: '吉隆县' },

    {
      value: '540235',
      text: '聂拉木县' },

    {
      value: '540236',
      text: '萨嘎县' },

    {
      value: '540237',
      text: '岗巴县' }] },



  {
    value: '5403',
    text: '昌都市',
    children: [
    {
      value: '540302',
      text: '卡若区' },

    {
      value: '540321',
      text: '江达县' },

    {
      value: '540322',
      text: '贡觉县' },

    {
      value: '540323',
      text: '类乌齐县' },

    {
      value: '540324',
      text: '丁青县' },

    {
      value: '540325',
      text: '察雅县' },

    {
      value: '540326',
      text: '八宿县' },

    {
      value: '540327',
      text: '左贡县' },

    {
      value: '540328',
      text: '芒康县' },

    {
      value: '540329',
      text: '洛隆县' },

    {
      value: '540330',
      text: '边坝县' }] },



  {
    value: '5404',
    text: '林芝市',
    children: [
    {
      value: '540402',
      text: '巴宜区' },

    {
      value: '540421',
      text: '工布江达县' },

    {
      value: '540422',
      text: '米林县' },

    {
      value: '540423',
      text: '墨脱县' },

    {
      value: '540424',
      text: '波密县' },

    {
      value: '540425',
      text: '察隅县' },

    {
      value: '540426',
      text: '朗县' }] },



  {
    value: '5405',
    text: '山南市',
    children: [
    {
      value: '540502',
      text: '乃东区' },

    {
      value: '540521',
      text: '扎囊县' },

    {
      value: '540522',
      text: '贡嘎县' },

    {
      value: '540523',
      text: '桑日县' },

    {
      value: '540524',
      text: '琼结县' },

    {
      value: '540525',
      text: '曲松县' },

    {
      value: '540526',
      text: '措美县' },

    {
      value: '540527',
      text: '洛扎县' },

    {
      value: '540528',
      text: '加查县' },

    {
      value: '540529',
      text: '隆子县' },

    {
      value: '540530',
      text: '错那县' },

    {
      value: '540531',
      text: '浪卡子县' }] },



  {
    value: '5406',
    text: '那曲市',
    children: [
    {
      value: '540602',
      text: '色尼区' },

    {
      value: '540621',
      text: '嘉黎县' },

    {
      value: '540622',
      text: '比如县' },

    {
      value: '540623',
      text: '聂荣县' },

    {
      value: '540624',
      text: '安多县' },

    {
      value: '540625',
      text: '申扎县' },

    {
      value: '540626',
      text: '索县' },

    {
      value: '540627',
      text: '班戈县' },

    {
      value: '540628',
      text: '巴青县' },

    {
      value: '540629',
      text: '尼玛县' },

    {
      value: '540630',
      text: '双湖县' }] },



  {
    value: '5425',
    text: '阿里地区',
    children: [
    {
      value: '542521',
      text: '普兰县' },

    {
      value: '542522',
      text: '札达县' },

    {
      value: '542523',
      text: '噶尔县' },

    {
      value: '542524',
      text: '日土县' },

    {
      value: '542525',
      text: '革吉县' },

    {
      value: '542526',
      text: '改则县' },

    {
      value: '542527',
      text: '措勤县' }] }] },





{
  value: '61',
  text: '陕西省',
  children: [
  {
    value: '6101',
    text: '西安市',
    children: [
    {
      value: '610102',
      text: '新城区' },

    {
      value: '610103',
      text: '碑林区' },

    {
      value: '610104',
      text: '莲湖区' },

    {
      value: '610111',
      text: '灞桥区' },

    {
      value: '610112',
      text: '未央区' },

    {
      value: '610113',
      text: '雁塔区' },

    {
      value: '610114',
      text: '阎良区' },

    {
      value: '610115',
      text: '临潼区' },

    {
      value: '610116',
      text: '长安区' },

    {
      value: '610117',
      text: '高陵区' },

    {
      value: '610118',
      text: '鄠邑区' },

    {
      value: '610122',
      text: '蓝田县' },

    {
      value: '610124',
      text: '周至县' }] },



  {
    value: '6102',
    text: '铜川市',
    children: [
    {
      value: '610202',
      text: '王益区' },

    {
      value: '610203',
      text: '印台区' },

    {
      value: '610204',
      text: '耀州区' },

    {
      value: '610222',
      text: '宜君县' }] },



  {
    value: '6103',
    text: '宝鸡市',
    children: [
    {
      value: '610302',
      text: '渭滨区' },

    {
      value: '610303',
      text: '金台区' },

    {
      value: '610304',
      text: '陈仓区' },

    {
      value: '610322',
      text: '凤翔县' },

    {
      value: '610323',
      text: '岐山县' },

    {
      value: '610324',
      text: '扶风县' },

    {
      value: '610326',
      text: '眉县' },

    {
      value: '610327',
      text: '陇县' },

    {
      value: '610328',
      text: '千阳县' },

    {
      value: '610329',
      text: '麟游县' },

    {
      value: '610330',
      text: '凤县' },

    {
      value: '610331',
      text: '太白县' }] },



  {
    value: '6104',
    text: '咸阳市',
    children: [
    {
      value: '610402',
      text: '秦都区' },

    {
      value: '610403',
      text: '杨陵区' },

    {
      value: '610404',
      text: '渭城区' },

    {
      value: '610422',
      text: '三原县' },

    {
      value: '610423',
      text: '泾阳县' },

    {
      value: '610424',
      text: '乾县' },

    {
      value: '610425',
      text: '礼泉县' },

    {
      value: '610426',
      text: '永寿县' },

    {
      value: '610428',
      text: '长武县' },

    {
      value: '610429',
      text: '旬邑县' },

    {
      value: '610430',
      text: '淳化县' },

    {
      value: '610431',
      text: '武功县' },

    {
      value: '610481',
      text: '兴平市' },

    {
      value: '610482',
      text: '彬州市' }] },



  {
    value: '6105',
    text: '渭南市',
    children: [
    {
      value: '610502',
      text: '临渭区' },

    {
      value: '610503',
      text: '华州区' },

    {
      value: '610522',
      text: '潼关县' },

    {
      value: '610523',
      text: '大荔县' },

    {
      value: '610524',
      text: '合阳县' },

    {
      value: '610525',
      text: '澄城县' },

    {
      value: '610526',
      text: '蒲城县' },

    {
      value: '610527',
      text: '白水县' },

    {
      value: '610528',
      text: '富平县' },

    {
      value: '610581',
      text: '韩城市' },

    {
      value: '610582',
      text: '华阴市' }] },



  {
    value: '6106',
    text: '延安市',
    children: [
    {
      value: '610602',
      text: '宝塔区' },

    {
      value: '610603',
      text: '安塞区' },

    {
      value: '610621',
      text: '延长县' },

    {
      value: '610622',
      text: '延川县' },

    {
      value: '610625',
      text: '志丹县' },

    {
      value: '610626',
      text: '吴起县' },

    {
      value: '610627',
      text: '甘泉县' },

    {
      value: '610628',
      text: '富县' },

    {
      value: '610629',
      text: '洛川县' },

    {
      value: '610630',
      text: '宜川县' },

    {
      value: '610631',
      text: '黄龙县' },

    {
      value: '610632',
      text: '黄陵县' },

    {
      value: '610681',
      text: '子长市' }] },



  {
    value: '6107',
    text: '汉中市',
    children: [
    {
      value: '610702',
      text: '汉台区' },

    {
      value: '610703',
      text: '南郑区' },

    {
      value: '610722',
      text: '城固县' },

    {
      value: '610723',
      text: '洋县' },

    {
      value: '610724',
      text: '西乡县' },

    {
      value: '610725',
      text: '勉县' },

    {
      value: '610726',
      text: '宁强县' },

    {
      value: '610727',
      text: '略阳县' },

    {
      value: '610728',
      text: '镇巴县' },

    {
      value: '610729',
      text: '留坝县' },

    {
      value: '610730',
      text: '佛坪县' }] },



  {
    value: '6108',
    text: '榆林市',
    children: [
    {
      value: '610802',
      text: '榆阳区' },

    {
      value: '610803',
      text: '横山区' },

    {
      value: '610822',
      text: '府谷县' },

    {
      value: '610824',
      text: '靖边县' },

    {
      value: '610825',
      text: '定边县' },

    {
      value: '610826',
      text: '绥德县' },

    {
      value: '610827',
      text: '米脂县' },

    {
      value: '610828',
      text: '佳县' },

    {
      value: '610829',
      text: '吴堡县' },

    {
      value: '610830',
      text: '清涧县' },

    {
      value: '610831',
      text: '子洲县' },

    {
      value: '610881',
      text: '神木市' }] },



  {
    value: '6109',
    text: '安康市',
    children: [
    {
      value: '610902',
      text: '汉滨区' },

    {
      value: '610921',
      text: '汉阴县' },

    {
      value: '610922',
      text: '石泉县' },

    {
      value: '610923',
      text: '宁陕县' },

    {
      value: '610924',
      text: '紫阳县' },

    {
      value: '610925',
      text: '岚皋县' },

    {
      value: '610926',
      text: '平利县' },

    {
      value: '610927',
      text: '镇坪县' },

    {
      value: '610928',
      text: '旬阳县' },

    {
      value: '610929',
      text: '白河县' }] },



  {
    value: '6110',
    text: '商洛市',
    children: [
    {
      value: '611002',
      text: '商州区' },

    {
      value: '611021',
      text: '洛南县' },

    {
      value: '611022',
      text: '丹凤县' },

    {
      value: '611023',
      text: '商南县' },

    {
      value: '611024',
      text: '山阳县' },

    {
      value: '611025',
      text: '镇安县' },

    {
      value: '611026',
      text: '柞水县' }] }] },





{
  value: '62',
  text: '甘肃省',
  children: [
  {
    value: '6201',
    text: '兰州市',
    children: [
    {
      value: '620102',
      text: '城关区' },

    {
      value: '620103',
      text: '七里河区' },

    {
      value: '620104',
      text: '西固区' },

    {
      value: '620105',
      text: '安宁区' },

    {
      value: '620111',
      text: '红古区' },

    {
      value: '620121',
      text: '永登县' },

    {
      value: '620122',
      text: '皋兰县' },

    {
      value: '620123',
      text: '榆中县' },

    {
      value: '620171',
      text: '兰州新区' }] },



  {
    value: '6202',
    text: '嘉峪关市',
    children: [
    {
      value: '620201001',
      text: '雄关街道' },

    {
      value: '620201002',
      text: '钢城街道' },

    {
      value: '620201100',
      text: '新城镇' },

    {
      value: '620201101',
      text: '峪泉镇' },

    {
      value: '620201102',
      text: '文殊镇' }] },



  {
    value: '6203',
    text: '金昌市',
    children: [
    {
      value: '620302',
      text: '金川区' },

    {
      value: '620321',
      text: '永昌县' }] },



  {
    value: '6204',
    text: '白银市',
    children: [
    {
      value: '620402',
      text: '白银区' },

    {
      value: '620403',
      text: '平川区' },

    {
      value: '620421',
      text: '靖远县' },

    {
      value: '620422',
      text: '会宁县' },

    {
      value: '620423',
      text: '景泰县' }] },



  {
    value: '6205',
    text: '天水市',
    children: [
    {
      value: '620502',
      text: '秦州区' },

    {
      value: '620503',
      text: '麦积区' },

    {
      value: '620521',
      text: '清水县' },

    {
      value: '620522',
      text: '秦安县' },

    {
      value: '620523',
      text: '甘谷县' },

    {
      value: '620524',
      text: '武山县' },

    {
      value: '620525',
      text: '张家川回族自治县' }] },



  {
    value: '6206',
    text: '武威市',
    children: [
    {
      value: '620602',
      text: '凉州区' },

    {
      value: '620621',
      text: '民勤县' },

    {
      value: '620622',
      text: '古浪县' },

    {
      value: '620623',
      text: '天祝藏族自治县' }] },



  {
    value: '6207',
    text: '张掖市',
    children: [
    {
      value: '620702',
      text: '甘州区' },

    {
      value: '620721',
      text: '肃南裕固族自治县' },

    {
      value: '620722',
      text: '民乐县' },

    {
      value: '620723',
      text: '临泽县' },

    {
      value: '620724',
      text: '高台县' },

    {
      value: '620725',
      text: '山丹县' }] },



  {
    value: '6208',
    text: '平凉市',
    children: [
    {
      value: '620802',
      text: '崆峒区' },

    {
      value: '620821',
      text: '泾川县' },

    {
      value: '620822',
      text: '灵台县' },

    {
      value: '620823',
      text: '崇信县' },

    {
      value: '620825',
      text: '庄浪县' },

    {
      value: '620826',
      text: '静宁县' },

    {
      value: '620881',
      text: '华亭市' }] },



  {
    value: '6209',
    text: '酒泉市',
    children: [
    {
      value: '620902',
      text: '肃州区' },

    {
      value: '620921',
      text: '金塔县' },

    {
      value: '620922',
      text: '瓜州县' },

    {
      value: '620923',
      text: '肃北蒙古族自治县' },

    {
      value: '620924',
      text: '阿克塞哈萨克族自治县' },

    {
      value: '620981',
      text: '玉门市' },

    {
      value: '620982',
      text: '敦煌市' }] },



  {
    value: '6210',
    text: '庆阳市',
    children: [
    {
      value: '621002',
      text: '西峰区' },

    {
      value: '621021',
      text: '庆城县' },

    {
      value: '621022',
      text: '环县' },

    {
      value: '621023',
      text: '华池县' },

    {
      value: '621024',
      text: '合水县' },

    {
      value: '621025',
      text: '正宁县' },

    {
      value: '621026',
      text: '宁县' },

    {
      value: '621027',
      text: '镇原县' }] },



  {
    value: '6211',
    text: '定西市',
    children: [
    {
      value: '621102',
      text: '安定区' },

    {
      value: '621121',
      text: '通渭县' },

    {
      value: '621122',
      text: '陇西县' },

    {
      value: '621123',
      text: '渭源县' },

    {
      value: '621124',
      text: '临洮县' },

    {
      value: '621125',
      text: '漳县' },

    {
      value: '621126',
      text: '岷县' }] },



  {
    value: '6212',
    text: '陇南市',
    children: [
    {
      value: '621202',
      text: '武都区' },

    {
      value: '621221',
      text: '成县' },

    {
      value: '621222',
      text: '文县' },

    {
      value: '621223',
      text: '宕昌县' },

    {
      value: '621224',
      text: '康县' },

    {
      value: '621225',
      text: '西和县' },

    {
      value: '621226',
      text: '礼县' },

    {
      value: '621227',
      text: '徽县' },

    {
      value: '621228',
      text: '两当县' }] },



  {
    value: '6229',
    text: '临夏回族自治州',
    children: [
    {
      value: '622901',
      text: '临夏市' },

    {
      value: '622921',
      text: '临夏县' },

    {
      value: '622922',
      text: '康乐县' },

    {
      value: '622923',
      text: '永靖县' },

    {
      value: '622924',
      text: '广河县' },

    {
      value: '622925',
      text: '和政县' },

    {
      value: '622926',
      text: '东乡族自治县' },

    {
      value: '622927',
      text: '积石山保安族东乡族撒拉族自治县' }] },



  {
    value: '6230',
    text: '甘南藏族自治州',
    children: [
    {
      value: '623001',
      text: '合作市' },

    {
      value: '623021',
      text: '临潭县' },

    {
      value: '623022',
      text: '卓尼县' },

    {
      value: '623023',
      text: '舟曲县' },

    {
      value: '623024',
      text: '迭部县' },

    {
      value: '623025',
      text: '玛曲县' },

    {
      value: '623026',
      text: '碌曲县' },

    {
      value: '623027',
      text: '夏河县' }] }] },





{
  value: '63',
  text: '青海省',
  children: [
  {
    value: '6301',
    text: '西宁市',
    children: [
    {
      value: '630102',
      text: '城东区' },

    {
      value: '630103',
      text: '城中区' },

    {
      value: '630104',
      text: '城西区' },

    {
      value: '630105',
      text: '城北区' },

    {
      value: '630106',
      text: '湟中区' },

    {
      value: '630121',
      text: '大通回族土族自治县' },

    {
      value: '630123',
      text: '湟源县' }] },



  {
    value: '6302',
    text: '海东市',
    children: [
    {
      value: '630202',
      text: '乐都区' },

    {
      value: '630203',
      text: '平安区' },

    {
      value: '630222',
      text: '民和回族土族自治县' },

    {
      value: '630223',
      text: '互助土族自治县' },

    {
      value: '630224',
      text: '化隆回族自治县' },

    {
      value: '630225',
      text: '循化撒拉族自治县' }] },



  {
    value: '6322',
    text: '海北藏族自治州',
    children: [
    {
      value: '632221',
      text: '门源回族自治县' },

    {
      value: '632222',
      text: '祁连县' },

    {
      value: '632223',
      text: '海晏县' },

    {
      value: '632224',
      text: '刚察县' }] },



  {
    value: '6323',
    text: '黄南藏族自治州',
    children: [
    {
      value: '632321',
      text: '同仁县' },

    {
      value: '632322',
      text: '尖扎县' },

    {
      value: '632323',
      text: '泽库县' },

    {
      value: '632324',
      text: '河南蒙古族自治县' }] },



  {
    value: '6325',
    text: '海南藏族自治州',
    children: [
    {
      value: '632521',
      text: '共和县' },

    {
      value: '632522',
      text: '同德县' },

    {
      value: '632523',
      text: '贵德县' },

    {
      value: '632524',
      text: '兴海县' },

    {
      value: '632525',
      text: '贵南县' }] },



  {
    value: '6326',
    text: '果洛藏族自治州',
    children: [
    {
      value: '632621',
      text: '玛沁县' },

    {
      value: '632622',
      text: '班玛县' },

    {
      value: '632623',
      text: '甘德县' },

    {
      value: '632624',
      text: '达日县' },

    {
      value: '632625',
      text: '久治县' },

    {
      value: '632626',
      text: '玛多县' }] },



  {
    value: '6327',
    text: '玉树藏族自治州',
    children: [
    {
      value: '632701',
      text: '玉树市' },

    {
      value: '632722',
      text: '杂多县' },

    {
      value: '632723',
      text: '称多县' },

    {
      value: '632724',
      text: '治多县' },

    {
      value: '632725',
      text: '囊谦县' },

    {
      value: '632726',
      text: '曲麻莱县' }] },



  {
    value: '6328',
    text: '海西蒙古族藏族自治州',
    children: [
    {
      value: '632801',
      text: '格尔木市' },

    {
      value: '632802',
      text: '德令哈市' },

    {
      value: '632803',
      text: '茫崖市' },

    {
      value: '632821',
      text: '乌兰县' },

    {
      value: '632822',
      text: '都兰县' },

    {
      value: '632823',
      text: '天峻县' },

    {
      value: '632857',
      text: '大柴旦行政委员会' }] }] },





{
  value: '64',
  text: '宁夏回族自治区',
  children: [
  {
    value: '6401',
    text: '银川市',
    children: [
    {
      value: '640104',
      text: '兴庆区' },

    {
      value: '640105',
      text: '西夏区' },

    {
      value: '640106',
      text: '金凤区' },

    {
      value: '640121',
      text: '永宁县' },

    {
      value: '640122',
      text: '贺兰县' },

    {
      value: '640181',
      text: '灵武市' }] },



  {
    value: '6402',
    text: '石嘴山市',
    children: [
    {
      value: '640202',
      text: '大武口区' },

    {
      value: '640205',
      text: '惠农区' },

    {
      value: '640221',
      text: '平罗县' }] },



  {
    value: '6403',
    text: '吴忠市',
    children: [
    {
      value: '640302',
      text: '利通区' },

    {
      value: '640303',
      text: '红寺堡区' },

    {
      value: '640323',
      text: '盐池县' },

    {
      value: '640324',
      text: '同心县' },

    {
      value: '640381',
      text: '青铜峡市' }] },



  {
    value: '6404',
    text: '固原市',
    children: [
    {
      value: '640402',
      text: '原州区' },

    {
      value: '640422',
      text: '西吉县' },

    {
      value: '640423',
      text: '隆德县' },

    {
      value: '640424',
      text: '泾源县' },

    {
      value: '640425',
      text: '彭阳县' }] },



  {
    value: '6405',
    text: '中卫市',
    children: [
    {
      value: '640502',
      text: '沙坡头区' },

    {
      value: '640521',
      text: '中宁县' },

    {
      value: '640522',
      text: '海原县' }] }] },





{
  value: '65',
  text: '新疆维吾尔自治区',
  children: [
  {
    value: '6501',
    text: '乌鲁木齐市',
    children: [
    {
      value: '650102',
      text: '天山区' },

    {
      value: '650103',
      text: '沙依巴克区' },

    {
      value: '650104',
      text: '新市区' },

    {
      value: '650105',
      text: '水磨沟区' },

    {
      value: '650106',
      text: '头屯河区' },

    {
      value: '650107',
      text: '达坂城区' },

    {
      value: '650109',
      text: '米东区' },

    {
      value: '650121',
      text: '乌鲁木齐县' }] },



  {
    value: '6502',
    text: '克拉玛依市',
    children: [
    {
      value: '650202',
      text: '独山子区' },

    {
      value: '650203',
      text: '克拉玛依区' },

    {
      value: '650204',
      text: '白碱滩区' },

    {
      value: '650205',
      text: '乌尔禾区' }] },



  {
    value: '6504',
    text: '吐鲁番市',
    children: [
    {
      value: '650402',
      text: '高昌区' },

    {
      value: '650421',
      text: '鄯善县' },

    {
      value: '650422',
      text: '托克逊县' }] },



  {
    value: '6505',
    text: '哈密市',
    children: [
    {
      value: '650502',
      text: '伊州区' },

    {
      value: '650521',
      text: '巴里坤哈萨克自治县' },

    {
      value: '650522',
      text: '伊吾县' }] },



  {
    value: '6523',
    text: '昌吉回族自治州',
    children: [
    {
      value: '652301',
      text: '昌吉市' },

    {
      value: '652302',
      text: '阜康市' },

    {
      value: '652323',
      text: '呼图壁县' },

    {
      value: '652324',
      text: '玛纳斯县' },

    {
      value: '652325',
      text: '奇台县' },

    {
      value: '652327',
      text: '吉木萨尔县' },

    {
      value: '652328',
      text: '木垒哈萨克自治县' }] },



  {
    value: '6527',
    text: '博尔塔拉蒙古自治州',
    children: [
    {
      value: '652701',
      text: '博乐市' },

    {
      value: '652702',
      text: '阿拉山口市' },

    {
      value: '652722',
      text: '精河县' },

    {
      value: '652723',
      text: '温泉县' }] },



  {
    value: '6528',
    text: '巴音郭楞蒙古自治州',
    children: [
    {
      value: '652801',
      text: '库尔勒市' },

    {
      value: '652822',
      text: '轮台县' },

    {
      value: '652823',
      text: '尉犁县' },

    {
      value: '652824',
      text: '若羌县' },

    {
      value: '652825',
      text: '且末县' },

    {
      value: '652826',
      text: '焉耆回族自治县' },

    {
      value: '652827',
      text: '和静县' },

    {
      value: '652828',
      text: '和硕县' },

    {
      value: '652829',
      text: '博湖县' },

    {
      value: '652871',
      text: '库尔勒经济技术开发区' }] },



  {
    value: '6529',
    text: '阿克苏地区',
    children: [
    {
      value: '652901',
      text: '阿克苏市' },

    {
      value: '652902',
      text: '库车市' },

    {
      value: '652922',
      text: '温宿县' },

    {
      value: '652924',
      text: '沙雅县' },

    {
      value: '652925',
      text: '新和县' },

    {
      value: '652926',
      text: '拜城县' },

    {
      value: '652927',
      text: '乌什县' },

    {
      value: '652928',
      text: '阿瓦提县' },

    {
      value: '652929',
      text: '柯坪县' }] },



  {
    value: '6530',
    text: '克孜勒苏柯尔克孜自治州',
    children: [
    {
      value: '653001',
      text: '阿图什市' },

    {
      value: '653022',
      text: '阿克陶县' },

    {
      value: '653023',
      text: '阿合奇县' },

    {
      value: '653024',
      text: '乌恰县' }] },



  {
    value: '6531',
    text: '喀什地区',
    children: [
    {
      value: '653101',
      text: '喀什市' },

    {
      value: '653121',
      text: '疏附县' },

    {
      value: '653122',
      text: '疏勒县' },

    {
      value: '653123',
      text: '英吉沙县' },

    {
      value: '653124',
      text: '泽普县' },

    {
      value: '653125',
      text: '莎车县' },

    {
      value: '653126',
      text: '叶城县' },

    {
      value: '653127',
      text: '麦盖提县' },

    {
      value: '653128',
      text: '岳普湖县' },

    {
      value: '653129',
      text: '伽师县' },

    {
      value: '653130',
      text: '巴楚县' },

    {
      value: '653131',
      text: '塔什库尔干塔吉克自治县' }] },



  {
    value: '6532',
    text: '和田地区',
    children: [
    {
      value: '653201',
      text: '和田市' },

    {
      value: '653221',
      text: '和田县' },

    {
      value: '653222',
      text: '墨玉县' },

    {
      value: '653223',
      text: '皮山县' },

    {
      value: '653224',
      text: '洛浦县' },

    {
      value: '653225',
      text: '策勒县' },

    {
      value: '653226',
      text: '于田县' },

    {
      value: '653227',
      text: '民丰县' }] },



  {
    value: '6540',
    text: '伊犁哈萨克自治州',
    children: [
    {
      value: '654002',
      text: '伊宁市' },

    {
      value: '654003',
      text: '奎屯市' },

    {
      value: '654004',
      text: '霍尔果斯市' },

    {
      value: '654021',
      text: '伊宁县' },

    {
      value: '654022',
      text: '察布查尔锡伯自治县' },

    {
      value: '654023',
      text: '霍城县' },

    {
      value: '654024',
      text: '巩留县' },

    {
      value: '654025',
      text: '新源县' },

    {
      value: '654026',
      text: '昭苏县' },

    {
      value: '654027',
      text: '特克斯县' },

    {
      value: '654028',
      text: '尼勒克县' }] },



  {
    value: '6542',
    text: '塔城地区',
    children: [
    {
      value: '654201',
      text: '塔城市' },

    {
      value: '654202',
      text: '乌苏市' },

    {
      value: '654221',
      text: '额敏县' },

    {
      value: '654223',
      text: '沙湾县' },

    {
      value: '654224',
      text: '托里县' },

    {
      value: '654225',
      text: '裕民县' },

    {
      value: '654226',
      text: '和布克赛尔蒙古自治县' }] },



  {
    value: '6543',
    text: '阿勒泰地区',
    children: [
    {
      value: '654301',
      text: '阿勒泰市' },

    {
      value: '654321',
      text: '布尔津县' },

    {
      value: '654322',
      text: '富蕴县' },

    {
      value: '654323',
      text: '福海县' },

    {
      value: '654324',
      text: '哈巴河县' },

    {
      value: '654325',
      text: '青河县' },

    {
      value: '654326',
      text: '吉木乃县' }] },



  {
    value: '6590',
    text: '自治区直辖县级行政区划',
    children: [
    {
      value: '659001',
      text: '石河子市' },

    {
      value: '659002',
      text: '阿拉尔市' },

    {
      value: '659003',
      text: '图木舒克市' },

    {
      value: '659004',
      text: '五家渠市' },

    {
      value: '659005',
      text: '北屯市' },

    {
      value: '659006',
      text: '铁门关市' },

    {
      value: '659007',
      text: '双河市' },

    {
      value: '659008',
      text: '可克达拉市' },

    {
      value: '659009',
      text: '昆玉市' },

    {
      value: '659010',
      text: '胡杨河市' }] }] },





{
  value: '710000',
  text: '台湾省',
  children: [
  {
    value: '710000',
    text: '台湾',
    provinceCode: '710000',
    children: [
    {
      value: '710101',
      text: '金门',
      cityCode: '710000',
      provinceCode: '710000' },

    {
      value: '710102',
      text: '连江',
      cityCode: '710000',
      provinceCode: '710000' },

    {
      value: '710103',
      text: '苗栗',
      cityCode: '710000',
      provinceCode: '710000' },

    {
      value: '710104',
      text: '南投',
      cityCode: '710000',
      provinceCode: '710000' },

    {
      value: '710105',
      text: '澎湖',
      cityCode: '710000',
      provinceCode: '710000' },

    {
      value: '710106',
      text: '屏东',
      cityCode: '710000',
      provinceCode: '710000' },

    {
      value: '710107',
      text: '台东',
      cityCode: '710000',
      provinceCode: '710000' },

    {
      value: '710108',
      text: '台中',
      cityCode: '710000',
      provinceCode: '710000' },

    {
      value: '710109',
      text: '台南',
      cityCode: '710000',
      provinceCode: '710000' },

    {
      value: '710110',
      text: '台北',
      cityCode: '710000',
      provinceCode: '710000' },

    {
      value: '710111',
      text: '桃园',
      cityCode: '710000',
      provinceCode: '710000' },

    {
      value: '710112',
      text: '云林',
      cityCode: '710000',
      provinceCode: '710000' },

    {
      value: '710113',
      text: '新北',
      cityCode: '710000',
      provinceCode: '710000' },

    {
      value: '710114',
      text: '彰化',
      cityCode: '710000',
      provinceCode: '710000' },

    {
      value: '710115',
      text: '嘉义',
      cityCode: '710000',
      provinceCode: '710000' },

    {
      value: '710116',
      text: '新竹',
      cityCode: '710000',
      provinceCode: '710000' },

    {
      value: '710117',
      text: '花莲',
      cityCode: '710000',
      provinceCode: '710000' },

    {
      value: '710118',
      text: '宜兰',
      cityCode: '710000',
      provinceCode: '710000' },

    {
      value: '710119',
      text: '高雄',
      cityCode: '710000',
      provinceCode: '710000' },

    {
      value: '710120',
      text: '基隆',
      cityCode: '710000',
      provinceCode: '710000' }] }] },





{
  value: '910000',
  text: '港澳',
  children: [
  {
    value: '810000',
    text: '香港特别行政区',
    provinceCode: '910000',
    children: [
    {
      value: '810101',
      text: '中西区',
      cityCode: '810000',
      provinceCode: '910000' },

    {
      value: '810102',
      text: '东区',
      cityCode: '810000',
      provinceCode: '910000' },

    {
      value: '810103',
      text: '九龙城区',
      cityCode: '810000',
      provinceCode: '910000' },

    {
      value: '810104',
      text: '观塘区',
      cityCode: '810000',
      provinceCode: '910000' },

    {
      value: '810105',
      text: '深水埗区',
      cityCode: '810000',
      provinceCode: '910000' },

    {
      value: '810106',
      text: '湾仔区',
      cityCode: '810000',
      provinceCode: '910000' },

    {
      value: '810107',
      text: '黄大仙区',
      cityCode: '810000',
      provinceCode: '910000' },

    {
      value: '810108',
      text: '油尖旺区',
      cityCode: '810000',
      provinceCode: '910000' },

    {
      value: '810109',
      text: '离岛区',
      cityCode: '810000',
      provinceCode: '910000' },

    {
      value: '810110',
      text: '葵青区',
      cityCode: '810000',
      provinceCode: '910000' },

    {
      value: '810111',
      text: '北区',
      cityCode: '810000',
      provinceCode: '910000' },

    {
      value: '810112',
      text: '西贡区',
      cityCode: '810000',
      provinceCode: '910000' },

    {
      value: '810113',
      text: '沙田区',
      cityCode: '810000',
      provinceCode: '910000' },

    {
      value: '810114',
      text: '屯门区',
      cityCode: '810000',
      provinceCode: '910000' },

    {
      value: '810115',
      text: '大埔区',
      cityCode: '810000',
      provinceCode: '910000' },

    {
      value: '810116',
      text: '荃湾区',
      cityCode: '810000',
      provinceCode: '910000' },

    {
      value: '810117',
      text: '元朗区',
      cityCode: '810000',
      provinceCode: '910000' },

    {
      value: '810118',
      text: '香港',
      cityCode: '810000',
      provinceCode: '910000' },

    {
      value: '810119',
      text: '九龙',
      cityCode: '810000',
      provinceCode: '910000' },

    {
      value: '810120',
      text: '新界',
      cityCode: '810000',
      provinceCode: '910000' }] },



  {
    value: '820000',
    text: '澳门特别行政区',
    provinceCode: '910000',
    children: [
    {
      value: '820101',
      text: '离岛',
      cityCode: '820000',
      provinceCode: '910000' },

    {
      value: '820102',
      text: '澳门半岛',
      cityCode: '820000',
      provinceCode: '910000' },

    {
      value: '820103',
      text: '凼仔',
      cityCode: '820000',
      provinceCode: '910000' },

    {
      value: '820104',
      text: '路凼城',
      cityCode: '820000',
      provinceCode: '910000' },

    {
      value: '820105',
      text: '路环',
      cityCode: '820000',
      provinceCode: '910000' }] }] }];exports.citys = citys;

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou'){//百度、快手 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    // NOTE 此处将 != 修改为 !==。涉及地方太多恐怕测试不到，如果出现数据对比问题，将其修改回来。
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"uni-app-test","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"uni-app-test","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"uni-app-test","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"uni-app-test","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 24:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 25);

/***/ }),

/***/ 25:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 26);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 26:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 27:
/*!******************************************************************************!*\
  !*** D:/uni-app-test/uni_modules/uni-forms/components/uni-forms/validate.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 24));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var pattern = {
  email: /^\S+?@\S+?\.\S+?$/,
  idcard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  url: new RegExp(
  "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
  'i') };


var FORMAT_MAPPING = {
  "int": 'integer',
  "bool": 'boolean',
  "double": 'number',
  "long": 'number',
  "password": 'string'
  // "fileurls": 'array'
};

function formatMessage(args) {var resources = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var defaultMessage = ['label'];
  defaultMessage.forEach(function (item) {
    if (args[item] === undefined) {
      args[item] = '';
    }
  });

  var str = resources;
  for (var key in args) {
    var reg = new RegExp('{' + key + '}');
    str = str.replace(reg, args[key]);
  }
  return str;
}

function isEmptyValue(value, type) {
  if (value === undefined || value === null) {
    return true;
  }

  if (typeof value === 'string' && !value) {
    return true;
  }

  if (Array.isArray(value) && !value.length) {
    return true;
  }

  if (type === 'object' && !Object.keys(value).length) {
    return true;
  }

  return false;
}

var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  string: function string(value) {
    return typeof value === 'string';
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }
    return typeof value === 'number';
  },
  "boolean": function boolean(value) {
    return typeof value === 'boolean';
  },
  "float": function float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  object: function object(value) {
    return typeof value === 'object' && !types.array(value);
  },
  date: function date(value) {
    return value instanceof Date;
  },
  timestamp: function timestamp(value) {
    if (!this.integer(value) || Math.abs(value).toString().length > 16) {
      return false;
    }
    return true;
  },
  file: function file(value) {
    return typeof value.url === 'string';
  },
  email: function email(value) {
    return typeof value === 'string' && !!value.match(pattern.email) && value.length < 255;
  },
  url: function url(value) {
    return typeof value === 'string' && !!value.match(pattern.url);
  },
  pattern: function pattern(reg, value) {
    try {
      return new RegExp(reg).test(value);
    } catch (e) {
      return false;
    }
  },
  method: function method(value) {
    return typeof value === 'function';
  },
  idcard: function idcard(value) {
    return typeof value === 'string' && !!value.match(pattern.idcard);
  },
  'url-https': function urlHttps(value) {
    return this.url(value) && value.startsWith('https://');
  },
  'url-scheme': function urlScheme(value) {
    return value.startsWith('://');
  },
  'url-web': function urlWeb(value) {
    return false;
  } };var


RuleValidator = /*#__PURE__*/function () {

  function RuleValidator(message) {_classCallCheck(this, RuleValidator);
    this._message = message;
  }_createClass(RuleValidator, [{ key: "validateRule", value: function () {var _validateRule = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(

      fieldKey, fieldValue, value, data, allData) {var result, rules, hasRequired, message, i, rule, vt, now, resultExpr;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                result = null;

                rules = fieldValue.rules;

                hasRequired = rules.findIndex(function (item) {
                  return item.required;
                });if (!(
                hasRequired < 0)) {_context.next = 8;break;}if (!(
                value === null || value === undefined)) {_context.next = 6;break;}return _context.abrupt("return",
                result);case 6:if (!(

                typeof value === 'string' && !value.length)) {_context.next = 8;break;}return _context.abrupt("return",
                result);case 8:



                message = this._message;if (!(

                rules === undefined)) {_context.next = 11;break;}return _context.abrupt("return",
                message['default']);case 11:


                i = 0;case 12:if (!(i < rules.length)) {_context.next = 35;break;}
                rule = rules[i];
                vt = this._getValidateType(rule);

                Object.assign(rule, {
                  label: fieldValue.label || "[\"".concat(fieldKey, "\"]") });if (!


                RuleValidatorHelper[vt]) {_context.next = 20;break;}
                result = RuleValidatorHelper[vt](rule, value, message);if (!(
                result != null)) {_context.next = 20;break;}return _context.abrupt("break", 35);case 20:if (!




                rule.validateExpr) {_context.next = 26;break;}
                now = Date.now();
                resultExpr = rule.validateExpr(value, allData, now);if (!(
                resultExpr === false)) {_context.next = 26;break;}
                result = this._getMessage(rule, rule.errorMessage || this._message['default']);return _context.abrupt("break", 35);case 26:if (!




                rule.validateFunction) {_context.next = 32;break;}_context.next = 29;return (
                  this.validateFunction(rule, value, data, allData, vt));case 29:result = _context.sent;if (!(
                result !== null)) {_context.next = 32;break;}return _context.abrupt("break", 35);case 32:i++;_context.next = 12;break;case 35:





                if (result !== null) {
                  result = message.TAG + result;
                }return _context.abrupt("return",

                result);case 37:case "end":return _context.stop();}}}, _callee, this);}));function validateRule(_x, _x2, _x3, _x4, _x5) {return _validateRule.apply(this, arguments);}return validateRule;}() }, { key: "validateFunction", value: function () {var _validateFunction = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(


      rule, value, data, allData, vt) {var result, callbackMessage, res;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
                result = null;_context2.prev = 1;

                callbackMessage = null;_context2.next = 5;return (
                  rule.validateFunction(rule, value, allData || data, function (message) {
                    callbackMessage = message;
                  }));case 5:res = _context2.sent;
                if (callbackMessage || typeof res === 'string' && res || res === false) {
                  result = this._getMessage(rule, callbackMessage || res, vt);
                }_context2.next = 12;break;case 9:_context2.prev = 9;_context2.t0 = _context2["catch"](1);

                result = this._getMessage(rule, _context2.t0.message, vt);case 12:return _context2.abrupt("return",

                result);case 13:case "end":return _context2.stop();}}}, _callee2, this, [[1, 9]]);}));function validateFunction(_x6, _x7, _x8, _x9, _x10) {return _validateFunction.apply(this, arguments);}return validateFunction;}() }, { key: "_getMessage", value: function _getMessage(


    rule, message, vt) {
      return formatMessage(rule, message || rule.errorMessage || this._message[vt] || message['default']);
    } }, { key: "_getValidateType", value: function _getValidateType(

    rule) {
      var result = '';
      if (rule.required) {
        result = 'required';
      } else if (rule.format) {
        result = 'format';
      } else if (rule.arrayType) {
        result = 'arrayTypeFormat';
      } else if (rule.range) {
        result = 'range';
      } else if (rule.maximum !== undefined || rule.minimum !== undefined) {
        result = 'rangeNumber';
      } else if (rule.maxLength !== undefined || rule.minLength !== undefined) {
        result = 'rangeLength';
      } else if (rule.pattern) {
        result = 'pattern';
      } else if (rule.validateFunction) {
        result = 'validateFunction';
      }
      return result;
    } }]);return RuleValidator;}();


var RuleValidatorHelper = {
  required: function required(rule, value, message) {
    if (rule.required && isEmptyValue(value, rule.format || typeof value)) {
      return formatMessage(rule, rule.errorMessage || message.required);
    }

    return null;
  },

  range: function range(rule, value, message) {var

    range =

    rule.range,errorMessage = rule.errorMessage;

    var list = new Array(range.length);
    for (var i = 0; i < range.length; i++) {
      var item = range[i];
      if (types.object(item) && item.value !== undefined) {
        list[i] = item.value;
      } else {
        list[i] = item;
      }
    }

    var result = false;
    if (Array.isArray(value)) {
      result = new Set(value.concat(list)).size === list.length;
    } else {
      if (list.indexOf(value) > -1) {
        result = true;
      }
    }

    if (!result) {
      return formatMessage(rule, errorMessage || message['enum']);
    }

    return null;
  },

  rangeNumber: function rangeNumber(rule, value, message) {
    if (!types.number(value)) {
      return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
    }var


    minimum =



    rule.minimum,maximum = rule.maximum,exclusiveMinimum = rule.exclusiveMinimum,exclusiveMaximum = rule.exclusiveMaximum;
    var min = exclusiveMinimum ? value <= minimum : value < minimum;
    var max = exclusiveMaximum ? value >= maximum : value > maximum;

    if (minimum !== undefined && min) {
      return formatMessage(rule, rule.errorMessage || message['number'][exclusiveMinimum ?
      'exclusiveMinimum' : 'minimum']);

    } else if (maximum !== undefined && max) {
      return formatMessage(rule, rule.errorMessage || message['number'][exclusiveMaximum ?
      'exclusiveMaximum' : 'maximum']);

    } else if (minimum !== undefined && maximum !== undefined && (min || max)) {
      return formatMessage(rule, rule.errorMessage || message['number'].range);
    }

    return null;
  },

  rangeLength: function rangeLength(rule, value, message) {
    if (!types.string(value) && !types.array(value)) {
      return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
    }

    var min = rule.minLength;
    var max = rule.maxLength;
    var val = value.length;

    if (min !== undefined && val < min) {
      return formatMessage(rule, rule.errorMessage || message['length'].minLength);
    } else if (max !== undefined && val > max) {
      return formatMessage(rule, rule.errorMessage || message['length'].maxLength);
    } else if (min !== undefined && max !== undefined && (val < min || val > max)) {
      return formatMessage(rule, rule.errorMessage || message['length'].range);
    }

    return null;
  },

  pattern: function pattern(rule, value, message) {
    if (!types['pattern'](rule.pattern, value)) {
      return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
    }

    return null;
  },

  format: function format(rule, value, message) {
    var customTypes = Object.keys(types);
    var format = FORMAT_MAPPING[rule.format] ? FORMAT_MAPPING[rule.format] : rule.format || rule.arrayType;

    if (customTypes.indexOf(format) > -1) {
      if (!types[format](value)) {
        return formatMessage(rule, rule.errorMessage || message.typeError);
      }
    }

    return null;
  },

  arrayTypeFormat: function arrayTypeFormat(rule, value, message) {
    if (!Array.isArray(value)) {
      return formatMessage(rule, rule.errorMessage || message.typeError);
    }

    for (var i = 0; i < value.length; i++) {
      var element = value[i];
      var formatResult = this.format(rule, element, message);
      if (formatResult !== null) {
        return formatResult;
      }
    }

    return null;
  } };var


SchemaValidator = /*#__PURE__*/function (_RuleValidator) {_inherits(SchemaValidator, _RuleValidator);var _super = _createSuper(SchemaValidator);

  function SchemaValidator(schema, options) {var _this;_classCallCheck(this, SchemaValidator);
    _this = _super.call(this, SchemaValidator.message);

    _this._schema = schema;
    _this._options = options || null;return _this;
  }_createClass(SchemaValidator, [{ key: "updateSchema", value: function updateSchema(

    schema) {
      this._schema = schema;
    } }, { key: "validate", value: function () {var _validate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(

      data, allData) {var result;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
                result = this._checkFieldInSchema(data);if (
                result) {_context3.next = 5;break;}_context3.next = 4;return (
                  this.invokeValidate(data, false, allData));case 4:result = _context3.sent;case 5:return _context3.abrupt("return",

                result.length ? result[0] : null);case 6:case "end":return _context3.stop();}}}, _callee3, this);}));function validate(_x11, _x12) {return _validate.apply(this, arguments);}return validate;}() }, { key: "validateAll", value: function () {var _validateAll = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4(


      data, allData) {var result;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
                result = this._checkFieldInSchema(data);if (
                result) {_context4.next = 5;break;}_context4.next = 4;return (
                  this.invokeValidate(data, true, allData));case 4:result = _context4.sent;case 5:return _context4.abrupt("return",

                result);case 6:case "end":return _context4.stop();}}}, _callee4, this);}));function validateAll(_x13, _x14) {return _validateAll.apply(this, arguments);}return validateAll;}() }, { key: "validateUpdate", value: function () {var _validateUpdate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5(


      data, allData) {var result;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:
                result = this._checkFieldInSchema(data);if (
                result) {_context5.next = 5;break;}_context5.next = 4;return (
                  this.invokeValidateUpdate(data, false, allData));case 4:result = _context5.sent;case 5:return _context5.abrupt("return",

                result.length ? result[0] : null);case 6:case "end":return _context5.stop();}}}, _callee5, this);}));function validateUpdate(_x15, _x16) {return _validateUpdate.apply(this, arguments);}return validateUpdate;}() }, { key: "invokeValidate", value: function () {var _invokeValidate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6(


      data, all, allData) {var result, schema, key, value, errorMessage;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:
                result = [];
                schema = this._schema;_context6.t0 = _regenerator.default.keys(
                schema);case 3:if ((_context6.t1 = _context6.t0()).done) {_context6.next = 15;break;}key = _context6.t1.value;
                value = schema[key];_context6.next = 8;return (
                  this.validateRule(key, value, data[key], data, allData));case 8:errorMessage = _context6.sent;if (!(
                errorMessage != null)) {_context6.next = 13;break;}
                result.push({
                  key: key,
                  errorMessage: errorMessage });if (

                all) {_context6.next = 13;break;}return _context6.abrupt("break", 15);case 13:_context6.next = 3;break;case 15:return _context6.abrupt("return",


                result);case 16:case "end":return _context6.stop();}}}, _callee6, this);}));function invokeValidate(_x17, _x18, _x19) {return _invokeValidate.apply(this, arguments);}return invokeValidate;}() }, { key: "invokeValidateUpdate", value: function () {var _invokeValidateUpdate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7(


      data, all, allData) {var result, key, errorMessage;return _regenerator.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:
                result = [];_context7.t0 = _regenerator.default.keys(
                data);case 2:if ((_context7.t1 = _context7.t0()).done) {_context7.next = 13;break;}key = _context7.t1.value;_context7.next = 6;return (
                  this.validateRule(key, this._schema[key], data[key], data, allData));case 6:errorMessage = _context7.sent;if (!(
                errorMessage != null)) {_context7.next = 11;break;}
                result.push({
                  key: key,
                  errorMessage: errorMessage });if (

                all) {_context7.next = 11;break;}return _context7.abrupt("break", 13);case 11:_context7.next = 2;break;case 13:return _context7.abrupt("return",


                result);case 14:case "end":return _context7.stop();}}}, _callee7, this);}));function invokeValidateUpdate(_x20, _x21, _x22) {return _invokeValidateUpdate.apply(this, arguments);}return invokeValidateUpdate;}() }, { key: "_checkFieldInSchema", value: function _checkFieldInSchema(


    data) {
      var keys = Object.keys(data);
      var keys2 = Object.keys(this._schema);
      if (new Set(keys.concat(keys2)).size === keys2.length) {
        return '';
      }

      var noExistFields = keys.filter(function (key) {
        return keys2.indexOf(key) < 0;
      });
      var errorMessage = formatMessage({
        field: JSON.stringify(noExistFields) },
      SchemaValidator.message.TAG + SchemaValidator.message['defaultInvalid']);
      return [{
        key: 'invalid',
        errorMessage: errorMessage }];

    } }]);return SchemaValidator;}(RuleValidator);


function Message() {
  return {
    TAG: "",
    default: '验证错误',
    defaultInvalid: '提交的字段{field}在数据库中并不存在',
    validateFunction: '验证无效',
    required: '{label}必填',
    'enum': '{label}超出范围',
    timestamp: '{label}格式无效',
    whitespace: '{label}不能为空',
    typeError: '{label}类型无效',
    date: {
      format: '{label}日期{value}格式无效',
      parse: '{label}日期无法解析,{value}无效',
      invalid: '{label}日期{value}无效' },

    length: {
      minLength: '{label}长度不能少于{minLength}',
      maxLength: '{label}长度不能超过{maxLength}',
      range: '{label}必须介于{minLength}和{maxLength}之间' },

    number: {
      minimum: '{label}不能小于{minimum}',
      maximum: '{label}不能大于{maximum}',
      exclusiveMinimum: '{label}不能小于等于{minimum}',
      exclusiveMaximum: '{label}不能大于等于{maximum}',
      range: '{label}必须介于{minimum}and{maximum}之间' },

    pattern: {
      mismatch: '{label}格式不匹配' } };


}


SchemaValidator.message = new Message();var _default =

SchemaValidator;exports.default = _default;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!**********************************!*\
  !*** D:/uni-app-test/pages.json ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 49:
/*!**************************************!*\
  !*** D:/uni-app-test/static/uni.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAAGVn0euAAAKQ2lDQ1BJQ0MgcHJvZmlsZQAAeNqdU3dYk/cWPt/3ZQ9WQtjwsZdsgQAiI6wIyBBZohCSAGGEEBJAxYWIClYUFRGcSFXEgtUKSJ2I4qAouGdBiohai1VcOO4f3Ke1fXrv7e371/u855zn/M55zw+AERImkeaiagA5UoU8Otgfj09IxMm9gAIVSOAEIBDmy8JnBcUAAPADeXh+dLA//AGvbwACAHDVLiQSx+H/g7pQJlcAIJEA4CIS5wsBkFIAyC5UyBQAyBgAsFOzZAoAlAAAbHl8QiIAqg0A7PRJPgUA2KmT3BcA2KIcqQgAjQEAmShHJAJAuwBgVYFSLALAwgCgrEAiLgTArgGAWbYyRwKAvQUAdo5YkA9AYACAmUIszAAgOAIAQx4TzQMgTAOgMNK/4KlfcIW4SAEAwMuVzZdL0jMUuJXQGnfy8ODiIeLCbLFCYRcpEGYJ5CKcl5sjE0jnA0zODAAAGvnRwf44P5Dn5uTh5mbnbO/0xaL+a/BvIj4h8d/+vIwCBAAQTs/v2l/l5dYDcMcBsHW/a6lbANpWAGjf+V0z2wmgWgrQevmLeTj8QB6eoVDIPB0cCgsL7SViob0w44s+/zPhb+CLfvb8QB7+23rwAHGaQJmtwKOD/XFhbnauUo7nywRCMW735yP+x4V//Y4p0eI0sVwsFYrxWIm4UCJNx3m5UpFEIcmV4hLpfzLxH5b9CZN3DQCshk/ATrYHtctswH7uAQKLDljSdgBAfvMtjBoLkQAQZzQyefcAAJO/+Y9AKwEAzZek4wAAvOgYXKiUF0zGCAAARKCBKrBBBwzBFKzADpzBHbzAFwJhBkRADCTAPBBCBuSAHAqhGJZBGVTAOtgEtbADGqARmuEQtMExOA3n4BJcgetwFwZgGJ7CGLyGCQRByAgTYSE6iBFijtgizggXmY4EImFINJKApCDpiBRRIsXIcqQCqUJqkV1II/ItchQ5jVxA+pDbyCAyivyKvEcxlIGyUQPUAnVAuagfGorGoHPRdDQPXYCWomvRGrQePYC2oqfRS+h1dAB9io5jgNExDmaM2WFcjIdFYIlYGibHFmPlWDVWjzVjHVg3dhUbwJ5h7wgkAouAE+wIXoQQwmyCkJBHWExYQ6gl7CO0EroIVwmDhDHCJyKTqE+0JXoS+cR4YjqxkFhGrCbuIR4hniVeJw4TX5NIJA7JkuROCiElkDJJC0lrSNtILaRTpD7SEGmcTCbrkG3J3uQIsoCsIJeRt5APkE+S+8nD5LcUOsWI4kwJoiRSpJQSSjVlP+UEpZ8yQpmgqlHNqZ7UCKqIOp9aSW2gdlAvU4epEzR1miXNmxZDy6Qto9XQmmlnafdoL+l0ugndgx5Fl9CX0mvoB+nn6YP0dwwNhg2Dx0hiKBlrGXsZpxi3GS+ZTKYF05eZyFQw1zIbmWeYD5hvVVgq9ip8FZHKEpU6lVaVfpXnqlRVc1U/1XmqC1SrVQ+rXlZ9pkZVs1DjqQnUFqvVqR1Vu6k2rs5Sd1KPUM9RX6O+X/2C+mMNsoaFRqCGSKNUY7fGGY0hFsYyZfFYQtZyVgPrLGuYTWJbsvnsTHYF+xt2L3tMU0NzqmasZpFmneZxzQEOxrHg8DnZnErOIc4NznstAy0/LbHWaq1mrX6tN9p62r7aYu1y7Rbt69rvdXCdQJ0snfU6bTr3dQm6NrpRuoW623XP6j7TY+t56Qn1yvUO6d3RR/Vt9KP1F+rv1u/RHzcwNAg2kBlsMThj8MyQY+hrmGm40fCE4agRy2i6kcRoo9FJoye4Ju6HZ+M1eBc+ZqxvHGKsNN5l3Gs8YWJpMtukxKTF5L4pzZRrmma60bTTdMzMyCzcrNisyeyOOdWca55hvtm82/yNhaVFnMVKizaLx5balnzLBZZNlvesmFY+VnlW9VbXrEnWXOss623WV2xQG1ebDJs6m8u2qK2brcR2m23fFOIUjynSKfVTbtox7PzsCuya7AbtOfZh9iX2bfbPHcwcEh3WO3Q7fHJ0dcx2bHC866ThNMOpxKnD6VdnG2ehc53zNRemS5DLEpd2lxdTbaeKp26fesuV5RruutK10/Wjm7ub3K3ZbdTdzD3Ffav7TS6bG8ldwz3vQfTw91jicczjnaebp8LzkOcvXnZeWV77vR5Ps5wmntYwbcjbxFvgvct7YDo+PWX6zukDPsY+Ap96n4e+pr4i3z2+I37Wfpl+B/ye+zv6y/2P+L/hefIW8U4FYAHBAeUBvYEagbMDawMfBJkEpQc1BY0FuwYvDD4VQgwJDVkfcpNvwBfyG/ljM9xnLJrRFcoInRVaG/owzCZMHtYRjobPCN8Qfm+m+UzpzLYIiOBHbIi4H2kZmRf5fRQpKjKqLupRtFN0cXT3LNas5Fn7Z72O8Y+pjLk722q2cnZnrGpsUmxj7Ju4gLiquIF4h/hF8ZcSdBMkCe2J5MTYxD2J43MC52yaM5zkmlSWdGOu5dyiuRfm6c7Lnnc8WTVZkHw4hZgSl7I/5YMgQlAvGE/lp25NHRPyhJuFT0W+oo2iUbG3uEo8kuadVpX2ON07fUP6aIZPRnXGMwlPUit5kRmSuSPzTVZE1t6sz9lx2S05lJyUnKNSDWmWtCvXMLcot09mKyuTDeR55m3KG5OHyvfkI/lz89sVbIVM0aO0Uq5QDhZML6greFsYW3i4SL1IWtQz32b+6vkjC4IWfL2QsFC4sLPYuHhZ8eAiv0W7FiOLUxd3LjFdUrpkeGnw0n3LaMuylv1Q4lhSVfJqedzyjlKD0qWlQyuCVzSVqZTJy26u9Fq5YxVhlWRV72qX1VtWfyoXlV+scKyorviwRrjm4ldOX9V89Xlt2treSrfK7etI66Trbqz3Wb+vSr1qQdXQhvANrRvxjeUbX21K3nShemr1js20zcrNAzVhNe1bzLas2/KhNqP2ep1/XctW/a2rt77ZJtrWv913e/MOgx0VO97vlOy8tSt4V2u9RX31btLugt2PGmIbur/mft24R3dPxZ6Pe6V7B/ZF7+tqdG9s3K+/v7IJbVI2jR5IOnDlm4Bv2pvtmne1cFoqDsJB5cEn36Z8e+NQ6KHOw9zDzd+Zf7f1COtIeSvSOr91rC2jbaA9ob3v6IyjnR1eHUe+t/9+7zHjY3XHNY9XnqCdKD3x+eSCk+OnZKeenU4/PdSZ3Hn3TPyZa11RXb1nQ8+ePxd07ky3X/fJ897nj13wvHD0Ivdi2yW3S609rj1HfnD94UivW2/rZffL7Vc8rnT0Tes70e/Tf/pqwNVz1/jXLl2feb3vxuwbt24m3Ry4Jbr1+Hb27Rd3Cu5M3F16j3iv/L7a/eoH+g/qf7T+sWXAbeD4YMBgz8NZD+8OCYee/pT/04fh0kfMR9UjRiONj50fHxsNGr3yZM6T4aeypxPPyn5W/3nrc6vn3/3i+0vPWPzY8Av5i8+/rnmp83Lvq6mvOscjxx+8znk98ab8rc7bfe+477rfx70fmSj8QP5Q89H6Y8en0E/3Pud8/vwv94Tz+4A5JREAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADKmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzIgNzkuMTU5Mjg0LCAyMDE2LzA0LzE5LTEzOjEzOjQwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGRkE0MjcxOTdEQzYxMUU4QkZBOERDOEVCQ0U0NTBGMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGRkE0MjcxODdEQzYxMUU4QkZBOERDOEVCQ0U0NTBGMSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkE4RkFCNzg3REM1MTFFOEJGQThEQzhFQkNFNDUwRjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkE4RkFCNzk3REM1MTFFOEJGQThEQzhFQkNFNDUwRjEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4JvuwEAAACX0lEQVR42mJkAALtmZb/GYgETKQoBmtgIBGgaLiSdgxDAUgMWZwyG4aoBhZsoUK0Bp1ZVtR3EkAAMQKTxisgLUqk+oVMJCgGgXjapKXhljSGQ1oCCCBS0xIDOYFEM8PJ8jLFsYYee4QiBjmWsamluQ9GLSA/konNqoPXB8SUG8T6YCEtfQAQQKCySBVI36KF4VfTjzMy0cpwWONuNKMN0nxAqAgmpVgfjYNRC0YtGK30R24QUatFMZpMiQIAAUTTdhEdwHemIex4EOBkYhjiYNQDox6gdWVJqOKktNag1MzRJDTqgVEPjHpg1AOjHhj1wJBpStCiXz4aA6QopmZ3fzQGRj0wWDwAmhIC0t+HqPv9AAKwc8c0FMJAAEATNgRgARN4wAJs2MIMQcGfkMAOKz0k8KeD16Qh3e7RXpNeCRF8XDvN5TEkCnwvvSsvf4vC1lEGddIZaKvEwUdbsidxYxsFAAAAcKD56/ioOi0HAAAAAAAAAAAAAAAAAAAeNRfdlhDAl5LYtxIAAAAAbwPcf1HpkwZ//qZ1vARo7+5REAaCAIxmIWfwMjmBhbWHsfYgKVMLXiqXcBbcXoswTHgfLKKFhH0mFvnZcb3QLV62qfaVK6UmP8Y9AF6t4MVaZ2pt/z5US/4EAAgAAAEAIAAABKB081Ff/OsZy+wTJdnbaQ9wCAIgAAAEAIAAABAAAAIAQAAACAAAAQAgAOdtzt6A7NuN7QEOQQIAQFm5R8weAEAAAAgAACUB7KYhrb0DLFPd5aEq1+d8aePdd/nzR4xrjIv5OeYXH+Md49mX5uoffAArTnpOkTBfEgAAAABJRU5ErkJggg=="

/***/ }),

/***/ 59:
/*!***************************************************************************!*\
  !*** D:/uni-app-test/uni_modules/uni-icons/components/uni-icons/icons.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ }),

/***/ 82:
/*!************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 24));var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 83);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e26) {throw _e26;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e27) {didErr = true;err = _e27;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _wrapNativeSuper(Class) {var _cache = typeof Map === "function" ? new Map() : undefined;_wrapNativeSuper = function _wrapNativeSuper(Class) {if (Class === null || !_isNativeFunction(Class)) return Class;if (typeof Class !== "function") {throw new TypeError("Super expression must either be null or a function");}if (typeof _cache !== "undefined") {if (_cache.has(Class)) return _cache.get(Class);_cache.set(Class, Wrapper);}function Wrapper() {return _construct(Class, arguments, _getPrototypeOf(this).constructor);}Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });return _setPrototypeOf(Wrapper, Class);};return _wrapNativeSuper(Class);}function _construct(Parent, args, Class) {if (_isNativeReflectConstruct()) {_construct = Reflect.construct;} else {_construct = function _construct(Parent, args, Class) {var a = [null];a.push.apply(a, args);var Constructor = Function.bind.apply(Parent, a);var instance = new Constructor();if (Class) _setPrototypeOf(instance, Class.prototype);return instance;};}return _construct.apply(null, arguments);}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _isNativeFunction(fn) {return Function.toString.call(fn).indexOf("[native code]") !== -1;}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}"undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;function t(e) {return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;}function n(e, t, n) {return e(n = { path: t, exports: {}, require: function require(e, t) {return function () {throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");}(null == t && n.path);} }, n.exports), n.exports;}var s = n(function (e, t) {var n;e.exports = (n = n || function (e, t) {var n = Object.create || function () {function e() {}return function (t) {var n;return e.prototype = t, n = new e(), e.prototype = null, n;};}(),s = {},r = s.lib = {},o = r.Base = { extend: function extend(e) {var t = n(this);return e && t.mixIn(e), t.hasOwnProperty("init") && this.init !== t.init || (t.init = function () {t.$super.init.apply(this, arguments);}), t.init.prototype = t, t.$super = this, t;}, create: function create() {var e = this.extend();return e.init.apply(e, arguments), e;}, init: function init() {}, mixIn: function mixIn(e) {for (var t in e) {e.hasOwnProperty(t) && (this[t] = e[t]);}e.hasOwnProperty("toString") && (this.toString = e.toString);}, clone: function clone() {return this.init.prototype.extend(this);} },i = r.WordArray = o.extend({ init: function init(e, n) {e = this.words = e || [], this.sigBytes = n != t ? n : 4 * e.length;}, toString: function toString(e) {return (e || c).stringify(this);}, concat: function concat(e) {var t = this.words,n = e.words,s = this.sigBytes,r = e.sigBytes;if (this.clamp(), s % 4) for (var o = 0; o < r; o++) {var i = n[o >>> 2] >>> 24 - o % 4 * 8 & 255;t[s + o >>> 2] |= i << 24 - (s + o) % 4 * 8;} else for (o = 0; o < r; o += 4) {t[s + o >>> 2] = n[o >>> 2];}return this.sigBytes += r, this;}, clamp: function clamp() {var t = this.words,n = this.sigBytes;t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, t.length = e.ceil(n / 4);}, clone: function clone() {var e = o.clone.call(this);return e.words = this.words.slice(0), e;}, random: function random(t) {for (var n, s = [], r = function r(t) {t = t;var n = 987654321,s = 4294967295;return function () {var r = ((n = 36969 * (65535 & n) + (n >> 16) & s) << 16) + (t = 18e3 * (65535 & t) + (t >> 16) & s) & s;return r /= 4294967296, (r += .5) * (e.random() > .5 ? 1 : -1);};}, o = 0; o < t; o += 4) {var a = r(4294967296 * (n || e.random()));n = 987654071 * a(), s.push(4294967296 * a() | 0);}return new i.init(s, t);} }),a = s.enc = {},c = a.Hex = { stringify: function stringify(e) {for (var t = e.words, n = e.sigBytes, s = [], r = 0; r < n; r++) {var o = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;s.push((o >>> 4).toString(16)), s.push((15 & o).toString(16));}return s.join("");}, parse: function parse(e) {for (var t = e.length, n = [], s = 0; s < t; s += 2) {n[s >>> 3] |= parseInt(e.substr(s, 2), 16) << 24 - s % 8 * 4;}return new i.init(n, t / 2);} },u = a.Latin1 = { stringify: function stringify(e) {for (var t = e.words, n = e.sigBytes, s = [], r = 0; r < n; r++) {var o = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;s.push(String.fromCharCode(o));}return s.join("");}, parse: function parse(e) {for (var t = e.length, n = [], s = 0; s < t; s++) {n[s >>> 2] |= (255 & e.charCodeAt(s)) << 24 - s % 4 * 8;}return new i.init(n, t);} },h = a.Utf8 = { stringify: function stringify(e) {try {return decodeURIComponent(escape(u.stringify(e)));} catch (e) {throw new Error("Malformed UTF-8 data");}}, parse: function parse(e) {return u.parse(unescape(encodeURIComponent(e)));} },l = r.BufferedBlockAlgorithm = o.extend({ reset: function reset() {this._data = new i.init(), this._nDataBytes = 0;}, _append: function _append(e) {"string" == typeof e && (e = h.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes;}, _process: function _process(t) {var n = this._data,s = n.words,r = n.sigBytes,o = this.blockSize,a = r / (4 * o),c = (a = t ? e.ceil(a) : e.max((0 | a) - this._minBufferSize, 0)) * o,u = e.min(4 * c, r);if (c) {for (var h = 0; h < c; h += o) {this._doProcessBlock(s, h);}var l = s.splice(0, c);n.sigBytes -= u;}return new i.init(l, u);}, clone: function clone() {var e = o.clone.call(this);return e._data = this._data.clone(), e;}, _minBufferSize: 0 }),d = (r.Hasher = l.extend({ cfg: o.extend(), init: function init(e) {this.cfg = this.cfg.extend(e), this.reset();}, reset: function reset() {l.reset.call(this), this._doReset();}, update: function update(e) {return this._append(e), this._process(), this;}, finalize: function finalize(e) {return e && this._append(e), this._doFinalize();}, blockSize: 16, _createHelper: function _createHelper(e) {return function (t, n) {return new e.init(n).finalize(t);};}, _createHmacHelper: function _createHmacHelper(e) {return function (t, n) {return new d.HMAC.init(e, n).finalize(t);};} }), s.algo = {});return s;}(Math), n);}),r = (n(function (e, t) {var n;e.exports = (n = s, function (e) {var t = n,s = t.lib,r = s.WordArray,o = s.Hasher,i = t.algo,a = [];!function () {for (var t = 0; t < 64; t++) {a[t] = 4294967296 * e.abs(e.sin(t + 1)) | 0;}}();var c = i.MD5 = o.extend({ _doReset: function _doReset() {this._hash = new r.init([1732584193, 4023233417, 2562383102, 271733878]);}, _doProcessBlock: function _doProcessBlock(e, t) {for (var n = 0; n < 16; n++) {var s = t + n,r = e[s];e[s] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8);}var o = this._hash.words,i = e[t + 0],c = e[t + 1],f = e[t + 2],p = e[t + 3],g = e[t + 4],m = e[t + 5],y = e[t + 6],_ = e[t + 7],w = e[t + 8],v = e[t + 9],S = e[t + 10],k = e[t + 11],T = e[t + 12],P = e[t + 13],I = e[t + 14],A = e[t + 15],E = o[0],b = o[1],O = o[2],U = o[3];E = u(E, b, O, U, i, 7, a[0]), U = u(U, E, b, O, c, 12, a[1]), O = u(O, U, E, b, f, 17, a[2]), b = u(b, O, U, E, p, 22, a[3]), E = u(E, b, O, U, g, 7, a[4]), U = u(U, E, b, O, m, 12, a[5]), O = u(O, U, E, b, y, 17, a[6]), b = u(b, O, U, E, _, 22, a[7]), E = u(E, b, O, U, w, 7, a[8]), U = u(U, E, b, O, v, 12, a[9]), O = u(O, U, E, b, S, 17, a[10]), b = u(b, O, U, E, k, 22, a[11]), E = u(E, b, O, U, T, 7, a[12]), U = u(U, E, b, O, P, 12, a[13]), O = u(O, U, E, b, I, 17, a[14]), E = h(E, b = u(b, O, U, E, A, 22, a[15]), O, U, c, 5, a[16]), U = h(U, E, b, O, y, 9, a[17]), O = h(O, U, E, b, k, 14, a[18]), b = h(b, O, U, E, i, 20, a[19]), E = h(E, b, O, U, m, 5, a[20]), U = h(U, E, b, O, S, 9, a[21]), O = h(O, U, E, b, A, 14, a[22]), b = h(b, O, U, E, g, 20, a[23]), E = h(E, b, O, U, v, 5, a[24]), U = h(U, E, b, O, I, 9, a[25]), O = h(O, U, E, b, p, 14, a[26]), b = h(b, O, U, E, w, 20, a[27]), E = h(E, b, O, U, P, 5, a[28]), U = h(U, E, b, O, f, 9, a[29]), O = h(O, U, E, b, _, 14, a[30]), E = l(E, b = h(b, O, U, E, T, 20, a[31]), O, U, m, 4, a[32]), U = l(U, E, b, O, w, 11, a[33]), O = l(O, U, E, b, k, 16, a[34]), b = l(b, O, U, E, I, 23, a[35]), E = l(E, b, O, U, c, 4, a[36]), U = l(U, E, b, O, g, 11, a[37]), O = l(O, U, E, b, _, 16, a[38]), b = l(b, O, U, E, S, 23, a[39]), E = l(E, b, O, U, P, 4, a[40]), U = l(U, E, b, O, i, 11, a[41]), O = l(O, U, E, b, p, 16, a[42]), b = l(b, O, U, E, y, 23, a[43]), E = l(E, b, O, U, v, 4, a[44]), U = l(U, E, b, O, T, 11, a[45]), O = l(O, U, E, b, A, 16, a[46]), E = d(E, b = l(b, O, U, E, f, 23, a[47]), O, U, i, 6, a[48]), U = d(U, E, b, O, _, 10, a[49]), O = d(O, U, E, b, I, 15, a[50]), b = d(b, O, U, E, m, 21, a[51]), E = d(E, b, O, U, T, 6, a[52]), U = d(U, E, b, O, p, 10, a[53]), O = d(O, U, E, b, S, 15, a[54]), b = d(b, O, U, E, c, 21, a[55]), E = d(E, b, O, U, w, 6, a[56]), U = d(U, E, b, O, A, 10, a[57]), O = d(O, U, E, b, y, 15, a[58]), b = d(b, O, U, E, P, 21, a[59]), E = d(E, b, O, U, g, 6, a[60]), U = d(U, E, b, O, k, 10, a[61]), O = d(O, U, E, b, f, 15, a[62]), b = d(b, O, U, E, v, 21, a[63]), o[0] = o[0] + E | 0, o[1] = o[1] + b | 0, o[2] = o[2] + O | 0, o[3] = o[3] + U | 0;}, _doFinalize: function _doFinalize() {var t = this._data,n = t.words,s = 8 * this._nDataBytes,r = 8 * t.sigBytes;n[r >>> 5] |= 128 << 24 - r % 32;var o = e.floor(s / 4294967296),i = s;n[15 + (r + 64 >>> 9 << 4)] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), n[14 + (r + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), t.sigBytes = 4 * (n.length + 1), this._process();for (var a = this._hash, c = a.words, u = 0; u < 4; u++) {var h = c[u];c[u] = 16711935 & (h << 8 | h >>> 24) | 4278255360 & (h << 24 | h >>> 8);}return a;}, clone: function clone() {var e = o.clone.call(this);return e._hash = this._hash.clone(), e;} });function u(e, t, n, s, r, o, i) {var a = e + (t & n | ~t & s) + r + i;return (a << o | a >>> 32 - o) + t;}function h(e, t, n, s, r, o, i) {var a = e + (t & s | n & ~s) + r + i;return (a << o | a >>> 32 - o) + t;}function l(e, t, n, s, r, o, i) {var a = e + (t ^ n ^ s) + r + i;return (a << o | a >>> 32 - o) + t;}function d(e, t, n, s, r, o, i) {var a = e + (n ^ (t | ~s)) + r + i;return (a << o | a >>> 32 - o) + t;}t.MD5 = o._createHelper(c), t.HmacMD5 = o._createHmacHelper(c);}(Math), n.MD5);}), n(function (e, t) {var n, r, o;e.exports = (r = (n = s).lib.Base, o = n.enc.Utf8, void (n.algo.HMAC = r.extend({ init: function init(e, t) {e = this._hasher = new e.init(), "string" == typeof t && (t = o.parse(t));var n = e.blockSize,s = 4 * n;t.sigBytes > s && (t = e.finalize(t)), t.clamp();for (var r = this._oKey = t.clone(), i = this._iKey = t.clone(), a = r.words, c = i.words, u = 0; u < n; u++) {a[u] ^= 1549556828, c[u] ^= 909522486;}r.sigBytes = i.sigBytes = s, this.reset();}, reset: function reset() {var e = this._hasher;e.reset(), e.update(this._iKey);}, update: function update(e) {return this._hasher.update(e), this;}, finalize: function finalize(e) {var t = this._hasher,n = t.finalize(e);return t.reset(), t.finalize(this._oKey.clone().concat(n));} })));}), n(function (e, t) {e.exports = s.HmacMD5;}));function o(e) {return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();}function i(e) {return "object" === o(e);}var a = /*#__PURE__*/function (_Error) {_inherits(a, _Error);var _super = _createSuper(a);function a(e, t) {var _this;_classCallCheck(this, a);_this = _super.call(this, e), _this.code = t;return _this;}return a;}( /*#__PURE__*/_wrapNativeSuper(Error));function c(e) {return e && "string" == typeof e ? JSON.parse(e) : e;}var u = "development" === "development",h = "mp-weixin",l = c(undefined),d = c([]),f = true;var p = "";try {{var _e2 = __webpack_require__(/*! uni-stat-config */ 84).default || __webpack_require__(/*! uni-stat-config */ 84);p = _e2.appid;}} catch (e) {}var g = {};function m(e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var n, s;return n = g, s = e, Object.prototype.hasOwnProperty.call(n, s) || (g[e] = t), g[e];}"app-plus" === h && (g = uni._globalUniCloudObj ? uni._globalUniCloudObj : uni._globalUniCloudObj = {});var y = ["invoke", "success", "fail", "complete"],_ = m("_globalUniCloudInterceptor");function w(e, t) {_[e] || (_[e] = {}), i(t) && Object.keys(t).forEach(function (n) {y.indexOf(n) > -1 && function (e, t, n) {var s = _[e][t];s || (s = _[e][t] = []), -1 === s.indexOf(n) && "function" == typeof n && s.push(n);}(e, n, t[n]);});}function v(e, t) {_[e] || (_[e] = {}), i(t) ? Object.keys(t).forEach(function (n) {y.indexOf(n) > -1 && function (e, t, n) {var s = _[e][t];if (!s) return;var r = s.indexOf(n);r > -1 && s.splice(r, 1);}(e, n, t[n]);}) : delete _[e];}function S(e, t) {return e && 0 !== e.length ? e.reduce(function (e, n) {return e.then(function () {return n(t);});}, Promise.resolve()) : Promise.resolve();}function k(e, t) {return _[e] && _[e][t] || [];}function T(e, t) {return t ? function (n) {var _this2 = this;var s = "callFunction" === t && "DCloud-clientDB" === (n && n.name);var r;r = this.isReady ? Promise.resolve() : this.initUniCloud, n = n || {};var o = r.then(function () {return s ? Promise.resolve() : S(k(t, "invoke"), n);}).then(function () {return e.call(_this2, n);}).then(function (e) {return s ? Promise.resolve(e) : S(k(t, "success"), e).then(function () {return S(k(t, "complete"), e);}).then(function () {return Promise.resolve(e);});}, function (e) {return s ? Promise.reject(e) : S(k(t, "fail"), e).then(function () {return S(k(t, "complete"), e);}).then(function () {return Promise.reject(e);});});if (!(n.success || n.fail || n.complete)) return o;o.then(function (e) {n.success && n.success(e), n.complete && n.complete(e);}).catch(function (e) {n.fail && n.fail(e), n.complete && n.complete(e);});} : function (t) {if (!((t = t || {}).success || t.fail || t.complete)) return e.call(this, t);e.call(this, t).then(function (e) {t.success && t.success(e), t.complete && t.complete(e);}, function (e) {t.fail && t.fail(e), t.complete && t.complete(e);});};}var P = /*#__PURE__*/function (_Error2) {_inherits(P, _Error2);var _super2 = _createSuper(P);function P(e) {var _this3;_classCallCheck(this, P);_this3 = _super2.call(this, e.message), _this3.errMsg = e.message || "", Object.defineProperties(_assertThisInitialized(_this3), { code: { get: function get() {return e.code;} }, requestId: { get: function get() {return e.requestId;} }, message: { get: function get() {return this.errMsg;}, set: function set(e) {this.errMsg = e;} } });return _this3;}return P;}( /*#__PURE__*/_wrapNativeSuper(Error));var _e3 = (0, _uniI18n.initVueI18n)({ "zh-Hans": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, "zh-Hant": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, en: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, fr: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, es: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" } }, "zh-Hans"),I = _e3.t,A = _e3.setLocale,E = _e3.getLocale;var b, O;function U() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;var t = "";for (; t.length < e;) {t += Math.random().toString(32).substring(2);}return t.substring(0, e);}function C() {var _uni$getSystemInfoSyn = uni.getSystemInfoSync(),e = _uni$getSystemInfoSyn.deviceId;return { PLATFORM: h, OS: O, APPID: p, LOCALE: E(), DEVICEID: e, CLIENT_SDK_VERSION: "1.0.8" };}function D() {if ("n" === x()) {try {b = plus.runtime.getDCloudId();} catch (e) {b = "";}return b;}return b || (b = U(32), uni.setStorage({ key: "__DC_CLOUD_UUID", data: b })), b;}function x() {var _appPlus$h5$mpWeixi;return (_appPlus$h5$mpWeixi = { "app-plus": "n", h5: "h5", "mp-weixin": "wx" }, _defineProperty(_appPlus$h5$mpWeixi, ["y", "a", "p", "mp-ali"].reverse().join(""), "ali"), _defineProperty(_appPlus$h5$mpWeixi, "mp-baidu", "bd"), _defineProperty(_appPlus$h5$mpWeixi, "mp-toutiao", "tt"), _defineProperty(_appPlus$h5$mpWeixi, "mp-qq", "qq"), _defineProperty(_appPlus$h5$mpWeixi, "quickapp-native", "qn"), _appPlus$h5$mpWeixi)[h];}var R = { sign: function sign(e, t) {var n = "";return Object.keys(e).sort().forEach(function (t) {e[t] && (n = n + "&" + t + "=" + e[t]);}), n = n.slice(1), r(n, t).toString();}, wrappedRequest: function wrappedRequest(e, t) {return new Promise(function (n, s) {t(Object.assign(e, { complete: function complete(e) {e || (e = {}), u && "h5" === h && e.errMsg && 0 === e.errMsg.indexOf("request:fail") && console.warn("发布H5，需要在uniCloud后台操作，绑定安全域名，否则会因为跨域问题而无法访问。教程参考：https://uniapp.dcloud.io/uniCloud/quickstart?id=useinh5");var t = e.data && e.data.header && e.data.header["x-serverless-request-id"] || e.header && e.header["request-id"];if (!e.statusCode || e.statusCode >= 400) return s(new P({ code: "SYS_ERR", message: e.errMsg || "request:fail", requestId: t }));var r = e.data;if (r.error) return s(new P({ code: r.error.code, message: r.error.message, requestId: t }));r.result = r.data, r.requestId = t, delete r.data, n(r);} }));});} };var q = { request: function request(e) {return uni.request(e);}, uploadFile: function uploadFile(e) {return uni.uploadFile(e);}, setStorageSync: function setStorageSync(e, t) {return uni.setStorageSync(e, t);}, getStorageSync: function getStorageSync(e) {return uni.getStorageSync(e);}, removeStorageSync: function removeStorageSync(e) {return uni.removeStorageSync(e);}, clearStorageSync: function clearStorageSync() {return uni.clearStorageSync();} };var F = /*#__PURE__*/function () {function F(e) {_classCallCheck(this, F);["spaceId", "clientSecret"].forEach(function (t) {if (!Object.prototype.hasOwnProperty.call(e, t)) throw new Error(I("uniCloud.init.paramRequired", { param: t }));}), this.config = Object.assign({}, { endpoint: "https://api.bspapp.com" }, e), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = q, this._getAccessTokenPromise = null, this._getAccessTokenPromiseStatus = null;}_createClass(F, [{ key: "setAccessToken", value: function setAccessToken(e) {this.accessToken = e;} }, { key: "requestWrapped", value: function requestWrapped(e) {return R.wrappedRequest(e, this.adapter.request);} }, { key: "requestAuth", value: function requestAuth(e) {return this.requestWrapped(e);} }, { key: "request", value: function request(e, t) {var _this4 = this;return Promise.resolve().then(function () {return _this4.hasAccessToken ? t ? _this4.requestWrapped(e) : _this4.requestWrapped(e).catch(function (t) {return new Promise(function (e, n) {!t || "GATEWAY_INVALID_TOKEN" !== t.code && "InvalidParameter.InvalidToken" !== t.code ? n(t) : e();}).then(function () {return _this4.getAccessToken();}).then(function () {var t = _this4.rebuildRequest(e);return _this4.request(t, !0);});}) : _this4.getAccessToken().then(function () {var t = _this4.rebuildRequest(e);return _this4.request(t, !0);});});} }, { key: "rebuildRequest", value: function rebuildRequest(e) {var t = Object.assign({}, e);return t.data.token = this.accessToken, t.header["x-basement-token"] = this.accessToken, t.header["x-serverless-sign"] = R.sign(t.data, this.config.clientSecret), t;} }, { key: "setupRequest", value: function setupRequest(e, t) {var n = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }),s = { "Content-Type": "application/json" };return "auth" !== t && (n.token = this.accessToken, s["x-basement-token"] = this.accessToken), s["x-serverless-sign"] = R.sign(n, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: n, dataType: "json", header: s };} }, { key: "getAccessToken", value: function getAccessToken() {var _this5 = this;if ("pending" === this._getAccessTokenPromiseStatus) return this._getAccessTokenPromise;this._getAccessTokenPromiseStatus = "pending";return this._getAccessTokenPromise = this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then(function (e) {return new Promise(function (t, n) {e.result && e.result.accessToken ? (_this5.setAccessToken(e.result.accessToken), _this5._getAccessTokenPromiseStatus = "fulfilled", t(_this5.accessToken)) : (_this5._getAccessTokenPromiseStatus = "rejected", n(new P({ code: "AUTH_FAILED", message: "获取accessToken失败" })));});}, function (e) {return _this5._getAccessTokenPromiseStatus = "rejected", Promise.reject(e);}), this._getAccessTokenPromise;} }, { key: "authorize", value: function authorize() {this.getAccessToken();} }, { key: "callFunction", value: function callFunction(e) {var t = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e.name, functionArgs: e.data || {} }) };return this.request(this.setupRequest(t));} }, { key: "getOSSUploadOptionsFromPath", value: function getOSSUploadOptionsFromPath(e) {var t = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e) };return this.request(this.setupRequest(t));} }, { key: "uploadFileToOSS", value: function uploadFileToOSS(_ref) {var _this6 = this;var e = _ref.url,t = _ref.formData,n = _ref.name,s = _ref.filePath,r = _ref.fileType,o = _ref.onUploadProgress;return new Promise(function (i, a) {var c = _this6.adapter.uploadFile({ url: e, formData: t, name: n, filePath: s, fileType: r, header: { "X-OSS-server-side-encrpytion": "AES256" }, success: function success(e) {e && e.statusCode < 400 ? i(e) : a(new P({ code: "UPLOAD_FAILED", message: "文件上传失败" }));}, fail: function fail(e) {a(new P({ code: e.code || "UPLOAD_FAILED", message: e.message || e.errMsg || "文件上传失败" }));} });"function" == typeof o && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (e) {o({ loaded: e.totalBytesSent, total: e.totalBytesExpectedToSend });});});} }, { key: "reportOSSUpload", value: function reportOSSUpload(e) {var t = { method: "serverless.file.resource.report", params: JSON.stringify(e) };return this.request(this.setupRequest(t));} }, { key: "uploadFile", value: function uploadFile(_ref2) {var _this7 = this;var e = _ref2.filePath,t = _ref2.cloudPath,_ref2$fileType = _ref2.fileType,n = _ref2$fileType === void 0 ? "image" : _ref2$fileType,s = _ref2.onUploadProgress,r = _ref2.config;if (!t) throw new P({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });var o = r && r.envType || this.config.envType;var i, a;return this.getOSSUploadOptionsFromPath({ env: o, filename: t }).then(function (t) {var r = t.result;i = r.id, a = "https://" + r.cdnDomain + "/" + r.ossPath;var o = { url: "https://" + r.host, formData: { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: r.accessKeyId, Signature: r.signature, host: r.host, id: i, key: r.ossPath, policy: r.policy, success_action_status: 200 }, fileName: "file", name: "file", filePath: e, fileType: n };return _this7.uploadFileToOSS(Object.assign({}, o, { onUploadProgress: s }));}).then(function () {return _this7.reportOSSUpload({ id: i });}).then(function (t) {return new Promise(function (n, s) {t.success ? n({ success: !0, filePath: e, fileID: a }) : s(new P({ code: "UPLOAD_FAILED", message: "文件上传失败" }));});});} }, { key: "deleteFile", value: function deleteFile(_ref3) {var e = _ref3.fileList;var t = { method: "serverless.file.resource.delete", params: JSON.stringify({ id: e[0] }) };return this.request(this.setupRequest(t));} }, { key: "getTempFileURL", value: function getTempFileURL() {var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref4.fileList;return new Promise(function (t, n) {Array.isArray(e) && 0 !== e.length || n(new P({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" })), t({ fileList: e.map(function (e) {return { fileID: e, tempFileURL: e };}) });});} }, { key: "hasAccessToken", get: function get() {return !!this.accessToken;} }]);return F;}();var L = { init: function init(e) {var t = new F(e),n = { signInAnonymously: function signInAnonymously() {return t.authorize();}, getLoginState: function getLoginState() {return Promise.resolve(!1);} };return t.auth = function () {return n;}, t.customAuth = t.auth, t;} },N = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:";var M;!function (e) {e.local = "local", e.none = "none", e.session = "session";}(M || (M = {}));var $ = function $() {};var j = function j() {var e;if (!Promise) {e = function e() {}, e.promise = {};var _t = function _t() {throw new Error('Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.');};return Object.defineProperty(e.promise, "then", { get: _t }), Object.defineProperty(e.promise, "catch", { get: _t }), e;}var t = new Promise(function (t, n) {e = function e(_e4, s) {return _e4 ? n(_e4) : t(s);};});return e.promise = t, e;};function K(e) {return void 0 === e;}function B(e) {return "[object Null]" === Object.prototype.toString.call(e);}var H;function W(e) {var t = (n = e, "[object Array]" === Object.prototype.toString.call(n) ? e : [e]);var n;var _iterator = _createForOfIteratorHelper(t),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var _e5 = _step.value;var _t2 = _e5.isMatch,_n = _e5.genAdapter,_s = _e5.runtime;if (_t2()) return { adapter: _n(), runtime: _s };}} catch (err) {_iterator.e(err);} finally {_iterator.f();}}!function (e) {e.WEB = "web", e.WX_MP = "wx_mp";}(H || (H = {}));var z = { adapter: null, runtime: void 0 },V = ["anonymousUuidKey"];var J = /*#__PURE__*/function (_$) {_inherits(J, _$);var _super3 = _createSuper(J);function J() {var _this8;_classCallCheck(this, J);_this8 = _super3.call(this), z.adapter.root.tcbObject || (z.adapter.root.tcbObject = {});return _this8;}_createClass(J, [{ key: "setItem", value: function setItem(e, t) {z.adapter.root.tcbObject[e] = t;} }, { key: "getItem", value: function getItem(e) {return z.adapter.root.tcbObject[e];} }, { key: "removeItem", value: function removeItem(e) {delete z.adapter.root.tcbObject[e];} }, { key: "clear", value: function clear() {delete z.adapter.root.tcbObject;} }]);return J;}($);function Y(e, t) {switch (e) {case "local":return t.localStorage || new J();case "none":return new J();default:return t.sessionStorage || new J();}}var X = /*#__PURE__*/function () {function X(e) {_classCallCheck(this, X);if (!this._storage) {this._persistence = z.adapter.primaryStorage || e.persistence, this._storage = Y(this._persistence, z.adapter);var _t3 = "access_token_".concat(e.env),_n2 = "access_token_expire_".concat(e.env),_s2 = "refresh_token_".concat(e.env),_r = "anonymous_uuid_".concat(e.env),_o = "login_type_".concat(e.env),_i = "user_info_".concat(e.env);this.keys = { accessTokenKey: _t3, accessTokenExpireKey: _n2, refreshTokenKey: _s2, anonymousUuidKey: _r, loginTypeKey: _o, userInfoKey: _i };}}_createClass(X, [{ key: "updatePersistence", value: function updatePersistence(e) {if (e === this._persistence) return;var t = "local" === this._persistence;this._persistence = e;var n = Y(e, z.adapter);for (var _e6 in this.keys) {var _s3 = this.keys[_e6];if (t && V.includes(_e6)) continue;var _r2 = this._storage.getItem(_s3);K(_r2) || B(_r2) || (n.setItem(_s3, _r2), this._storage.removeItem(_s3));}this._storage = n;} }, { key: "setStore", value: function setStore(e, t, n) {if (!this._storage) return;var s = { version: n || "localCachev1", content: t },r = JSON.stringify(s);try {this._storage.setItem(e, r);} catch (e) {throw e;}} }, { key: "getStore", value: function getStore(e, t) {try {if (!this._storage) return;} catch (e) {return "";}t = t || "localCachev1";var n = this._storage.getItem(e);if (!n) return "";if (n.indexOf(t) >= 0) {return JSON.parse(n).content;}return "";} }, { key: "removeStore", value: function removeStore(e) {this._storage.removeItem(e);} }]);return X;}();var G = {},Q = {};function Z(e) {return G[e];}var ee = function ee(e, t) {_classCallCheck(this, ee);this.data = t || null, this.name = e;};var te = /*#__PURE__*/function (_ee) {_inherits(te, _ee);var _super4 = _createSuper(te);function te(e, t) {var _this9;_classCallCheck(this, te);_this9 = _super4.call(this, "error", { error: e, data: t }), _this9.error = e;return _this9;}return te;}(ee);var ne = new ( /*#__PURE__*/function () {function _class() {_classCallCheck(this, _class);this._listeners = {};}_createClass(_class, [{ key: "on", value: function on(e, t) {return function (e, t, n) {n[e] = n[e] || [], n[e].push(t);}(e, t, this._listeners), this;} }, { key: "off", value: function off(e, t) {return function (e, t, n) {if (n && n[e]) {var _s4 = n[e].indexOf(t);-1 !== _s4 && n[e].splice(_s4, 1);}}(e, t, this._listeners), this;} }, { key: "fire", value: function fire(e, t) {if (e instanceof te) return console.error(e.error), this;var n = "string" == typeof e ? new ee(e, t || {}) : e;var s = n.name;if (this._listens(s)) {n.target = this;var _e7 = this._listeners[s] ? _toConsumableArray(this._listeners[s]) : [];var _iterator2 = _createForOfIteratorHelper(_e7),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var _t4 = _step2.value;_t4.call(this, n);}} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}}return this;} }, { key: "_listens", value: function _listens(e) {return this._listeners[e] && this._listeners[e].length > 0;} }]);return _class;}())();function se(e, t) {ne.on(e, t);}function re(e) {var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};ne.fire(e, t);}function oe(e, t) {ne.off(e, t);}var ie = "loginStateChanged",ae = "loginStateExpire",ce = "loginTypeChanged",ue = "anonymousConverted",he = "refreshAccessToken";var le;!function (e) {e.ANONYMOUS = "ANONYMOUS", e.WECHAT = "WECHAT", e.WECHAT_PUBLIC = "WECHAT-PUBLIC", e.WECHAT_OPEN = "WECHAT-OPEN", e.CUSTOM = "CUSTOM", e.EMAIL = "EMAIL", e.USERNAME = "USERNAME", e.NULL = "NULL";}(le || (le = {}));var de = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"],fe = { "X-SDK-Version": "1.3.5" };function pe(e, t, n) {var s = e[t];e[t] = function (t) {var r = {},o = {};n.forEach(function (n) {var _n$call = n.call(e, t),s = _n$call.data,i = _n$call.headers;Object.assign(r, s), Object.assign(o, i);});var i = t.data;return i && function () {var e;if (e = i, "[object FormData]" !== Object.prototype.toString.call(e)) t.data = _objectSpread(_objectSpread({}, i), r);else for (var _e8 in r) {i.append(_e8, r[_e8]);}}(), t.headers = _objectSpread(_objectSpread({}, t.headers || {}), o), s.call(e, t);};}function ge() {var e = Math.random().toString(16).slice(2);return { data: { seqId: e }, headers: _objectSpread(_objectSpread({}, fe), {}, { "x-seqid": e }) };}var me = /*#__PURE__*/function () {function me() {var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};_classCallCheck(this, me);var t;this.config = e, this._reqClass = new z.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: "\u8BF7\u6C42\u5728".concat(this.config.timeout / 1e3, "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD"), restrictedMethods: ["post"] }), this._cache = Z(this.config.env), this._localCache = (t = this.config.env, Q[t]), pe(this._reqClass, "post", [ge]), pe(this._reqClass, "upload", [ge]), pe(this._reqClass, "download", [ge]);}_createClass(me, [{ key: "post", value: function () {var _post = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(e) {return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return this._reqClass.post(e);case 2:return _context.abrupt("return", _context.sent);case 3:case "end":return _context.stop();}}}, _callee, this);}));function post(_x) {return _post.apply(this, arguments);}return post;}() }, { key: "upload", value: function () {var _upload = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(e) {return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return this._reqClass.upload(e);case 2:return _context2.abrupt("return", _context2.sent);case 3:case "end":return _context2.stop();}}}, _callee2, this);}));function upload(_x2) {return _upload.apply(this, arguments);}return upload;}() }, { key: "download", value: function () {var _download = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(e) {return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return this._reqClass.download(e);case 2:return _context3.abrupt("return", _context3.sent);case 3:case "end":return _context3.stop();}}}, _callee3, this);}));function download(_x3) {return _download.apply(this, arguments);}return download;}() }, { key: "refreshAccessToken", value: function () {var _refreshAccessToken2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4() {var e, t;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());_context4.prev = 1;_context4.next = 4;return this._refreshAccessTokenPromise;case 4:e = _context4.sent;_context4.next = 10;break;case 7:_context4.prev = 7;_context4.t0 = _context4["catch"](1);t = _context4.t0;case 10:if (!(this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t)) {_context4.next = 12;break;}throw t;case 12:return _context4.abrupt("return", e);case 13:case "end":return _context4.stop();}}}, _callee4, this, [[1, 7]]);}));function refreshAccessToken() {return _refreshAccessToken2.apply(this, arguments);}return refreshAccessToken;}() }, { key: "_refreshAccessToken", value: function () {var _refreshAccessToken3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5() {var _this$_cache$keys, e, t, n, s, r, o, i, a, _e9, _e10, _t5, _s5;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_this$_cache$keys = this._cache.keys, e = _this$_cache$keys.accessTokenKey, t = _this$_cache$keys.accessTokenExpireKey, n = _this$_cache$keys.refreshTokenKey, s = _this$_cache$keys.loginTypeKey, r = _this$_cache$keys.anonymousUuidKey;this._cache.removeStore(e), this._cache.removeStore(t);o = this._cache.getStore(n);if (o) {_context5.next = 5;break;}throw new Error("未登录CloudBase");case 5:i = { refresh_token: o };_context5.next = 8;return this.request("auth.fetchAccessTokenWithRefreshToken", i);case 8:a = _context5.sent;if (!a.data.code) {_context5.next = 21;break;}_e9 = a.data.code;if (!("SIGN_PARAM_INVALID" === _e9 || "REFRESH_TOKEN_EXPIRED" === _e9 || "INVALID_REFRESH_TOKEN" === _e9)) {_context5.next = 20;break;}if (!(this._cache.getStore(s) === le.ANONYMOUS && "INVALID_REFRESH_TOKEN" === _e9)) {_context5.next = 19;break;}_e10 = this._cache.getStore(r);_t5 = this._cache.getStore(n);_context5.next = 17;return this.send("auth.signInAnonymously", { anonymous_uuid: _e10, refresh_token: _t5 });case 17:_s5 = _context5.sent;return _context5.abrupt("return", (this.setRefreshToken(_s5.refresh_token), this._refreshAccessToken()));case 19:re(ae), this._cache.removeStore(n);case 20:throw new Error("\u5237\u65B0access token\u5931\u8D25\uFF1A".concat(a.data.code));case 21:if (!a.data.access_token) {_context5.next = 23;break;}return _context5.abrupt("return", (re(he), this._cache.setStore(e, a.data.access_token), this._cache.setStore(t, a.data.access_token_expire + Date.now()), { accessToken: a.data.access_token, accessTokenExpire: a.data.access_token_expire }));case 23:a.data.refresh_token && (this._cache.removeStore(n), this._cache.setStore(n, a.data.refresh_token), this._refreshAccessToken());case 24:case "end":return _context5.stop();}}}, _callee5, this);}));function _refreshAccessToken() {return _refreshAccessToken3.apply(this, arguments);}return _refreshAccessToken;}() }, { key: "getAccessToken", value: function () {var _getAccessToken = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6() {var _this$_cache$keys2, e, t, n, s, r, o;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_this$_cache$keys2 = this._cache.keys, e = _this$_cache$keys2.accessTokenKey, t = _this$_cache$keys2.accessTokenExpireKey, n = _this$_cache$keys2.refreshTokenKey;if (this._cache.getStore(n)) {_context6.next = 3;break;}throw new Error("refresh token不存在，登录状态异常");case 3:s = this._cache.getStore(e), r = this._cache.getStore(t), o = !0;_context6.t0 = this._shouldRefreshAccessTokenHook;if (!_context6.t0) {_context6.next = 9;break;}_context6.next = 8;return this._shouldRefreshAccessTokenHook(s, r);case 8:_context6.t0 = !_context6.sent;case 9:_context6.t1 = _context6.t0;if (!_context6.t1) {_context6.next = 12;break;}o = !1;case 12:return _context6.abrupt("return", (!s || !r || r < Date.now()) && o ? this.refreshAccessToken() : { accessToken: s, accessTokenExpire: r });case 13:case "end":return _context6.stop();}}}, _callee6, this);}));function getAccessToken() {return _getAccessToken.apply(this, arguments);}return getAccessToken;}() }, { key: "request", value: function () {var _request = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7(e, t, n) {var s, r, o, _e11, i, _e12, _e13, a, c, u, h, l, d, f, p, g;return _regenerator.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:s = "x-tcb-trace_".concat(this.config.env);r = "application/x-www-form-urlencoded";o = _objectSpread({ action: e, env: this.config.env, dataVersion: "2019-08-16" }, t);if (!(-1 === de.indexOf(e))) {_context7.next = 10;break;}_e11 = this._cache.keys.refreshTokenKey;_context7.t0 = this._cache.getStore(_e11);if (!_context7.t0) {_context7.next = 10;break;}_context7.next = 9;return this.getAccessToken();case 9:o.access_token = _context7.sent.accessToken;case 10:if ("storage.uploadFile" === e) {i = new FormData();for (_e12 in i) {i.hasOwnProperty(_e12) && void 0 !== i[_e12] && i.append(_e12, o[_e12]);}r = "multipart/form-data";} else {r = "application/json;charset=UTF-8", i = {};for (_e13 in o) {void 0 !== o[_e13] && (i[_e13] = o[_e13]);}}a = { headers: { "content-type": r } };n && n.onUploadProgress && (a.onUploadProgress = n.onUploadProgress);c = this._localCache.getStore(s);c && (a.headers["X-TCB-Trace"] = c);u = t.parse, h = t.inQuery, l = t.search;d = { env: this.config.env };u && (d.parse = !0), h && (d = _objectSpread(_objectSpread({}, h), d));f = function (e, t) {var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var s = /\?/.test(t);var r = "";for (var _e14 in n) {"" === r ? !s && (t += "?") : r += "&", r += "".concat(_e14, "=").concat(encodeURIComponent(n[_e14]));}return /^http(s)?\:\/\//.test(t += r) ? t : "".concat(e).concat(t);}(N, "//tcb-api.tencentcloudapi.com/web", d);l && (f += l);_context7.next = 22;return this.post(_objectSpread({ url: f, data: i }, a));case 22:p = _context7.sent;g = p.header && p.header["x-tcb-trace"];if (!(g && this._localCache.setStore(s, g), 200 !== Number(p.status) && 200 !== Number(p.statusCode) || !p.data)) {_context7.next = 26;break;}throw new Error("network request error");case 26:return _context7.abrupt("return", p);case 27:case "end":return _context7.stop();}}}, _callee7, this);}));function request(_x4, _x5, _x6) {return _request.apply(this, arguments);}return request;}() }, { key: "send", value: function () {var _send = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee8(e) {var t,n,_n3,_args8 = arguments;return _regenerator.default.wrap(function _callee8$(_context8) {while (1) {switch (_context8.prev = _context8.next) {case 0:t = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};_context8.next = 3;return this.request(e, t, { onUploadProgress: t.onUploadProgress });case 3:n = _context8.sent;if (!("ACCESS_TOKEN_EXPIRED" === n.data.code && -1 === de.indexOf(e))) {_context8.next = 13;break;}_context8.next = 7;return this.refreshAccessToken();case 7:_context8.next = 9;return this.request(e, t, { onUploadProgress: t.onUploadProgress });case 9:_n3 = _context8.sent;if (!_n3.data.code) {_context8.next = 12;break;}throw new Error("[".concat(_n3.data.code, "] ").concat(_n3.data.message));case 12:return _context8.abrupt("return", _n3.data);case 13:if (!n.data.code) {_context8.next = 15;break;}throw new Error("[".concat(n.data.code, "] ").concat(n.data.message));case 15:return _context8.abrupt("return", n.data);case 16:case "end":return _context8.stop();}}}, _callee8, this);}));function send(_x7) {return _send.apply(this, arguments);}return send;}() }, { key: "setRefreshToken", value: function setRefreshToken(e) {var _this$_cache$keys3 = this._cache.keys,t = _this$_cache$keys3.accessTokenKey,n = _this$_cache$keys3.accessTokenExpireKey,s = _this$_cache$keys3.refreshTokenKey;this._cache.removeStore(t), this._cache.removeStore(n), this._cache.setStore(s, e);} }]);return me;}();var ye = {};function _e(e) {return ye[e];}var we = /*#__PURE__*/function () {function we(e) {_classCallCheck(this, we);this.config = e, this._cache = Z(e.env), this._request = _e(e.env);}_createClass(we, [{ key: "setRefreshToken", value: function setRefreshToken(e) {var _this$_cache$keys4 = this._cache.keys,t = _this$_cache$keys4.accessTokenKey,n = _this$_cache$keys4.accessTokenExpireKey,s = _this$_cache$keys4.refreshTokenKey;this._cache.removeStore(t), this._cache.removeStore(n), this._cache.setStore(s, e);} }, { key: "setAccessToken", value: function setAccessToken(e, t) {var _this$_cache$keys5 = this._cache.keys,n = _this$_cache$keys5.accessTokenKey,s = _this$_cache$keys5.accessTokenExpireKey;this._cache.setStore(n, e), this._cache.setStore(s, t);} }, { key: "refreshUserInfo", value: function () {var _refreshUserInfo = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee9() {var _yield$this$_request$, e;return _regenerator.default.wrap(function _callee9$(_context9) {while (1) {switch (_context9.prev = _context9.next) {case 0:_context9.next = 2;return this._request.send("auth.getUserInfo", {});case 2:_yield$this$_request$ = _context9.sent;e = _yield$this$_request$.data;return _context9.abrupt("return", (this.setLocalUserInfo(e), e));case 5:case "end":return _context9.stop();}}}, _callee9, this);}));function refreshUserInfo() {return _refreshUserInfo.apply(this, arguments);}return refreshUserInfo;}() }, { key: "setLocalUserInfo", value: function setLocalUserInfo(e) {var t = this._cache.keys.userInfoKey;this._cache.setStore(t, e);} }]);return we;}();var ve = /*#__PURE__*/function () {function ve(e) {_classCallCheck(this, ve);if (!e) throw new Error("envId is not defined");this._envId = e, this._cache = Z(this._envId), this._request = _e(this._envId), this.setUserInfo();}_createClass(ve, [{ key: "linkWithTicket", value: function linkWithTicket(e) {if ("string" != typeof e) throw new Error("ticket must be string");return this._request.send("auth.linkWithTicket", { ticket: e });} }, { key: "linkWithRedirect", value: function linkWithRedirect(e) {e.signInWithRedirect();} }, { key: "updatePassword", value: function updatePassword(e, t) {return this._request.send("auth.updatePassword", { oldPassword: t, newPassword: e });} }, { key: "updateEmail", value: function updateEmail(e) {return this._request.send("auth.updateEmail", { newEmail: e });} }, { key: "updateUsername", value: function updateUsername(e) {if ("string" != typeof e) throw new Error("username must be a string");return this._request.send("auth.updateUsername", { username: e });} }, { key: "getLinkedUidList", value: function () {var _getLinkedUidList = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee10() {var _yield$this$_request$2, e, t, n;return _regenerator.default.wrap(function _callee10$(_context10) {while (1) {switch (_context10.prev = _context10.next) {case 0:_context10.next = 2;return this._request.send("auth.getLinkedUidList", {});case 2:_yield$this$_request$2 = _context10.sent;e = _yield$this$_request$2.data;t = !1;n = e.users;return _context10.abrupt("return", (n.forEach(function (e) {e.wxOpenId && e.wxPublicId && (t = !0);}), { users: n, hasPrimaryUid: t }));case 7:case "end":return _context10.stop();}}}, _callee10, this);}));function getLinkedUidList() {return _getLinkedUidList.apply(this, arguments);}return getLinkedUidList;}() }, { key: "setPrimaryUid", value: function setPrimaryUid(e) {return this._request.send("auth.setPrimaryUid", { uid: e });} }, { key: "unlink", value: function unlink(e) {return this._request.send("auth.unlink", { platform: e });} }, { key: "update", value: function () {var _update = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee11(e) {var t, n, s, r, o, i, _yield$this$_request$3, a;return _regenerator.default.wrap(function _callee11$(_context11) {while (1) {switch (_context11.prev = _context11.next) {case 0:t = e.nickName;n = e.gender;s = e.avatarUrl;r = e.province;o = e.country;i = e.city;_context11.next = 8;return this._request.send("auth.updateUserInfo", { nickName: t, gender: n, avatarUrl: s, province: r, country: o, city: i });case 8:_yield$this$_request$3 = _context11.sent;a = _yield$this$_request$3.data;this.setLocalUserInfo(a);case 11:case "end":return _context11.stop();}}}, _callee11, this);}));function update(_x8) {return _update.apply(this, arguments);}return update;}() }, { key: "refresh", value: function () {var _refresh = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee12() {var _yield$this$_request$4, e;return _regenerator.default.wrap(function _callee12$(_context12) {while (1) {switch (_context12.prev = _context12.next) {case 0:_context12.next = 2;return this._request.send("auth.getUserInfo", {});case 2:_yield$this$_request$4 = _context12.sent;e = _yield$this$_request$4.data;return _context12.abrupt("return", (this.setLocalUserInfo(e), e));case 5:case "end":return _context12.stop();}}}, _callee12, this);}));function refresh() {return _refresh.apply(this, arguments);}return refresh;}() }, { key: "setUserInfo", value: function setUserInfo() {var _this10 = this;var e = this._cache.keys.userInfoKey,t = this._cache.getStore(e);["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach(function (e) {_this10[e] = t[e];}), this.location = { country: t.country, province: t.province, city: t.city };} }, { key: "setLocalUserInfo", value: function setLocalUserInfo(e) {var t = this._cache.keys.userInfoKey;this._cache.setStore(t, e), this.setUserInfo();} }]);return ve;}();var Se = /*#__PURE__*/function () {function Se(e) {_classCallCheck(this, Se);if (!e) throw new Error("envId is not defined");this._cache = Z(e);var _this$_cache$keys6 = this._cache.keys,t = _this$_cache$keys6.refreshTokenKey,n = _this$_cache$keys6.accessTokenKey,s = _this$_cache$keys6.accessTokenExpireKey,r = this._cache.getStore(t),o = this._cache.getStore(n),i = this._cache.getStore(s);this.credential = { refreshToken: r, accessToken: o, accessTokenExpire: i }, this.user = new ve(e);}_createClass(Se, [{ key: "isAnonymousAuth", get: function get() {return this.loginType === le.ANONYMOUS;} }, { key: "isCustomAuth", get: function get() {return this.loginType === le.CUSTOM;} }, { key: "isWeixinAuth", get: function get() {return this.loginType === le.WECHAT || this.loginType === le.WECHAT_OPEN || this.loginType === le.WECHAT_PUBLIC;} }, { key: "loginType", get: function get() {return this._cache.getStore(this._cache.keys.loginTypeKey);} }]);return Se;}();var ke = /*#__PURE__*/function (_we) {_inherits(ke, _we);var _super5 = _createSuper(ke);function ke() {_classCallCheck(this, ke);return _super5.apply(this, arguments);}_createClass(ke, [{ key: "signIn", value: function () {var _signIn = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee13() {var _this$_cache$keys7, e, t, n, s, r, _e15;return _regenerator.default.wrap(function _callee13$(_context13) {while (1) {switch (_context13.prev = _context13.next) {case 0:this._cache.updatePersistence("local");_this$_cache$keys7 = this._cache.keys;e = _this$_cache$keys7.anonymousUuidKey;t = _this$_cache$keys7.refreshTokenKey;n = this._cache.getStore(e) || void 0;s = this._cache.getStore(t) || void 0;_context13.next = 8;return this._request.send("auth.signInAnonymously", { anonymous_uuid: n, refresh_token: s });case 8:r = _context13.sent;if (!(r.uuid && r.refresh_token)) {_context13.next = 20;break;}this._setAnonymousUUID(r.uuid);this.setRefreshToken(r.refresh_token);_context13.next = 14;return this._request.refreshAccessToken();case 14:re(ie);re(ce, { env: this.config.env, loginType: le.ANONYMOUS, persistence: "local" });_e15 = new Se(this.config.env);_context13.next = 19;return _e15.user.refresh();case 19:return _context13.abrupt("return", _e15);case 20:throw new Error("匿名登录失败");case 21:case "end":return _context13.stop();}}}, _callee13, this);}));function signIn() {return _signIn.apply(this, arguments);}return signIn;}() }, { key: "linkAndRetrieveDataWithTicket", value: function () {var _linkAndRetrieveDataWithTicket = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee14(e) {var _this$_cache$keys8, t, n, s, r, o;return _regenerator.default.wrap(function _callee14$(_context14) {while (1) {switch (_context14.prev = _context14.next) {case 0:_this$_cache$keys8 = this._cache.keys;t = _this$_cache$keys8.anonymousUuidKey;n = _this$_cache$keys8.refreshTokenKey;s = this._cache.getStore(t);r = this._cache.getStore(n);_context14.next = 7;return this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: s, refresh_token: r, ticket: e });case 7:o = _context14.sent;if (!o.refresh_token) {_context14.next = 16;break;}this._clearAnonymousUUID();this.setRefreshToken(o.refresh_token);_context14.next = 13;return this._request.refreshAccessToken();case 13:re(ue, { env: this.config.env });re(ce, { loginType: le.CUSTOM, persistence: "local" });return _context14.abrupt("return", { credential: { refreshToken: o.refresh_token } });case 16:throw new Error("匿名转化失败");case 17:case "end":return _context14.stop();}}}, _callee14, this);}));function linkAndRetrieveDataWithTicket(_x9) {return _linkAndRetrieveDataWithTicket.apply(this, arguments);}return linkAndRetrieveDataWithTicket;}() }, { key: "_setAnonymousUUID", value: function _setAnonymousUUID(e) {var _this$_cache$keys9 = this._cache.keys,t = _this$_cache$keys9.anonymousUuidKey,n = _this$_cache$keys9.loginTypeKey;this._cache.removeStore(t), this._cache.setStore(t, e), this._cache.setStore(n, le.ANONYMOUS);} }, { key: "_clearAnonymousUUID", value: function _clearAnonymousUUID() {this._cache.removeStore(this._cache.keys.anonymousUuidKey);} }]);return ke;}(we);var Te = /*#__PURE__*/function (_we2) {_inherits(Te, _we2);var _super6 = _createSuper(Te);function Te() {_classCallCheck(this, Te);return _super6.apply(this, arguments);}_createClass(Te, [{ key: "signIn", value: function () {var _signIn2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee15(e) {var t, n;return _regenerator.default.wrap(function _callee15$(_context15) {while (1) {switch (_context15.prev = _context15.next) {case 0:if (!("string" != typeof e)) {_context15.next = 2;break;}throw new Error("ticket must be a string");case 2:t = this._cache.keys.refreshTokenKey;_context15.next = 5;return this._request.send("auth.signInWithTicket", { ticket: e, refresh_token: this._cache.getStore(t) || "" });case 5:n = _context15.sent;if (!n.refresh_token) {_context15.next = 15;break;}this.setRefreshToken(n.refresh_token);_context15.next = 10;return this._request.refreshAccessToken();case 10:re(ie);re(ce, { env: this.config.env, loginType: le.CUSTOM, persistence: this.config.persistence });_context15.next = 14;return this.refreshUserInfo();case 14:return _context15.abrupt("return", new Se(this.config.env));case 15:throw new Error("自定义登录失败");case 16:case "end":return _context15.stop();}}}, _callee15, this);}));function signIn(_x10) {return _signIn2.apply(this, arguments);}return signIn;}() }]);return Te;}(we);var Pe = /*#__PURE__*/function (_we3) {_inherits(Pe, _we3);var _super7 = _createSuper(Pe);function Pe() {_classCallCheck(this, Pe);return _super7.apply(this, arguments);}_createClass(Pe, [{ key: "signIn", value: function () {var _signIn3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee16(e, t) {var n, s, r, o, i;return _regenerator.default.wrap(function _callee16$(_context16) {while (1) {switch (_context16.prev = _context16.next) {case 0:if (!("string" != typeof e)) {_context16.next = 2;break;}throw new Error("email must be a string");case 2:n = this._cache.keys.refreshTokenKey;_context16.next = 5;return this._request.send("auth.signIn", { loginType: "EMAIL", email: e, password: t, refresh_token: this._cache.getStore(n) || "" });case 5:s = _context16.sent;r = s.refresh_token;o = s.access_token;i = s.access_token_expire;if (!r) {_context16.next = 22;break;}this.setRefreshToken(r);if (!(o && i)) {_context16.next = 15;break;}this.setAccessToken(o, i);_context16.next = 17;break;case 15:_context16.next = 17;return this._request.refreshAccessToken();case 17:_context16.next = 19;return this.refreshUserInfo();case 19:re(ie);re(ce, { env: this.config.env, loginType: le.EMAIL, persistence: this.config.persistence });return _context16.abrupt("return", new Se(this.config.env));case 22:throw s.code ? new Error("\u90AE\u7BB1\u767B\u5F55\u5931\u8D25: [".concat(s.code, "] ").concat(s.message)) : new Error("邮箱登录失败");case 23:case "end":return _context16.stop();}}}, _callee16, this);}));function signIn(_x11, _x12) {return _signIn3.apply(this, arguments);}return signIn;}() }, { key: "activate", value: function () {var _activate = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee17(e) {return _regenerator.default.wrap(function _callee17$(_context17) {while (1) {switch (_context17.prev = _context17.next) {case 0:return _context17.abrupt("return", this._request.send("auth.activateEndUserMail", { token: e }));case 1:case "end":return _context17.stop();}}}, _callee17, this);}));function activate(_x13) {return _activate.apply(this, arguments);}return activate;}() }, { key: "resetPasswordWithToken", value: function () {var _resetPasswordWithToken = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee18(e, t) {return _regenerator.default.wrap(function _callee18$(_context18) {while (1) {switch (_context18.prev = _context18.next) {case 0:return _context18.abrupt("return", this._request.send("auth.resetPasswordWithToken", { token: e, newPassword: t }));case 1:case "end":return _context18.stop();}}}, _callee18, this);}));function resetPasswordWithToken(_x14, _x15) {return _resetPasswordWithToken.apply(this, arguments);}return resetPasswordWithToken;}() }]);return Pe;}(we);var Ie = /*#__PURE__*/function (_we4) {_inherits(Ie, _we4);var _super8 = _createSuper(Ie);function Ie() {_classCallCheck(this, Ie);return _super8.apply(this, arguments);}_createClass(Ie, [{ key: "signIn", value: function () {var _signIn4 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee19(e, t) {var n, s, r, o, i;return _regenerator.default.wrap(function _callee19$(_context19) {while (1) {switch (_context19.prev = _context19.next) {case 0:if (!("string" != typeof e)) {_context19.next = 2;break;}throw new Error("username must be a string");case 2:"string" != typeof t && (t = "", console.warn("password is empty"));n = this._cache.keys.refreshTokenKey;_context19.next = 6;return this._request.send("auth.signIn", { loginType: le.USERNAME, username: e, password: t, refresh_token: this._cache.getStore(n) || "" });case 6:s = _context19.sent;r = s.refresh_token;o = s.access_token_expire;i = s.access_token;if (!r) {_context19.next = 23;break;}this.setRefreshToken(r);if (!(i && o)) {_context19.next = 16;break;}this.setAccessToken(i, o);_context19.next = 18;break;case 16:_context19.next = 18;return this._request.refreshAccessToken();case 18:_context19.next = 20;return this.refreshUserInfo();case 20:re(ie);re(ce, { env: this.config.env, loginType: le.USERNAME, persistence: this.config.persistence });return _context19.abrupt("return", new Se(this.config.env));case 23:throw s.code ? new Error("\u7528\u6237\u540D\u5BC6\u7801\u767B\u5F55\u5931\u8D25: [".concat(s.code, "] ").concat(s.message)) : new Error("用户名密码登录失败");case 24:case "end":return _context19.stop();}}}, _callee19, this);}));function signIn(_x16, _x17) {return _signIn4.apply(this, arguments);}return signIn;}() }]);return Ie;}(we);var Ae = /*#__PURE__*/function () {function Ae(e) {_classCallCheck(this, Ae);this.config = e, this._cache = Z(e.env), this._request = _e(e.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), se(ce, this._onLoginTypeChanged);}_createClass(Ae, [{ key: "anonymousAuthProvider", value: function anonymousAuthProvider() {return new ke(this.config);} }, { key: "customAuthProvider", value: function customAuthProvider() {return new Te(this.config);} }, { key: "emailAuthProvider", value: function emailAuthProvider() {return new Pe(this.config);} }, { key: "usernameAuthProvider", value: function usernameAuthProvider() {return new Ie(this.config);} }, { key: "signInAnonymously", value: function () {var _signInAnonymously = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee20() {return _regenerator.default.wrap(function _callee20$(_context20) {while (1) {switch (_context20.prev = _context20.next) {case 0:return _context20.abrupt("return", new ke(this.config).signIn());case 1:case "end":return _context20.stop();}}}, _callee20, this);}));function signInAnonymously() {return _signInAnonymously.apply(this, arguments);}return signInAnonymously;}() }, { key: "signInWithEmailAndPassword", value: function () {var _signInWithEmailAndPassword = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee21(e, t) {return _regenerator.default.wrap(function _callee21$(_context21) {while (1) {switch (_context21.prev = _context21.next) {case 0:return _context21.abrupt("return", new Pe(this.config).signIn(e, t));case 1:case "end":return _context21.stop();}}}, _callee21, this);}));function signInWithEmailAndPassword(_x18, _x19) {return _signInWithEmailAndPassword.apply(this, arguments);}return signInWithEmailAndPassword;}() }, { key: "signInWithUsernameAndPassword", value: function signInWithUsernameAndPassword(e, t) {return new Ie(this.config).signIn(e, t);} }, { key: "linkAndRetrieveDataWithTicket", value: function () {var _linkAndRetrieveDataWithTicket2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee22(e) {return _regenerator.default.wrap(function _callee22$(_context22) {while (1) {switch (_context22.prev = _context22.next) {case 0:this._anonymousAuthProvider || (this._anonymousAuthProvider = new ke(this.config)), se(ue, this._onAnonymousConverted);_context22.next = 3;return this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e);case 3:return _context22.abrupt("return", _context22.sent);case 4:case "end":return _context22.stop();}}}, _callee22, this);}));function linkAndRetrieveDataWithTicket(_x20) {return _linkAndRetrieveDataWithTicket2.apply(this, arguments);}return linkAndRetrieveDataWithTicket;}() }, { key: "signOut", value: function () {var _signOut = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee23() {var _this$_cache$keys10, e, t, n, s, r;return _regenerator.default.wrap(function _callee23$(_context23) {while (1) {switch (_context23.prev = _context23.next) {case 0:if (!(this.loginType === le.ANONYMOUS)) {_context23.next = 2;break;}throw new Error("匿名用户不支持登出操作");case 2:_this$_cache$keys10 = this._cache.keys, e = _this$_cache$keys10.refreshTokenKey, t = _this$_cache$keys10.accessTokenKey, n = _this$_cache$keys10.accessTokenExpireKey, s = this._cache.getStore(e);if (s) {_context23.next = 5;break;}return _context23.abrupt("return");case 5:_context23.next = 7;return this._request.send("auth.logout", { refresh_token: s });case 7:r = _context23.sent;return _context23.abrupt("return", (this._cache.removeStore(e), this._cache.removeStore(t), this._cache.removeStore(n), re(ie), re(ce, { env: this.config.env, loginType: le.NULL, persistence: this.config.persistence }), r));case 9:case "end":return _context23.stop();}}}, _callee23, this);}));function signOut() {return _signOut.apply(this, arguments);}return signOut;}() }, { key: "signUpWithEmailAndPassword", value: function () {var _signUpWithEmailAndPassword = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee24(e, t) {return _regenerator.default.wrap(function _callee24$(_context24) {while (1) {switch (_context24.prev = _context24.next) {case 0:return _context24.abrupt("return", this._request.send("auth.signUpWithEmailAndPassword", { email: e, password: t }));case 1:case "end":return _context24.stop();}}}, _callee24, this);}));function signUpWithEmailAndPassword(_x21, _x22) {return _signUpWithEmailAndPassword.apply(this, arguments);}return signUpWithEmailAndPassword;}() }, { key: "sendPasswordResetEmail", value: function () {var _sendPasswordResetEmail = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee25(e) {return _regenerator.default.wrap(function _callee25$(_context25) {while (1) {switch (_context25.prev = _context25.next) {case 0:return _context25.abrupt("return", this._request.send("auth.sendPasswordResetEmail", { email: e }));case 1:case "end":return _context25.stop();}}}, _callee25, this);}));function sendPasswordResetEmail(_x23) {return _sendPasswordResetEmail.apply(this, arguments);}return sendPasswordResetEmail;}() }, { key: "onLoginStateChanged", value: function onLoginStateChanged(e) {var _this11 = this;se(ie, function () {var t = _this11.hasLoginState();e.call(_this11, t);});var t = this.hasLoginState();e.call(this, t);} }, { key: "onLoginStateExpired", value: function onLoginStateExpired(e) {se(ae, e.bind(this));} }, { key: "onAccessTokenRefreshed", value: function onAccessTokenRefreshed(e) {se(he, e.bind(this));} }, { key: "onAnonymousConverted", value: function onAnonymousConverted(e) {se(ue, e.bind(this));} }, { key: "onLoginTypeChanged", value: function onLoginTypeChanged(e) {var _this12 = this;se(ce, function () {var t = _this12.hasLoginState();e.call(_this12, t);});} }, { key: "getAccessToken", value: function () {var _getAccessToken2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee26() {return _regenerator.default.wrap(function _callee26$(_context26) {while (1) {switch (_context26.prev = _context26.next) {case 0:_context26.next = 2;return this._request.getAccessToken();case 2:_context26.t0 = _context26.sent.accessToken;_context26.t1 = this.config.env;return _context26.abrupt("return", { accessToken: _context26.t0, env: _context26.t1 });case 5:case "end":return _context26.stop();}}}, _callee26, this);}));function getAccessToken() {return _getAccessToken2.apply(this, arguments);}return getAccessToken;}() }, { key: "hasLoginState", value: function hasLoginState() {var e = this._cache.keys.refreshTokenKey;return this._cache.getStore(e) ? new Se(this.config.env) : null;} }, { key: "isUsernameRegistered", value: function () {var _isUsernameRegistered = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee27(e) {var _yield$this$_request$5, t;return _regenerator.default.wrap(function _callee27$(_context27) {while (1) {switch (_context27.prev = _context27.next) {case 0:if (!("string" != typeof e)) {_context27.next = 2;break;}throw new Error("username must be a string");case 2:_context27.next = 4;return this._request.send("auth.isUsernameRegistered", { username: e });case 4:_yield$this$_request$5 = _context27.sent;t = _yield$this$_request$5.data;return _context27.abrupt("return", t && t.isRegistered);case 7:case "end":return _context27.stop();}}}, _callee27, this);}));function isUsernameRegistered(_x24) {return _isUsernameRegistered.apply(this, arguments);}return isUsernameRegistered;}() }, { key: "getLoginState", value: function getLoginState() {return Promise.resolve(this.hasLoginState());} }, { key: "signInWithTicket", value: function () {var _signInWithTicket = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee28(e) {return _regenerator.default.wrap(function _callee28$(_context28) {while (1) {switch (_context28.prev = _context28.next) {case 0:return _context28.abrupt("return", new Te(this.config).signIn(e));case 1:case "end":return _context28.stop();}}}, _callee28, this);}));function signInWithTicket(_x25) {return _signInWithTicket.apply(this, arguments);}return signInWithTicket;}() }, { key: "shouldRefreshAccessToken", value: function shouldRefreshAccessToken(e) {this._request._shouldRefreshAccessTokenHook = e.bind(this);} }, { key: "getUserInfo", value: function getUserInfo() {return this._request.send("auth.getUserInfo", {}).then(function (e) {return e.code ? e : _objectSpread(_objectSpread({}, e.data), {}, { requestId: e.seqId });});} }, { key: "getAuthHeader", value: function getAuthHeader() {var _this$_cache$keys11 = this._cache.keys,e = _this$_cache$keys11.refreshTokenKey,t = _this$_cache$keys11.accessTokenKey,n = this._cache.getStore(e);return { "x-cloudbase-credentials": this._cache.getStore(t) + "/@@/" + n };} }, { key: "_onAnonymousConverted", value: function _onAnonymousConverted(e) {var t = e.data.env;t === this.config.env && this._cache.updatePersistence(this.config.persistence);} }, { key: "_onLoginTypeChanged", value: function _onLoginTypeChanged(e) {var _e$data = e.data,t = _e$data.loginType,n = _e$data.persistence,s = _e$data.env;s === this.config.env && (this._cache.updatePersistence(n), this._cache.setStore(this._cache.keys.loginTypeKey, t));} }, { key: "currentUser", get: function get() {var e = this.hasLoginState();return e && e.user || null;} }, { key: "loginType", get: function get() {return this._cache.getStore(this._cache.keys.loginTypeKey);} }]);return Ae;}();var Ee = function Ee(e, t) {t = t || j();var n = _e(this.config.env),s = e.cloudPath,r = e.filePath,o = e.onUploadProgress,_e$fileType = e.fileType,i = _e$fileType === void 0 ? "image" : _e$fileType;return n.send("storage.getUploadMetadata", { path: s }).then(function (e) {var _e$data2 = e.data,a = _e$data2.url,c = _e$data2.authorization,u = _e$data2.token,h = _e$data2.fileId,l = _e$data2.cosFileId,d = e.requestId,f = { key: s, signature: c, "x-cos-meta-fileid": l, success_action_status: "201", "x-cos-security-token": u };n.upload({ url: a, data: f, file: r, name: s, fileType: i, onUploadProgress: o }).then(function (e) {201 === e.statusCode ? t(null, { fileID: h, requestId: d }) : t(new Error("STORAGE_REQUEST_FAIL: ".concat(e.data)));}).catch(function (e) {t(e);});}).catch(function (e) {t(e);}), t.promise;},be = function be(e, t) {t = t || j();var n = _e(this.config.env),s = e.cloudPath;return n.send("storage.getUploadMetadata", { path: s }).then(function (e) {t(null, e);}).catch(function (e) {t(e);}), t.promise;},Oe = function Oe(_ref5, t) {var e = _ref5.fileList;if (t = t || j(), !e || !Array.isArray(e)) return { code: "INVALID_PARAM", message: "fileList必须是非空的数组" };var _iterator3 = _createForOfIteratorHelper(e),_step3;try {for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {var _t6 = _step3.value;if (!_t6 || "string" != typeof _t6) return { code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" };}} catch (err) {_iterator3.e(err);} finally {_iterator3.f();}var n = { fileid_list: e };return _e(this.config.env).send("storage.batchDeleteFile", n).then(function (e) {e.code ? t(null, e) : t(null, { fileList: e.data.delete_list, requestId: e.requestId });}).catch(function (e) {t(e);}), t.promise;},Ue = function Ue(_ref6, t) {var e = _ref6.fileList;t = t || j(), e && Array.isArray(e) || t(null, { code: "INVALID_PARAM", message: "fileList必须是非空的数组" });var n = [];var _iterator4 = _createForOfIteratorHelper(e),_step4;try {for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {var _s6 = _step4.value;"object" == typeof _s6 ? (_s6.hasOwnProperty("fileID") && _s6.hasOwnProperty("maxAge") || t(null, { code: "INVALID_PARAM", message: "fileList的元素必须是包含fileID和maxAge的对象" }), n.push({ fileid: _s6.fileID, max_age: _s6.maxAge })) : "string" == typeof _s6 ? n.push({ fileid: _s6 }) : t(null, { code: "INVALID_PARAM", message: "fileList的元素必须是字符串" });}} catch (err) {_iterator4.e(err);} finally {_iterator4.f();}var s = { file_list: n };return _e(this.config.env).send("storage.batchGetDownloadUrl", s).then(function (e) {e.code ? t(null, e) : t(null, { fileList: e.data.download_list, requestId: e.requestId });}).catch(function (e) {t(e);}), t.promise;},Ce = /*#__PURE__*/function () {var _ref8 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee29(_ref7, t) {var e, n, s, r;return _regenerator.default.wrap(function _callee29$(_context29) {while (1) {switch (_context29.prev = _context29.next) {case 0:e = _ref7.fileID;_context29.next = 3;return Ue.call(this, { fileList: [{ fileID: e, maxAge: 600 }] });case 3:n = _context29.sent.fileList[0];if (!("SUCCESS" !== n.code)) {_context29.next = 6;break;}return _context29.abrupt("return", t ? t(n) : new Promise(function (e) {e(n);}));case 6:s = _e(this.config.env);r = n.download_url;if (!(r = encodeURI(r), !t)) {_context29.next = 10;break;}return _context29.abrupt("return", s.download({ url: r }));case 10:_context29.t0 = t;_context29.next = 13;return s.download({ url: r });case 13:_context29.t1 = _context29.sent;(0, _context29.t0)(_context29.t1);case 15:case "end":return _context29.stop();}}}, _callee29, this);}));return function Ce(_x26, _x27) {return _ref8.apply(this, arguments);};}(),De = function De(_ref9, o) {var e = _ref9.name,t = _ref9.data,n = _ref9.query,s = _ref9.parse,r = _ref9.search;var i = o || j();var a;try {a = t ? JSON.stringify(t) : "";} catch (e) {return Promise.reject(e);}if (!e) return Promise.reject(new Error("函数名不能为空"));var c = { inQuery: n, parse: s, search: r, function_name: e, request_data: a };return _e(this.config.env).send("functions.invokeFunction", c).then(function (e) {if (e.code) i(null, e);else {var _t7 = e.data.response_data;if (s) i(null, { result: _t7, requestId: e.requestId });else try {_t7 = JSON.parse(e.data.response_data), i(null, { result: _t7, requestId: e.requestId });} catch (e) {i(new Error("response data must be json"));}}return i.promise;}).catch(function (e) {i(e);}), i.promise;},xe = { timeout: 15e3, persistence: "session" },Re = {};var qe = /*#__PURE__*/function () {function qe(e) {_classCallCheck(this, qe);this.config = e || this.config, this.authObj = void 0;}_createClass(qe, [{ key: "init", value: function init(e) {switch (z.adapter || (this.requestClient = new z.adapter.reqClass({ timeout: e.timeout || 5e3, timeoutMsg: "\u8BF7\u6C42\u5728".concat((e.timeout || 5e3) / 1e3, "s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD") })), this.config = _objectSpread(_objectSpread({}, xe), e), !0) {case this.config.timeout > 6e5:console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = 6e5;break;case this.config.timeout < 100:console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100;}return new qe(this.config);} }, { key: "auth", value: function auth() {var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref10.persistence;if (this.authObj) return this.authObj;var t = e || z.adapter.primaryStorage || xe.persistence;var n;return t !== this.config.persistence && (this.config.persistence = t), function (e) {var t = e.env;G[t] = new X(e), Q[t] = new X(_objectSpread(_objectSpread({}, e), {}, { persistence: "local" }));}(this.config), n = this.config, ye[n.env] = new me(n), this.authObj = new Ae(this.config), this.authObj;} }, { key: "on", value: function on(e, t) {return se.apply(this, [e, t]);} }, { key: "off", value: function off(e, t) {return oe.apply(this, [e, t]);} }, { key: "callFunction", value: function callFunction(e, t) {return De.apply(this, [e, t]);} }, { key: "deleteFile", value: function deleteFile(e, t) {return Oe.apply(this, [e, t]);} }, { key: "getTempFileURL", value: function getTempFileURL(e, t) {return Ue.apply(this, [e, t]);} }, { key: "downloadFile", value: function downloadFile(e, t) {return Ce.apply(this, [e, t]);} }, { key: "uploadFile", value: function uploadFile(e, t) {return Ee.apply(this, [e, t]);} }, { key: "getUploadMetadata", value: function getUploadMetadata(e, t) {return be.apply(this, [e, t]);} }, { key: "registerExtension", value: function registerExtension(e) {Re[e.name] = e;} }, { key: "invokeExtension", value: function () {var _invokeExtension = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee30(e, t) {var n;return _regenerator.default.wrap(function _callee30$(_context30) {while (1) {switch (_context30.prev = _context30.next) {case 0:n = Re[e];if (n) {_context30.next = 3;break;}throw Error("\u6269\u5C55".concat(e, " \u5FC5\u987B\u5148\u6CE8\u518C"));case 3:_context30.next = 5;return n.invoke(t, this);case 5:return _context30.abrupt("return", _context30.sent);case 6:case "end":return _context30.stop();}}}, _callee30, this);}));function invokeExtension(_x28, _x29) {return _invokeExtension.apply(this, arguments);}return invokeExtension;}() }, { key: "useAdapters", value: function useAdapters(e) {var _ref11 = W(e) || {},t = _ref11.adapter,n = _ref11.runtime;t && (z.adapter = t), n && (z.runtime = n);} }]);return qe;}();var Fe = new qe();function Le(e, t, n) {void 0 === n && (n = {});var s = /\?/.test(t),r = "";for (var o in n) {"" === r ? !s && (t += "?") : r += "&", r += o + "=" + encodeURIComponent(n[o]);}return /^http(s)?:\/\//.test(t += r) ? t : "" + e + t;}var Ne = /*#__PURE__*/function () {function Ne() {_classCallCheck(this, Ne);}_createClass(Ne, [{ key: "post", value: function post(e) {var t = e.url,n = e.data,s = e.headers;return new Promise(function (e, r) {q.request({ url: Le("https:", t), data: n, method: "POST", header: s, success: function success(t) {e(t);}, fail: function fail(e) {r(e);} });});} }, { key: "upload", value: function upload(e) {return new Promise(function (t, n) {var s = e.url,r = e.file,o = e.data,i = e.headers,a = e.fileType,c = q.uploadFile({ url: Le("https:", s), name: "file", formData: Object.assign({}, o), filePath: r, fileType: a, header: i, success: function success(e) {var n = { statusCode: e.statusCode, data: e.data || {} };200 === e.statusCode && o.success_action_status && (n.statusCode = parseInt(o.success_action_status, 10)), t(n);}, fail: function fail(e) {u && "mp-alipay" === h && console.warn("支付宝小程序开发工具上传腾讯云时无法准确判断是否上传成功，请使用真机测试"), n(new Error(e.errMsg || "uploadFile:fail"));} });"function" == typeof e.onUploadProgress && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (t) {e.onUploadProgress({ loaded: t.totalBytesSent, total: t.totalBytesExpectedToSend });});});} }]);return Ne;}();var Me = { setItem: function setItem(e, t) {q.setStorageSync(e, t);}, getItem: function getItem(e) {return q.getStorageSync(e);}, removeItem: function removeItem(e) {q.removeStorageSync(e);}, clear: function clear() {q.clearStorageSync();} };var $e = { genAdapter: function genAdapter() {return { root: {}, reqClass: Ne, localStorage: Me, primaryStorage: "local" };}, isMatch: function isMatch() {return !0;}, runtime: "uni_app" };Fe.useAdapters($e);var je = Fe,Ke = je.init;je.init = function (e) {e.env = e.spaceId;var t = Ke.call(this, e);t.config.provider = "tencent", t.config.spaceId = e.spaceId;var n = t.auth;return t.auth = function (e) {var t = n.call(this, e);return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach(function (e) {t[e] = T(t[e]).bind(t);}), t;}, t.customAuth = t.auth, t;};var Be = /*#__PURE__*/function (_F) {_inherits(Be, _F);var _super9 = _createSuper(Be);function Be() {_classCallCheck(this, Be);return _super9.apply(this, arguments);}_createClass(Be, [{ key: "getAccessToken", value: function getAccessToken() {var _this13 = this;return new Promise(function (e, t) {var n = "Anonymous_Access_token";_this13.setAccessToken(n), e(n);});} }, { key: "setupRequest", value: function setupRequest(e, t) {var n = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }),s = { "Content-Type": "application/json" };"auth" !== t && (n.token = this.accessToken, s["x-basement-token"] = this.accessToken), s["x-serverless-sign"] = R.sign(n, this.config.clientSecret);var r = C(),o = r.APPID,i = r.PLATFORM,a = r.DEVICEID,c = r.CLIENT_SDK_VERSION;return s["x-client-platform"] = i, s["x-client-appid"] = o, s["x-client-device-id"] = a, s["x-client-version"] = c, s["x-client-token"] = q.getStorageSync("uni_id_token"), { url: this.config.requestUrl, method: "POST", data: n, dataType: "json", header: JSON.parse(JSON.stringify(s)) };} }, { key: "uploadFileToOSS", value: function uploadFileToOSS(_ref12) {var _this14 = this;var e = _ref12.url,t = _ref12.formData,n = _ref12.name,s = _ref12.filePath,r = _ref12.fileType,o = _ref12.onUploadProgress;return new Promise(function (i, a) {var c = _this14.adapter.uploadFile({ url: e, formData: t, name: n, filePath: s, fileType: r, success: function success(e) {e && e.statusCode < 400 ? i(e) : a(new P({ code: "UPLOAD_FAILED", message: "文件上传失败" }));}, fail: function fail(e) {a(new P({ code: e.code || "UPLOAD_FAILED", message: e.message || e.errMsg || "文件上传失败" }));} });"function" == typeof o && c && "function" == typeof c.onProgressUpdate && c.onProgressUpdate(function (e) {o({ loaded: e.totalBytesSent, total: e.totalBytesExpectedToSend });});});} }, { key: "uploadFile", value: function uploadFile(_ref13) {var _this15 = this;var e = _ref13.filePath,t = _ref13.cloudPath,_ref13$fileType = _ref13.fileType,n = _ref13$fileType === void 0 ? "image" : _ref13$fileType,s = _ref13.onUploadProgress;if (!t) throw new P({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });var r;return this.getOSSUploadOptionsFromPath({ cloudPath: t }).then(function (t) {var _t$result = t.result,o = _t$result.url,i = _t$result.formData,a = _t$result.name,c = _t$result.fileUrl;r = c;var u = { url: o, formData: i, name: a, filePath: e, fileType: n };return _this15.uploadFileToOSS(Object.assign({}, u, { onUploadProgress: s }));}).then(function () {return _this15.reportOSSUpload({ cloudPath: t });}).then(function (t) {return new Promise(function (n, s) {t.success ? n({ success: !0, filePath: e, fileID: r }) : s(new P({ code: "UPLOAD_FAILED", message: "文件上传失败" }));});});} }]);return Be;}(F);var He = { init: function init(e) {var t = new Be(e),n = { signInAnonymously: function signInAnonymously() {return t.authorize();}, getLoginState: function getLoginState() {return Promise.resolve(!1);} };return t.auth = function () {return n;}, t.customAuth = t.auth, t;} };var We, ze;function Ve(_ref14) {var e = _ref14.name,t = _ref14.data,n = _ref14.spaceId,s = _ref14.provider;We || (We = C(), ze = { ak: p, p: "android" === O ? "a" : "i", ut: x(), uuid: D() });var r = JSON.parse(JSON.stringify(t || {})),o = e,i = n,a = { tencent: "t", aliyun: "a" }[s];{var _e16 = Object.assign({}, ze, { fn: o, sid: i, pvd: a });Object.assign(r, { clientInfo: We, uniCloudClientInfo: encodeURIComponent(JSON.stringify(_e16)) });var _uni$getSystemInfoSyn2 = uni.getSystemInfoSync(),_t8 = _uni$getSystemInfoSyn2.deviceId;r.uniCloudDeviceId = _t8;}if (!r.uniIdToken) {var _e17 = q.getStorageSync("uni_id_token") || q.getStorageSync("uniIdToken");_e17 && (r.uniIdToken = _e17);}return r;}function Je(_ref15) {var _this16 = this;var e = _ref15.name,t = _ref15.data;var n = this.localAddress,s = this.localPort,r = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider],o = this.config.spaceId,i = "http://".concat(n, ":").concat(s, "/system/check-function"),a = "http://".concat(n, ":").concat(s, "/cloudfunctions/").concat(e);return new Promise(function (t, n) {q.request({ method: "POST", url: i, data: { name: e, platform: h, provider: r, spaceId: o }, timeout: 3e3, success: function success(e) {t(e);}, fail: function fail() {t({ data: { code: "NETWORK_ERROR", message: "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。" } });} });}).then(function () {var _ref16 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref16.data;var _ref17 = e || {},t = _ref17.code,n = _ref17.message;return { code: 0 === t ? 0 : t || "SYS_ERR", message: n || "SYS_ERR" };}).then(function (_ref18) {var n = _ref18.code,s = _ref18.message;if (0 !== n) {switch (n) {case "MODULE_ENCRYPTED":console.error("\u6B64\u4E91\u51FD\u6570\uFF08".concat(e, "\uFF09\u4F9D\u8D56\u52A0\u5BC6\u516C\u5171\u6A21\u5757\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570"));break;case "FUNCTION_ENCRYPTED":console.error("\u6B64\u4E91\u51FD\u6570\uFF08".concat(e, "\uFF09\u5DF2\u52A0\u5BC6\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570"));break;case "ACTION_ENCRYPTED":console.error(s || "需要访问加密的uni-clientDB-action，自动切换为云端环境");break;case "NETWORK_ERROR":{var _e18 = "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下";throw console.error(_e18), new Error(_e18);}case "SWITCH_TO_CLOUD":break;default:{var _e19 = "\u68C0\u6D4B\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u51FA\u73B0\u9519\u8BEF\uFF1A".concat(s, "\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u73AF\u5883\u6216\u91CD\u542F\u5BA2\u6237\u7AEF\u518D\u8BD5");throw console.error(_e19), new Error(_e19);}}return _this16._originCallFunction({ name: e, data: t });}return new Promise(function (n, s) {var i = Ve({ name: e, data: t, provider: _this16.config.provider, spaceId: o });q.request({ method: "POST", url: a, data: { provider: r, platform: h, param: i }, success: function success() {var _ref19 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref19.statusCode,t = _ref19.data;return !e || e >= 400 ? s(new P({ code: t.code || "SYS_ERR", message: t.message || "request:fail" })) : n({ result: t });}, fail: function fail(e) {s(new P({ code: e.code || e.errCode || "SYS_ERR", message: e.message || e.errMsg || "request:fail" }));} });});});}var Ye = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间", mode: "append" }];var Xe = /[\\^$.*+?()[\]{}|]/g,Ge = RegExp(Xe.source);function Qe(e, t, n) {return e.replace(new RegExp((s = t) && Ge.test(s) ? s.replace(Xe, "\\$&") : s, "g"), n);var s;}function Ze(_ref20) {var e = _ref20.functionName,t = _ref20.result,n = _ref20.logPvd;if (this.config.useDebugFunction && t && t.requestId) {var _s7 = JSON.stringify({ spaceId: this.config.spaceId, functionName: e, requestId: t.requestId });console.log("[".concat(n, "-request]").concat(_s7, "[/").concat(n, "-request]"));}}function et(e) {var t = e.callFunction,n = function n(e) {var _this17 = this;var n = e.name;e.data = Ve({ name: n, data: e.data, provider: this.config.provider, spaceId: this.config.spaceId });var s = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider];return t.call(this, e).then(function (e) {return Ze.call(_this17, { functionName: n, result: e, logPvd: s }), Promise.resolve(e);}, function (t) {return Ze.call(_this17, { functionName: n, result: t, logPvd: s }), t && t.message && (t.message = function () {var _ref21 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref21$message = _ref21.message,e = _ref21$message === void 0 ? "" : _ref21$message,_ref21$extraInfo = _ref21.extraInfo,t = _ref21$extraInfo === void 0 ? {} : _ref21$extraInfo,_ref21$formatter = _ref21.formatter,n = _ref21$formatter === void 0 ? [] : _ref21$formatter;for (var _s8 = 0; _s8 < n.length; _s8++) {var _n$_s = n[_s8],_r3 = _n$_s.rule,_o2 = _n$_s.content,i = _n$_s.mode,_a = e.match(_r3);if (!_a) continue;var _c = _o2;for (var _e20 = 1; _e20 < _a.length; _e20++) {_c = Qe(_c, "{$".concat(_e20, "}"), _a[_e20]);}for (var _e21 in t) {_c = Qe(_c, "{".concat(_e21, "}"), t[_e21]);}switch (i) {case "replace":return _c;case "append":default:return e + _c;}}return e;}({ message: "[".concat(e.name, "]: ").concat(t.message), formatter: Ye, extraInfo: { functionName: n } })), Promise.reject(t);});};e.callFunction = function (t) {var s;return u && e.debugInfo && !e.debugInfo.forceRemote && d ? (e._originCallFunction || (e._originCallFunction = n), s = Je.call(this, t)) : s = n.call(this, t), Object.defineProperty(s, "result", { get: function get() {return console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {};} }), s;};}var tt = Symbol("CLIENT_DB_INTERNAL");function nt(e, t) {return e.then = "DoNotReturnProxyWithAFunctionNamedThen", e._internalType = tt, e.__v_raw = void 0, new Proxy(e, { get: function get(e, n, s) {return n in e || "string" != typeof n ? e[n] : t.get(e, n, s);} });}function st(e) {return e && st(e.__v_raw) || e;}function rt(e) {switch (o(e = st(e))) {case "array":return e.map(function (e) {return rt(e);});case "object":return e._internalType === tt || Object.keys(e).forEach(function (t) {e[t] = rt(e[t]);}), e;case "regexp":return { $regexp: { source: e.source, flags: e.flags } };case "date":return { $date: e.toISOString() };default:return e;}}function ot() {var e = q.getStorageSync("uni_id_token") || "",t = e.split(".");if (!e || 3 !== t.length) return { uid: null, role: [], permission: [], tokenExpired: 0 };var n;try {n = JSON.parse((s = t[1], decodeURIComponent(atob(s).split("").map(function (e) {return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2);}).join(""))));} catch (e) {throw new Error("获取当前用户信息出错，详细错误信息为：" + e.message);}var s;return n.tokenExpired = 1e3 * n.exp, delete n.exp, delete n.iat, n;}var it = t(n(function (e, t) {Object.defineProperty(t, "__esModule", { value: !0 });var n = "chooseAndUploadFile:ok",s = "chooseAndUploadFile:fail";function r(e, t) {return e.tempFiles.forEach(function (e, n) {e.name || (e.name = e.path.substring(e.path.lastIndexOf("/") + 1)), t && (e.fileType = t), e.cloudPath = Date.now() + "_" + n + e.name.substring(e.name.lastIndexOf("."));}), e.tempFilePaths || (e.tempFilePaths = e.tempFiles.map(function (e) {return e.path;})), e;}function o(e, t, _ref22) {var s = _ref22.onChooseFile,r = _ref22.onUploadProgress;return t.then(function (e) {if (s) {var _t9 = s(e);if (void 0 !== _t9) return Promise.resolve(_t9).then(function (t) {return void 0 === t ? e : t;});}return e;}).then(function (t) {return !1 === t ? { errMsg: n, tempFilePaths: [], tempFiles: [] } : function (e, t) {var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;var r = arguments.length > 3 ? arguments[3] : undefined;(t = Object.assign({}, t)).errMsg = n;var o = t.tempFiles,i = o.length;var a = 0;return new Promise(function (n) {for (; a < s;) {c();}function c() {var s = a++;if (s >= i) return void (!o.find(function (e) {return !e.url && !e.errMsg;}) && n(t));var u = o[s];e.uploadFile({ filePath: u.path, cloudPath: u.cloudPath, fileType: u.fileType, onUploadProgress: function onUploadProgress(e) {e.index = s, e.tempFile = u, e.tempFilePath = u.path, r && r(e);} }).then(function (e) {u.url = e.fileID, s < i && c();}).catch(function (e) {u.errMsg = e.errMsg || e.message, s < i && c();});}});}(e, t, 5, r);});}t.initChooseAndUploadFile = function (e) {return function () {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { type: "all" };return "image" === t.type ? o(e, function (e) {var t = e.count,n = e.sizeType,_e$sourceType = e.sourceType,o = _e$sourceType === void 0 ? ["album", "camera"] : _e$sourceType,i = e.extension;return new Promise(function (e, a) {uni.chooseImage({ count: t, sizeType: n, sourceType: o, extension: i, success: function success(t) {e(r(t, "image"));}, fail: function fail(e) {a({ errMsg: e.errMsg.replace("chooseImage:fail", s) });} });});}(t), t) : "video" === t.type ? o(e, function (e) {var t = e.camera,n = e.compressed,o = e.maxDuration,_e$sourceType2 = e.sourceType,i = _e$sourceType2 === void 0 ? ["album", "camera"] : _e$sourceType2,a = e.extension;return new Promise(function (e, c) {uni.chooseVideo({ camera: t, compressed: n, maxDuration: o, sourceType: i, extension: a, success: function success(t) {var n = t.tempFilePath,s = t.duration,o = t.size,i = t.height,a = t.width;e(r({ errMsg: "chooseVideo:ok", tempFilePaths: [n], tempFiles: [{ name: t.tempFile && t.tempFile.name || "", path: n, size: o, type: t.tempFile && t.tempFile.type || "", width: a, height: i, duration: s, fileType: "video", cloudPath: "" }] }, "video"));}, fail: function fail(e) {c({ errMsg: e.errMsg.replace("chooseVideo:fail", s) });} });});}(t), t) : o(e, function (e) {var t = e.count,n = e.extension;return new Promise(function (e, o) {var i = uni.chooseFile;if ("undefined" != typeof wx && "function" == typeof wx.chooseMessageFile && (i = wx.chooseMessageFile), "function" != typeof i) return o({ errMsg: s + " 请指定 type 类型，该平台仅支持选择 image 或 video。" });i({ type: "all", count: t, extension: n, success: function success(t) {e(r(t));}, fail: function fail(e) {o({ errMsg: e.errMsg.replace("chooseFile:fail", s) });} });});}(t), t);};};}));var at = "manual";function ct(e) {return { props: { localdata: { type: Array, default: function _default() {return [];} }, options: { type: [Object, Array], default: function _default() {return {};} }, collection: { type: String, default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: !1 }, gettree: { type: [Boolean, String], default: !1 }, gettreepath: { type: [Boolean, String], default: !1 }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: !1 }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: !1 } }, data: function data() {return { mixinDatacomLoading: !1, mixinDatacomHasMore: !1, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {} };}, created: function created() {var _this18 = this;this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(function () {var e = [];return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach(function (t) {e.push(_this18[t]);}), e;}, function (e, t) {if (_this18.loadtime === at) return;var n = !1;var s = [];for (var _r4 = 2; _r4 < e.length; _r4++) {e[_r4] !== t[_r4] && (s.push(e[_r4]), n = !0);}e[0] !== t[0] && (_this18.mixinDatacomPage.current = _this18.pageCurrent), _this18.mixinDatacomPage.size = _this18.pageSize, _this18.onMixinDatacomPropsChange(n, s);});}, methods: { onMixinDatacomPropsChange: function onMixinDatacomPropsChange(e, t) {}, mixinDatacomEasyGet: function mixinDatacomEasyGet() {var _this19 = this;var _ref23 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref23$getone = _ref23.getone,e = _ref23$getone === void 0 ? !1 : _ref23$getone,t = _ref23.success,n = _ref23.fail;this.mixinDatacomLoading || (this.mixinDatacomLoading = !0, this.mixinDatacomErrorMessage = "", this.mixinDatacomGet().then(function (n) {_this19.mixinDatacomLoading = !1;var _n$result = n.result,s = _n$result.data,r = _n$result.count;_this19.getcount && (_this19.mixinDatacomPage.count = r), _this19.mixinDatacomHasMore = s.length < _this19.pageSize;var o = e ? s.length ? s[0] : void 0 : s;_this19.mixinDatacomResData = o, t && t(o);}).catch(function (e) {_this19.mixinDatacomLoading = !1, _this19.mixinDatacomErrorMessage = e, n && n(e);}));}, mixinDatacomGet: function mixinDatacomGet() {var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var n = e.database();var s = t.action || this.action;s && (n = n.action(s));var r = t.collection || this.collection;n = n.collection(r);var o = t.where || this.where;o && Object.keys(o).length && (n = n.where(o));var i = t.field || this.field;i && (n = n.field(i));var a = t.foreignKey || this.foreignKey;a && (n = n.foreignKey(a));var c = t.groupby || this.groupby;c && (n = n.groupBy(c));var u = t.groupField || this.groupField;u && (n = n.groupField(u));!0 === (void 0 !== t.distinct ? t.distinct : this.distinct) && (n = n.distinct());var h = t.orderby || this.orderby;h && (n = n.orderBy(h));var l = void 0 !== t.pageCurrent ? t.pageCurrent : this.mixinDatacomPage.current,d = void 0 !== t.pageSize ? t.pageSize : this.mixinDatacomPage.size,f = void 0 !== t.getcount ? t.getcount : this.getcount,p = void 0 !== t.gettree ? t.gettree : this.gettree,g = void 0 !== t.gettreepath ? t.gettreepath : this.gettreepath,m = { getCount: f },y = { limitLevel: void 0 !== t.limitlevel ? t.limitlevel : this.limitlevel, startWith: void 0 !== t.startwith ? t.startwith : this.startwith };return p && (m.getTree = y), g && (m.getTreePath = y), n = n.skip(d * (l - 1)).limit(d).get(m), n;} } };}function ut(_x30, _x31) {return _ut.apply(this, arguments);}function _ut() {_ut = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee32(e, t) {var n, _e28, s;return _regenerator.default.wrap(function _callee32$(_context32) {while (1) {switch (_context32.prev = _context32.next) {case 0:n = "http://".concat(e, ":").concat(t, "/system/ping");_context32.prev = 1;_context32.next = 4;return s = { url: n, timeout: 500 }, new Promise(function (e, t) {q.request(_objectSpread(_objectSpread({}, s), {}, { success: function success(t) {e(t);}, fail: function fail(e) {t(e);} }));});case 4:_e28 = _context32.sent;return _context32.abrupt("return", !(!_e28.data || 0 !== _e28.data.code));case 8:_context32.prev = 8;_context32.t0 = _context32["catch"](1);return _context32.abrupt("return", !1);case 11:case "end":return _context32.stop();}}}, _callee32, null, [[1, 8]]);}));return _ut.apply(this, arguments);}var ht = new ( /*#__PURE__*/function () {function _class2() {_classCallCheck(this, _class2);}_createClass(_class2, [{ key: "init", value: function init(e) {var t = {};var n = !1 !== e.debugFunction && u && ("h5" === h && navigator.userAgent.indexOf("HBuilderX") > 0 || "app-plus" === h);switch (e.provider) {case "tencent":t = je.init(Object.assign(e, { useDebugFunction: n }));break;case "aliyun":t = L.init(Object.assign(e, { useDebugFunction: n }));break;case "private":t = He.init(Object.assign(e, { useDebugFunction: n }));break;default:throw new Error("未提供正确的provider参数");}var s = l;u && s && !s.code && (t.debugInfo = s);var r = Promise.resolve();var o;o = 1, r = new Promise(function (e, t) {setTimeout(function () {e();}, o);}), t.isReady = !1, t.isDefault = !1;var i = t.auth();t.initUniCloud = r.then(function () {return i.getLoginState();}).then(function (e) {return e ? Promise.resolve() : i.signInAnonymously();}).then(function () {if (u && t.debugInfo) {var _t$debugInfo = t.debugInfo,_e22 = _t$debugInfo.address,_n4 = _t$debugInfo.servePort;return function () {var _ref24 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee31(e, t) {var n, _s9, _r5;return _regenerator.default.wrap(function _callee31$(_context31) {while (1) {switch (_context31.prev = _context31.next) {case 0:_s9 = 0;case 1:if (!(_s9 < e.length)) {_context31.next = 11;break;}_r5 = e[_s9];_context31.next = 5;return ut(_r5, t);case 5:if (!_context31.sent) {_context31.next = 8;break;}n = _r5;return _context31.abrupt("break", 11);case 8:_s9++;_context31.next = 1;break;case 11:return _context31.abrupt("return", { address: n, port: t });case 12:case "end":return _context31.stop();}}}, _callee31);}));return function (_x32, _x33) {return _ref24.apply(this, arguments);};}()(_e22, _n4);}return Promise.resolve();}).then(function () {var _ref25 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},e = _ref25.address,n = _ref25.port;if (!u) return Promise.resolve();if (e) t.localAddress = e, t.localPort = n;else if (t.debugInfo) {var _e23 = console["app-plus" === h ? "error" : "warn"];"remote" === t.debugInfo.initialLaunchType ? (t.debugInfo.forceRemote = !0, _e23("当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs")) : _e23("无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs");}}).then(function () {return function () {if (!u || "h5" !== h) return;if (uni.getStorageSync("__LAST_DCLOUD_APPID") === p) return;uni.setStorageSync("__LAST_DCLOUD_APPID", p), uni.removeStorageSync("uni_id_token") && (console.warn("检测到当前项目与上次运行到此端口的项目不一致，自动清理uni-id保存的token信息（仅开发调试时生效）"), uni.removeStorageSync("uni_id_token"), uni.removeStorageSync("uni_id_token_expired"));}(), new Promise(function (e) {"quickapp-native" === h ? (O = "android", uni.getStorage({ key: "__DC_CLOUD_UUID", success: function success(t) {b = t.data ? t.data : U(32), e();} })) : setTimeout(function () {O = uni.getSystemInfoSync().platform, b = uni.getStorageSync("__DC_CLOUD_UUID") || U(32), e();}, 0);});}).then(function () {t.isReady = !0;}), et(t), function (e) {var t = e.uploadFile;e.uploadFile = function (e) {var _this20 = this;var n;return n = this.isReady ? Promise.resolve() : this.initUniCloud, n.then(function () {return t.call(_this20, e);});};}(t), function (e) {e.database = function () {if (this._database) return this._database;var t = {};var n = {};function s(_ref26) {var s = _ref26.action,r = _ref26.command,o = _ref26.multiCommand;return S(k("database", "invoke")).then(function () {return e.callFunction({ name: "DCloud-clientDB", data: { action: s, command: r, multiCommand: o } });}).then(function (e) {var _e$result = e.result,s = _e$result.code,r = _e$result.message,o = _e$result.token,i = _e$result.tokenExpired,_e$result$systemInfo = _e$result.systemInfo,c = _e$result$systemInfo === void 0 ? [] : _e$result$systemInfo;if (c) for (var _e24 = 0; _e24 < c.length; _e24++) {var _c$_e = c[_e24],_t10 = _c$_e.level,_n5 = _c$_e.message,_s10 = _c$_e.detail,_r6 = console["app-plus" === h && "warn" === _t10 ? "error" : _t10] || console.log;var _o3 = "[System Info]" + _n5;_s10 && (_o3 = "".concat(_o3, "\n\u8BE6\u7EC6\u4FE1\u606F\uFF1A").concat(_s10)), _r6(_o3);}if (s) {var _e25 = new a(r, s);return n.error && n.error.forEach(function (t) {t(_e25);}), Promise.reject(_e25);}o && i && (t.refreshToken && t.refreshToken.forEach(function (e) {e({ token: o, tokenExpired: i });}), n.refreshToken && n.refreshToken.forEach(function (e) {e({ token: o, tokenExpired: i });}));var u = e.result.affectedDocs;return "number" == typeof u && Object.defineProperty(e.result, "affectedDocs", { get: function get() {return console.warn("affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代"), u;} }), S(k("database", "success"), e).then(function () {return S(k("database", "complete"), e);}).then(function () {return Promise.resolve(e);});}, function (e) {var t = new a(e.message, e.code || "SYSTEM_ERROR");return n.error && n.error.forEach(function (e) {e(t);}), /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB"), S(k("database", "fail"), e).then(function () {return S(k("database", "complete"), e);}).then(function () {return Promise.reject(e);});});}this.isDefault && (n = m("_globalUniCloudDatabaseCallback"));var r = /*#__PURE__*/function () {function r(e, t) {_classCallCheck(this, r);this.content = e, this.prevStage = t, this.udb = null;}_createClass(r, [{ key: "toJSON", value: function toJSON() {var e = this;var t = [e.content];for (; e.prevStage;) {e = e.prevStage, t.push(e.content);}return { $db: t.reverse().map(function (e) {return { $method: e.$method, $param: rt(e.$param) };}) };} }, { key: "getAction", value: function getAction() {var e = this.toJSON().$db.find(function (e) {return "action" === e.$method;});return e && e.$param && e.$param[0];} }, { key: "getCommand", value: function getCommand() {return { $db: this.toJSON().$db.filter(function (e) {return "action" !== e.$method;}) };} }, { key: "get", value: function get() {return this._send("get", Array.from(arguments));} }, { key: "add", value: function add() {return this._send("add", Array.from(arguments));} }, { key: "remove", value: function remove() {return this._send("remove", Array.from(arguments));} }, { key: "update", value: function update() {return this._send("update", Array.from(arguments));} }, { key: "end", value: function end() {return this._send("end", Array.from(arguments));} }, { key: "set", value: function set() {throw new Error("clientDB禁止使用set方法");} }, { key: "_send", value: function _send(e, t) {var n = this.getAction(),r = this.getCommand();return r.$db.push({ $method: e, $param: rt(t) }), s({ action: n, command: r });} }, { key: "useAggregate", get: function get() {var e = this,t = !1;for (; e.prevStage;) {e = e.prevStage;var _n6 = e.content.$method;if ("aggregate" === _n6 || "pipeline" === _n6) {t = !0;break;}}return t;} }, { key: "count", get: function get() {if (!this.useAggregate) return function () {return this._send("count", Array.from(arguments));};var e = this;return function () {return c({ $method: "count", $param: rt(Array.from(arguments)) }, e);};} }, { key: "multiSend", get: function get() {} }]);return r;}();var o = ["db.Geo", "db.command", "command.aggregate"];function i(e, t) {return o.indexOf("".concat(e, ".").concat(t)) > -1;}function c(e, t) {return nt(new r(e, t), { get: function get(e, t) {var n = "db";return e && e.content && (n = e.content.$method), i(n, t) ? c({ $method: t }, e) : function () {return c({ $method: t, $param: rt(Array.from(arguments)) }, e);};}, set: function set(e, t, n) {e[t] = n;} });}function u(_ref27) {var e = _ref27.path,t = _ref27.method;return /*#__PURE__*/function () {function _class3() {_classCallCheck(this, _class3);this.param = Array.from(arguments);}_createClass(_class3, [{ key: "toJSON", value: function toJSON() {return { $newDb: [].concat(_toConsumableArray(e.map(function (e) {return { $method: e };})), [{ $method: t, $param: this.param }]) };} }]);return _class3;}();}var l = { auth: { on: function on(e, n) {t[e] = t[e] || [], t[e].indexOf(n) > -1 || t[e].push(n);}, off: function off(e, n) {t[e] = t[e] || [];var s = t[e].indexOf(n);-1 !== s && t[e].splice(s, 1);} }, on: function on(e, t) {n[e] = n[e] || [], n[e].indexOf(t) > -1 || n[e].push(t);}, off: function off(e, t) {n[e] = n[e] || [];var s = n[e].indexOf(t);-1 !== s && n[e].splice(s, 1);}, env: nt({}, { get: function get(e, t) {return { $env: t };} }), Geo: nt({}, { get: function get(e, t) {return u({ path: ["Geo"], method: t });} }), getCloudEnv: function getCloudEnv(e) {if ("string" != typeof e || !e.trim()) throw new Error("getCloudEnv参数错误");return { $env: e.replace("$cloudEnv_", "") };}, multiSend: function multiSend() {var e = Array.from(arguments);return s({ multiCommand: e.map(function (e) {var t = e.getAction(),n = e.getCommand();if ("getTemp" !== n.$db[n.$db.length - 1].$method) throw new Error("multiSend只支持子命令内使用getTemp");return { action: t, command: n };}) }).then(function (t) {for (var _n7 = 0; _n7 < e.length; _n7++) {var _s11 = e[_n7];_s11.udb && "function" == typeof _s11.udb.setResult && _s11.udb.setResult(t.result.dataList[_n7]);}return Promise.resolve(t);}, function (t) {for (var _n8 = 0; _n8 < e.length; _n8++) {var _s12 = e[_n8];_s12.udb && "function" == typeof _s12.udb.setResult && _s12.udb.setResult(t);}return Promise.reject(t);});}, get serverDate() {return u({ path: [], method: "serverDate" });}, get RegExp() {return u({ path: [], method: "RegExp" });} },d = nt(l, { get: function get(e, t) {return i("db", t) ? c({ $method: t }) : function () {return c({ $method: t, $param: rt(Array.from(arguments)) });};} });return this._database = d, d;};}(t), function (e) {e.getCurrentUserInfo = ot, e.chooseAndUploadFile = it.initChooseAndUploadFile(e), Object.assign(e, { get mixinDatacom() {return ct(e);} });}(t);return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach(function (e) {t[e] && (t[e] = T(t[e], e));}), t.init = this.init, t;} }]);return _class2;}())();(function () {{var e = d;var t = {};if (1 === e.length) t = e[0], ht = ht.init(t), ht.isDefault = !0;else {var _t11 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo"];var _n9;_n9 = e && e.length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : f ? "应用未关联服务空间，请在uniCloud目录右键关联服务空间" : "uni-app cli项目内使用uniCloud需要使用HBuilderX的运行菜单运行项目，且需要在uniCloud目录关联服务空间", _t11.forEach(function (e) {ht[e] = function () {return console.error(_n9), Promise.reject(new P({ code: "SYS_ERR", message: _n9 }));};});}Object.assign(ht, { get mixinDatacom() {return ct(ht);} }), ht.addInterceptor = w, ht.removeInterceptor = v, u && "h5" === h && (window.uniCloud = ht);}})();var lt = ht;var _default2 = lt;exports.default = _default2;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3), __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 83:
/*!**************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.esm.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.initVueI18n = initVueI18n;exports.I18n = void 0;function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isObject = function isObject(val) {return val !== null && typeof val === 'object';};var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format) {
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var _char = format[position++];
    if (_char === '{') {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      _char = format[position++];
      while (_char !== undefined && _char !== '}') {
        sub += _char;
        _char = format[position++];
      }
      var isClosed = _char === '}';
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    } else
    if (_char === '%') {
      // when found rails i18n syntax, skip text capture
      if (format[position] !== '{') {
        text += _char;
      }
    } else
    {
      text += _char;
    }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = Array.isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') !== -1) {
      return 'zh-Hans';
    }
    if (locale.indexOf('-hant') !== -1) {
      return 'zh-Hant';
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return 'zh-Hant';
    }
    return 'zh-Hans';
  }
  var lang = startsWith(locale, ['en', 'fr', 'es']);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref) {var locale = _ref.locale,fallbackLocale = _ref.fallbackLocale,messages = _ref.messages,watcher = _ref.watcher,formater = _ref.formater;_classCallCheck(this, I18n);
    this.locale = 'en';
    this.fallbackLocale = 'en';
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages;
    this.setLocale(locale);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      this.message = this.messages[this.locale];
      this.watchers.forEach(function (watcher) {
        watcher(_this.locale, oldLocale);
      });
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function initLocaleWatcher(appVm, i18n) {
  appVm.$i18n &&
  appVm.$i18n.vm.$watch('locale', function (newLocale) {
    i18n.setLocale(newLocale);
  }, {
    immediate: true });

}
function getDefaultLocale() {
  if (typeof navigator !== 'undefined') {
    return navigator.userLanguage || navigator.language;
  }
  if (typeof plus !== 'undefined') {
    // TODO 待调整为最新的获取语言代码
    return plus.os.language;
  }
  return uni.getSystemInfoSync().language;
}
function initVueI18n(messages) {var fallbackLocale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en';var locale = arguments.length > 2 ? arguments[2] : undefined;
  var i18n = new I18n({
    locale: locale || fallbackLocale,
    fallbackLocale: fallbackLocale,
    messages: messages });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app-plus view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var appVm = getApp().$vm;
      if (!appVm.$t || !appVm.$i18n) {
        if (!locale) {
          i18n.setLocale(getDefaultLocale());
        }
        /* eslint-disable no-func-assign */
        _t = function t(key, values) {
          return i18n.t(key, values);
        };
      } else
      {
        initLocaleWatcher(appVm, i18n);
        /* eslint-disable no-func-assign */
        _t = function t(key, values) {
          var $i18n = appVm.$i18n;
          var silentTranslationWarn = $i18n.silentTranslationWarn;
          $i18n.silentTranslationWarn = true;
          var msg = appVm.$t(key, values);
          $i18n.silentTranslationWarn = silentTranslationWarn;
          if (msg !== key) {
            return msg;
          }
          return i18n.t(key, $i18n.locale, values);
        };
      }
    }
    return _t(key, values);
  };
  return {
    t: function t(key, values) {
      return _t(key, values);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    },
    mixin: {
      beforeCreate: function beforeCreate() {var _this3 = this;
        var unwatch = i18n.watchLocale(function () {
          _this3.$forceUpdate();
        });
        this.$once('hook:beforeDestroy', function () {
          unwatch();
        });
      },
      methods: {
        $$t: function $$t(key, values) {
          return _t(key, values);
        } } } };



}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 84:
/*!**************************************************!*\
  !*** D:/uni-app-test/pages.json?{"type":"stat"} ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "" };exports.default = _default;

/***/ }),

/***/ 85:
/*!********************************************************************************************************!*\
  !*** D:/uni-app-test/uni_modules/uni-file-picker/components/uni-file-picker/choose-and-upload-file.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, uniCloud) {Object.defineProperty(exports, "__esModule", { value: true });exports.chooseAndUploadFile = chooseAndUploadFile;exports.uploadCloudFiles = uploadCloudFiles;

var ERR_MSG_OK = 'chooseAndUploadFile:ok';
var ERR_MSG_FAIL = 'chooseAndUploadFile:fail';

function chooseImage(opts) {var

  count =



  opts.count,_opts$sizeType = opts.sizeType,sizeType = _opts$sizeType === void 0 ? ['original', 'compressed'] : _opts$sizeType,_opts$sourceType = opts.sourceType,sourceType = _opts$sourceType === void 0 ? ['album', 'camera'] : _opts$sourceType,extension = opts.extension;
  return new Promise(function (resolve, reject) {
    uni.chooseImage({
      count: count,
      sizeType: sizeType,
      sourceType: sourceType,
      extension: extension,
      success: function success(res) {
        resolve(normalizeChooseAndUploadFileRes(res, 'image'));
      },
      fail: function fail(res) {
        reject({
          errMsg: res.errMsg.replace('chooseImage:fail', ERR_MSG_FAIL) });

      } });

  });
}

function chooseVideo(opts) {var

  camera =




  opts.camera,compressed = opts.compressed,maxDuration = opts.maxDuration,_opts$sourceType2 = opts.sourceType,sourceType = _opts$sourceType2 === void 0 ? ['album', 'camera'] : _opts$sourceType2,extension = opts.extension;
  return new Promise(function (resolve, reject) {
    uni.chooseVideo({
      camera: camera,
      compressed: compressed,
      maxDuration: maxDuration,
      sourceType: sourceType,
      extension: extension,
      success: function success(res) {var

        tempFilePath =




        res.tempFilePath,duration = res.duration,size = res.size,height = res.height,width = res.width;
        resolve(normalizeChooseAndUploadFileRes({
          errMsg: 'chooseVideo:ok',
          tempFilePaths: [tempFilePath],
          tempFiles: [
          {
            name: res.tempFile && res.tempFile.name || '',
            path: tempFilePath,
            size: size,
            type: res.tempFile && res.tempFile.type || '',
            width: width,
            height: height,
            duration: duration,
            fileType: 'video',
            cloudPath: '' }] },

        'video'));
      },
      fail: function fail(res) {
        reject({
          errMsg: res.errMsg.replace('chooseVideo:fail', ERR_MSG_FAIL) });

      } });

  });
}

function chooseAll(opts) {var

  count =

  opts.count,extension = opts.extension;
  return new Promise(function (resolve, reject) {
    var chooseFile = uni.chooseFile;
    if (typeof wx !== 'undefined' &&
    typeof wx.chooseMessageFile === 'function') {
      chooseFile = wx.chooseMessageFile;
    }
    if (typeof chooseFile !== 'function') {
      return reject({
        errMsg: ERR_MSG_FAIL + ' 请指定 type 类型，该平台仅支持选择 image 或 video。' });

    }
    chooseFile({
      type: 'all',
      count: count,
      extension: extension,
      success: function success(res) {
        resolve(normalizeChooseAndUploadFileRes(res));
      },
      fail: function fail(res) {
        reject({
          errMsg: res.errMsg.replace('chooseFile:fail', ERR_MSG_FAIL) });

      } });

  });
}

function normalizeChooseAndUploadFileRes(res, fileType) {
  res.tempFiles.forEach(function (item, index) {
    if (!item.name) {
      item.name = item.path.substring(item.path.lastIndexOf('/') + 1);
    }
    if (fileType) {
      item.fileType = fileType;
    }
    item.cloudPath =
    Date.now() + '_' + index + item.name.substring(item.name.lastIndexOf('.'));
  });
  if (!res.tempFilePaths) {
    res.tempFilePaths = res.tempFiles.map(function (file) {return file.path;});
  }
  return res;
}

function uploadCloudFiles(files) {var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;var _onUploadProgress = arguments.length > 2 ? arguments[2] : undefined;
  files = JSON.parse(JSON.stringify(files));
  var len = files.length;
  var count = 0;
  var self = this;
  return new Promise(function (resolve) {
    while (count < max) {
      next();
    }

    function next() {
      var cur = count++;
      if (cur >= len) {
        !files.find(function (item) {return !item.url && !item.errMsg;}) && resolve(files);
        return;
      }
      var fileItem = files[cur];
      var index = self.files.findIndex(function (v) {return v.uuid === fileItem.uuid;});
      fileItem.url = '';
      delete fileItem.errMsg;

      uniCloud.
      uploadFile({
        filePath: fileItem.path,
        cloudPath: fileItem.cloudPath,
        fileType: fileItem.fileType,
        onUploadProgress: function onUploadProgress(res) {
          res.index = index;
          _onUploadProgress && _onUploadProgress(res);
        } }).

      then(function (res) {
        fileItem.url = res.fileID;
        fileItem.index = index;
        if (cur < len) {
          next();
        }
      }).
      catch(function (res) {
        fileItem.errMsg = res.errMsg || res.message;
        fileItem.index = index;
        if (cur < len) {
          next();
        }
      });
    }
  });
}





function uploadFiles(choosePromise, _ref)


{var onChooseFile = _ref.onChooseFile,onUploadProgress = _ref.onUploadProgress;
  return choosePromise.
  then(function (res) {
    if (onChooseFile) {
      var customChooseRes = onChooseFile(res);
      if (typeof customChooseRes !== 'undefined') {
        return Promise.resolve(customChooseRes).then(function (chooseRes) {return typeof chooseRes === 'undefined' ?
          res : chooseRes;});
      }
    }
    return res;
  }).
  then(function (res) {
    if (res === false) {
      return {
        errMsg: ERR_MSG_OK,
        tempFilePaths: [],
        tempFiles: [] };

    }
    return res;
  });
}

function chooseAndUploadFile()

{var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { type: 'all' };
  if (opts.type === 'image') {
    return uploadFiles(chooseImage(opts), opts);
  } else
  if (opts.type === 'video') {
    return uploadFiles(chooseVideo(opts), opts);
  }
  return uploadFiles(chooseAll(opts), opts);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/uni-cloud/dist/index.js */ 82)["default"]))

/***/ }),

/***/ 86:
/*!***************************************************************************************!*\
  !*** D:/uni-app-test/uni_modules/uni-file-picker/components/uni-file-picker/utils.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.get_file_data = exports.get_file_info = exports.get_files_and_is_max = exports.get_extname = exports.get_file_ext = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 24));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             * 获取文件名和后缀
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             * @param {String} name
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             */
var get_file_ext = function get_file_ext(name) {
  var last_len = name.lastIndexOf('.');
  var len = name.length;
  return {
    name: name.substring(0, last_len),
    ext: name.substring(last_len + 1, len) };

};

/**
    * 获取扩展名
    * @param {Array} fileExtname
    */exports.get_file_ext = get_file_ext;
var get_extname = function get_extname(fileExtname) {
  if (!Array.isArray(fileExtname)) {
    var extname = fileExtname.replace(/(\[|\])/g, '');
    return extname.split(',');
  } else {
    return fileExtname;
  }
  return [];
};

/**
    * 获取文件和检测是否可选
    */exports.get_extname = get_extname;
var get_files_and_is_max = function get_files_and_is_max(res, _extname) {
  var filePaths = [];
  var files = [];
  if (!_extname || _extname.length === 0) {
    return {
      filePaths: filePaths,
      files: files };

  }
  res.tempFiles.forEach(function (v) {
    var fileFullName = get_file_ext(v.name);
    var extname = fileFullName.ext.toLowerCase();
    if (_extname.indexOf(extname) !== -1) {
      files.push(v);
      filePaths.push(v.path);
    }
  });
  if (files.length !== res.tempFiles.length) {
    uni.showToast({
      title: "\u5F53\u524D\u9009\u62E9\u4E86".concat(res.tempFiles.length, "\u4E2A\u6587\u4EF6 \uFF0C").concat(res.tempFiles.length - files.length, " \u4E2A\u6587\u4EF6\u683C\u5F0F\u4E0D\u6B63\u786E"),
      icon: 'none',
      duration: 5000 });

  }

  return {
    filePaths: filePaths,
    files: files };

};


/**
    * 获取图片信息
    * @param {Object} filepath
    */exports.get_files_and_is_max = get_files_and_is_max;
var get_file_info = function get_file_info(filepath) {
  return new Promise(function (resolve, reject) {
    uni.getImageInfo({
      src: filepath,
      success: function success(res) {
        resolve(res);
      },
      fail: function fail(err) {
        reject(err);
      } });

  });
};
/**
    * 获取封装数据
    */exports.get_file_info = get_file_info;
var get_file_data = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(files) {var type,fileFullName,extname,filedata,imageinfo,_args = arguments;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:type = _args.length > 1 && _args[1] !== undefined ? _args[1] : 'image';
            // 最终需要上传数据库的数据
            fileFullName = get_file_ext(files.name);
            extname = fileFullName.ext.toLowerCase();
            filedata = {
              name: files.name,
              uuid: files.uuid,
              extname: extname || '',
              cloudPath: files.cloudPath,
              fileType: files.fileType,
              url: files.path || files.path,
              size: files.size, //单位是字节
              image: {},
              path: files.path,
              video: {} };if (!(

            type === 'image')) {_context.next = 14;break;}_context.next = 7;return (
              get_file_info(files.path));case 7:imageinfo = _context.sent;
            delete filedata.video;
            filedata.image.width = imageinfo.width;
            filedata.image.height = imageinfo.height;
            filedata.image.location = imageinfo.path;_context.next = 15;break;case 14:

            delete filedata.image;case 15:return _context.abrupt("return",

            filedata);case 16:case "end":return _context.stop();}}}, _callee);}));return function get_file_data(_x) {return _ref.apply(this, arguments);};}();exports.get_file_data = get_file_data;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map