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
    this.classList.add('panel-group');
    this.setAttribute('role', 'tablist');
    this.setAttribute('aria-multiselectable','true');
  }
}
(function () {
  document.registerElement('pf-accordion', PfAccordion);
}());