import PfAccordionComponent from 'pf-accordion-panel.component';

/**
 * <b>&lt;pf-accordion&gt;</b> element for Patternfly Web Components
 *
 */
export class PfAccordion extends HTMLElement {
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
    this.classList.add('panel-group');
  }

  /**
   * Called when the element is removed from the DOM
   */
  detachedCallback () {
  }

}
(function () {
  document.registerElement('pf-accordion', PfAccordion);
}());