/**
 * <b>&lt;pf-accordion-body&gt;</b> element for Patternfly Web Components
 *
 */
export class PfAccordionBody extends HTMLElement {
  /**
   * Called when an instance was inserted into the document
   */
  attachedCallback () {
    this.classList.add('panel-body');
  }
}
(function () {
  document.registerElement('pf-accordion-body', PfAccordionBody);
}());