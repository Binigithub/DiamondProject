


var diamondPage = require ('../Pages/Diamond.page.js')

var Base = require ('../Utilities/Base.js')

var customer = require ('../TestData/personData.json')

describe('Diamond project', () => {

    beforeAll(function(){

    Base.navigateToHome()

    diamondPage.popUpWindow.click();

      

    })

    

    beforeEach(function(){

    Base.navigateToHome()

})

    

//BERMET

    it("Should have correct page title, ID-1 BERMET", function() {

    expect(browser.getTitle()).toContain("Brilliant Earth: Engagement Rings & Beyond");

   

    })

//ZHIBEK

    it('Should Login to Account, ID-6 ZHIBEK', () => {

        

        diamondPage.loginButton2.click();

        diamondPage.userNameValid.get(0).sendKeys('john@scrummaster.com');

        diamondPage.userPasswordValid.get(1).sendKeys('softwareDevelopment123');

        diamondPage.signInButton2.get(3).click();

        diamondPage.loginButton2.click();

        expect(diamondPage.displayMyAccountPage.getText()).toBe("MY ACCOUNT");

        diamondPage.closeAccount.click();

         })

//SHAKHIDA

it('Should verify checkout functionality, ID-12 SHAHIDA',()=>{

    

   browser.actions().mouseMove(diamondPage.scrollToDiamond.last()).perform();

   diamondPage.pearLink.click();

   diamondPage.veiwRow2.click();

   diamondPage.addToBag.click();

   browser.sleep(1000)

   expect(diamondPage.orderSummary.getText()).toEqual('Order Summary');

     

  

});

it('Should verify "flexible options payment" link, ID-16 SHAHIDA',()=>{

   

   browser.actions().mouseMove(diamondPage.scrollToEnd.last()).perform();

   diamondPage.flexiblePayment.last().click();

   diamondPage.firstNameBox.get(0).sendKeys(customer.accountInfo[0].fName);

   diamondPage.lastNameBox.get(0).sendKeys(customer.accountInfo[0].lName);

   diamondPage.emailBox.get(0).sendKeys(customer.accountInfo[0].email);

   diamondPage.phoneBox.get(0).sendKeys(customer.accountInfo[0].phone);

   diamondPage.applyNow.click();

   //browser.sleep(2000);

   browser.waitForAngularEnabled(false);

   browser.wait(protractor.ExpectedConditions.visibilityOf($('.mainColumn h1')),15000)

   expect(browser.getCurrentUrl()).toContain('wellsfargo');

   browser.sleep(1000)

       

   });

   it('Should create an account, ID-5 AZIZA', function() {

    diamondPage.loginButton.click();

    for (var i=0; i<customer.accountInfo.length; i++){

    diamondPage.firstName.sendKeys(customer.accountInfo[i].fName);

    diamondPage.lastName.sendKeys(customer.accountInfo[i].lName);

    diamondPage.emailAddress.sendKeys(customer.accountInfo[i].email);

    diamondPage.password1.sendKeys(customer.accountInfo[i].password1);

    diamondPage.password2.sendKeys(customer.accountInfo[i].password2);

    diamondPage.signInButton.click();

    //logout

    diamondPage.loginButton2.click();

    browser.sleep(1000)

    element(by.css('#mm-0 > div:nth-child(7) > div > div.col-md-3 > div > ul > li > ul > li:nth-child(5) > a')).click()

    // browser.sleep(2000)

    }

    

   });

  

   it('Should display "Browse Engagements Rings" and click on it, ID-8 AZIZA',function(){

       expect(diamondPage.browseButton.isDisplayed()).toBe(true);

       expect(diamondPage.browseButton.getText()).toEqual('BROWSE ENGAGEMENT RINGS');

   });

   //RAKHAT

it('Should accept text in search field and display result, ID-3 RAKHAT',()=>{

    diamondPage.searchInput.sendKeys('brilliant');

    diamondPage.searchButton.click();

    expect(browser.getCurrentUrl()).toContain('search/?q=brilliant');

});

it('Should allow to pick appointment date, ID-14 RAKHAT',()=>{

 

    diamondPage.makeAppointment.get(1).click();

    //browser.wait(protractor.ExpectedConditions.visibilityOf(diamondPage.makeAppointment.get(0)),15000)

    browser.sleep(3000);

    browser.waitForAngularEnabled(false);

    browser.switchTo().frame(browser.driver.findElement(diamondPage.makeAppFrame))

    browser.sleep(3000)

    diamondPage.Chicagolocation.get(0).click();

    //browser.wait(protractor.ExpectedConditions.visibilityOf(diamondPage.Chicagolocation.get(0)),15000)

    browser.sleep(3500)

    diamondPage.services.get(0).click();

    browser.sleep(3500);

    diamondPage.engagementRing.get(0).click();

    browser.sleep(3500);

    diamondPage.calendarDay.click()

    browser.sleep(3500);

    diamondPage.calendarTime.click();

    browser.sleep(2000)

    diamondPage.name.sendKeys(customer.accountInfo[1].fName);

    diamondPage.email.sendKeys(customer.accountInfo[1].email);

    diamondPage.confirmEmail.sendKeys(customer.accountInfo[1].email);

    diamondPage.phoneNumber.sendKeys(customer.accountInfo[1].phone);

    browser.sleep(3000);

    browser.wait(protractor.ExpectedConditions.elementToBeClickable(diamondPage.submitButton),15000)

    diamondPage.submitButton.click();

   browser.wait(protractor.ExpectedConditions.visibilityOf(diamondPage.successMessage.get(0)),15000)

   expect(diamondPage.successMessage.get(0).getText()).toBe('Thank you for booking a Brilliant Earth appointment. Please click the below button to share your preferences with us.');

    

})

//GULJAMAL

     it('Should make an appointment and check locations, ID-13 GULJAMAL',()=>{

       browser.actions().mouseMove(diamondPage.clickAppointments).perform();
       diamondPage.clickAppointments.click();
        });





     it('Should verify flexible Payment Options, ID-17 GULJAMAL',()=>{

        browser.actions().mouseMove(diamondPage.flexiblePayment2).perform();
        diamondPage.flexiblePayment2.click();
        diamondPage.firstName2.first().sendKeys(customer.accountInfo[0].fName);
        diamondPage.lastName2.first().sendKeys(customer.accountInfo[0].lName);
        diamondPage.eMail2.first().sendKeys('biniam@');
        diamondPage.applyNow2.first().click();
        var myalert=browser.switchTo().alert();
        expect(myalert.getText()).toContain('Please enter a valid email address');
        myalert.dismiss();
        });

        

//ZHIBEK

it('Should verify “email us” functionality, ID-15 ZHIBEK', () => {

    

    browser.executeScript("arguments[0].scrollIntoView();",diamondPage.emailUs)

    .then(function(){

    diamondPage.emailUs.click();

        browser.sleep(3000)

    diamondPage.NeedAssistanceFirstName.sendKeys(customer.accountInfo[0].fName);

    diamondPage.NeedAssistanceLastName.sendKeys(customer.accountInfo[0].lName);

    diamondPage.NeedAssistanceEmail.sendKeys(customer.accountInfo[0].email);

    diamondPage.NeedAssistancePhoneNumber.sendKeys(customer.accountInfo[0].phone);

    diamondPage.sendMessage.sendKeys("Hello");

    // diamondPage.checkBox.click();

    diamondPage.requestGuidanceButton.click();

    browser.sleep(2000)

    expect(diamondPage.displayEmailConfirmationPage.getText()).toBe("EMAIL CONFIRMATION");

     

});

})

   

//AIPERI

it('Should display "Create account" and be clickable, ID-4 AIPERI', function(){

    expect(diamondPage.acccountLogin3.isDisplayed()).toBe(true);

    diamondPage.acccountLogin3.click();

    expect(element(by.css('.h2.text-dark')).getText()).toBe('MY ACCOUNT')

 })

it('Should interact with an agent, ID-9, AIPERI', function() {

       

       browser.wait(protractor.ExpectedConditions.visibilityOf(diamondPage.chatButton3),15000)

       diamondPage.chatButton3.click();

       browser.wait(protractor.ExpectedConditions.visibilityOf(diamondPage.firstName3),15000)

       diamondPage.firstName3.sendKeys('Aiperi');

       diamondPage.email3.sendKeys('aiperi@gmail.com');

       diamondPage.clickButton3.click();

       browser.wait(protractor.ExpectedConditions.visibilityOf(diamondPage.thankYouText3),15000)

       expect(diamondPage.thankYouText3.getText()).toContain('Thank you for choosing to chat with us');

       diamondPage.close.click();

      

    });

 
//SHEKERBEK

it('Should verify the link on top of the page, ID-2 SHEKERBEK',()=>{

diamondPage.Categories.getText().then(function(text){

var expected = ['ENGAGEMENT','WEDDING','DIAMONDS','GEMSTONES','JEWELRY','ABOUT']

 expect(text.sort().toString()==expected.sort().toString()).toBe(true);

 })

})

//BERMET

it('Should verify (Brilliant Earth Reviews), ID-11 BERMET', function() {

    browser.sleep(2000)

    diamondPage.reviews.click();

    browser.sleep(2000)

    expect(diamondPage.customerReviewsPage.isDisplayed()).toBe(true);

    expect(diamondPage.customerReviewsPage.getText()).toEqual('CUSTOMER REVIEWS');

  });

  ////ALIA

it('should inspect invalid email, ID-7 ALIIA', function() { 

    // browser.sleep(1000)

    browser.actions().mouseMove(diamondPage.clickAccount).perform()

    // browser.sleep(1000)

    browser.wait(protractor.ExpectedConditions.visibilityOf(diamondPage.sendName),15000)

    diamondPage.sendName.sendKeys(customer.accountInfo[0].email);

    diamondPage.sendLastName.sendKeys(customer.accountInfo[1].password1);

    diamondPage.clickLoginButton.click();

    browser.wait(protractor.ExpectedConditions.visibilityOf($('.password_error.control-label.be-error.get-error2')),15000)

    expect($('.password_error.control-label.be-error.get-error2').getText()).toContain('THIS PASSWORD DOES NOT MATCH THIS EMAIL ADDRESS.')

    

}); 

it('Should verify invalid tracking number, ID-18 ALIIA',()=>{

    browser.wait(protractor.ExpectedConditions.visibilityOf(diamondPage.trackOrder),10000)

    diamondPage.trackOrder.click(); 

    browser.wait(protractor.ExpectedConditions.visibilityOf(diamondPage.emailAddress),10000)

    diamondPage.emailAddress.sendKeys(customer.accountInfo[0].email);

    browser.wait(protractor.ExpectedConditions.visibilityOf(diamondPage.trackingNumber),15000)

    diamondPage.trackingNumber.sendKeys('1234567890');

    diamondPage.clickLoginButton2.click();

    expect(diamondPage.errorMessage.getText()).toEqual('THE ORDER NUMBER AND EMAIL COMBINATION YOU PROVIDED DO NOT MATCH. PLEASE CONTACT US AT 1.800.691.0952 FOR ASSISTANCE.');    

});

})
