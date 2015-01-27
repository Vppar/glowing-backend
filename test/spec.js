// spec.js
describe('angularjs todo mvc homepage', function() {  
  it('should have a title', function() {
    browser.get('');
   });

   it('should have a title', function() {
    // element(by.model("user.username"));
    element(by.model('user.username')).sendKeys("admin");
    element(by.model('user.password')).sendKeys("admin");
    element(by.model('user.domain')).sendKeys("admin");
    element(by.id('loginSubmit')).click();
    browser.sleep(5000);
    element(by.id('ColapseMenu')).click();
    element(by.id('ColapseMenu')).click();
    element(by.id('ColapseMenu')).click();
    element(by.id('ColapseMenu')).click();
    element(by.id('ColapseMenu')).click();
    element(by.id('ColapseMenu')).click();
    element(by.id('ColapseMenu')).click();
    element(by.id('ColapseMenu')).click();
    element(by.id('ColapseMenu')).click();
    element(by.id('ColapseMenu')).click();
    element(by.id('ColapseMenu')).click();
    element(by.id('ColapseMenu')).click();
    element(by.id('ColapseMenu')).click();
    element(by.id('ColapseMenu')).click();
    element(by.id('ColapseMenu')).click();
    element(by.id('ColapseMenu')).click();
    element(by.id('ColapseMenu')).click();
    element(by.id('ColapseMenu')).click();
    element(by.id('ColapseMenu')).click();
    element(by.id('ColapseMenu')).click();
    element(by.id('ColapseMenu')).click();
    element(by.id('ColapseMenu')).click();
    element(by.id('ColapseMenu')).click();
    element(by.id('ColapseMenu')).click();
    element(by.id('ColapseMenu')).click();
    element(by.id('ColapseMenu')).click();
   });


});