import PfAccordionBody from 'pf-accordion-body.component';
import {pfUtil as util} from '../pf-utils/pf-utils';
/**
 * <b>&lt;pf-accordion-template&gt;</b> element for Patternfly Web Components
 *
 */
export class PfAccordionTemplate extends HTMLElement {
  /**
   * Called when an instance was inserted into the document
   */
  attachedCallback () {
    this.addEventListener('transitionend', this._handleTransitionEnd);
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
    this.classList.add('panel-collapse');
    if (this.classList.contains('in')) {
      this._state = 'show';
    } else {
      this._state = 'hide';
    }
    this._transitioning = false;
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
    this._transitioning = true;
    this._state = 'show';
    this.classList.remove('collapse');
    this.classList.add('collapsing');
    let maxHeight = this.querySelector('pf-accordion-body').clientHeight;
    this.style.height = maxHeight + 'px';
  }

  hide () {
    let maxHeight = this.querySelector('pf-accordion-body').clientHeight;
    this._transitioning = true;
    this._state = 'hide';
    this.style.height = maxHeight + 'px';

    let _self = this;

    // this is necessary for the animation to start properly
    window.requestAnimationFrame( () => {
      _self.classList.add('collapsing');
      _self.classList.remove('collapse');
      _self.classList.remove('in');
      _self.style.height = '0px';
    });
  }

  toggle () {
    if (this._state === 'show') {
      this.hide();
    } else {
      this.show();
    }
  }

  _handleTransitionEnd (event) {
    if (this._transitioning) {
      this.classList.remove('collapsing');
      this.classList.add('collapse');
      if (this._state === 'show') {
        this.classList.add('in');
      }
      this.style.height = '';
      this._transitioning = false;
    }
  }


}
(function () {
  document.registerElement('pf-accordion-template', PfAccordionTemplate);
}());