import PfAccordionHeading from 'pf-accordion-heading.component';
import PfAccordionTemplate from 'pf-accordion-template.component';
/**
 * <b>&lt;pf-accordion-panel&gt;</b> element for Patternfly Web Components
 *
 */
export class PfAccordionPanel extends HTMLElement {
  /**
   * Called when an instance of the element is created
   */
  createdCallback () {
    this._initDefaults();
  }

  /**
   * Called when an instance of the element was inserted into the document
   */
  attachedCallback () {
    this.classList.add('panel');
    this._context = this.getAttribute('context') || 'default';
    switch (this._context) {
      case 'primary':
        this.classList.add(this._classes.context.primary);
        break;
      case 'warning':
        this.classList.add(this._classes.context.warning);
        break;
      case 'success':
        this.classList.add(this._classes.context.success);
        break;
      case 'danger':
        this.classList.add(this._classes.context.danger);
        break;
      default:
        this.classList.add(this._classes.context.default);
        break;
    }
  }

  /**
   * Returns a list of attributes on which we are interested to track changes
   * @returns {[string]}
   */
  static get observedAttributes() {
    return ['open', 'context'];
  }

  /**
   * Called when element's attribute value has changed
   *
   * @param {string} attrName The attribute name that has changed
   * @param {string} oldValue The old attribute value
   * @param {string} newValue The new attribute value
   */
  attributeChangedCallback (attrName, oldValue, newValue) {
    switch (attrName) {
      case 'open':
        this.state = this.hasAttribute('open') ? 'shown' : 'hidden';
        break;
      case 'context':
        this.classList.remove(this._classes.context[oldValue || 'default'] || this._classes.context.default);
        this.classList.add(this._classes.context[newValue || 'default'] || this._classes.context.default);
        break;
    }
  }

  _initDefaults() {
    this._classes = {
      "context" : {
        "default" : "panel-default",
        "info": "panel-info",
        "primary": "panel-primary",
        "warning": "panel-warning",
        "success": "panel-success",
        "danger": "panel-danger"
      }
    };
  }

}
(function () {
  document.registerElement('pf-accordion-panel', PfAccordionPanel);
}());