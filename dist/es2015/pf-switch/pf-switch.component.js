'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PfSwitch = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pfSwitch = require('pf-switch.template');

var _pfSwitch2 = _interopRequireDefault(_pfSwitch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * <b>&lt;pf-switch&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-switch closed>initialized
 *   <input type="checkbox" id="switch-state" />
 * </pf-switch>
 *
 * @prop {bool} closed
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
      if (attrName === 'closed') {
        this._setStateElementChecked(newValue);
        this.dispatchEvent(new Event('pf-switch.change', {
          bubbles: false
        }));
      } else if (attrName === 'indeterminate') {
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
  }, {
    key: '_setStateElementChecked',
    value: function _setStateElementChecked(val) {
      if (val) {
        if (this._stateElement) {
          this._stateElement.setAttribute('checked', '');
        }
      } else {
        if (this._stateElement) {
          this._stateElement.removeAttribute('checked');
        }
      }
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      this.closed = !this.closed;
    }
  }, {
    key: '_setClosedText',
    value: function _setClosedText(text) {
      var close = this.querySelector('.bootstrap-switch-handle-on');
      if (close) {
        close.innerText = text;
      }
    }
  }, {
    key: '_setOpenText',
    value: function _setOpenText(text) {
      var open = this.querySelector('.bootstrap-switch-handle-off');
      if (open) {
        open.innerText = text;
      }
    }
  }, {
    key: '_setLabelText',
    value: function _setLabelText(text) {
      var label = this.querySelector('.bootstrap-switch-label');
      if (label) {
        label.innerText = text;
      }
    }
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
    key: 'closed',
    get: function get() {
      return this.hasAttribute('closed') && !this.indeterminate;
    },
    set: function set(value) {
      if (value) {
        this.setAttribute('closed', '');
      } else {
        this.removeAttribute('closed');
      }
    }
  }, {
    key: 'closedText',
    get: function get() {
      return this.getAttribute('closed-text') || 'ON';
    },
    set: function set(value) {
      this.setAttribute('closed-text', value);
    }
  }, {
    key: 'openText',
    get: function get() {
      return this.getAttribute('open-text') || 'OFF';
    },
    set: function set(value) {
      this.setAttribute('open-text', value);
    }
  }, {
    key: 'labelText',
    get: function get() {
      return this.getAttribute('label-text') || '';
    },
    set: function set(value) {
      this.setAttribute('label-text', value);
    }
  }, {
    key: 'indeterminate',
    get: function get() {
      return this.hasAttribute('indeterminate');
    },
    set: function set(value) {
      if (value) {
        this.setAttribute('indeterminate', '');
      } else {
        this.removeAttribute('indeterminate');
      }
    }
  }, {
    key: 'readonly',
    get: function get() {
      return this.hasAttribute('readonly');
    },
    set: function set(value) {
      if (value) {
        this.setAttribute('readonly', '');
      } else {
        this.removeAttribute('readonly');
      }
    }
  }, {
    key: 'disabled',
    get: function get() {
      return this.hasAttribute('disabled');
    },
    set: function set(value) {
      if (value) {
        this.setAttribute('disabled', '');
      } else {
        this.removeAttribute('disabled');
      }
    }
  }, {
    key: 'animated',
    get: function get() {
      return this.hasAttribute('animated');
    },
    set: function set(value) {
      if (value) {
        this.setAttribute('animated', '');
      } else {
        this.removeAttribute('animated');
      }
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['closed', 'open-text', 'closed-text', 'label-text', 'readonly', 'disabled', 'hidden', 'animated'];
    }
  }]);

  return PfSwitch;
}(HTMLElement);

(function () {
  window.customElements.define('pf-switch', PfSwitch);
})();