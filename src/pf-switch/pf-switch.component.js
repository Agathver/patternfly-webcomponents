import {default as tmpl} from 'pf-switch.template';

/**
 * Represents attribute used for storing state
 * @type {string}
 */
const ATTR_ACTIVATED = 'activated';

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
      this.toggle();
    });
  }

  /**
   * Called when element's attribute value has changed
   *
   * @param {string} attrName The attribute name that has changed
   * @param {string} oldValue The old attribute value
   * @param {string} newValue The new attribute value
   */
  attributeChangedCallback(attrName, oldValue, newValue) {
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
  connectedCallback() {
    this.insertBefore(this._template.content, this.firstChild);
    this._stateElement = this.querySelector('input');
    if (this._stateElement) {
      this._stateElement.style.display = 'none';
    }
  }

  get activated() {
    return this.hasAttribute(ATTR_ACTIVATED);
  }

  set activated(value) {
    if (value) {
      this.setAttribute(ATTR_ACTIVATED, '');
    } else {
      this.removeAttribute(ATTR_ACTIVATED);
    }
  }

  toggle() {
    this.activated = !this.activated;
  }

}

(function () {
  window.customElements.define('pf-switch', PfSwitch);
}());
