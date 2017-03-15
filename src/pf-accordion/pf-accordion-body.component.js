/**
 * <b>&lt;pf-accordion-body&gt;</b> element for Patternfly Web Components
 *
 */
export class PfAccordionBody extends HTMLElement {
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