/**
 * <b>&lt;pf-accordion-heading&gt;</b> element for Patternfly Web Components
 *
 */
export class PfAccordionHeading extends HTMLElement {
  /**
   * Called when an instance was inserted into the document
   */
  attachedCallback() {
    this.classList.add('panel-heading');
    this.setAttribute('role', 'tab');

    this._target = this.parentElement.querySelector('pf-accordion-template');
    if (this._target) {
      if (this._target._initialized) {
        this._initializeToggle();
      } else {
        this._target.addEventListener('pf-accordion-initialized', () => {
          this._initializeToggle();
        });
      }
    }
  }

  /**
   * Finds the toggle element and adds appropriate listeners to it.
   * @private
   */
  _initializeToggle() {
    this._toggle = this.querySelector('*[data-toggle="collapse"]');
    this._toggle.addEventListener('click', this._handleToggleClick.bind(this));
    this._toggle.addEventListener('keyup', this._handleToggleKeyUp.bind(this));

    if (this._target !== null) {
      if (this._target.open) {
        this._toggle.classList.remove('collapsed');
        this._toggle.setAttribute('aria-expanded', 'true');
      } else {
        this._toggle.classList.add('collapsed');
        this._toggle.setAttribute('aria-expanded', 'false');
      }
      this._target.addEventListener('pf-accordion-expanding', () => {
        this._toggle.classList.remove('collapsed');
        this._toggle.setAttribute('aria-expanded', 'true');
      });
      this._target.addEventListener('pf-accordion-collapsing', () => {
        this._toggle.classList.add('collapsed');
        this._toggle.setAttribute('aria-expanded', 'false');
      });
    }
  }

  /**
   * Toggle the target
   * @private
   */
  _doToggle() {
    if (this._target) {
      this._target.toggle();
    }
  }

  /**
   * Handle keyUp on the toggle element
   * @private
   */
  _handleToggleKeyUp(event) {
    event.preventDefault();
    if (event.keyCode === 32) {
      this._doToggle();
    }
  }

  /**
   * Handle keyUp on the toggle element
   * @private
   */
  _handleToggleClick(event) {
    event.preventDefault();
    this._doToggle();
  }
}
(function () {
  document.registerElement('pf-accordion-heading', PfAccordionHeading);
}());