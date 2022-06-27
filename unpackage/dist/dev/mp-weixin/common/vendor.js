(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 3);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var realAtob;

var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");}

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;var result = '';var r1;var r2;var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 |
      (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));

      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
      r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
      String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
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

function sortObject(obj) {
  var sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach(function (key) {
      sortObj[key] = obj[key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}

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
/^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo/;

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

var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';

var messages = {};

var locale;

{
  locale = normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}

function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}

initI18nMessages();

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}

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
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}

function setLocale$1(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
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
function useDeviceId(result) {
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
      bottom: result.screenHeight - safeArea.bottom };

  }
}

function populateParameters(result) {var _result$brand =





  result.brand,brand = _result$brand === void 0 ? '' : _result$brand,_result$model = result.model,model = _result$model === void 0 ? '' : _result$model,_result$system = result.system,system = _result$system === void 0 ? '' : _result$system,_result$language = result.language,language = _result$language === void 0 ? '' : _result$language,theme = result.theme,version = result.version,platform = result.platform,fontSizeSetting = result.fontSizeSetting,SDKVersion = result.SDKVersion,pixelRatio = result.pixelRatio,deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-weixin".indexOf('quickapp-webview') !== -1

  // osName osVersion
  var osName = '';
  var osVersion = '';
  {
    osName = system.split(' ')[0] || '';
    osVersion = system.split(' ')[1] || '';
  }
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;

  // hostLanguage
  var hostLanguage = language.replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "__UNI__111C0F5",
    appName: "zuoyebang",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.4.15",
    uniRuntimeVersion: "3.4.15",
    uniPlatform: undefined || "mp-weixin",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined };


  Object.assign(result, parameters);
}

function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc' };

    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}

function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}

function getAppLanguage(defaultLanguage) {
  return getLocale$1 ?
  getLocale$1() :
  defaultLanguage;
}

function getHostName(result) {
  var _platform = 'WeChat';
  var _hostName = result.hostName || _platform; // mp-jd
  {
    if (result.environment) {
      _hostName = result.environment;
    } else if (result.host && result.host.env) {
      _hostName = result.host.env;
    }
  }

  return _hostName;
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  } };


var showActionSheet = {
  args: function args(fromArgs) {
    if (typeof fromArgs === 'object') {
      fromArgs.alertText = fromArgs.title;
    }
  } };


var getAppBaseInfo = {
  returnValue: function returnValue(result) {var _result =
    result,version = _result.version,language = _result.language,SDKVersion = _result.SDKVersion,theme = _result.theme;

    var _hostName = getHostName(result);

    var hostLanguage = language.replace('_', '-');

    result = sortObject(Object.assign(result, {
      appId: "__UNI__111C0F5",
      appName: "zuoyebang",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage),
      hostVersion: version,
      hostLanguage: hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme }));

  } };


var getDeviceInfo = {
  returnValue: function returnValue(result) {var _result2 =
    result,brand = _result2.brand,model = _result2.model;
    var deviceType = getGetDeviceType(result, model);
    var deviceBrand = getDeviceBrand(brand);
    useDeviceId(result);

    result = sortObject(Object.assign(result, {
      deviceType: deviceType,
      deviceBrand: deviceBrand,
      deviceModel: model }));

  } };


var getWindowInfo = {
  returnValue: function returnValue(result) {
    addSafeAreaInsets(result);

    result = sortObject(Object.assign(result, {
      windowTop: 0,
      windowBottom: 0 }));

  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet: showActionSheet,
  getAppBaseInfo: getAppBaseInfo,
  getDeviceInfo: getDeviceInfo,
  getWindowInfo: getWindowInfo };

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


/**
                    * 框架内 try-catch
                    */
/**
                        * 开发者 try-catch
                        */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}

function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}

var cid;
var cidErrMsg;

function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}

function invokePushCallback(
args)
{
  if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'receive',
        data: normalizePushMessage(args.message) });

    });
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message) });

    });
  }
}

var getPushCidCallbacks = [];

function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}

function getPushClientid(args) {
  if (!isPlainObject(args)) {
    args = {};
  }var _getApiCallbacks =




  getApiCallbacks(args),success = _getApiCallbacks.success,fail = _getApiCallbacks.fail,complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);
  getPushCidCallbacks.push(function (cid, errMsg) {
    var res;
    if (cid) {
      res = {
        errMsg: 'getPushClientid:ok',
        cid: cid };

      hasSuccess && success(res);
    } else {
      res = {
        errMsg: 'getPushClientid:fail' + (errMsg ? ' ' + errMsg : '') };

      hasFail && fail(res);
    }
    hasComplete && complete(res);
  });
  if (typeof cid !== 'undefined') {
    Promise.resolve().then(function () {return invokeGetPushCidCallbacks(cid, cidErrMsg);});
  }
}

var onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};

var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};

var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getPushClientid: getPushClientid,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}

