import PfAccordionPanel from 'pf-accordion-panel.component';

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
 */
export class PfAccordion extends HTMLElement {
  /**
   * Called when an instance of the element is created
   */
  createdCallback () {
    this._openPanels = [];
  }

  /**
   * Called when an instance was inserted into the document
   */
  attachedCallback () {
    this.classList.add('panel-group');
    this.setAttribute('role', 'tablist');
    this.setAttribute('aria-multiselectable','true');

    let nodes = this.querySelectorAll('pf-accordion-panel > pf-accordion-template');
    if (nodes) {
      [].forEach.call(nodes, ( (panel) => {
        if (panel._initialized) {
          if (panel.state === 'shown') {
            this._openPanels.push(panel);
          }
        } else {
          panel.addEventListener('initialized', () => {
            if (panel.state === 'shown') {
              this._openPanels.push(panel);
            }
          });
        }
      }));
    }

    // catch bubbled events
    this.addEventListener('show.bs.collapse', this._handlePanelShown.bind(this));
    this.addEventListener('hide.bs.collapse', this._handlePanelHidden.bind(this));

    this._obeserver = new MutationObserver((mutations) => {
      mutations.forEach( (mutationRecord) => {
        if (mutationRecord.type === 'childList') {
          // handle dynamic addition of panels
          for (let i = 0; i < mutationRecord.addedNodes.length; i++) {
            let node = mutationRecord.addedNodes[i];
            if (node instanceof PfAccordionPanel) {
              let panel = node.querySelector('pf-accordion-template');
              if (panel !== null) {
                if (panel.state === 'shown') {
                  this._openPanels.push(panel);
                }
              }
            }
          }

          // handle removal of panels
          for (let i = 0; i < mutationRecord.removedNodes.length; i++) {
            let node = mutationRecord.addedNodes[i];
            if (node instanceof PfAccordionPanel) {
              let panel = node.querySelector('pf-accordion-template');
              if (panel !== null) {
                let index = this._openPanels.indexOf(panel);
                if (index > -1) {
                  this._openPanels.splice(index, 1);
                }
              }
            }
          }
        }
      });
    });

    this._obeserver.observe(this, { childList: true });

    if (this.hasAttribute('fixedheight')) {
      // _initialized is raised after _initCollapseHeights
      this._initCollapseHeights();
    } else {
      this._initialized = true;
      this.dispatchEvent(new Event('initialized'));
    }
  }

  /**
   * Handle bubbled hide.bs.collapse on accordion
   * @param {Event} e event
   * @private
   */
  _handlePanelHidden (e) {
    let index = this._openPanels.indexOf(e.target);
    if (index > -1) {
      this._openPanels.splice(index, 1);
    }
  }

  /**
   * Handle bubbled show.bs.collapse on accordion
   * @param {Event} e event
   * @private
   */
  _handlePanelShown (e) {
    let panel;
    while ((panel = this._openPanels.shift())) {
      panel.hide();
    }
    this._openPanels.push(e.target);
  }

  /**
   * Called when the element is removed from the DOM
   */
  detachedCallback () {
    this._obeserver.disconnect();
  }


  /**
   * Called when element's attribute value has changed
   *
   * @param {string} attrName The attribute name that has changed
   * @param {string} oldValue The old attribute value
   * @param {string} newValue The new attribute value
   */
  attributeChangedCallback (attrName, oldValue, newValue) {
    if (attrName === 'fixedheight') {
      if (newValue) {
        this._initCollapseHeights();
      }
    }
  }

  /**
  * Recalculates abd sets the collapse height after every browser resize
  */
  _setCollapseHeights () {
    let overflowY = 'hidden';

    let height = this.clientHeight;

    // Close any open panel
    let openPanels = this.querySelectorAll('.collapse.in');

    Array.prototype.forEach.call(openPanels, (openPanel) => {
      openPanel.classList.remove('in');
    });

    // Determine the necessary height for the closed content
    let contentHeight = 0;
    Array.prototype.forEach.call(this.children, (element) => {
      contentHeight += element.offsetHeight;
    });

    // Determine the height remaining for opened collapse panels
    let bodyHeight = this.clientHeight - contentHeight;

    // Make sure we have enough height to be able to scroll the contents if necessary
    if (bodyHeight < 25) {
      bodyHeight = 25;

      // Allow the parent to scroll so the child elements are accessible
      overflowY = 'auto';
    }

    // Reopen the initially opened panel
    Array.prototype.forEach.call(openPanels, (openPanel) => {
      openPanel.classList.add('in');
    });

    requestAnimationFrame( () => {
    // Set the max-height for the collapse panels
      let panels = this.getElementsByTagName('pf-accordion-template');
      Array.prototype.forEach.call(panels,(element) => {
        // Set the max-height and vertical scroll of the scroll element
        element.style.maxHeight = bodyHeight + 'px';
        element.style.overflowY = 'auto';
      });
      this.style.overflowY =  overflowY;

      if (!this._initialized) {
        // first time run, send an initialized event
        this._initialized = true;
        this.dispatchEvent(new Event('initialized'));
      }
    });
  }

  /**
   * initializes a fixed-width accordion
   */
  _initCollapseHeights () {
    this._setCollapseHeights();
    // Update on window resizing
    window.addEventListener('resize', this._setCollapseHeights.bind(this));
  }
}

(function () {
  document.registerElement('pf-accordion', PfAccordion);
}());
