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

}
(function () {
  document.registerElement('pf-accordion', PfAccordion);
}());