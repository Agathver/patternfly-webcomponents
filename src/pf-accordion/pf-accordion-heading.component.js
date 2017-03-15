/**
 * <b>&lt;pf-accordion-heading&gt;</b> element for Patternfly Web Components
 *
 */
export class PfAccordionHeading extends HTMLElement {
  /**
   * Called when an instance was inserted into the document
   */
  attachedCallback () {
    this.classList.add('panel-heading');
    this.setAttribute('role','tab');

    this._toggle = this.querySelector('*[data-toggle="collapse"]');
    this._toggle.addEventListener('click', () => {
      this._target.toggle();
    });

    this._target =  document.querySelector(this._toggle.getAttribute('href'));
    this._target.addEventListener('show.bs.collapse', () => {
      this._toggle.classList.remove('collapsed');
      this._toggle.setAttribute('aria-expanded','true');
    });
    this._target.addEventListener('hide.bs.collapse', () => {
      this._toggle.classList.add('collapsed');
      this._toggle.setAttribute('aria-expanded','false');
    });

    if (this._target._initialized) {
      this._initializeToggle();
    } else {
      this._target.addEventListener('initialized', () => {
        this._initializeToggle();
      });
    }
  }

  _initializeToggle () {
    if (this._target.state === 'show') {
      this._toggle.classList.remove('collapsed');
      this._toggle.setAttribute('aria-expanded','true');
    } else {
      this._toggle.classList.add('collapsed');
      this._toggle.setAttribute('aria-expanded','false');
    }
  }

}
(function () {
  document.registerElement('pf-accordion-heading', PfAccordionHeading);
}());