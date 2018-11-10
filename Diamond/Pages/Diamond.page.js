var diamondPage = function(){

    this.popUpWindow=$$('.iconfont.iconfont-close1').get(1);

    this.linkText = element(by.linkText("Email Us"))

    //AZIZA

this.loginButton=$('#login-toggler>i');

this.firstName=$('#id_first_name');

this.lastName= $('#id_last_name');

this.emailAddress=$('#id_email');

this.password1= $('#id_password1');

this.password2=$('#id_password2');

this.signInButton= $('p.pt-10 > button');

this.browseButton=$('.btn.btn--ir234-home-hero')

    // RAKHAT

    this.searchGet =  element.all(by.css('.iconfont.iconfont-close1'));

    this.searchInput =  $('#king-search-input');

    this.searchButton = $('#king-search-button');

    this.frontIframe = element.all(by.css('.iconfont.iconfont-close1'));

    this.makeAppointment = $$('.ir234-make-appointment-link');

    this.makeAppFrame =by.id('setstr_iframe');

    this.Chicagolocation = $$('#locRezultsList div div div:nth-of-type(3)');

    this.services = $$('#tab-services>span');

    this.engagementRing = $$('.itemDuration');

    this.calendarMonth = $$('.nextPeriodLink');

    this.calendarDay = $('.calInner tbody tr:nth-of-type(4)>td:nth-of-type(5)')

    this.calendarTime = $$('.hour_interval:nth-of-type(1)').get(0)

    this.calendarTimeSave = $('.save');

    this.hourInterval = $$('.hour_interval')

    this.name =  $('#cName');

    this.email = $('#cEmail');

    this.confirmEmail = $('#cEmailConfirm');

    this.phoneNumber = $('#cCustom57995');

    // this.submitButton = $('.rightContents>div:nth-of-type(2)');

    this.submitButton=$$('.confirmBtn').get(0)

    this.successMessage = $$('.successMessage');

//SHAKHIDA

this.scrollToDiamond = element.all(by.xpath("//ul[@id='ir234-shop-diamond']/li"));

this.pearLink = element.all(by.xpath("//ul[@id='ir234-shop-diamond']/li[5]/a"));

this.veiwRow2 = $$('div:nth-child(2) > a > table > tbody > tr > td:nth-child(11) > span');

this.addToBag =   $$('div.col-md-5.ir218-detail-property.pb-30.pb-xs-0 > div > div > div > div:nth-child(2) > div > a');

this.orderSummary = $('.ir245-table-count-heading');

this.scrollToEnd = $$('#collapse3 li');

this.flexiblePayment =  $$('#collapseTwo > li:nth-child(5)>a');

this.firstNameBox = $$('#input_first_name');

this.lastNameBox = element.all(by.xpath('//*[@id="input_last_name"] '));

this.emailBox = element.all(by.xpath('//*[@id="input_email"]'));

this.phoneBox =  element.all(by.xpath('//*[@id="input_phone"]'));

this.applyNow =  element(by.xpath('//*[@id="mm-0"]/div[7]/div/div[2]/div[2]/div/button'))

//GULJAMAL

    this.clickAppointments=$$('.ir234-make-appointment-link').get(1);

    this.flexiblePayment2=$('#collapseTwo > li:nth-child(5) > a.hidden-xs');

    this.firstName2= $$('#input_first_name');

    this.lastName2=$$('#input_last_name');

    this.eMail2=$$('#input_email');

    this.applyNow2=$$('.btn.btn-lg.btn-success.w260');

    //ZHIBEK

    this.loginButton2=element(by.css('#login-toggler i'));

    this.userNameValid=element.all(by.css('.col-md-4.col-sm-6.fore1.mb-xs-30 form div>input'));

    this.userPasswordValid=element.all(by.css('.col-md-4.col-sm-6.fore1.mb-xs-30 form div>input'));

    this.signInButton2=element.all(by.css('.btn.btn-success.btn-lg.btn-block'));

    this.displayMyAccountPage=element(by.css('.h2.ls-1.mb20.mt0.lh-36.text-dark'));
    this.closeAccount=element(by.css('#mm-0 > div:nth-child(7) > div > div.col-md-3 > div > ul > li > ul > li:nth-child(5) > a'));
    this.emailUs=element(by.linkText("Email Us"));

//should Verify “email us” functionality

this.NeedAssistanceFirstName=element(by.id("input_first_name"));

this.NeedAssistanceLastName=element(by.id("input_last_name"))

this.NeedAssistanceEmail=element(by.id("input_email"));

this.NeedAssistancePhoneNumber=element(by.id("input_phone"));

this.sendMessage=element(by.id("input_message"));

this.checkBox=element(by.id("send_email"));

this.requestGuidanceButton=element(by.css(".btn.btn-lg.btn-success.w220"));

this.displayEmailConfirmationPage=element(by.css(".h2.ls-1.fw-b.mb20.mt10.lh-36"));

//AIPERI

    this.acccountLogin3=$('#login-toggler>i');

    this.chatButton3=$$('.iconfont.iconfont-chat').get(0);

    this.firstName3=$('#txt_4739143');

    this.email3=$('#txt_4739144');

    this.clickButton3=$('button.lp_submit_button');

    this.thankYouText3=$('.lp_title_text.lp_ltr');
    this.close=$$('.lp_close>.lp_close-icon.lp_icon-white').get(1);

    //SHEKER

    this.ChatForm=element(by.id('LPMimage-1512618167881-5'));

    this.NameField=element(by.css('#txt_4739143'));

    this.EmailField=element(by.id('txt_4739144'));

    this.SubmitButton4=element(by.xpath('//*[@id="LP_PagingViewController_1"]/div/div[2]/div[1]/button[4]'));

    this.Categories=$$('.king-navgation.list-inline.selected-navigation-color>li>a');

    //ALIIA

this.closePopUpWindow=element(by.xpath("(//div[@class='modal-dialog']//button[@class='close more-information'])[3]"));

this.clickAccount=element(by.xpath('//*[@id="login-toggler"]/i'));

this.sendName=element(by.name('username'));

this.sendLastName=element(by.name('password'));

this.clickLoginButton=element(by.xpath('//*[@id="header_login_form"]/button'));

//ALIIA TRACKING

this.trackOrder=element(by.xpath('//*[@id="collapse3"]/li[4]/a'));

this.emailAddress=element(by.id('id_email'));

this.trackingNumber= element(by.id('id_tranid'));

this.clickLoginButton2=element(by.name('login_submit'));

this.errorMessage=element(by.id('ValidationSummary1'));

    //BERMET

    this.scrollToEnd = $$('.ir234-make-appointment-link');

    // this.reviews=$('#collapseOne > li:nth-child(5) > a.hidden-xs');

    this.reviews=$('#collapseOne>li:nth-of-type(5)>a:nth-child(1)')

    this.customerReviews=$('<h1 class="h1">CUSTOMER REVIEWS</h1>');

    this.customerReviewsPage=element(by.xpath('//*[text()="CUSTOMER REVIEWS"]'));

};

module.exports = new diamondPage();

