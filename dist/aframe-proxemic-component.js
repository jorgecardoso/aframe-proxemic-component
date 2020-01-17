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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* global AFRAME */\nif (typeof AFRAME === 'undefined') {\n  throw new Error('Component attempted to register before AFRAME was available.');\n}\n\nconsole.log('A-Frame Proxemic Components Version: 0.0.12 (Date 2020-01-17, Commit #47a3413)');\n\n__webpack_require__(/*! ./src/proximity-sensor.js */ \"./src/proximity-sensor.js\");\n\n__webpack_require__(/*! ./src/compass-sensor.js */ \"./src/compass-sensor.js\");\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./src/compass-sensor.js":
/*!*******************************!*\
  !*** ./src/compass-sensor.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\r\n * Proxemic Interactions component for A-Frame.\r\n */\nconst EVENT_NAME_ENTER = 'compass-sensor-enter';\nconst EVENT_NAME_LEAVE = 'compass-sensor-leave';\nAFRAME.registerComponent('compass-sensor', {\n  schema: {\n    xRotMin: {\n      type: 'number',\n      default: -Infinity\n    },\n    yRotMin: {\n      type: 'number',\n      default: -Infinity\n    },\n    zRotMin: {\n      type: 'number',\n      default: -Infinity\n    },\n    xRotMax: {\n      type: 'number',\n      default: Infinity\n    },\n    yRotMax: {\n      type: 'number',\n      default: Infinity\n    },\n    zRotMax: {\n      type: 'number',\n      default: Infinity\n    }\n  },\n\n  /**\r\n   * Set if component needs multiple instancing.\r\n   */\n  multiple: true,\n\n  /**\r\n   * Called once when component is attached. Generally for initial setup.\r\n   */\n  init: function () {},\n  tick: function () {\n    //var thisRot = this.el.object3D.rotation;\n    var xDeg = THREE.Math.radToDeg(this.el.object3D.rotation.x) % 360;\n    xDeg = xDeg < 0 ? 360 + xDeg : xDeg;\n    var yDeg = THREE.Math.radToDeg(this.el.object3D.rotation.y) % 360;\n    yDeg = yDeg < 0 ? 360 + yDeg : yDeg;\n    var zDeg = THREE.Math.radToDeg(this.el.object3D.rotation.z) % 360;\n    zDeg = zDeg < 0 ? 360 + zDeg : zDeg;\n    /*\r\n    if (!this.lastRot.equals(this.el.object3D.rotation)) {\r\n        console.log(xDeg, yDeg, zDeg);\r\n    }\r\n    this.lastRot.copy(this.el.object3D.rotation);\r\n    */\n\n    if (!this.triggered && xDeg >= this.data.xRotMin && xDeg <= this.data.xRotMax && yDeg >= this.data.yRotMin && yDeg <= this.data.yRotMax && zDeg >= this.data.zRotMin && zDeg <= this.data.zRotMax) {\n      this.el.emit(this.eventEnter);\n      console.log('Compass enter: ' + this.eventEnter);\n      this.triggered = true;\n    } else if (this.triggered && (xDeg < this.data.xRotMin || xDeg > this.data.xRotMax || yDeg < this.data.yRotMin || yDeg > this.data.yRotMax || zDeg < this.data.zRotMin || zDeg > this.data.zRotMax)) {\n      this.el.emit(this.eventLeave);\n      console.log('Compass leave: ' + this.eventLeave);\n      this.triggered = false;\n    }\n  },\n\n  /**\r\n   * Called when component is attached and when component data changes.\r\n   * Generally modifies the entity based on the data.\r\n   */\n  update: function (oldData) {\n    this.lastRot = new THREE.Vector3();\n    this.triggered = false;\n\n    if (Math.abs(this.data.xRotMin) !== Infinity) {\n      this.data.xRotMin %= 360;\n      this.data.xRotMin = this.data.xRotMin < 0 ? 360 + this.data.xRotMin : this.data.xRotMin;\n    }\n\n    if (Math.abs(this.data.yRotMin) !== Infinity) {\n      this.data.yRotMin %= 360;\n      this.data.yRotMin = this.data.yRotMin < 0 ? 360 + this.data.yRotMin : this.data.yRotMin;\n    }\n\n    if (Math.abs(this.data.zRotMin) !== Infinity) {\n      this.data.zRotMin %= 360;\n      this.data.zRotMin = this.data.zRotMin < 0 ? 360 + this.data.zRotMin : this.data.zRotMin;\n    }\n\n    if (Math.abs(this.data.xRotMax) !== Infinity) {\n      this.data.xRotMax %= 360;\n      this.data.xRotMax = this.data.xRotMax < 0 ? 360 + this.data.xRotMax : this.data.xRotMax;\n    }\n\n    if (Math.abs(this.data.yRotMax) !== Infinity) {\n      this.data.yRotMax %= 360;\n      this.data.yRotMax = this.data.yRotMax < 0 ? 360 + this.data.yRotMax : this.data.yRotMax;\n    }\n\n    if (Math.abs(this.data.zRotMax) !== Infinity) {\n      this.data.zRotMax %= 360;\n      this.data.zRotMax = this.data.zRotMax < 0 ? 360 + this.data.zRotMax : this.data.zRotMax;\n    }\n\n    if (this.data.xRotMin > this.data.xRotMax) {\n      let temp = this.data.xRotMin;\n      this.data.xRotMin = this.data.xRotMax;\n      this.data.xRotMax = temp;\n    }\n\n    if (this.data.yRotMin > this.data.yRotMax) {\n      let temp = this.data.yRotMin;\n      this.data.yRotMin = this.data.yRotMax;\n      this.data.yRotMax = temp;\n    }\n\n    if (this.data.zRotMin > this.data.zRotMax) {\n      let temp = this.data.zRotMin;\n      this.data.zRotMin = this.data.zRotMax;\n      this.data.zRotMax = temp;\n    }\n\n    if (this.id !== undefined) {\n      this.eventEnter = EVENT_NAME_ENTER + '-' + this.id;\n      this.eventLeave = EVENT_NAME_LEAVE + '-' + this.id;\n    } else {\n      this.eventEnter = EVENT_NAME_ENTER;\n      this.eventLeave = EVENT_NAME_LEAVE;\n    } // console.log(this.data);\n\n  },\n\n  /**\r\n   * Called when a component is removed (e.g., via removeAttribute).\r\n   * Generally undoes all modifications to the entity.\r\n   */\n  remove: function () {},\n\n  /**\r\n   * Called on each scene tick.\r\n   */\n  // tick: function (t) { },\n\n  /**\r\n   * Called when entity pauses.\r\n   * Use to stop or remove any dynamic or background behavior such as events.\r\n   */\n  pause: function () {},\n\n  /**\r\n   * Called when entity resumes.\r\n   * Use to continue or add any dynamic or background behavior such as events.\r\n   */\n  play: function () {}\n});\n\n//# sourceURL=webpack:///./src/compass-sensor.js?");

/***/ }),

/***/ "./src/proximity-sensor.js":
/*!*********************************!*\
  !*** ./src/proximity-sensor.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\r\n * Proxemic Interactions component for A-Frame.\r\n */\nAFRAME.registerComponent('proximity-sensor', {\n  schema: {\n    distance: {\n      type: 'number',\n      default: 1,\n      min: 0\n    },\n    target: {\n      type: 'selector',\n      default: '[camera]'\n    }\n  },\n\n  /**\r\n   * Set if component needs multiple instancing.\r\n   */\n  multiple: false,\n\n  /**\r\n   * Called once when component is attached. Generally for initial setup.\r\n   */\n  init: function () {\n    this.el.sceneEl.addBehavior(this);\n    this._triggered = false;\n    this._targetPos = new THREE.Vector3();\n    this._thisPos = new THREE.Vector3();\n    console.info(\"A-Frame Proximity Sensor.\");\n  },\n\n  /**\r\n   * Called when component is attached and when component data changes.\r\n   * Generally modifies the entity based on the data.\r\n   */\n  update: function (oldData) {\n    this._triggered = false;\n    this._target = this.data.target;\n    console.log(\"Detecting proximity (distance threshold: \", this.data.distance, \") between \", this.el, \" and \", this.data.target);\n  },\n  tick: function () {\n    this._targetPos = this.getWorldPosition(this._target.object3D, this._targetPos);\n    this._thisPos = this.getWorldPosition(this.el.object3D, this._thisPos);\n\n    if (!this._triggered && this._thisPos.distanceTo(this._targetPos) < this.data.distance) {\n      this._triggered = true;\n      console.debug('Emitting \"proximityenter\" event');\n      this.el.emit('proximityenter');\n    } else if (this._triggered && this._thisPos.distanceTo(this._targetPos) >= this.data.distance) {\n      this._triggered = false;\n      console.debug('Emitting \"proximityexit\" event');\n      this.el.emit('proximityexit');\n    }\n  },\n\n  /**\r\n   * Called when a component is removed (e.g., via removeAttribute).\r\n   * Generally undoes all modifications to the entity.\r\n   */\n  remove: function () {},\n\n  /**\r\n   * Called on each scene tick.\r\n   */\n  // tick: function (t) { },\n\n  /**\r\n   * Called when entity pauses.\r\n   * Use to stop or remove any dynamic or background behavior such as events.\r\n   */\n  pause: function () {},\n\n  /**\r\n   * Called when entity resumes.\r\n   * Use to continue or add any dynamic or background behavior such as events.\r\n   */\n  play: function () {},\n  getWorldPosition: function (object3D, vec3) {\n    object3D.updateWorldMatrix(true);\n    vec3.setFromMatrixPosition(object3D.matrixWorld);\n    return vec3;\n  }\n});\n\n//# sourceURL=webpack:///./src/proximity-sensor.js?");

/***/ })

/******/ });
});