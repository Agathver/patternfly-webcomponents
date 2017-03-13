/**
 * <b>&lt;pf-accordion-body&gt;</b> element for Patternfly Web Components
 *
 */
export class PfAccordionBody extends HTMLElement {
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
    this.classList.add('panel-body');
  }
}
(function () {
  document.registerElement('pf-accordion-body', PfAccordionBody);
}());