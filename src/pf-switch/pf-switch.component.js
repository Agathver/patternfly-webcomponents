import {default as tmpl} from 'pf-switch.template';

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
export class PfSwitch extends HTMLElement {
  /**
   * Constructor
   */
  constructor() {
    super();

    this._template = document.createElement('template');
    this._template.innerHTML = tmpl;

    this.addEventListener('click', (e) => {
      e.preventDefault();
      if (!this.disabled && !this.readonly) {
        this.toggle();
      }
    });
  }

  static get observedAttributes() {
    return ['closed', 'open-text', 'closed-text', 'label-text', 'readonly', 'disabled', 'hidden', 'animated'];
  }

  /**
   * Called when an instance of the element is created
   */
  connectedCallback() {

    this.insertBefore(this._template.content, this.firstChild);
    this._stateElement = this.querySelector('input');

    this._normalizeAndSetText();
    this._setAnimated(this.hasAttribute('animated'));
    this._setDisabled(this.hasAttribute('disabled'));
    this._setHidden(this.hasAttribute('hidden'));
    this._setReadOnly(this.hasAttribute('readonly'));

    if (this._stateElement) {
      this._stateElement.addEventListener('change', () => {
        this.activated = this._stateElement.checked;
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
  attributeChangedCallback(attrName, oldValue, newValue) {
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

  _setStateElementChecked(val) {
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

  get closed() {
    return this.hasAttribute('closed') && !this.indeterminate;
  }

  set closed(value) {
    if (value) {
      this.setAttribute('closed', '');
    } else {
      this.removeAttribute('closed');
    }
  }

  get closedText() {
    return this.getAttribute('closed-text') || 'ON';
  }

  set closedText(value) {
    this.setAttribute('closed-text', value);
  }

  get openText() {
    return this.getAttribute('open-text') || 'OFF';
  }

  set openText(value) {
    this.setAttribute('open-text', value);
  }

  get labelText() {
    return this.getAttribute('label-text') || '';
  }

  set labelText(value) {
    this.setAttribute('label-text', value);
  }

  get indeterminate() {
    return this.hasAttribute('indeterminate');
  }

  set indeterminate(value) {
    if (value) {
      this.setAttribute('indeterminate', '');
    } else {
      this.removeAttribute('indeterminate');
    }
  }

  get readonly() {
    return this.hasAttribute('readonly');
  }

  set readonly(value) {
    if (value) {
      this.setAttribute('readonly', '');
    } else {
      this.removeAttribute('readonly');
    }
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(value) {
    if (value) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  get animated() {
    return this.hasAttribute('animated');
  }

  set animated(value) {
    if (value) {
      this.setAttribute('animated', '');
    } else {
      this.removeAttribute('animated');
    }
  }

  toggle() {
    this.closed = !this.closed;
  }

  _setClosedText(text) {
    let close = this.querySelector('.bootstrap-switch-handle-on');
    if (close) {
      close.innerText = text;
    }
  }

  _setOpenText(text) {
    let open = this.querySelector('.bootstrap-switch-handle-off');
    if (open) {
      open.innerText = text;
    }
  }

  _setLabelText(text) {
    let label = this.querySelector('.bootstrap-switch-label');
    if (label) {
      label.innerText = text;
    }
  }

  _setReadOnly(isReadOnly) {
    let wrapper = this.querySelector('.bootstrap-switch-wrapper');
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

  _setDisabled(isDisabled) {
    let wrapper = this.querySelector('.bootstrap-switch-wrapper');
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

  _setHidden(isHidden) {
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

  _setAnimated(isAnimated) {
    let wrapper = this.querySelector('.bootstrap-switch-wrapper');
    if (wrapper) {
      if (isAnimated) {
        wrapper.classList.add('bootstrap-switch-animate');
      } else {
        wrapper.classList.remove('bootstrap-switch-animate');
      }
    }
  }

  _normalizeAndSetText() {
    let onText = this.closedText;
    let offText = this.openText;
    let labText = this.labelText;

    let len = Math.max(onText.length, offText.length, labText.length);

    this._setClosedText(this._padBoth(onText, len));
    this._setOpenText(this._padBoth(offText, len));
    this._setLabelText(this._padBoth(labText, len));
  }

  _padBoth(str, length) {
    let diff = length - str.length;
    if (diff > 0) {
      let pad = String.fromCharCode(160).repeat(diff / 2);
      return pad + str + pad + (diff % 2 === 0 ? '' : String.fromCharCode(160));
    }
    return str;
  }
}

(function () {
  window.customElements.define('pf-switch', PfSwitch);
}());
