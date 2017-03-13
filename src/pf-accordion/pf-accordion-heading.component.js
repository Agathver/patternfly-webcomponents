/**
 * <b>&lt;pf-accordion-heading&gt;</b> element for Patternfly Web Components
 *
 */
export class PfAccordionHeading extends HTMLElement {
  /**
   * Called when an instance was inserted into the document
   */
  attachedCallback () {
    let toggle = this.querySelector('*[data-toggle="collapse"]');
    toggle.addEventListener('click', this._handleToggleClick);

    let target =  document.querySelector(toggle.getAttribute('href'));
    this._observer = new MutationObserver(function(mutations) {
      if (!target.classList.contains('in')) {
        toggle.classList.add('collapsed');
      } else {
        toggle.classList.remove('collapsed');
      }
    });
    this._observer.observe(target, { attributes: true, attributeFilter: ['class'] });
  }

  _handleToggleClick (event) {
    let element = event.target;
    let target =  document.querySelector(element.getAttribute('href'));
    target.toggle();
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
    this.classList.add('panel-heading');
  }

  detachedCallback () {
    let toggle = this.querySelector('*[data-toggle="collapse"]');
    toggle.removeEventListener('click', this._handleToggleClick);

    this._observer.disconnect();
  }
}
(function () {
  document.registerElement('pf-accordion-heading', PfAccordionHeading);
}());