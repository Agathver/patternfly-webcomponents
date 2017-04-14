import PfAccordionBody from 'pf-accordion-body.component';
/**
 * <b>&lt;pf-accordion-template&gt;</b> element for Patternfly Web Components
 *
 * @prop {boolean} open indicates if accordion is expanded
 */
export class PfAccordionTemplate extends HTMLElement {

  /**
   * Returns a list of attributes on which we are interested to track changes
   * @returns {String[]}
   */
  static get observedAttributes() {
    return ['open'];
  }

  /**
   * Called when an instance was inserted into the document
   */
  attachedCallback() {
    this.classList.add('panel-collapse');
    this.classList.add('collapse');
    this.setAttribute('role', 'tabpanel');

    // attach this as early as possible before fiddling with state attributes
    this.addEventListener('transitionend', this._handleTransitionEnd);

    if (this.hasAttribute('open')) {
      this.classList.add('in');
    } else if (this.classList.contains('in')) {
      this.setAttribute('open', '');
    }

    this._initialized = true;
    this.dispatchEvent(new Event('pf-accordion-initialized'));
  }

  /**
   * Called when an instance of the element is created
   */
  createdCallback() {
    this._initialized = false;
    this._oldStyle = {};
  }

  /**
   * Called when element's attribute value has changed
   *
   * @param {string} attrName The attribute name that has changed
   * @param {string} oldValue The old attribute value
   * @param {string} newValue The new attribute value
   */
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === 'open') {
      if (this.hasAttribute('open')) {
        this._expand();
      } else {
        this._collapse();
      }
    }
  }

  /**
   * Performs a collapse state change action.
   * Compatibility function for Bootstrap collapse plugin.
   *
   * @param {String} state state of the panel
   */
  collapse(state) {
    switch (state) {
      case 'show':
        this.open = true;
        break;
      case 'hide':
        this.open = false;
        break;
      case 'toggle':
        this.toggle();
        break;
    }
  }

  /**
   * Make the panel visible
   */
  _expand() {
    if (this._transitioning) {
      console.log('Canceled due to incomplete transition'); // eslint-disable-line
      return;
    }
    this._transitioning = true;

    this._oldStyle.height = this.style.height;

    requestAnimationFrame(() => {
      this.classList.remove('collapse');

      this.style.height = '0px';
      this.classList.add('collapsing');
      let body = this.querySelector('pf-accordion-body');
      let maxHeight = body ? body.clientHeight : 0;
      this.style.height = maxHeight + 'px';

      this.dispatchEvent(new CustomEvent('pf-accordion-expanding', {
        bubbles: true,
        cancelable: false
      }));
    });
  }

  /**
   * Hide the panel
   */
  _collapse() {
    if (this._transitioning) {
      console.log('Canceled due to incomplete transition'); // eslint-disable-line
      return;
    }
    this._transitioning = true;
    let body = this.querySelector('pf-accordion-body');
    let maxHeight = body ? body.clientHeight : 0;

    this._oldStyle.height = this.style.height;
    this.style.height = maxHeight + 'px';

    requestAnimationFrame(() => {
      this.classList.add('collapsing');
      this.classList.remove('collapse');
      this.classList.remove('in');
      this.style.height = '0px';

      this.dispatchEvent(new CustomEvent('pf-accordion-collapsing', {
        bubbles: true,
        cancelable: false
      }));
    });
  }

  /**
   * Toggle the visiblity of the panel
   */
  toggle() {
    this.open = !this.open;
  }

  /**
   * Handles the transitionend event.
   * @private
   */
  _handleTransitionEnd() {
    this.classList.remove('collapsing');
    this.classList.add('collapse');
    if (this.open) {
      this.classList.add('in');
      this.dispatchEvent(new CustomEvent('pf-accordion-expanded', {
        bubbles: true
      }));
    } else {
      this.dispatchEvent(new CustomEvent('pf-accordion-collapsed', {
        bubbles: true
      }));
    }
    this.style.height = this._oldStyle.height;
    this._transitioning = false;
  }

  /**
   * Get the display state of the panel
   *
   * @returns {string} the display state, either 'shown' or 'hidden'
   */
  get open() {
    return this.hasAttribute('open');
  }

  /**
   * Set the display state of the panel
   *
   * @param {string} value the display state, either 'shown' or 'hidden'
   */
  set open(value) {
    if (value) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
  }
}

(function () {
  document.registerElement('pf-accordion-template', PfAccordionTemplate);
}());