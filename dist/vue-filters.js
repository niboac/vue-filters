(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.timeAgo = timeAgo;
exports.parseTime = parseTime;
exports.formatTime = formatTime;
exports.nFormatter = nFormatter;
exports.html2Text = html2Text;
exports.toThousandFilter = toThousandFilter;
exports.toWanFilter = toWanFilter;
exports.floor = floor;
exports.stringLeft = stringLeft;
exports.toFixed = toFixed;
function pluralize(time, label) {
  if (time === 1) {
    return time + label;
  }
  return time + label + 's';
}

function timeAgo(time) {
  var between = Date.now() / 1000 - Number(time);
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute');
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour');
  } else {
    return pluralize(~~(between / 86400), ' day');
  }
}

function parseTime(time, cFormat) {
  if (!time || arguments.length === 0) {
    return null;
  }

  if ((time + '').length === 10) {
    time = +time * 1000;
  }

  var format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  var tempDate = new Date(time);
  if ((typeof time === 'undefined' ? 'undefined' : _typeof(time)) == 'object') {
    tempDate = time;
  }
  var formatObj = {
    y: tempDate.getFullYear(),
    m: tempDate.getMonth() + 1,
    d: tempDate.getDate(),
    h: tempDate.getHours(),
    i: tempDate.getMinutes(),
    s: tempDate.getSeconds(),
    a: tempDate.getDay()
  };
  var test = new RegExp('{(y|m|d|h|i|s|a)+}', 'g');
  var time_str = format.replace(test, function (result, key) {
    var value = formatObj[key];
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}

function formatTime(time, option) {
  // time = +time * 1000;
  var d = new Date(time);
  var now = Date.now();

  var diff = (now - d) / 1000;

  if (diff < 30) {
    return '刚刚';
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前';
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前';
  } else if (diff < 3600 * 24 * 2) {
    return '1天前';
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes();
  }
}

/* 数字 格式化*/
function nFormatter(num, digits) {
  var si = [{ value: 1E18, symbol: 'E' }, { value: 1E15, symbol: 'P' }, { value: 1E12, symbol: 'T' }, { value: 1E9, symbol: 'G' }, { value: 1E6, symbol: 'M' }, { value: 1E3, symbol: 'k' }];
  for (var i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      var test = new RegExp('\.0+$|(\.[0-9]*[1-9])0+$');

      return (num / si[i].value + 0.1).toFixed(digits).replace(test, '$1') + si[i].symbol;
    }
  }
  return num.toString();
}

function html2Text(val) {
  var div = document.createElement('div');
  div.innerHTML = val;
  return div.textContent || div.innerText;
}

// 给数字加逗号分隔符
function toThousandFilter(num) {
  var test = new RegExp('(\d)(?=(?:\d{3})+$)', 'g');

  return (+num || 0).toString().replace(test, '$1,');
}

// 数字转万单位
function toWanFilter(num) {
  return Math.round(+num || 0) / 10000;
}

// 取整
function floor(num) {
  return Math.floor(+num || 0);
}

// 取字符串的前几位
function stringLeft(str, num) {
  return str ? str.slice(0, num || 8) : '';
}

function toFixed(str, reserved) {
  // 本函数支持能转成数字的字符串
  // var accounting = require('accounting/accounting.min.js');
  var num = +str;
  if (typeof str === 'boolean' || typeof str === 'undefined' || (typeof str === 'undefined' ? 'undefined' : _typeof(str)) === 'object' || str === '' || Number.isNaN(num)) {
    // 如果num是个无法转成数字的字符串, bool值直接返回
    return str;
  }

  var numArray = (num + '').split('.');
  if (numArray.length > 1) {
    /* 有小数*/
    if (numArray[1] * 1 === 0) {
      /* 小数部分为0，直接输出整数部分 */
      return numArray[0];
    }
    var power = Math.pow(10, reserved || 2);
    return Math.round(num * power) / power;
    /* 小数部分不为0，输出四舍五入 */
  } else {
    /* 只有整数，直接输出整数部分 */
    return numArray[0];
  }
}

/***/ })
/******/ ]);
});