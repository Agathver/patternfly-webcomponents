describe ("PatternFly Accordion Component Tests", function () {
  var accordion, accordionPanel, accordionHeading, accordionTemplate, accordionHeadingToggle;

  function addElementToBody (element) {
    var promise = new Promise(function (resolve) {
      var observer = new MutationObserver(function () {
        resolve();
        observer.disconnect();
      });
      var config = { attributes: true, childList: true, characterData: true };
      observer.observe(element, config);
    });
    document.body.appendChild(element);
    return promise;
  }

  beforeEach(function () {
    accordion = document.createElement('pf-accordion');
    accordion.id = 'pfAccordion';
    accordionPanel = document.createElement('pf-accordion-panel');
    accordionPanel.id = 'pfAccordionPanel';
    accordionHeading = document.createElement('pf-accordion-heading');
    accordionHeading.id = 'pfAccordionHeading';
    accordionTemplate = document.createElement('pf-accordion-template');
    accordionHeading.id = 'pfAccordionTemplate';
    accordionHeadingToggle = document.createElement('a');
    accordionHeadingToggle.setAttribute('data-toggle','collapse');
    accordionHeading.appendChild(accordionHeadingToggle);
    accordionPanel.appendChild(accordionHeading);
    accordionPanel.appendChild(accordionTemplate);
    accordion.appendChild(accordionPanel);
  });

  afterEach(function () {
    document.body.removeChild(accordion);
  });

  it('put the correct class and aria attributes for an accordion', function () {
    return addElementToBody(accordion).then(function () {
      expect(accordion.classList.contains('panel-group')).toBe(true);
      expect(accordion.getAttribute('role')).toBe('tablist');
      expect(accordion.getAttribute('aria-multiselectable')).toBe('true');
    });
  });

  it('put the correct class for an accordion panel', function () {
    return addElementToBody(accordion).then(function () {
      expect(accordionPanel.classList.contains('panel')).toBe(true);
    });
  });

  it('put the correct class and aria attributes for an accordion heading', function () {
    return addElementToBody(accordion).then(function () {
      expect(accordionHeading.classList.contains('panel-heading')).toBe(true);
      expect(accordionHeading.getAttribute('role')).toBe('tab');
    });
  });

  it('put the correct class and aria attributes for an accordion template', function () {
    return addElementToBody(accordion).then(function () {
      expect(accordionTemplate.classList.contains('panel-collapse')).toBe(true);
      expect(accordionTemplate.classList.contains('collapse')).toBe(true);
      expect(accordionTemplate.getAttribute('role')).toBe('tabpanel');
    });
  });

  it('put the correct class and aria attributes for an accordion toggle', function () {
    return addElementToBody(accordion).then(function () {
      expect(accordionHeadingToggle.classList.contains('collapse')).toBe(true);
      expect(accordionTemplate.state).toBe('hidden');
    });
  });

  it('put the correct class and aria attributes for an accordion template when it has open attribute', function () {
    accordionTemplate.setAttribute('open', '');
    return addElementToBody(accordion).then(function () {
      expect(accordionTemplate.classList.contains('in')).toBe(true);
      expect(accordionTemplate.state).toBe('shown');
    });
  });

  it('put the correct class on accordion toggle when accordion template is hidden', function () {
    return addElementToBody(accordion).then(function () {
      accordionTemplate.hide();
      expect(accordionHeadingToggle.classList.contains('collapse')).toBe(true);
    });
  });

  it('put the correct class on accordion toggle when accordion template is shown', function () {
    return addElementToBody(accordion).then(function () {
      accordionTemplate.show();
      expect(accordionHeadingToggle.classList.contains('collapse')).toBe(true);
    });
  });

  it('put the correct value in state on display change of accordion template', function () {
    return addElementToBody(accordion).then(function () {
      accordionTemplate.show();
      expect(accordionTemplate.state).toBe('shown');
      accordionTemplate.hide();
      expect(accordionTemplate.state).toBe('hidden');
    });
  });

  it('change the display state of acccordion template with state', function () {
    return addElementToBody(accordion).then(function () {
      accordionTemplate.state = 'shown';
      expect(accordionTemplate.classList.contains('in')).toBe(true);
      accordionTemplate.state = 'hidden';
      expect(accordionTemplate.classList.contains('in')).toBe(false);
    });
  });
});