function initHook(name, options, isComponent) {
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
      if (Object({"VUE_APP_NAME":"zuoyebang","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
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

function handleEvent(event) {var _this2 = this;
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
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this2.$vm,
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
          _this2.$vm,
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
      this.$on('hook:destroyed', function () {
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
      this.$on('hook:destroyed', function () {
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

  initAppLocale(_vue.default, vm, normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);

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
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 11:
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

/***/ 12:
/*!******************************************************************!*\
  !*** D:/My Dom/前端/进阶学习资料/小程序/HbuilderX/zuoyebang/store/store.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 13));

var _user = _interopRequireDefault(__webpack_require__(/*! ./user */ 14));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_vue.default.use(_vuex.default);

var store = new _vuex.default.Store({
  state: {
    msg: 'vuex 已成功运行...' },

  modules: {
    'm_user': _user.default } });var _default =



store;exports.default = _default;

/***/ }),

/***/ 13:
/*!**************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vuex3/dist/vuex.common.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * vuex v3.6.2
 * (c) 2021 Evan You
 * @license MIT
 */


function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy (obj, cache) {
  if ( cache === void 0 ) cache = [];

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  var hit = find(cache, function (c) { return c.original === obj; });
  if (hit) {
    return hit.copy
  }

  var copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  });

  Object.keys(obj).forEach(function (key) {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy
}

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);

  if (!child) {
    if ((true)) {
      console.warn(
        "[vuex] trying to unregister module '" + key + "', which is " +
        "not registered"
      );
    }
    return
  }

  if (!child.runtime) {
    return
  }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  if (parent) {
    return parent.hasChild(key)
  }

  return false
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype[[104,111,116,85,112,100,97,116,101].map(function (item) {return String.fromCharCode(item)}).join('')] = function (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept another params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

// Credits: borrowed code from fcomb/redux-logger

function createLogger (ref) {
  if ( ref === void 0 ) ref = {};
  var collapsed = ref.collapsed; if ( collapsed === void 0 ) collapsed = true;
  var filter = ref.filter; if ( filter === void 0 ) filter = function (mutation, stateBefore, stateAfter) { return true; };
  var transformer = ref.transformer; if ( transformer === void 0 ) transformer = function (state) { return state; };
  var mutationTransformer = ref.mutationTransformer; if ( mutationTransformer === void 0 ) mutationTransformer = function (mut) { return mut; };
  var actionFilter = ref.actionFilter; if ( actionFilter === void 0 ) actionFilter = function (action, state) { return true; };
  var actionTransformer = ref.actionTransformer; if ( actionTransformer === void 0 ) actionTransformer = function (act) { return act; };
  var logMutations = ref.logMutations; if ( logMutations === void 0 ) logMutations = true;
  var logActions = ref.logActions; if ( logActions === void 0 ) logActions = true;
  var logger = ref.logger; if ( logger === void 0 ) logger = console;

  return function (store) {
    var prevState = deepCopy(store.state);

    if (typeof logger === 'undefined') {
      return
    }

    if (logMutations) {
      store.subscribe(function (mutation, state) {
        var nextState = deepCopy(state);

        if (filter(mutation, prevState, nextState)) {
          var formattedTime = getFormattedTime();
          var formattedMutation = mutationTransformer(mutation);
          var message = "mutation " + (mutation.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
          logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
          logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));
          endMessage(logger);
        }

        prevState = nextState;
      });
    }

    if (logActions) {
      store.subscribeAction(function (action, state) {
        if (actionFilter(action, state)) {
          var formattedTime = getFormattedTime();
          var formattedAction = actionTransformer(action);
          var message = "action " + (action.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
          endMessage(logger);
        }
      });
    }
  }
}

function startMessage (logger, message, collapsed) {
  var startMessage = collapsed
    ? logger.groupCollapsed
    : logger.group;

  // render
  try {
    startMessage.call(logger, message);
  } catch (e) {
    logger.log(message);
  }
}

function endMessage (logger) {
  try {
    logger.groupEnd();
  } catch (e) {
    logger.log('—— log end ——');
  }
}

function getFormattedTime () {
  var time = new Date();
  return (" @ " + (pad(time.getHours(), 2)) + ":" + (pad(time.getMinutes(), 2)) + ":" + (pad(time.getSeconds(), 2)) + "." + (pad(time.getMilliseconds(), 3)))
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

function pad (num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}

var index_cjs = {
  Store: Store,
  install: install,
  version: '3.6.2',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers,
  createLogger: createLogger
};

module.exports = index_cjs;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 14:
/*!*****************************************************************!*\
  !*** D:/My Dom/前端/进阶学习资料/小程序/HbuilderX/zuoyebang/store/user.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 19:
/*!*************************************************************************!*\
  !*** D:/My Dom/前端/进阶学习资料/小程序/HbuilderX/zuoyebang/static/img/camera.png ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 2:
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

/***/ 20:
/*!******************************************************************************!*\
  !*** D:/My Dom/前端/进阶学习资料/小程序/HbuilderX/zuoyebang/static/tabbar/xiongmao.png ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF8AAABKCAYAAADdV4jdAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAIyGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMi0wNi0yN1QxNTo1Mzo1MiswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjItMDYtMjdUMTY6MDE6MDgrMDg6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjItMDYtMjdUMTY6MDE6MDgrMDg6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0ic1JHQiBJRUM2MTk2Ni0yLjEiIHBob3Rvc2hvcDpIaXN0b3J5PSIyMDIyLTA2LTI3VDE1OjU0OjMzKzA4OjAwJiN4OTvmlofku7Yg5bCP54aK54yr5aS0LnBuZyDlt7LmiZPlvIAmI3hBO+W/q+mAn+mAieaLqSYjeEE75b+r6YCf6YCJ5oupJiN4QTvlv6vpgJ/pgInmi6kmI3hBO+i/mOWOnyYjeEE76YeN5YGaJiN4QTvlv6vpgJ/pgInmi6kmI3hBO+W/q+mAn+mAieaLqSYjeEE75b+r6YCf6YCJ5oupJiN4QTvlv6vpgJ/pgInmi6kmI3hBO+W/q+mAn+mAieaLqSYjeEE75b+r6YCf6YCJ5oupJiN4QTvlv6vpgJ/pgInmi6kmI3hBO+W/q+mAn+mAieaLqSYjeEE75b+r6YCf6YCJ5oupJiN4QTvlv6vpgJ/pgInmi6kmI3hBO+W/q+mAn+mAieaLqSYjeEE75b+r6YCf6YCJ5oupJiN4QTvlv6vpgJ/pgInmi6kmI3hBO+W/q+mAn+mAieaLqSYjeEE75b+r6YCf6YCJ5oupJiN4QTvlv6vpgJ/pgInmi6kmI3hBO+W/q+mAn+mAieaLqSYjeEE75b+r6YCf6YCJ5oupJiN4QTvlv6vpgJ/pgInmi6kmI3hBO+W/q+mAn+mAieaLqSYjeEE75b+r6YCf6YCJ5oupJiN4QTvlv6vpgJ/pgInmi6kmI3hBO+W/q+mAn+mAieaLqSYjeEE76L+Y5Y6fJiN4QTvlv6vpgJ/pgInmi6kmI3hBO+W/q+mAn+mAieaLqSYjeEE75b+r6YCf6YCJ5oupJiN4QTvnp7vliqgmI3hBO+enu+WKqCYjeEE75aSN5Yi25Zu+5bGCJiN4QTvnp7vliqgmI3hBOzIwMjItMDYtMjdUMTU6NTk6MjIrMDg6MDAmI3g5O+aWh+S7tiBEOlxQU0F1dG9SZWNvdmVyXEFTVVNcX+Wwj+eGiueMq+WktEUyNDhEQUFEQTRFRUU4QjUzMzVGNkNFM0UxODYxMjQ4LnBzYiDlt7LlrZjlgqgmI3hBO+a4hemZpCYjeEE756e75YqoJiN4QTvov5jljp8mI3hBO+enu+WKqCYjeEE75bu656uL5Zu+5bGCJiN4QTvnp7vliqgmI3hBOzIwMjItMDYtMjdUMTY6MDE6MDgrMDg6MDAmI3g5O+aWh+S7tiBDOlxVc2Vyc1xBU1VTXERlc2t0b3Bc5bCP54aK54yr5aS0LnBuZyDlt7LlrZjlgqgmI3hBOyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpjZTMwMzA0OC04ZWU0LTM0NDEtOGFlZi1iOTg1ZDA2M2NiYmUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Y2UzMDMwNDgtOGVlNC0zNDQxLThhZWYtYjk4NWQwNjNjYmJlIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6Y2UzMDMwNDgtOGVlNC0zNDQxLThhZWYtYjk4NWQwNjNjYmJlIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY3JlYXRlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpjZTMwMzA0OC04ZWU0LTM0NDEtOGFlZi1iOTg1ZDA2M2NiYmUiIHN0RXZ0OndoZW49IjIwMjItMDYtMjdUMTU6NTM6NTIrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+UCvPLwAAGp1JREFUeJztXHd4VNW2/+19zvSSTgpJCBBAAqFFEjqEIl2kiwhcLqiI5aL32h6KPn02wPKuCha89qtwBUFREEGl9xZagiEhtFTSJzNzyt7vj8mMKZPJJMTHe9/N7/vOl8ycc9ZZ+3fWXnuttfcewjlHK24O6M1W4N8ZreTfRLSSfxNB7r333putQ6NQGMA4oBU8XxEANQerup89ULnrXk21mfka49zn3H8vlhOcL6Zgf9Cw+EdbPmkRIcTDrFteXTrcn+s9jwDwwrdPvQhxnbZoQEmLtMA7/mjy/bUZX030tJ/zRuXV7Q2em3nt7/3SyyCC/YHc/yHkN0dfXn1fzcNzzk0gq/kQQqDX6wlp2DR/J5gAnHvk+u1EdCKHQAHyBxlpSwttsHGcczBVJUxVCWPM6yV1jlpC3e6DEAKtVkv69+/f+5FHHrkSFxdnFQTBi7jf76UAGK8v160XZ4wyVaWcMVpzTBAIEKznIAReFb5RiC0oqx7xjDHITqd4Pe+asbyoaJ2jymYEAL3JtMoaHLIvJDLqskan55Q2bgMCJaCCSMLbhGgHDx780sCBA5fo9Xq6cOHCop9++mnSsWPHttlsNlVVVa+K1WWPqapgqygXSvLzbq8sLZkuORzJVBDyDGZLWlBYmx+toWEbBVFkESaOgirShP7iP/6waIepKr2el7s+48jBOyrLSsHqkEIFgRstVikhZUB8UJvwq4Io1mseIQSCIECr1VKzxart1bvPohGpQ1dYLBaxprUrioL8/PyqLVu2DMrKyjpdUVGhKIrC3T2McUBmgE5wGYQiSbprFzIrfztxVFQUGbxGTySEQBBFBEdG8c59+r5A9ZbnDuRruFNpeY7+EPI5Y5FZp9PSsk+nhUpOh89rRY2Gx/dKGt8+oftWQiknhIBSCkop0Wq1JDk5eXxycvIn4eHhAUajkfrw8WCMoby8XL1y5cq1Xbt2jUhPT7+gqipnnHOHzCCAgauKkLZn5/n8Sxc7cO/uzwOD2YKu/Qa//BuPWlYu0RanvyXIr+du8i/l/Hpq786hksM38W5QQVB7DBo2Kqp9h50hoaFC9+7dR3bv3v3tzp07t9fr9c0KODjnKC0tVdPT0w+npaXdk3Ym/VxVRbku48j+Dy9nnLvTXzmWoGBuSBw5oQCB2zhHi76AlvD5tYiXHI5hZ/bvGSo7nX7dTAiBNSCARoYGb1qwcGFGYmJikkajIZRS+LJyf+QGBgYKKSkp/fr27XuqsrJS/Xn79vTiC+cSCvR6OP00jMqyUiJmH/2Ktk9NUUHPNVshLxCSkpJu5P5a7HDOkZ9z8b28nKyODUQ0Hmg0GgSHhmLBQ3/BK++8RybfOUsXGxMTpdFqiSAIIIT4Qz6rq0Mt5aplUEqh0+lop86d20yYOp2MnzoNJdeLkHvlClRV9Zn1gnNwWdKJER0LFKI9CLSc9d+o5dfTuujalRRfxGu0WsTGxeGuhfdixLgJaBsTC51e3xwrd+cG7r8+QQiBRqNBQFAQLAEBeG3NR8g4cwbfrvsKm9Z+hZLi61AV77wqshMWW/4ku8X8PoC8piraEFoy1ATnHBWlJcRbPi8IAiKjozH2jilY8PAStAmPgEarbdZjfHzn1xuklMJktqBPSj8k9OiJSTNn4f03XsOuHT+hoqysXk/gnINUFrSl1o5hjP8fJR8AVEXR1/xMKYVOr0eflH5Y/u4aRMVEQxQ1TRXrb5Rdr7zg4zoCAHqDAb36JuONf3yCU8eO4tGF83Ht8iXIslyr0KZhklGgAKufRjQbLZ426wyGIo9wQUBwaBheemsVPtr4HWLbt/dGfEPEes12m4CG7veaT+gNBtw6YCA2/LobcxctdrnC6uSPEAKzxXw9SMfLmqmLV7Qo+YQQBIaFnwQhnBCCpH798em332Pq3XNhMBh93cpr/PWH8Lp1oMbcjV9yCSEIC4/A06+uxMr3P0REZCQAlxGFRkZtjzDxgpYstN0o+fV0aRMTO0Oj1Sq3Tbwd769dj4SevbwNpt7IaArhzTnvNwRBwPgp0/DZ5q3o0q07jBarwxwQ8A+LljvEFjTXlgg1KaqJI4TAYDZLQ1NTFy19+VVDUFAw9VL04qqqQnI6ib2qijjsdiJJEjjnhFaHmHXkN4dQr/cpigKH3U6qqmzEaXdAlmXXRV5yCioICAwOxuCRo1BYUvI6o8LnlIAV2imcLeT3bzTD9WS37ni6f//+g6dPm7ZLq9OhZsGMMYbyslJ24tBBcmD3bvLbuTMoyM2F3WGHXm9ARFRbdOvZEyPHT0SnrgnNDT/rgXMGW6UNh/buxu7tP+H82TO4XlgIVVVhtlrRNiYW3Xr2xIBhw9GpawIMRmOt56qqisLCQscHH3wQlpNzyVZkBz+aT70FdE3GjZBfq6wgCAISExPj58+fn6HT6Tw1GFVVUWWz4fC+Peq7r62gaUePwGG3E2/VR0EUYbZYMH/xg7j73kUIC4+APxXPhqAoCrLOZ2DFs09j944dsFfZ4C0HETUabrZYyOiJt2Pe/Q+ic0I3aHU61GxDWVmZ/Nprr0deuZZXfCBX4Da52Wp50CKFNUopgoKCdE888USl1WoV3UoriozC/Hz8dcF8HNq3h9dI6X2atEajQWKfJPxjw7cIDg1tVg9QVRWH9+3B4rvuxPWiwnpVVS/glFJisQZg7qL72QOPP0UNBgNotdtkjCEzM7Pw9TfejEjLU9il8hvvlTfq8121GatVWLRoUUFERITRTRRTVezesR0Pz5utnDh8iNTJHn1qzhhDQV4uDu7eidGTJsNgMNSYTGwcjKk4feIY7ps5DUX5+WiseukG5xxOhwOH9+6hp48f5cmDBhNrQICnTBEUFGQSRXHs5ayMNZfLb7zE35w+XYsFURSRmpr6t9jY2ED3d4wxbN30DR5ZMA9Z58/XTeT8YlFVVZw+fhyrVy6H6id5btirqrDsLw+5iPffOXv04pzzXdu3k4VT78C5U6c8F1BKMXx4at+uHWO0IUbSFHvwiuaQ72kNIQTx8fGRqampL7l9M+ccxw8dwFMP3o/ioiIwxvzNOutBlmV8vOptnD97xh+3AQCQJCfWf/4ZTh476tW/NwKPfoyp/Py5s1gyfy4K8nI9F2i1WrLgz38u6xxuuOGY9oaiVp1OR0eMGLFXq9VSAOCMIe3oESyaNQNlJSU3RDzgepGS04lPVr8NWfFvhCu9Xow1b73ZYJHMD3j0VBSFZ6anY8n8uSgtLnadJAShoaH64cndok064YZeQFPIrx2AE4KEhIQunTp1iqOUgjOG0pISvPQfT6AoPx+qqvokXhAE6PV6mMxmmCwW6A0GeJsI55xj36+/QpEbJ59zjpzsLORduVpfeUIgihoYjEaYLRaYzGbUDYe9QZYlfnjvXqx+bTkkSQLgCgjGjr4tPTHKINxAMNakwlot56nVasmoUaP26nQ64lJSxpq/v4GDu3f5JF4URVgDAtG1Rw+MmzwFt3TvAUKAjLNnseWb9Thz8gTKS0shV5PNOUdO1gXkXbuK9vGdfZKlKDKO7NsLu72qxtMJdFodQsLCMDB1OIaPHYfImBjYKspx7OBB/LDha1y+mAN7lQ01wt9aYbTDYecfr3qbDBk5Cv2HpoJSioiICNOwW7uOO3b5yHeMNb6gyBv8Jb/eVGFwcLAhPDw8gBACxhiKrxfh8w/eq+tn6xHfOzkFz658A/G3dIUgCuCMgzGGxD63Ytrdc5H123msfG4Zfv1xi+cFMMawc9s2xMZ1APVRhpacEg7t3V3j6QQGvQGL/vYYps+ZhzYRkWCcQVVUCIKAlEFDMX/xQziw61c888jDyM/NbXBscTocWL7saazb/gvXanVEq9UiOanX8rY7jn+XXaw0K+nyt9PUEz1ixIgNOp2OAq7o4sUnH0NxURH47+FFLeIppZgwfQY+27wF4VFRePf1Fbh9YD90Dw9Cj4gQjE1JwuvPP4ugkBC8vuYj3H3volpWfubkcXhLzGpCUWRcyEj3fDYYDHj5ndVY/NgTKMjLwxP334PBt8SjW5tA9I6OwN0TxmDrpm8wcPhIfPH9j+gQ36mmuFr6q6qKk0cO47t1a4mqKhwA4uPjOyfFWam24WVDPtFkj0UIgdFopElJSbe5ffTli9n45cetDSouCAJ6JCXhpbdWIe/qVcyZMAbvLH8FGWdOQ3JKkCQJWeczsObvb2LmqFRcvJCJh55cip639vXIyLt2DYz7jl4kpxPlZeWeZy58eAnGTp6CzV//C/PvmIhNa79CQV4emMpQZavE4b17sPShB/DMXx5EcGgo1qzf6Cup44xx/PPDDyBLEgEAk8lE+ycnjQ/R82ZVQpo1XERHRweKoghCCCSnEzu+/w4VZZ5Sdz01NFotljz9LGRJwsLpk5GZng5Zkmq5KMYYZFnGpYsX8cySh0ApxYr310BvMAAA7LbKRrMa2VWgA6UU0e3icN+jjyE7MxMvPfU4ykpLoChKrQkSVVXhdDqw+et1ePWZpQiPjMTkWbM9dfy6beGc4eSRw8jOzISqqhBFET0SEz/qFEJJc6zfH/LrRTlxcXFjKaUEACrKy/D1F583GFNTShESGobkgYOw/fvNuHIxB4qPMFBVFKSfSsMXH7yH6Ng49OqbDEIoDEZTo0mNqNV6Fj3NmPcn6PV6PLPkQZRcv+4z5nc4nfhl6xYUFxVh9j33eY263JAkCe+/sRKyJLlXSFhDrAZEmViTw05/yK+9bpIQEhcX97jbH58+cZznXrns7VoOuEqzg0aMgNFowk+bv4XiJV6nlKJzQgKGjByFkLA2kBUFP2/9AUxVkdCjBwgliGwbDUJ8q6vX6WGxWl1Fvj5JuHb5Es6lpdV/2YTAaDQheeBg3DpgIEwmE0pLirFnx3bEdYxHdGw7n8/av2unJ+43m82i1WLWRJo4mmr9zXI7sbGxXQkh4Izh1LFjxGG3e7uMAC5iO3buAg7gwvmMehbonj1au+1nfLh+E15d9R40Gg0qysvhdDoRFRMLAqBj166eIldDEEQR7Tp0cBX6gkNc/t2LxVNCMGbSHfh402Z8+u0PmDxrNhhjOHX8KAghiIqJRXXH9orSkhIU5rvm0bVaLWnXrl13k5Yj1sqaVHJoEvmEEOh0OhIcHKwhhECWZWSdz2g0CnFWL6DS6nT1FaAUnRO6wRoYBK1Oh559+8JoMsG9aEqWZIAQ9Bs8BGIj5Gs0Gs8g7fbJDbWje+/e0Ol0MJnN6NjlFghUgL56qlORpYaGFw4AdpsNVy7lgDHmLrH8JwUQaeLQNcH6GyO/3nsMCgrSuYd2SZJwJeeiTwGqquLUMZdFJfbuU896VVXFkf178eOmb5CZfg7vLH8FlRUVCIuIgN5gQM6FTAQGBSG+yy2NWr5Gq0VS/wEAgIK8XLRt186r/2aMYePar3D6xHEcPbAfWzZuAKEE/YYMhaoqyM78rWYltP4cKOc4m3YSiixDEAS0b99+GCEEOpEjPpDBR6epBW+mUTOhquvvERgYGOj+rMgyigoLfT5AVVTs37kTxUWFmDBtBjat/apeqcBht+ORBfNBKYUsS9AbDJg5bz445zh1/Bhu6Z4IUdRAVVVcLyxEWUkxLAEBCA4JRe7VK5CcTkREtYXZYkFMXHuYzBbs/WUHRo6fiHFTpmLDP7+AXF0acJN3+sRx3HnbCHBwKLKM2A4d0Ds5BUf370Nx0fVGq6GXs7Ohqio0AEJCQgyUUnBVRYSJ4WolQamDNJr1erN8n/cYDIYAxhh3h2q2ykpwDvdBavxffXA4HA58v+FrJPUbgDtmzYZWp691DWMcDrsdVTYbAIKxk6ZgyMjbsO27TchMT8fA1BEQBAEFebmYM2EMJg0egKmpQ7Bg2h2YPHQQJg0ZiKceWAS7vQrhkZGIiYvDxi+/xMULmViy9FnEdYwHpUKtZ6qKiqqqKtir7NAbjHj4yaUwGI348K23qpcQom67SM32lRYXe9ytIAjEvUuGEqBjIPfL97vJ93uY0Gg01pp7cRrz94Crh6xeuQKZGel47LkXMGv+AgSFhNTyyYIgwBoQgGl3z8WSp5ch79pVrFj2DLQ6HSZMmwFBFGGrrERhfgHKy8qQk5WFX7dtQ0FeHirKynDpYjY4BwwGI+5d8ihslZV49en/gMVqxYr31qDfkCEwGI21smatVovo2HZ46qVXMHzcePywYT127/gJzI/th3UjKIPBIBBCQAAE6xkiTI2/ACEpKcnvfUqUUsTGxnZOTEycRwiBw2Fn//r0Y1JaUuLzPs45KisqkHb0MIbeNhq3TZyIlEFDIDmd0Op0CI+MQp+UFDz54suYMe9PKC4qwuP33YPszN8wccZMTJ19NwRBgNFoAmcqLmSkQ5IkMFWFwWhEuw4d8fwbf0d0XDuIooiomFhs3fgNjh48gOKiQtw28XZMnD4TbWNjYKusQGBwMNrGtsO4yVPwwptvoUdSEg7s3IlnljyMivJyf6hAt569MGbSZGi0Wqiqit27d/9XVVWVZ6CwaIFcm+9tpGJd4t17lDjntfxe9VslDoej1P29IIg0MDgEuHChUWU5Yzh9/Dhmj70N9z3yV8ycvwDL3/sATHGtEhY1GiiKgvWff4pVK5cj7+pVGIxG3PXnhR5r1RsMuPfRv2Lc1Gn49N1V+GjVO3jhjf/G8HHjERwa5hlctTodps2Zi+XLnsbaTz7CyaNHsGz5Sky5aw6mzp7rGihFEYQSVJaV48UnHsMP32zwm3gAiIyOrjWYi6JIPfu7GONazjXxVkXKKKZQOQFACCjlNZ2MWJNgzhgtKciPvpJ5/tOyosIBDptNw1QVolYLo8XKwqLa5rSLib6LMVWmlFCNRqRR0dHkxOFDfiudn5uLF554DB+tehuJvfsgPKotCCEoyMvFqePHcPniRTBVhUajwbjJU9Czb9/q3YQuo9JoNIht3x7DRo/GJ6tXY9CIkQgJCwMhxHONIIq4a+E9WP/FZ/jt3DmcOXECcyaOQ5du3XFLt+4ICA6G0+HA5exsHD90CGWlvnuuN3Tp1h2CIIBzxjhnsqIozF5Zabx8Pv2r4rzccfbKCkGRJHAigOhMKreEvYs2nV+HNTzb9RJqRDvOqipL9um0CzkZZ0M5c20/db8YyWGH7HTQ8utF7XOzM/fFt4tx3j59pqjV6VjnhARh66aNTZqy45zjSk4Orl2+XGOjrKu07H5mdFwcnnzx5Qbq9769JCGA2WLBky+8iMWzZ8Fut0NySjhz4gTOnjzpelFw9cbm/OqKXq9H54QECKLAAYCpqiYn/dz3B7b/OEqWnByck9/lqoBdpsReuhiFFxYjIqGcR/eIgM7ooAAgSxI9d2j/pZyMs6FMVUldl+MmjDEVtooK8vTDD+rXffqxLDmdpHdKimww+lyH6RXuaElVFNdRY5OC2WLBE8//F4JCQuDWxVZZibKSEkhOpycKAbjnvL2qCqXFxXA6HK4l3YRg8MhRmDZnLnTVyR1jDKqqQql+Jmsm+cGhoQiPiuKcc+JwOLD+i8/4vh+/Hyk57OCMkXoyOSfgnICpBHlnA0jW/lyuSKCcc+ScO/NmwZVLAUxVG416OOeostmw8rllmqzfzvPEPkno0q1bkxvQEPQGA/70wIMYNnoMKKUectOOHcUdQwbhu3+tQ0VZmSdXkJxOFBcVYsVzyzBj1HBU2Wyee0SNBo8uew59+vWDRtPkZekNYvzUaTwoOIQwxpB1PoO89p/PCoos+xcxMhUouWQl1868JyR266ZJP3Jwg7Oqqklr9R12OzFbLHTAsFQhrE04tv/wvc9qpT/Q6fWYNGMmlix9BmaLpdY5s9mCtKNHsPaTj3Foz25k/3Ye58+dRWV5OT78+3/j2KGDmDFnHvoOHASxBtF6gwF9Bw7E8UOHUFiQ35wVDR4QQhAZHc1XvP8Bs1gDVFmWhU9WvU32/LyjaYI4I0S296GKJIVIdnuTt4hwzvHLtq1cVRn6D01Fjz5Jjab/DcG9Pj51zBgsfWUFLAGBdZMcBAQF49XV72PZipVwVFXhyP79CG0Tjj2//Izodu2w5l8bsODhJdDpDbXuAwhi2rXHax98iA6dOjV3N4xrW5FWi9kL70FAUAglhIpOh5P9sm1rs1wXJDshs2fOMOzdvLFckSRvlu9Nqqd7RURFYcuh47AEBLDC/Dz8adJEeiEjA02ZTiYARI2IBx5/En9+8GFPccsXmKqisqICsiTBYDJW1/p993rOOfKuXcXzf3sUP2/d0mTCBEHA7dNn4Pk33+I6vWvzTXlpKRmb3JvnXbtW67cifIipEWdqQXKyLqiThw6iNRcG+SGIAEDKoMH4cMMm1WyxUsYYcrIuYP3nn1X/toJ/jRMEEQOGpSJl8JAbWhTrFziHLMvY+NU/cTEzswlGQmAymTD3/sUwW6wghHAAqKyowIKpk3Bw9y7XRf6vICRtIiIhhrYJpzFxcSjMz6trDb4EcUopmTh9JkwmsyAIAhcEAR06dcajzzzr5/PdariWlvuaPWpJUEHAtDnz/F6/6YZ7hqy6hxEA3GQykYnTZuDw3j11F4g1JovHxMURwhjju7dvw/13zUT57/OwjQqKbd8eX/+8CxHVSZJbbpNa9P8c1a6MTxs+BJeys+uersuFh1NrQABW/3MtKCEEyYOGYMnSZbBYrd58Z629T5RS0rFLF7z92ZcIaxNOaljCvxXxQPUsXJtw8vZnX5KOXbqQ6nnthrgghBBisVqxZOkykjxoCAGvhr3Kxjd/vY6N7ttLvSXYwuKMGharozxGS3isXuAdzDqeGB7M50wYw8+dSuOyLPNWuCDLMj93Ko3PmTCGJ4YH8w5mHY/VCy7udJTHGTX8lmALH923F9/89Tpur7JxzjkjnHscPWeqSiorKnDkwD6+6asvyaljR1BWVorIqGgMHjESU2bPQUxce+j1+iatl/+3QPW8xeWL2djwxWfYvWM7cq9dQUBAIBL73IpJd87Crf0GwGyxeEJyN/k+Q8pW/DHw7CSsg1bi/xfQrF0jrWgZuMlvJf0mgKKV+JuG1t9SvoloJf8mopX8m4hW8m8iWsm/iWgl/yailfybiFbybyJayb+JaCX/JqKV/JuI/wE4ythjGPFmnQAAAABJRU5ErkJggg=="

/***/ }),

/***/ 29:
/*!**************************************************************************!*\
  !*** D:/My Dom/前端/进阶学习资料/小程序/HbuilderX/zuoyebang/static/img/pic_pra.png ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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fHDp0qWVlZXx3HZR3m/UTZg0aZKeuGGkpqbmuuuuM36zfPnyxFLyXC7XoUOHAEBviaDfP/zww1VVVWVlZVQoly1bRvMXqIF94sQJWmzkyJGmm129enVDQ0NqswQvIvEYBaYyl8JLrKMH/miTUH/g0rZEPv30U7pALTeqKbW1tb2apbNo0aKGhoZTp07RcH3IHRAlXaqn2bdr166lGzcmWQwePNiYp5RMjvmuXbtkWX766adXr149evTol156aeHChWVlZXV1dTTDsqamZs2aNatWrZo3bx5NgaUarSeeGVsije+AVatW0Qdv5MiRMQ85khL1H3ovkT+eSxyC3txeVVXVS7XqKZewiNjtdt0i+MEPfgAA9G25evXq3k71o6H7HjUtR6K6unrOnDl0OTz/ikJda7vdvmXLlueee27RokWpPcD58+fT9sg9e/asXLly586d9PsZM2bIskwNbxomrKurW716tR5AocVMzcaMjIweNTzv2rUrJIKoP7rhTooeO0x5rwhTEnNndFJ4ievq6vSWstGjR5vurrGxMWZtU8sl3Drz7LPP6su33nor+EWkrq5u7dq18ZigKUFPhYoEDcVH+pU+mdF3sX79+n379unFli5dGp4THX/iWfgDL8tyVVXVpk2b7HY7jewAQFlZmdGinjBhAj0K/VgmTpxIF8LDEB988EFZWVkybQS9nZbaIxJ2ZyipusQA8OGHH9KFsrKyMWPGmG6qoaEhZm1TSx+JSE/7ocZEDwcCwLJly2iEibYpAMCKFSvGjh3bN9HpmKlQxkhYYhg9purq6ptvvnngwIEhZWgdogtxlPxFPZKqP70LFy40Rkarq6urq6v1u7ysrMx4i5eVlS1cuFB/kOiZnz59esiNruf+h2fBh3D48OGQQ7uI9EG/5HguMX070uWZM2f2nyySS9KdWb16tf4+rK6u1jN55s6dq3//4IMPrly5sg90JErbQTwYs+xPnz4dKaRCb6wpU6b03hEtWrSotrZWl4m0tLSQAjfffLP+68KFC40/rVmzxtgJmBL+ItVz/yO1feq8/vrrdOEihg91A2TPnj16SxxNydeJ8pNOSi6xy+XSu+EAwNy5c2PWv8/Et49ExOl00oWysrIPPvhA/z6B1hmjggDAL3/5S12SaaIhvZWpZd43OpIMNIQZvYzRsn3mmWeKi4tvvfXWKM17IZGC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"

/***/ }),

/***/ 3:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.resolveLocale = resolveLocale;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
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

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
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
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
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


function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else
  {
    appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}

function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {return locales.indexOf(locale) > -1;});
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 4:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2022 Evan You
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
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
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
        if (Object({"VUE_APP_NAME":"zuoyebang","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
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
        if(Object({"VUE_APP_NAME":"zuoyebang","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"zuoyebang","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
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
      if (Object({"VUE_APP_NAME":"zuoyebang","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
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
      (this.$scope['_triggerEvent'] || this.$scope['triggerEvent']).call(this.$scope, event, {
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
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 5:
/*!**************************************************************!*\
  !*** D:/My Dom/前端/进阶学习资料/小程序/HbuilderX/zuoyebang/pages.json ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 69:
/*!*******************************************************************************************************!*\
  !*** D:/My Dom/前端/进阶学习资料/小程序/HbuilderX/zuoyebang/uni_modules/uni-icons/components/uni-icons/icons.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "id": "2852637",
  "name": "uniui图标库",
  "font_family": "uniicons",
  "css_prefix_text": "uniui-",
  "description": "",
  "glyphs": [
  {
    "icon_id": "25027049",
    "name": "yanse",
    "font_class": "color",
    "unicode": "e6cf",
    "unicode_decimal": 59087 },

  {
    "icon_id": "25027048",
    "name": "wallet",
    "font_class": "wallet",
    "unicode": "e6b1",
    "unicode_decimal": 59057 },

  {
    "icon_id": "25015720",
    "name": "settings-filled",
    "font_class": "settings-filled",
    "unicode": "e6ce",
    "unicode_decimal": 59086 },

  {
    "icon_id": "25015434",
    "name": "shimingrenzheng-filled",
    "font_class": "auth-filled",
    "unicode": "e6cc",
    "unicode_decimal": 59084 },

  {
    "icon_id": "24934246",
    "name": "shop-filled",
    "font_class": "shop-filled",
    "unicode": "e6cd",
    "unicode_decimal": 59085 },

  {
    "icon_id": "24934159",
    "name": "staff-filled-01",
    "font_class": "staff-filled",
    "unicode": "e6cb",
    "unicode_decimal": 59083 },

  {
    "icon_id": "24932461",
    "name": "VIP-filled",
    "font_class": "vip-filled",
    "unicode": "e6c6",
    "unicode_decimal": 59078 },

  {
    "icon_id": "24932462",
    "name": "plus_circle_fill",
    "font_class": "plus-filled",
    "unicode": "e6c7",
    "unicode_decimal": 59079 },

  {
    "icon_id": "24932463",
    "name": "folder_add-filled",
    "font_class": "folder-add-filled",
    "unicode": "e6c8",
    "unicode_decimal": 59080 },

  {
    "icon_id": "24932464",
    "name": "yanse-filled",
    "font_class": "color-filled",
    "unicode": "e6c9",
    "unicode_decimal": 59081 },

  {
    "icon_id": "24932465",
    "name": "tune-filled",
    "font_class": "tune-filled",
    "unicode": "e6ca",
    "unicode_decimal": 59082 },

  {
    "icon_id": "24932455",
    "name": "a-rilidaka-filled",
    "font_class": "calendar-filled",
    "unicode": "e6c0",
    "unicode_decimal": 59072 },

  {
    "icon_id": "24932456",
    "name": "notification-filled",
    "font_class": "notification-filled",
    "unicode": "e6c1",
    "unicode_decimal": 59073 },

  {
    "icon_id": "24932457",
    "name": "wallet-filled",
    "font_class": "wallet-filled",
    "unicode": "e6c2",
    "unicode_decimal": 59074 },

  {
    "icon_id": "24932458",
    "name": "paihangbang-filled",
    "font_class": "medal-filled",
    "unicode": "e6c3",
    "unicode_decimal": 59075 },

  {
    "icon_id": "24932459",
    "name": "gift-filled",
    "font_class": "gift-filled",
    "unicode": "e6c4",
    "unicode_decimal": 59076 },

  {
    "icon_id": "24932460",
    "name": "fire-filled",
    "font_class": "fire-filled",
    "unicode": "e6c5",
    "unicode_decimal": 59077 },

  {
    "icon_id": "24928001",
    "name": "refreshempty",
    "font_class": "refreshempty",
    "unicode": "e6bf",
    "unicode_decimal": 59071 },

  {
    "icon_id": "24926853",
    "name": "location-ellipse",
    "font_class": "location-filled",
    "unicode": "e6af",
    "unicode_decimal": 59055 },

  {
    "icon_id": "24926735",
    "name": "person-filled",
    "font_class": "person-filled",
    "unicode": "e69d",
    "unicode_decimal": 59037 },

  {
    "icon_id": "24926703",
    "name": "personadd-filled",
    "font_class": "personadd-filled",
    "unicode": "e698",
    "unicode_decimal": 59032 },

  {
    "icon_id": "24923351",
    "name": "back",
    "font_class": "back",
    "unicode": "e6b9",
    "unicode_decimal": 59065 },

  {
    "icon_id": "24923352",
    "name": "forward",
    "font_class": "forward",
    "unicode": "e6ba",
    "unicode_decimal": 59066 },

  {
    "icon_id": "24923353",
    "name": "arrowthinright",
    "font_class": "arrow-right",
    "unicode": "e6bb",
    "unicode_decimal": 59067 },

  {
    "icon_id": "24923353",
    "name": "arrowthinright",
    "font_class": "arrowthinright",
    "unicode": "e6bb",
    "unicode_decimal": 59067 },

  {
    "icon_id": "24923354",
    "name": "arrowthinleft",
    "font_class": "arrow-left",
    "unicode": "e6bc",
    "unicode_decimal": 59068 },

  {
    "icon_id": "24923354",
    "name": "arrowthinleft",
    "font_class": "arrowthinleft",
    "unicode": "e6bc",
    "unicode_decimal": 59068 },

  {
    "icon_id": "24923355",
    "name": "arrowthinup",
    "font_class": "arrow-up",
    "unicode": "e6bd",
    "unicode_decimal": 59069 },

  {
    "icon_id": "24923355",
    "name": "arrowthinup",
    "font_class": "arrowthinup",
    "unicode": "e6bd",
    "unicode_decimal": 59069 },

  {
    "icon_id": "24923356",
    "name": "arrowthindown",
    "font_class": "arrow-down",
    "unicode": "e6be",
    "unicode_decimal": 59070 },
  {
    "icon_id": "24923356",
    "name": "arrowthindown",
    "font_class": "arrowthindown",
    "unicode": "e6be",
    "unicode_decimal": 59070 },

  {
    "icon_id": "24923349",
    "name": "arrowdown",
    "font_class": "bottom",
    "unicode": "e6b8",
    "unicode_decimal": 59064 },
  {
    "icon_id": "24923349",
    "name": "arrowdown",
    "font_class": "arrowdown",
    "unicode": "e6b8",
    "unicode_decimal": 59064 },

  {
    "icon_id": "24923346",
    "name": "arrowright",
    "font_class": "right",
    "unicode": "e6b5",
    "unicode_decimal": 59061 },

  {
    "icon_id": "24923346",
    "name": "arrowright",
    "font_class": "arrowright",
    "unicode": "e6b5",
    "unicode_decimal": 59061 },

  {
    "icon_id": "24923347",
    "name": "arrowup",
    "font_class": "top",
    "unicode": "e6b6",
    "unicode_decimal": 59062 },

  {
    "icon_id": "24923347",
    "name": "arrowup",
    "font_class": "arrowup",
    "unicode": "e6b6",
    "unicode_decimal": 59062 },

  {
    "icon_id": "24923348",
    "name": "arrowleft",
    "font_class": "left",
    "unicode": "e6b7",
    "unicode_decimal": 59063 },

  {
    "icon_id": "24923348",
    "name": "arrowleft",
    "font_class": "arrowleft",
    "unicode": "e6b7",
    "unicode_decimal": 59063 },

  {
    "icon_id": "24923334",
    "name": "eye",
    "font_class": "eye",
    "unicode": "e651",
    "unicode_decimal": 58961 },

  {
    "icon_id": "24923335",
    "name": "eye-filled",
    "font_class": "eye-filled",
    "unicode": "e66a",
    "unicode_decimal": 58986 },

  {
    "icon_id": "24923336",
    "name": "eye-slash",
    "font_class": "eye-slash",
    "unicode": "e6b3",
    "unicode_decimal": 59059 },

  {
    "icon_id": "24923337",
    "name": "eye-slash-filled",
    "font_class": "eye-slash-filled",
    "unicode": "e6b4",
    "unicode_decimal": 59060 },

  {
    "icon_id": "24923305",
    "name": "info-filled",
    "font_class": "info-filled",
    "unicode": "e649",
    "unicode_decimal": 58953 },

  {
    "icon_id": "24923299",
    "name": "reload-01",
    "font_class": "reload",
    "unicode": "e6b2",
    "unicode_decimal": 59058 },

  {
    "icon_id": "24923195",
    "name": "mic_slash_fill",
    "font_class": "micoff-filled",
    "unicode": "e6b0",
    "unicode_decimal": 59056 },

  {
    "icon_id": "24923165",
    "name": "map-pin-ellipse",
    "font_class": "map-pin-ellipse",
    "unicode": "e6ac",
    "unicode_decimal": 59052 },

  {
    "icon_id": "24923166",
    "name": "map-pin",
    "font_class": "map-pin",
    "unicode": "e6ad",
    "unicode_decimal": 59053 },

  {
    "icon_id": "24923167",
    "name": "location",
    "font_class": "location",
    "unicode": "e6ae",
    "unicode_decimal": 59054 },

  {
    "icon_id": "24923064",
    "name": "starhalf",
    "font_class": "starhalf",
    "unicode": "e683",
    "unicode_decimal": 59011 },

  {
    "icon_id": "24923065",
    "name": "star",
    "font_class": "star",
    "unicode": "e688",
    "unicode_decimal": 59016 },

  {
    "icon_id": "24923066",
    "name": "star-filled",
    "font_class": "star-filled",
    "unicode": "e68f",
    "unicode_decimal": 59023 },

  {
    "icon_id": "24899646",
    "name": "a-rilidaka",
    "font_class": "calendar",
    "unicode": "e6a0",
    "unicode_decimal": 59040 },

  {
    "icon_id": "24899647",
    "name": "fire",
    "font_class": "fire",
    "unicode": "e6a1",
    "unicode_decimal": 59041 },

  {
    "icon_id": "24899648",
    "name": "paihangbang",
    "font_class": "medal",
    "unicode": "e6a2",
    "unicode_decimal": 59042 },

  {
    "icon_id": "24899649",
    "name": "font",
    "font_class": "font",
    "unicode": "e6a3",
    "unicode_decimal": 59043 },

  {
    "icon_id": "24899650",
    "name": "gift",
    "font_class": "gift",
    "unicode": "e6a4",
    "unicode_decimal": 59044 },

  {
    "icon_id": "24899651",
    "name": "link",
    "font_class": "link",
    "unicode": "e6a5",
    "unicode_decimal": 59045 },

  {
    "icon_id": "24899652",
    "name": "notification",
    "font_class": "notification",
    "unicode": "e6a6",
    "unicode_decimal": 59046 },

  {
    "icon_id": "24899653",
    "name": "staff",
    "font_class": "staff",
    "unicode": "e6a7",
    "unicode_decimal": 59047 },

  {
    "icon_id": "24899654",
    "name": "VIP",
    "font_class": "vip",
    "unicode": "e6a8",
    "unicode_decimal": 59048 },

  {
    "icon_id": "24899655",
    "name": "folder_add",
    "font_class": "folder-add",
    "unicode": "e6a9",
    "unicode_decimal": 59049 },

  {
    "icon_id": "24899656",
    "name": "tune",
    "font_class": "tune",
    "unicode": "e6aa",
    "unicode_decimal": 59050 },

  {
    "icon_id": "24899657",
    "name": "shimingrenzheng",
    "font_class": "auth",
    "unicode": "e6ab",
    "unicode_decimal": 59051 },

  {
    "icon_id": "24899565",
    "name": "person",
    "font_class": "person",
    "unicode": "e699",
    "unicode_decimal": 59033 },

  {
    "icon_id": "24899566",
    "name": "email-filled",
    "font_class": "email-filled",
    "unicode": "e69a",
    "unicode_decimal": 59034 },

  {
    "icon_id": "24899567",
    "name": "phone-filled",
    "font_class": "phone-filled",
    "unicode": "e69b",
    "unicode_decimal": 59035 },

  {
    "icon_id": "24899568",
    "name": "phone",
    "font_class": "phone",
    "unicode": "e69c",
    "unicode_decimal": 59036 },

  {
    "icon_id": "24899570",
    "name": "email",
    "font_class": "email",
    "unicode": "e69e",
    "unicode_decimal": 59038 },

  {
    "icon_id": "24899571",
    "name": "personadd",
    "font_class": "personadd",
    "unicode": "e69f",
    "unicode_decimal": 59039 },

  {
    "icon_id": "24899558",
    "name": "chatboxes-filled",
    "font_class": "chatboxes-filled",
    "unicode": "e692",
    "unicode_decimal": 59026 },

  {
    "icon_id": "24899559",
    "name": "contact",
    "font_class": "contact",
    "unicode": "e693",
    "unicode_decimal": 59027 },

  {
    "icon_id": "24899560",
    "name": "chatbubble-filled",
    "font_class": "chatbubble-filled",
    "unicode": "e694",
    "unicode_decimal": 59028 },

  {
    "icon_id": "24899561",
    "name": "contact-filled",
    "font_class": "contact-filled",
    "unicode": "e695",
    "unicode_decimal": 59029 },

  {
    "icon_id": "24899562",
    "name": "chatboxes",
    "font_class": "chatboxes",
    "unicode": "e696",
    "unicode_decimal": 59030 },

  {
    "icon_id": "24899563",
    "name": "chatbubble",
    "font_class": "chatbubble",
    "unicode": "e697",
    "unicode_decimal": 59031 },

  {
    "icon_id": "24881290",
    "name": "upload-filled",
    "font_class": "upload-filled",
    "unicode": "e68e",
    "unicode_decimal": 59022 },

  {
    "icon_id": "24881292",
    "name": "upload",
    "font_class": "upload",
    "unicode": "e690",
    "unicode_decimal": 59024 },

  {
    "icon_id": "24881293",
    "name": "weixin",
    "font_class": "weixin",
    "unicode": "e691",
    "unicode_decimal": 59025 },

  {
    "icon_id": "24881274",
    "name": "compose",
    "font_class": "compose",
    "unicode": "e67f",
    "unicode_decimal": 59007 },

  {
    "icon_id": "24881275",
    "name": "qq",
    "font_class": "qq",
    "unicode": "e680",
    "unicode_decimal": 59008 },

  {
    "icon_id": "24881276",
    "name": "download-filled",
    "font_class": "download-filled",
    "unicode": "e681",
    "unicode_decimal": 59009 },

  {
    "icon_id": "24881277",
    "name": "pengyouquan",
    "font_class": "pyq",
    "unicode": "e682",
    "unicode_decimal": 59010 },

  {
    "icon_id": "24881279",
    "name": "sound",
    "font_class": "sound",
    "unicode": "e684",
    "unicode_decimal": 59012 },

  {
    "icon_id": "24881280",
    "name": "trash-filled",
    "font_class": "trash-filled",
    "unicode": "e685",
    "unicode_decimal": 59013 },

  {
    "icon_id": "24881281",
    "name": "sound-filled",
    "font_class": "sound-filled",
    "unicode": "e686",
    "unicode_decimal": 59014 },

  {
    "icon_id": "24881282",
    "name": "trash",
    "font_class": "trash",
    "unicode": "e687",
    "unicode_decimal": 59015 },

  {
    "icon_id": "24881284",
    "name": "videocam-filled",
    "font_class": "videocam-filled",
    "unicode": "e689",
    "unicode_decimal": 59017 },

  {
    "icon_id": "24881285",
    "name": "spinner-cycle",
    "font_class": "spinner-cycle",
    "unicode": "e68a",
    "unicode_decimal": 59018 },

  {
    "icon_id": "24881286",
    "name": "weibo",
    "font_class": "weibo",
    "unicode": "e68b",
    "unicode_decimal": 59019 },

  {
    "icon_id": "24881288",
    "name": "videocam",
    "font_class": "videocam",
    "unicode": "e68c",
    "unicode_decimal": 59020 },

  {
    "icon_id": "24881289",
    "name": "download",
    "font_class": "download",
    "unicode": "e68d",
    "unicode_decimal": 59021 },

  {
    "icon_id": "24879601",
    "name": "help",
    "font_class": "help",
    "unicode": "e679",
    "unicode_decimal": 59001 },

  {
    "icon_id": "24879602",
    "name": "navigate-filled",
    "font_class": "navigate-filled",
    "unicode": "e67a",
    "unicode_decimal": 59002 },

  {
    "icon_id": "24879603",
    "name": "plusempty",
    "font_class": "plusempty",
    "unicode": "e67b",
    "unicode_decimal": 59003 },

  {
    "icon_id": "24879604",
    "name": "smallcircle",
    "font_class": "smallcircle",
    "unicode": "e67c",
    "unicode_decimal": 59004 },

  {
    "icon_id": "24879605",
    "name": "minus-filled",
    "font_class": "minus-filled",
    "unicode": "e67d",
    "unicode_decimal": 59005 },

  {
    "icon_id": "24879606",
    "name": "micoff",
    "font_class": "micoff",
    "unicode": "e67e",
    "unicode_decimal": 59006 },

  {
    "icon_id": "24879588",
    "name": "closeempty",
    "font_class": "closeempty",
    "unicode": "e66c",
    "unicode_decimal": 58988 },

  {
    "icon_id": "24879589",
    "name": "clear",
    "font_class": "clear",
    "unicode": "e66d",
    "unicode_decimal": 58989 },

  {
    "icon_id": "24879590",
    "name": "navigate",
    "font_class": "navigate",
    "unicode": "e66e",
    "unicode_decimal": 58990 },

  {
    "icon_id": "24879591",
    "name": "minus",
    "font_class": "minus",
    "unicode": "e66f",
    "unicode_decimal": 58991 },

  {
    "icon_id": "24879592",
    "name": "image",
    "font_class": "image",
    "unicode": "e670",
    "unicode_decimal": 58992 },

  {
    "icon_id": "24879593",
    "name": "mic",
    "font_class": "mic",
    "unicode": "e671",
    "unicode_decimal": 58993 },

  {
    "icon_id": "24879594",
    "name": "paperplane",
    "font_class": "paperplane",
    "unicode": "e672",
    "unicode_decimal": 58994 },

  {
    "icon_id": "24879595",
    "name": "close",
    "font_class": "close",
    "unicode": "e673",
    "unicode_decimal": 58995 },

  {
    "icon_id": "24879596",
    "name": "help-filled",
    "font_class": "help-filled",
    "unicode": "e674",
    "unicode_decimal": 58996 },

  {
    "icon_id": "24879597",
    "name": "plus-filled",
    "font_class": "paperplane-filled",
    "unicode": "e675",
    "unicode_decimal": 58997 },

  {
    "icon_id": "24879598",
    "name": "plus",
    "font_class": "plus",
    "unicode": "e676",
    "unicode_decimal": 58998 },

  {
    "icon_id": "24879599",
    "name": "mic-filled",
    "font_class": "mic-filled",
    "unicode": "e677",
    "unicode_decimal": 58999 },

  {
    "icon_id": "24879600",
    "name": "image-filled",
    "font_class": "image-filled",
    "unicode": "e678",
    "unicode_decimal": 59000 },

  {
    "icon_id": "24855900",
    "name": "locked-filled",
    "font_class": "locked-filled",
    "unicode": "e668",
    "unicode_decimal": 58984 },

  {
    "icon_id": "24855901",
    "name": "info",
    "font_class": "info",
    "unicode": "e669",
    "unicode_decimal": 58985 },

  {
    "icon_id": "24855903",
    "name": "locked",
    "font_class": "locked",
    "unicode": "e66b",
    "unicode_decimal": 58987 },

  {
    "icon_id": "24855884",
    "name": "camera-filled",
    "font_class": "camera-filled",
    "unicode": "e658",
    "unicode_decimal": 58968 },

  {
    "icon_id": "24855885",
    "name": "chat-filled",
    "font_class": "chat-filled",
    "unicode": "e659",
    "unicode_decimal": 58969 },

  {
    "icon_id": "24855886",
    "name": "camera",
    "font_class": "camera",
    "unicode": "e65a",
    "unicode_decimal": 58970 },

  {
    "icon_id": "24855887",
    "name": "circle",
    "font_class": "circle",
    "unicode": "e65b",
    "unicode_decimal": 58971 },

  {
    "icon_id": "24855888",
    "name": "checkmarkempty",
    "font_class": "checkmarkempty",
    "unicode": "e65c",
    "unicode_decimal": 58972 },

  {
    "icon_id": "24855889",
    "name": "chat",
    "font_class": "chat",
    "unicode": "e65d",
    "unicode_decimal": 58973 },

  {
    "icon_id": "24855890",
    "name": "circle-filled",
    "font_class": "circle-filled",
    "unicode": "e65e",
    "unicode_decimal": 58974 },

  {
    "icon_id": "24855891",
    "name": "flag",
    "font_class": "flag",
    "unicode": "e65f",
    "unicode_decimal": 58975 },

  {
    "icon_id": "24855892",
    "name": "flag-filled",
    "font_class": "flag-filled",
    "unicode": "e660",
    "unicode_decimal": 58976 },

  {
    "icon_id": "24855893",
    "name": "gear-filled",
    "font_class": "gear-filled",
    "unicode": "e661",
    "unicode_decimal": 58977 },

  {
    "icon_id": "24855894",
    "name": "home",
    "font_class": "home",
    "unicode": "e662",
    "unicode_decimal": 58978 },

  {
    "icon_id": "24855895",
    "name": "home-filled",
    "font_class": "home-filled",
    "unicode": "e663",
    "unicode_decimal": 58979 },

  {
    "icon_id": "24855896",
    "name": "gear",
    "font_class": "gear",
    "unicode": "e664",
    "unicode_decimal": 58980 },

  {
    "icon_id": "24855897",
    "name": "smallcircle-filled",
    "font_class": "smallcircle-filled",
    "unicode": "e665",
    "unicode_decimal": 58981 },

  {
    "icon_id": "24855898",
    "name": "map-filled",
    "font_class": "map-filled",
    "unicode": "e666",
    "unicode_decimal": 58982 },

  {
    "icon_id": "24855899",
    "name": "map",
    "font_class": "map",
    "unicode": "e667",
    "unicode_decimal": 58983 },

  {
    "icon_id": "24855825",
    "name": "refresh-filled",
    "font_class": "refresh-filled",
    "unicode": "e656",
    "unicode_decimal": 58966 },

  {
    "icon_id": "24855826",
    "name": "refresh",
    "font_class": "refresh",
    "unicode": "e657",
    "unicode_decimal": 58967 },

  {
    "icon_id": "24855808",
    "name": "cloud-upload",
    "font_class": "cloud-upload",
    "unicode": "e645",
    "unicode_decimal": 58949 },

  {
    "icon_id": "24855809",
    "name": "cloud-download-filled",
    "font_class": "cloud-download-filled",
    "unicode": "e646",
    "unicode_decimal": 58950 },

  {
    "icon_id": "24855810",
    "name": "cloud-download",
    "font_class": "cloud-download",
    "unicode": "e647",
    "unicode_decimal": 58951 },

  {
    "icon_id": "24855811",
    "name": "cloud-upload-filled",
    "font_class": "cloud-upload-filled",
    "unicode": "e648",
    "unicode_decimal": 58952 },

  {
    "icon_id": "24855813",
    "name": "redo",
    "font_class": "redo",
    "unicode": "e64a",
    "unicode_decimal": 58954 },

  {
    "icon_id": "24855814",
    "name": "images-filled",
    "font_class": "images-filled",
    "unicode": "e64b",
    "unicode_decimal": 58955 },

  {
    "icon_id": "24855815",
    "name": "undo-filled",
    "font_class": "undo-filled",
    "unicode": "e64c",
    "unicode_decimal": 58956 },

  {
    "icon_id": "24855816",
    "name": "more",
    "font_class": "more",
    "unicode": "e64d",
    "unicode_decimal": 58957 },

  {
    "icon_id": "24855817",
    "name": "more-filled",
    "font_class": "more-filled",
    "unicode": "e64e",
    "unicode_decimal": 58958 },

  {
    "icon_id": "24855818",
    "name": "undo",
    "font_class": "undo",
    "unicode": "e64f",
    "unicode_decimal": 58959 },

  {
    "icon_id": "24855819",
    "name": "images",
    "font_class": "images",
    "unicode": "e650",
    "unicode_decimal": 58960 },

  {
    "icon_id": "24855821",
    "name": "paperclip",
    "font_class": "paperclip",
    "unicode": "e652",
    "unicode_decimal": 58962 },

  {
    "icon_id": "24855822",
    "name": "settings",
    "font_class": "settings",
    "unicode": "e653",
    "unicode_decimal": 58963 },

  {
    "icon_id": "24855823",
    "name": "search",
    "font_class": "search",
    "unicode": "e654",
    "unicode_decimal": 58964 },

  {
    "icon_id": "24855824",
    "name": "redo-filled",
    "font_class": "redo-filled",
    "unicode": "e655",
    "unicode_decimal": 58965 },

  {
    "icon_id": "24841702",
    "name": "list",
    "font_class": "list",
    "unicode": "e644",
    "unicode_decimal": 58948 },

  {
    "icon_id": "24841489",
    "name": "mail-open-filled",
    "font_class": "mail-open-filled",
    "unicode": "e63a",
    "unicode_decimal": 58938 },

  {
    "icon_id": "24841491",
    "name": "hand-thumbsdown-filled",
    "font_class": "hand-down-filled",
    "unicode": "e63c",
    "unicode_decimal": 58940 },

  {
    "icon_id": "24841492",
    "name": "hand-thumbsdown",
    "font_class": "hand-down",
    "unicode": "e63d",
    "unicode_decimal": 58941 },

  {
    "icon_id": "24841493",
    "name": "hand-thumbsup-filled",
    "font_class": "hand-up-filled",
    "unicode": "e63e",
    "unicode_decimal": 58942 },

  {
    "icon_id": "24841494",
    "name": "hand-thumbsup",
    "font_class": "hand-up",
    "unicode": "e63f",
    "unicode_decimal": 58943 },

  {
    "icon_id": "24841496",
    "name": "heart-filled",
    "font_class": "heart-filled",
    "unicode": "e641",
    "unicode_decimal": 58945 },

  {
    "icon_id": "24841498",
    "name": "mail-open",
    "font_class": "mail-open",
    "unicode": "e643",
    "unicode_decimal": 58947 },

  {
    "icon_id": "24841488",
    "name": "heart",
    "font_class": "heart",
    "unicode": "e639",
    "unicode_decimal": 58937 },

  {
    "icon_id": "24839963",
    "name": "loop",
    "font_class": "loop",
    "unicode": "e633",
    "unicode_decimal": 58931 },

  {
    "icon_id": "24839866",
    "name": "pulldown",
    "font_class": "pulldown",
    "unicode": "e632",
    "unicode_decimal": 58930 },

  {
    "icon_id": "24813798",
    "name": "scan",
    "font_class": "scan",
    "unicode": "e62a",
    "unicode_decimal": 58922 },

  {
    "icon_id": "24813786",
    "name": "bars",
    "font_class": "bars",
    "unicode": "e627",
    "unicode_decimal": 58919 },

  {
    "icon_id": "24813788",
    "name": "cart-filled",
    "font_class": "cart-filled",
    "unicode": "e629",
    "unicode_decimal": 58921 },

  {
    "icon_id": "24813790",
    "name": "checkbox",
    "font_class": "checkbox",
    "unicode": "e62b",
    "unicode_decimal": 58923 },

  {
    "icon_id": "24813791",
    "name": "checkbox-filled",
    "font_class": "checkbox-filled",
    "unicode": "e62c",
    "unicode_decimal": 58924 },

  {
    "icon_id": "24813794",
    "name": "shop",
    "font_class": "shop",
    "unicode": "e62f",
    "unicode_decimal": 58927 },

  {
    "icon_id": "24813795",
    "name": "headphones",
    "font_class": "headphones",
    "unicode": "e630",
    "unicode_decimal": 58928 },

  {
    "icon_id": "24813796",
    "name": "cart",
    "font_class": "cart",
    "unicode": "e631",
    "unicode_decimal": 58929 }] };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map