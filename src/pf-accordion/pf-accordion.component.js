import PfAccordionPanel from 'pf-accordion-panel.component';
import PfAccordionTemplate from 'pf-accordion-template.component';
import {
  pfUtil
} from 'pf-utils';

/**
 * <b>&lt;pf-accordion&gt;</b> element for Patternfly Web Components
 *
 * @example {@lang xml}
 * <pf-accordion>
 *   <pf-accordion-panel>
 *     <pf-accordion-heading>
 *       <h4 class="panel-title">
 *         <a role="button" data-toggle="collapse" href="#">
 *           Collapsible Group Item #1
 *         </a>
 *       </h4>
 *     </pf-accordion-heading>
 *     <pf-accordion-template open>
 *       <pf-accordion-body>
 *         Collapse CONTENT 1
 *       </pf-accordion-body>
 *     </pf-accordion-template>
 *   </pf-accordion-panel>
 *   <pf-accordion-panel class="panel panel-primary">
 *     <pf-accordion-heading>
 *       <h4 class="panel-title">
 *         <a role="button" data-toggle="collapse" href="#">
 *           Collapsible Group Item #2
 *         </a>
 *       </h4>
 *     </pf-accordion-heading>
 *     <pf-accordion-template>
 *       <pf-accordion-body>
 *         Collapse CONTENT 2
 *       </pf-accordion-body>
 *     </pf-accordion-template>
 *   </pf-accordion-panel>
 * </pf-accordion>
 *
 * @prop fixedHeight {Boolean} Whether the accrodion is a fixed-height accordion
 */
export class PfAccordion extends HTMLElement {
  /**
   * Called when an instance of the element is created
   */
  createdCallback() {
    this._openPanels = [];
    this._fixedHeight = false;
  }

  /**
   * Called when an instance was inserted into the document
   */
  attachedCallback() {
    this.classList.add('panel-group');
    this.setAttribute('role', 'tablist');
    this.setAttribute('aria-multiselectable', 'true');

    let panels = this.querySelectorAll('pf-accordion-panel > pf-accordion-template');
    if (panels) {
      for (let i = 0; i < panels.length; i++) {
        let panel = panels[i];
        this._checkAndAddPanel(panel);
      }
    }

    // catch bubbled events
    this.addEventListener('pf-accordion.expanding', this._handlePanelShown);
    this.addEventListener('pf-accordion.collapsing', this._handlePanelHidden);

    this._observer = new MutationObserver((mutations) => {
      for (let i = 0; i < mutations.length; i++) {
        let mutation = mutations[i];
        if ('childList' === mutation.type) {

          // handle dynamic addition of panels
          for (let i = 0; i < mutation.addedNodes.length; i++) {
            let node = mutation.addedNodes[i];
            // only check for element nodes
            if (1 === node.nodeType && 'pf-accordion-panel' === node.tagName.toLowerCase()) {
              let panel = node.querySelector('pf-accordion-template');
              if (null !== panel) {
                this._checkAndAddPanel(panel);
              }
            }
          }

          // handle removal of panels
          for (let i = 0; i < mutation.removedNodes.length; i++) {
            let node = mutation.removedNodes[i];
            // only check for element nodes
            if (1 === node.nodeType && 'pf-accordion-panel' === node.tagName.toLowerCase()) {
              let panel = node.querySelector('pf-accordion-template');
              if (null !== panel) {
                this._checkAndRemovePanel(panel);
              }
            }
          }

          // fixed height needs to be recalculated on DOM initialization
          if (this.hasAttribute('fixedheight')) {
            this._setFixedHeight();
          }
        }
      }
    });

    this._observer.observe(this, {
      childList: true
    });

    if (this.hasAttribute('fixedheight')) {
      // _initialized is raised after _initFixedHeight
      this._initFixedHeight();
    } else {
      this._initialized = true;
      this.dispatchEvent(new Event('pf-accordion.initialized'));
    }
  }

  /**
   * Check and add panel if it is initialized
   * @private
   * @param {PfAccordionTemplate} panel the toggle pane;
   */
  _checkAndAddPanel(panel) {
    if (panel._initialized) {
      if (panel.open) {
        this._openPanels.push(panel);
      }
    } else {
      pfUtil.once(panel, 'pf-accordion.initialized', () => {
        if (panel.open) {
          this._openPanels.push(panel);
        }
      });
    }
  }

  /**
   * Check and remove a panel if it is in the array of open panels
   * @private
   * @param {PfAccordionTemplate} panel the toggle pane;
   */
  _checkAndRemovePanel(panel) {
    let index = this._openPanels.indexOf(panel);
    if (index > -1) {
      this._openPanels.splice(index, 1);
    }
  }

