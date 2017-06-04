/* Require the HTML Element Shim */
require('./customElementShim.js');

let load = function () {
  /** PF Accordion Component **/
  require('pf-accordion.component.js');

  /** PF Alert Component **/
  require('pf-alert.component.js');

  /** PfListView Component **/
  require('pf-list-view.component.js');

  /** PfTemplateRepeaterComponent **/
  require('pf-template-repeater.component.js');

  /** PfTemplateComponent **/
  require('pf-template.component.js');

  /** PF Tabs Component **/
  require('pf-tabs.component.js');

  /** PF Tooltip Component **/
  require('pf-tooltip.component.js');

  /** PF Utilization Bar Chart **/
  require('pf-utilization-bar-chart.component.js');

  /** PF Utils **/
  require('pf-utils.js');

  /** PF I18N **/
  require('pf-i18n.component.js');

  /** PF Hello **/
  require('pf-hello.component.js');

  /** PF Dropdown **/
  require('pf-dropdown.component.js');
};

/* Wait for polyfill loading */
let webComponentsSupported = (
  'customElements' in window &&
  'import' in document.createElement('link') &&
  'content' in document.createElement('template')
);

if (!webComponentsSupported) {
  document.addEventListener('WebComponentsReady', load);
} else {
  load();
}
