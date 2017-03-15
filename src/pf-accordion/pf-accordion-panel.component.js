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
    this.classList.add('panel');
    this.classList.add('panel-default');
  }

}
(function () {
  document.registerElement('pf-accordion-panel', PfAccordionPanel);
}());