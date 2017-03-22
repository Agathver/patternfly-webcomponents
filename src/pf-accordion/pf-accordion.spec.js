describe("PatternFly Accordion Component Tests", function () {
  var accordion, accordionPanel, accordionHeading, accordionTemplate, accordionHeadingToggle,
    accordionPanel2, accordionHeading2, accordionTemplate2, accordionHeadingToggle2;

  function addElementToBody(element) {
    var promise = new Promise(function (resolve) {
      var observer = new MutationObserver(function () {
        resolve();
        observer.disconnect();
      });
      var config = {
        attributes: true,
        childList: true,
        characterData: true
      };
      observer.observe(element, config);
    });
    document.body.appendChild(element);
    return promise;
  }

  beforeEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
    accordion = document.createElement('pf-accordion');
    accordion.id = 'pfAccordion';
    accordionPanel = document.createElement('pf-accordion-panel');
    accordionPanel.id = 'pfAccordionPanel';
    accordionHeading = document.createElement('pf-accordion-heading');
    accordionHeading.id = 'pfAccordionHeading';
    accordionTemplate = document.createElement('pf-accordion-template');
    accordionTemplate.innerHTML = '<pf-accordion-body>Collapse CONTENT 1</pf-accordion-body>';

    accordionHeading.id = 'pfAccordionTemplate';
    accordionHeadingToggle = document.createElement('a');
    accordionHeadingToggle.setAttribute('data-toggle', 'collapse');
    accordionHeading.appendChild(accordionHeadingToggle);
    accordionPanel.appendChild(accordionHeading);
    accordionPanel.appendChild(accordionTemplate);
    accordion.appendChild(accordionPanel);

    accordionPanel2 = document.createElement('pf-accordion-panel');
    accordionPanel2.id = 'pfAccordionPanel2';
    accordionHeading2 = document.createElement('pf-accordion-heading');
    accordionHeading2.id = 'pfAccordionHeading2';
    accordionTemplate2 = document.createElement('pf-accordion-template');
    accordionTemplate2.innerHTML = '<pf-accordion-body>Collapse CONTENT 2</pf-accordion-body>';
    accordionTemplate2.id = 'pfAccordionTemplate2';
    accordionHeadingToggle2 = document.createElement('a');
    accordionHeadingToggle2.setAttribute('data-toggle', 'collapse');
    accordionHeading2.appendChild(accordionHeadingToggle2);
    accordionPanel2.appendChild(accordionHeading2);
    accordionPanel2.appendChild(accordionTemplate2);
    accordion.appendChild(accordionPanel2);
  });

  afterEach(function () {
    document.body.removeChild(accordion);
  });

  it('put the correct class and aria attributes', function () {
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

  it('adds the default context modifier class for an accordion panel where none is supplied', function () {
    return addElementToBody(accordion).then(function () {
      expect(accordionPanel.classList.contains('panel-default')).toBe(true);
    });
  });

  it('does not add the default context modifier class for an accordion panel where a value is supplied', function () {
    accordionPanel.className = 'panel panel-warning';
    return addElementToBody(accordion).then(function () {
      expect(accordionPanel.classList.contains('panel-default')).toBe(false);
    });
  });

  it('restores the default context modifier class for an accordion panel when all context modifier classes are removed', function () {
    accordionPanel.className = 'panel panel-warning';
    return addElementToBody(accordion).then(function () {
      expect(accordionPanel.classList.contains('panel-default')).toBe(false);
      accordionPanel.className = '';
      // wait till all work by browser is done
      return new Promise(function (resolve) {
        requestAnimationFrame(function () {
          expect(accordionPanel.classList.contains('panel')).toBe(true);
          expect(accordionPanel.classList.contains('panel-default')).toBe(true);
          resolve();
        });
      });
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

  it('recognises element with data-toggle="collapse" as the accordion toggle', function () {
    return addElementToBody(accordion).then(function () {
      expect(accordionHeading._toggle).toBeDefined();
    });
  });

  it('put the correct class and aria attributes for an accordion toggle', function () {
    return addElementToBody(accordion).then(function () {
      expect(accordionHeadingToggle.classList.contains('collapsed')).toBe(true);
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

      return new Promise(function (resolve) {
        requestAnimationFrame(function () {
          expect(accordionHeadingToggle.classList.contains('collapsed')).toBe(true);
          resolve();
        });
      });
    });
  });

  it('put the correct class on accordion toggle when accordion template is shown', function () {
    return addElementToBody(accordion).then(function () {
      accordionTemplate.show();

      return new Promise(function (resolve) {
        requestAnimationFrame(function () {
          expect(accordionHeadingToggle.classList.contains('collapsed')).toBe(false);
          resolve();
        });
      });
    });
  });

  it('closes other open panel when another is opened', function () {
    accordionTemplate.setAttribute('open', '');
    spyOn(accordionTemplate, 'hide');
    return addElementToBody(accordion).then(function () {
      expect(accordionTemplate.state).toBe('shown');
      accordionTemplate2.state = 'shown';
      expect(accordionTemplate.hide).toHaveBeenCalled();
    });
  });

  it('put the correct value in state on display change of accordion template', function () {
    return addElementToBody(accordion).then(function () {
      accordionTemplate.show();

      return new Promise(function (resolve) {
        setTimeout(function () {
          expect(accordionTemplate.state).toBe('shown');
          accordionTemplate.hide();
          setTimeout(function () {
            expect(accordionTemplate.state).toBe('hidden');
            resolve();
          }, 1000);
        }, 1000);
      });
    });
  });

  it('changes the display state of acccordion template with state', function (done) {
    addElementToBody(accordion).then(function () {
      accordionTemplate.addEventListener('shown.bs.collapse', function () {
        expect(accordionTemplate.classList.contains('in')).toBe(true);

        // wait for transitioning to complete
        requestAnimationFrame(function () {
          accordionTemplate.state = 'hidden';
        });
      });

      accordionTemplate.addEventListener('hidden.bs.collapse', function () {
        expect(accordionTemplate.classList.contains('in')).toBe(false);
        done();
      });
      accordionTemplate.state = 'shown';
    }).catch(function () {
      done.fail();
    });
  });
});