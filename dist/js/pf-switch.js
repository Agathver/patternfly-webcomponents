/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 52);
/******/ })
/************************************************************************/
/******/ ({

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfSwitch = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfSwitch = __webpack_require__(38);

var _pfSwitch2 = _interopRequireDefault(_pfSwitch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Represents attribute used for storing state
 * @type {string}
 */
var ATTR_ACTIVATED = 'activated';

/**
 * <b>&lt;pf-switch&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-switch activated>
 *   <input type="checkbox" id="switch-state" />
 * </pf-switch>
 *
 * @prop {bool} activated
 */

var PfSwitch = exports.PfSwitch = function (_HTMLElement) {
  _inherits(PfSwitch, _HTMLElement);

  /**
   * Constructor
   */
  function PfSwitch() {
    _classCallCheck(this, PfSwitch);

    var _this = _possibleConstructorReturn(this, (PfSwitch.__proto__ || Object.getPrototypeOf(PfSwitch)).call(this));

    _this._template = document.createElement('template');
    _this._template.innerHTML = _pfSwitch2.default;
    _this.addEventListener('click', function (e) {
      e.preventDefault();
      _this.toggle();
    });
    return _this;
  }

  /**
   * Called when element's attribute value has changed
   *
   * @param {string} attrName The attribute name that has changed
   * @param {string} oldValue The old attribute value
   * @param {string} newValue The new attribute value
   */


  _createClass(PfSwitch, [{
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(attrName, oldValue, newValue) {
      if (ATTR_ACTIVATED === attrName) {
        this._stateElement.checked = newValue;
        this.dispatchEvent(new Event('pf-accordion.initialized', {
          bubbles: false
        }));
      }
    }

    /**
     * Called when an instance of the element is created
     */

  }, {
    key: 'connectedCallback',
    value: function connectedCallback() {
      this.insertBefore(this._template.content, this.firstChild);
      this._stateElement = this.querySelector('input');
      if (this._stateElement) {
        this._stateElement.style.display = 'none';
      }
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      this.activated = !this.activated;
    }
  }, {
    key: 'activated',
    get: function get() {
      return this.hasAttribute(ATTR_ACTIVATED);
    },
    set: function set(value) {
      if (value) {
        this.setAttribute(ATTR_ACTIVATED, '');
      } else {
        this.removeAttribute(ATTR_ACTIVATED);
      }
    }
  }]);

  return PfSwitch;
}(HTMLElement);

(function () {
  window.customElements.define('pf-switch', PfSwitch);
})();

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var PfSwitchTemplate = "\n<div class=\"bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-animate\">\n  <div class=\"bootstrap-switch-container\">\n    <span class=\"bootstrap-switch-handle-on bootstrap-switch-primary\">ON</span>\n    <span class=\"bootstrap-switch-label\">\n    </span>\n    <span class=\"bootstrap-switch-handle-off bootstrap-switch-default\">OFF</span>\n  </div>\n</div>\n";
exports.default = PfSwitchTemplate;

/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** PF switch Component **/
__webpack_require__(37);

/***/ })

/******/ });