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
    this.classList.add('panel-collapse');
    this.classList.add('collapse');
    this.setAttribute('role', 'tabpanel');

    if (this.hasAttribute('open')) {
      this.state = 'show';
      this.classList.add('in');
    } else if (this.classList.contains('in')) {
      this.state = 'show';
      this.setAttribute('open','');
    } else {
      this.state = 'hide';
    }
    this.addEventListener('transitionend', this._handleTransitionEnd);

    this._initialized = true;
    this.dispatchEvent(new CustomEvent('initialized'));
  }

  /**
   * Called when an instance of the element is created
   */
  createdCallback () {
    this._initialized = false;
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
    this.dispatchEvent(new CustomEvent('show.bs.collapse'));
    this.state = 'show';
    this.classList.remove('collapse');
    this.classList.add('collapsing');
    let maxHeight = this.querySelector('pf-accordion-body').clientHeight;
    this.style.height = maxHeight + 'px';
  }

  hide () {
    let maxHeight = this.querySelector('pf-accordion-body').clientHeight;
    this._transitioning = true;
    this.dispatchEvent(new CustomEvent('hide.bs.collapse'));
    this.state = 'hide';
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
    if (this.state === 'show') {
      this.hide();
    } else {
      this.show();
    }
  }

  _handleTransitionEnd (event) {
    if (this._transitioning) {
      this.classList.remove('collapsing');
      this.classList.add('collapse');
      if (this.state === 'show') {
        this.classList.add('in');
        this.dispatchEvent(new CustomEvent('shown.bs.collapse'));
      } else {
        this.dispatchEvent(new CustomEvent('hidden.bs.collapse'));
      }
      this.style.height = '';
      this._transitioning = false;
    }
  }

}
(function () {
  document.registerElement('pf-accordion-template', PfAccordionTemplate);
}());