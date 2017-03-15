import PfAccordionHeading from 'pf-accordion-heading.component';
import PfAccordionTemplate from 'pf-accordion-template.component';
/**
 * <b>&lt;pf-accordion-panel&gt;</b> element for Patternfly Web Components
 *
 */
export class PfAccordionPanel extends HTMLElement {
  /**
   * Called when an instance of the element was inserted into the document
   */
  attachedCallback () {
    this.classList.add('panel');
    // todo probably skip adding the style altogether
    this.classList.add('panel-default');
  }

}
(function () {
  document.registerElement('pf-accordion-panel', PfAccordionPanel);
}());