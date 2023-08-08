import { Then } from "@wdio/cucumber-framework";
import chai from "chai";
import logger from "../../helper/logger.js";
import reporter from "../../helper/reporter.js";
import fs from "fs";
import CustList from "../../page-objects/nopCommerce.custlist.page.js";
import nopCommerceCustlistPage from "../../page-objects/nopCommerce.custlist.page.js";
import snHomePage from "../../page-objects/sn.home.page.js";
import constants from "../../../data/constants/constant.json" assert { type: "json"};
import snNewArticleForm from "../../page-objects/sn.new.article.form.js";

Then(
  /^Inventory page should (.*)\s?list (.*)$/,
  async function (negativeCheck, noOfProducts) {
    try {
      logger.info(`${this.testid}: Checking the price...`);
      if (!noOfProducts)
        throw Error(`Invalid product count provided: ${noOfProducts}`);
      let eleArr = await $$(`.inventory_item_name`);
      try {
        chai.expect(eleArr.length).to.equal(parseInt(noOfProducts));
      } catch (e) {
        reporter.addStep(this.testid, 'error', 'Known issue - product count mismatch', true, 'JIRA-123');
        throw e;
      }
    } catch (e) {
      e.message = `${this.testid}: Failed when comparing product count, ${e.message}`;
      throw e;
    }
  }
);

/**
 * Steps:
 * 1. Get price list
 * 2. Convert string to number
 * 3. Assert if any value is <=0
 */

Then(/^Validate all products have valid price$/, async function () {
  try {
    /**1. Get price list */
    let eleArr = await $$(`.inventory_item_price`);
    let priceStrArr = [];
    for (let i = 0; i < eleArr.length; i++) {
      let priceStr = await eleArr[i].getText();
      priceStrArr.push(priceStr);
    }

    /**2. Conver string to number */
    let priceNumArr = priceStrArr.map((ele) => +ele.replace("$", ""));
    /**3. Assert if any value is <= 0 */
    let invalidPriceArr = priceNumArr.filter((ele) => ele <= 0);
    chai.expect(invalidPriceArr.length).to.equal(0);
  } catch (e) {
    e.message = `${this.testid}: Failed when validating price, ${e.message}`;
    throw e;
  }
});


/**
 * Verify if given user exists in customers list
 * Sub-steps:
 * 1. Navigate/ select Customer option from left menu
 * 2. Read API res from /data folder
 * 3. For each user object in API res:
 * - Enter first name and last name
 * - Search and confirm if user exists
 * 4. In case user does not exist, write it to error file
 */
Then(/^Verify if all users exist in customers list$/, async function() {

  try {
    /** 1. Navigate/ select Customer option from left menu*/
    await browser.url(`${browser.options.nopCommerceBaseURL}/Admin/Customer/List`);
    reporter.addStep(this.testid, 'info', `Navigating to customer list screen... ${browser.options.nopCommerceBaseURL}/Admin/Customer/List`);
  
    /**  2. Read API res from /data folder*/
    let filename = `${process.cwd()}/data/api-res/reqresAPIUsers.json`;
    let data = fs.readFileSync(filename, 'utf8');
    let dataObj = JSON.parse(data);
  
    /** 3. For each user object in API res:*/
    let numOfObj = dataObj.data.length;
    let arr = [];
    for (let i = 0; i < numOfObj; i++) {
      let obj = {};
      let firstname = dataObj.data[i].first_name;
      let lastname = dataObj.data[i].last_name;
      let custNotFound = await nopCommerceCustlistPage.searchNameAndConfirm(this.testid, firstname, lastname);
      if (custNotFound) {
        obj["firstname"] = firstname;
        obj["lastname"] = lastname;
        arr.push(obj);
      }
    }
  
    /** 4. In case user does not exist, write it to error file*/
    if (arr.length) {
      let data = JSON.stringify(arr, undefined, 4);
      let filePath = `${process.cwd()}/results/custNotFoundList.json`;
      fs.writeFileSync(filePath, data);
    }
  } catch (e) {
    e.message = `${this.testid}: Failed at checking users in nopCommerce site, ${e.message}`;
    throw e;    
  }

})


/**Service Now Steps */


/**
 * Navigate to module
 * 
 */
Then(/^I navigate to "(.*)"$/, async function (module) {
  let url = "";
  switch (module) {
    case 'Create New Article':
      url = `${browser.options.devInstanceBaseURL}/${constants.SN.ARTICLES_CREATE_NEW}`;
      break;
  
  }
  try {
    await snHomePage.navigateToModule(this.testid, url)
    reporter.addStep(this.testid, 'info', `Navigate to ${module} successful`);
  } catch (e) {
    e.message = `${this.testid}: Failed at Navigating to ${module}`;
    throw e;
  }

});


/**
 * Open a new article form:
 * 1. choose knowledge base
 * 2. choose article template
 * 3. click next btn
 */
Then(/^I open new article form$/, async function() {
  try {
    /**1. choose knowledge base */
    await snHomePage.clickWhenAvailable(this.testid, snHomePage.knowledgeBase);
    reporter.addStep(this.testid, 'info', `Click knowledge base title successful`);
    /**2. choose article template */
    await snHomePage.clickWhenAvailable(this.testid, snHomePage.articleTemplate);
    reporter.addStep(this.testid, 'info', `Click article template successful`);
    /** 3. click next btn*/
    await snHomePage.clickWhenAvailable(this.testid, snHomePage.navNextBtn);
    reporter.addStep(this.testid, 'info', `Click knowledge base title successful`);
    await browser.pause(10000);
  } catch (e) {
    e.message = `${this.testid}: Failed at opening new article form, ${e.message}`;
    throw e;
  }
})

Then(/^I fill in mandatory fields and submit$/, async function () {
  try {
    let text = `[AutomationTest] - New Article - ${this.testid}`;
    await snNewArticleForm.submitForm(this.testid, text );
    reporter.addStep(this.testid, 'info', `Article with Short description: ${text} submit successful`);
  } catch (e) {
    e.message = `${this.testid}: Failed at fill mandatory fields and submit, ${e.message}`;
    throw e;
  }
})