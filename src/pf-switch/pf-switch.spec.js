describe ("PatternFly Alert Component Tests", function () {
  let customElement;

  function addElementToBody (element) {
    let promise = new Promise(function (resolve) {
      let observer = new MutationObserver(function () {
        resolve();
        observer.disconnect();
      });
      let config = { attributes: true, childList: true, characterData: true };
      observer.observe(element, config);
    });
    document.body.appendChild(element);
    return promise;
  }

  beforeEach(function () {
    customElement = document.createElement('pf-alert');
    customElement.id = 'pfAlert';
  });

  afterEach(function () {
    document.body.removeChild(customElement);
  });

});
