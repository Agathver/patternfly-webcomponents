import PfAccordionHeading from 'pf-accordion-heading.component';
import PfAccordionTemplate from 'pf-accordion-template.component';
/**
 * <b>&lt;pf-accordion-panel&gt;</b> element for Patternfly Web Components
 *
 */
export class PfAccordionPanel extends HTMLElement {
  /**
   * Called when an instance was inserted into the document
   */
  attachedCallback () {
  }

  /**
   * Called when element's attribute value has changed
   *
   * @param {string} attrName The attribute name that has changed
   * @param {string} oldValue The old attribute value
   * @param {string} newValue The new attribute value
   */
  attributeChangedCallback (attrName, oldValue, newValue) {
  }

  /**
   * Called when an instance of the element is created
   */
  createdCallback () {
    this.classList.add('panel');
    this.classList.add('panel-default');
  }
}
(function () {
  document.registerElement('pf-accordion-panel', PfAccordionPanel);
}());