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
/******/ 	return __webpack_require__(__webpack_require__.s = 42);
/******/ })
/************************************************************************/
/******/ ({

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfSwitch = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfSwitch = __webpack_require__(29);

var _pfSwitch2 = _interopRequireDefault(_pfSwitch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * <b>&lt;pf-switch&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-switch state="closed">
 *   <input type="checkbox" id="switch-state" />
 * </pf-switch>
 *
 * @prop {string} state
 * @prop {bool} readonly
 * @prop {bool} disabled
 * @prop {bool} hidden
 * @prop {bool} animated
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
      if (!_this.disabled && !_this.readonly) {
        _this.toggle();
      }
    });
    return _this;
  }

  _createClass(PfSwitch, [{
    key: 'connectedCallback',


    /**
     * Called when an instance of the element is created
     */
    value: function connectedCallback() {
      var _this2 = this;

      this.insertBefore(this._template.content, this.firstChild);
      this._stateElement = this.querySelector('input');
      this._setState(this.getAttribute('state'));
      this._normalizeAndSetText();
      this._setAnimated(this.hasAttribute('animated'));
      this._setDisabled(this.hasAttribute('disabled'));
      this._setHidden(this.hasAttribute('hidden'));
      this._setReadOnly(this.hasAttribute('readonly'));

      if (this._stateElement) {
        this._stateElement.addEventListener('change', function () {
          _this2.activated = _this2._stateElement.checked;
        });
        this._stateElement.style.display = 'none';
      }
    }

    /**
     * Called when element's attribute value has changed
     *
     * @param {string} attrName The attribute name that has changed
     * @param {string} oldValue The old attribute value
     * @param {string} newValue The new attribute value
     */

  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(attrName, oldValue, newValue) {
      if (attrName === 'state') {
        this._setState(newValue);
        this.dispatchEvent(new Event('pf-switch.change', {
          bubbles: false
        }));
      } else if (attrName === 'open-text' || attrName === 'closed-text' || attrName === 'label-text') {
        this._normalizeAndSetText();
      } else if (attrName === 'readonly') {
        this._setReadOnly(this.hasAttribute('readonly'));
      } else if (attrName === 'disabled') {
        this._setDisabled(this.hasAttribute('disabled'));
      } else if (attrName === 'hidden') {
        this._setHidden(this.hasAttribute('hidden'));
      } else if (attrName === 'animated') {
        this._setAnimated(this.hasAttribute('animated'));
      }
    }

    /**
     * Sets the state of the switch
     *
     * @param state current state
     * @private
     */

  }, {
    key: '_setState',
    value: function _setState(state) {
      var wrapper = this.querySelector('.bootstrap-switch-wrapper');
      if (wrapper) {
        wrapper.classList.remove('bootstrap-switch-on');
        wrapper.classList.remove('bootstrap-switch-off');
        wrapper.classList.remove('bootstrap-switch-indeterminate');
      }
      switch (state) {
        case 'closed':
          this._state = 'closed';
          if (wrapper) {
            wrapper.classList.add('bootstrap-switch-on');
          }
          if (this._stateElement) {
            this._stateElement.indeterminate = false;
            this._stateElement.setAttribute('checked', '');
          }
          break;
        case 'indeterminate':
          this._state = 'indeterminate';
          if (wrapper) {
            wrapper.classList.add('bootstrap-switch-indeterminate');
            if (this._stateElement) {
              this._stateElement.indeterminate = true;
            }
          }
          break;
        default:
          this._state = 'open';
          if (wrapper) {
            wrapper.classList.add('bootstrap-switch-off');
          }
          if (this._stateElement) {
            this._stateElement.indeterminate = false;
            this._stateElement.removeAttribute('checked');
          }
          break;
      }
    }

    /**
     * Get state of the switch
     *
     * @return {string}
     */

  }, {
    key: 'toggle',


    /**
     * Toggle the state of the switch.
     *
     * If the current state is 'indeterminate' it sets the state to 'open'.
     */
    value: function toggle() {
      if (this.state === 'open') {
        this.state = 'closed';
      } else {
        this.state = 'open';
      }
    }

    /**
     * Set text used in closed state.
     *
     * @param text
     * @private
     */

  }, {
    key: '_setClosedText',
    value: function _setClosedText(text) {
      var close = this.querySelector('.bootstrap-switch-handle-on');
      if (close) {
        close.innerText = text;
      }
    }

    /**
     * Set text used in open state.
     *
     * @param text
     * @private
     */

  }, {
    key: '_setOpenText',
    value: function _setOpenText(text) {
      var open = this.querySelector('.bootstrap-switch-handle-off');
      if (open) {
        open.innerText = text;
      }
    }

    /**
     * Set text used for label.
     *
     * @param text
     * @private
     */

  }, {
    key: '_setLabelText',
    value: function _setLabelText(text) {
      var label = this.querySelector('.bootstrap-switch-label');
      if (label) {
        label.innerText = text;
      }
    }

    /**
     * Set this switch to read-only
     *
     * @param isReadOnly
     * @private
     */

  }, {
    key: '_setReadOnly',
    value: function _setReadOnly(isReadOnly) {
      var wrapper = this.querySelector('.bootstrap-switch-wrapper');
      if (wrapper) {
        if (isReadOnly) {
          wrapper.classList.add('bootstrap-switch-readonly');
          if (this._stateElement) {
            this._stateElement.setAttribute('readonly', '');
          }
        } else {
          wrapper.classList.remove('bootstrap-switch-readonly');
          if (this._stateElement) {
            this._stateElement.removeAttribute('readonly');
          }
        }
      }
    }

    /**
     * Disable or enable this switch
     *
     * @param isDisabled
     * @private
     */

  }, {
    key: '_setDisabled',
    value: function _setDisabled(isDisabled) {
      var wrapper = this.querySelector('.bootstrap-switch-wrapper');
      if (wrapper) {
        if (isDisabled) {
          wrapper.classList.add('bootstrap-switch-disabled');

          if (this._stateElement) {
            this._stateElement.setAttribute('disabled', '');
          }
        } else {
          wrapper.classList.remove('bootstrap-switch-disabled');
          if (this._stateElement) {
            this._stateElement.removeAttribute('disabled');
          }
        }
      }
    }

    /**
     * Set this switch and its underlying input element to hidden.
     *
     * @param isHidden
     * @private
     */

  }, {
    key: '_setHidden',
    value: function _setHidden(isHidden) {
      if (isHidden) {
        if (this._stateElement) {
          this._stateElement.setAttribute('hidden', '');
        }
      } else {
        if (this._stateElement) {
          this._stateElement.removeAttribute('hidden');
        }
      }
    }

    /**
     * Enable or disable animations of this switch
     *
     * @param isAnimated
     * @private
     */

  }, {
    key: '_setAnimated',
    value: function _setAnimated(isAnimated) {
      var wrapper = this.querySelector('.bootstrap-switch-wrapper');
      if (wrapper) {
        if (isAnimated) {
          wrapper.classList.add('bootstrap-switch-animate');
        } else {
          wrapper.classList.remove('bootstrap-switch-animate');
        }
      }
    }

    /**
     * Properly display the text in the switch
     * @private
     */

  }, {
    key: '_normalizeAndSetText',
    value: function _normalizeAndSetText() {
      var onText = this.closedText;
      var offText = this.openText;
      var labText = this.labelText;

      var len = Math.max(onText.length, offText.length, labText.length);

      this._setClosedText(this._padBoth(onText, len));
      this._setOpenText(this._padBoth(offText, len));
      this._setLabelText(this._padBoth(labText, len));
    }

    /**
     * Pad both sides of the string with non-breaking space to make it to a specific length
     * @param {string} str
     * @param {int} length
     * @return {string}
     * @private
     */

  }, {
    key: '_padBoth',
    value: function _padBoth(str, length) {
      var diff = length - str.length;
      if (diff > 0) {
        var pad = String.fromCharCode(160).repeat(diff / 2);
        return pad + str + pad + (diff % 2 === 0 ? '' : String.fromCharCode(160));
      }
      return str;
    }
  }, {
    key: 'state',
    get: function get() {
      return this._state;
    }

    /**
     * Set state of the switch
     *
     * @param {string} value state to set, must be 'open', 'closed' or 'indeterminate'
     */
    ,
    set: function set(value) {
      this.setAttribute('state', value);
    }

    /**
     * Get text displayed in closed state
     *
     * @return {string}
     */

  }, {
    key: 'closedText',
    get: function get() {
      return this.getAttribute('closed-text') || 'ON';
    }

    /**
     * Set text displayed in closed state
     *
     * @param {string} value text to use in closed switch
     */
    ,
    set: function set(value) {
      this.setAttribute('closed-text', value);
    }

    /**
     * Get text displayed in open state
     *
     * @return {string}
     */

  }, {
    key: 'openText',
    get: function get() {
      return this.getAttribute('open-text') || 'OFF';
    }

    /**
     * Set text displayed in open state
     *
     * @param {string} value text to use in open switch
     */
    ,
    set: function set(value) {
      this.setAttribute('open-text', value);
    }

    /**
     * Set text displayed on the slider knob
     *
     * @return {string}
     */

  }, {
    key: 'labelText',
    get: function get() {
      return this.getAttribute('label-text') || '';
    }

    /**
     * Set text displayed on the slider knob
     *
     * @param {string} value text to use as label
     */
    ,
    set: function set(value) {
      this.setAttribute('label-text', value);
    }

    /**
     * Get whether switch is set to read only.
     *
     * @return {boolean}
     */

  }, {
    key: 'readonly',
    get: function get() {
      return this.hasAttribute('readonly');
    }

    /**
     * Set whether switch should be read only.
     *
     * @param {boolean} value
     */
    ,
    set: function set(value) {
      if (value) {
        this.setAttribute('readonly', '');
      } else {
        this.removeAttribute('readonly');
      }
    }

    /**
     * Get whether switch is disabled.
     *
     * @return {boolean}
     */

  }, {
    key: 'disabled',
    get: function get() {
      return this.hasAttribute('disabled');
    }

    /**
     * Set whether switch should be disabled.
     *
     * @param {boolean} value
     */
    ,
    set: function set(value) {
      if (value) {
        this.setAttribute('disabled', '');
      } else {
        this.removeAttribute('disabled');
      }
    }

    /**
     * Get whether switch animations are enabled.
     *
     * @return {boolean}
     */

  }, {
    key: 'animated',
    get: function get() {
      return this.hasAttribute('animated');
    }

    /**
     * Set whether switch should be animated.
     *
     * @param {boolean} value
     */
    ,
    set: function set(value) {
      if (value) {
        this.setAttribute('animated', '');
      } else {
        this.removeAttribute('animated');
      }
    }

    /**
     * Get whether switch is hidden.
     *
     * @return {boolean}
     */

  }, {
    key: 'hidden',
    get: function get() {
      return this.hasAttribute('hidden');
    }

    /**
     * Set whether switch should be hidden.
     *
     * This also sets the hidden attribute on the underlying input element.
     *
     * @param {boolean} value
     */
    ,
    set: function set(value) {
      if (value) {
        this.setAttribute('hidden', '');
      } else {
        this.removeAttribute('hidden');
      }
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['state', 'open-text', 'closed-text', 'label-text', 'readonly', 'disabled', 'hidden', 'animated'];
    }
  }]);

  return PfSwitch;
}(HTMLElement);

(function () {
  window.customElements.define('pf-switch', PfSwitch);
})();

/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var PfSwitchTemplate = "\n<div class=\"bootstrap-switch bootstrap-switch-wrapper\">\n  <div class=\"bootstrap-switch-container\">\n    <span class=\"bootstrap-switch-handle-on bootstrap-switch-primary\"></span>\n    <span class=\"bootstrap-switch-label\">\n    </span>\n    <span class=\"bootstrap-switch-handle-off bootstrap-switch-default\"></span>\n  </div>\n</div>\n";
exports.default = PfSwitchTemplate;

/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/** PF switch Component **/
__webpack_require__(28);

/***/ })

/******/ });