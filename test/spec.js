// spec.js
describe('angularjs todo mvc homepage', function() {  
  it('should have a title', function() {
    browser.get('http://localhost:8080/');

    element(by.id('loginSubmit')).click();
   });
});