  /**
   * Handle bubbled pf-accordion-collapsing on accordion
   * @param {Event} e event
   * @private
   */
  _handlePanelHidden(e) {
    let index = this._openPanels.indexOf(e.target);
    if (index > -1) {
      this._openPanels.splice(index, 1);
    }
  }

  /**
   * Handle bubbled pf-accordion-expanding on accordion
   * @param {Event} e event
   * @private
   */
  _handlePanelShown(e) {
    let panel;
    while ((panel = this._openPanels.shift())) {
      panel.open = false;
    }
    this._openPanels.push(e.target);
  }

  /**
   * Called when the element is removed from the DOM
   */
  detachedCallback() {
    this._observer.disconnect();
    window.removeEventListener('resize', this._fixedHeightListener);
  }


  /**
   * Called when element's attribute value has changed
   *
   * @param {string} attrName The attribute name that has changed
   * @param {string} oldValue The old attribute value
   * @param {string} newValue The new attribute value
   */
  attributeChangedCallback(attrName, oldValue, newValue) {
    if ('fixedheight' === attrName) {
      if (newValue) {
        this._initFixedHeight();
      } else {
        this._unsetFixedHeight();
      }
    }
  }

  /**
   * Recalculates and sets the collapse height after every browser resize
   * @private
   */
  _setFixedHeight() {
    let height = this.clientHeight;

    // Close any open panels
    let openPanels = this.querySelectorAll('.collapse.in');

    for (let i = 0; i < openPanels.length; i++) {
      let panel = openPanels[i];
      panel.classList.remove('in');
    }

    // Determine the necessary height for the closed content
    let contentHeight = 0;
    for (let i = 0; i < this.children.length; i++) {
      let element = this.children[i];
      contentHeight += element.offsetHeight;
    }

    // Determine the height remaining for opened collapse panels
    let bodyHeight = this.clientHeight - contentHeight;

    // show scrollbars when content height > element height,
    // if (bodyHeight < 0) {
    //   bodyHeight = this.clientHeight;
    // }

    // Make sure we have enough height to be able to scroll the contents if necessary
    if (bodyHeight < 25) {
      bodyHeight = 25;
    }

    // Reopen the initially opened panel
    for (let i = 0; i < openPanels.length; i++) {
      let panel = openPanels[i];
      panel.classList.add('in');
    }

    // run as requestAnimationFrame to prevent performance issues while resizing
    requestAnimationFrame(() => {
      // Set the max-height for the collapse panels
      let panels = this.getElementsByTagName('pf-accordion-template');
      for (let i = 0; i < panels.length; i++) {
        let element = panels[i];
        // Set the max-height and vertical scroll of the scroll element
        if (!element._oldStyle) {
          element._oldStyle = {
            maxHeight: element.style.maxHeight,
            overflowY: element.style.overflowY
          };
        }
        element.style.maxHeight = bodyHeight + 'px';
        element.style.overflowY = 'auto';
      }

      this._oldStyle = {
        overflowY: this.style.overflowY
      };
      this.style.overflowY = 'fixed';

      if (!this._initialized) {
        // first time run, send an initialized event
        this._initialized = true;
        this.dispatchEvent(new Event('pf-accordion.initialized'));
      }
    });
  }

  /**
   * Removes the fixed-height panel configuration
   * @private
   */
  _unsetFixedHeight() {
    if (!this._fixedHeight) {
      return;
    }
    let panels = this.getElementsByTagName('pf-accordion-template');
    for (let i = 0; i < panels.length; i++) {
      let element = panels[i];

      // Set the max-height and vertical scroll of the scroll element
      if (element._oldStyle) {
        element.style.maxHeight = element._oldStyle.maxHeight;
        element.style.overflowY = element._oldStyle.overflowY;
        element._oldStyle = null;
      }
    }
    this.style.overflowY = this._oldStyle.overflowY;
    this._oldStyle = null;
    window.removeEventListener('resize', this._fixedHeihtListener);
    this._fixedHeight = false;
  }

  /**
   * Initializes a fixed-width accordion
   * @private
   */
  _initFixedHeight() {
    if (this._fixedHeight) {
      return;
    }

    requestAnimationFrame(() => this._setFixedHeight());
    // Update on window resizing
    this._fixedHeightListener = this._setFixedHeight.bind(this);
    window.addEventListener('resize', this._fixedHeightListener);
    this._fixedHeight = true;
  }

  get fixedHeight() {
    return this._fixedHeight;
  }

  set fixedHeight(value) {
    if (value) {
      if (!this.hasAttribute('fixedheight')) {
        this.setAttribute('fixedheight', '');
      }
    } else {
      this.removeAttribute('fixedheight');
    }
  }
}

(function () {
  document.registerElement('pf-accordion', PfAccordion);
}());