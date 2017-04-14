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

    this._observer = new MutationObserver((mutations) => {
      mutations.forEach((record) => {
        if (this._toggle) {
          for (let i = 0, length = record.removedNodes.length; i < length; i++) {
            if (record.removedNodes[i] === this._toggle) {
              this._toggle.removeEventListener('click', this._toggleClickHandler);
              this._toggle.removeEventListener('keyup', this._toggleKeyUpHandler);
              this._initializeToggle();
            }
          }
        } else {
          if (record.addedNodes.length > 0) {
            this._initializeToggle();
          }
        }
      });
    });

    this._observer.observe(this, {
      childList: true
    });
  }

  /**
   * Finds the toggle element and adds appropriate listeners to it.
   * @private
   */
  _initializeToggle() {
    this._toggle = this.querySelector('*[data-toggle="collapse"]');

    if (this._toggle) {
      this._toggleClickHandler = this._handleToggleClick.bind(this);
      this._toggleKeyUpHandler = this._handleToggleKeyUp.bind(this);
      this._toggle.addEventListener('click', this._toggleClickHandler);
      this._toggle.addEventListener('keyup', this._toggleKeyUpHandler);

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

  /**
   * Called when the element is removed from the DOM
   */
  detachedCallback() {
    this._observer.disconnect();
  }
}
(function () {
  document.registerElement('pf-accordion-heading', PfAccordionHeading);
}());