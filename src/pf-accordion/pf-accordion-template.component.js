import PfAccordionBody from 'pf-accordion-body.component';
/**
 * <b>&lt;pf-accordion-template&gt;</b> element for Patternfly Web Components
 *
 */
export class PfAccordionTemplate extends HTMLElement {
  /**
   * Called when an instance was inserted into the document
   */
  attachedCallback () {
    this.classList.add('panel-collapse');
    this.classList.add('collapse');
    this.setAttribute('role', 'tabpanel');

    if (this.hasAttribute('open')) {
      this._state = 'shown';
      this.classList.add('in');
    } else if (this.classList.contains('in')) {
      this._state = 'shown';
      this.setAttribute('open','');
    } else {
      this._state = 'hidden';
    }
    this.addEventListener('transitionend', this._handleTransitionEnd);

    this._initialized = true;
    this.dispatchEvent(new Event('initialized'));
  }

  /**
   * Called when an instance of the element is created
   */
  createdCallback () {
    this._initialized = false;
    this._transitioning = false;
  }

  /**
   * Called when element's attribute value has changed
   *
   * @param {string} attrName The attribute name that has changed
   * @param {string} oldValue The old attribute value
   * @param {string} newValue The new attribute value
   */
  attributeChangedCallback (attrName, oldValue, newValue) {
    if (attrName === "open") {
      this.state = this.hasAttribute('open') ? 'shown' : 'hidden';
    }
  }

  collapse(state) {
    switch (state) {
      case 'show':
        this.show();
        break;
      case 'hide':
        this.hide();
        break;
      case 'toggle':
        this.toggle();
        break;
    }
  }

  show () {
    if (this._state !== 'shown' && !this._transitioning) {
      this._transitioning = true;
      this.dispatchEvent(new CustomEvent('show.bs.collapse', {
        bubbles: true,
        cancelable: false
      }));
      this._state = 'shown';
      this.classList.remove('collapse');
      this.classList.add('collapsing');
      let body = this.querySelector('pf-accordion-body');
      let maxHeight = body ? body.clientHeight : 0;
      this.style.height = maxHeight + 'px';
    }
  }

  hide () {
    if (this._state !== 'hidden' && !this._transitioning) {
      let body = this.querySelector('pf-accordion-body');
      let maxHeight = body ? body.clientHeight : 0;
      this._transitioning = true;
      this.dispatchEvent(new CustomEvent('hide.bs.collapse', {
        bubbles: true,
        cancelable: false
      }));
      this._state = 'hidden';
      this.style.height = maxHeight + 'px';

      let _self = this;

      // this is necessary for the animation to start properly
      requestAnimationFrame(() => {
        _self.classList.add('collapsing');
        _self.classList.remove('collapse');
        _self.classList.remove('in');
        _self.style.height = '0px';
      });
    }
  }

  toggle () {
    if (this._state === 'shown') {
      this.hide();
    } else {
      this.show();
    }
  }

  _handleTransitionEnd () {
    if (this._transitioning) {
      this.classList.remove('collapsing');
      this.classList.add('collapse');
      if (this._state === 'shown') {
        this.classList.add('in');
        this.dispatchEvent(new CustomEvent('shown.bs.collapse', {
          bubbles: true
        }));
      } else {
        this.dispatchEvent(new CustomEvent('hidden.bs.collapse', {
          bubbles: true
        }));
      }
      this.style.height = '';
      this._transitioning = false;
    }
  }

  get state() {
    return this._state;
  }

  set state(value) {
    if (this._state !== value) {
      switch (value) {
        case 'shown':
          this.show();
          break;
        case 'hidden':
          this.hide();
          break;
      }
    }
  }
}
(function () {
  document.registerElement('pf-accordion-template', PfAccordionTemplate);
}());