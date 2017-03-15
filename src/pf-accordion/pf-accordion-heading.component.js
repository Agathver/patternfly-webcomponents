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

    this._target = this.parentElement.querySelector('pf-accordion-template');
    if (this._target) {
      if (this._target._initialized) {
        this._initializeToggle();
      } else {
        this._target.addEventListener('initialized', () => {
          this._initializeToggle();
        });
      }
    }

    if (!this._observer) {
      this._observer = new MutationObserver(this._handleMutations.bind(this));
      this._observer.observe(this, { childList: true });
    }
  }

  _initializeToggle () {
    this._toggle = this.querySelector('*[data-toggle="collapse"]');
    this._toggleClickHandler = this._handleToggleClick.bind(this);
    this._toggle.addEventListener('click', this._toggleClickHandler);

    if (this._target !== null) {
      if (this._target.state === 'shown') {
        this._toggle.classList.remove('collapsed');
        this._toggle.setAttribute('aria-expanded', 'true');
      } else {
        this._toggle.classList.add('collapsed');
        this._toggle.setAttribute('aria-expanded', 'false');
      }
      this._target.addEventListener('show.bs.collapse', () => {
        this._toggle.classList.remove('collapsed');
        this._toggle.setAttribute('aria-expanded', 'true');
      });
      this._target.addEventListener('hide.bs.collapse', () => {
        this._toggle.classList.add('collapsed');
        this._toggle.setAttribute('aria-expanded', 'false');
      });
    }
  }

  _handleToggleClick () {
    if (this._target) {
      this._target.toggle();
    }
  }
  _handleMutations (mutations) {
    // handle mutations to toggle element
  }
}
(function () {
  document.registerElement('pf-accordion-heading', PfAccordionHeading);
}());