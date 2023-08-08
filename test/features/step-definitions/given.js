import { Given } from "@wdio/cucumber-framework";
import sauceHomePage from "../../page-objects/sauce.home.page.js";
import reporter from "../../helper/reporter.js";
import constants from "../../../data/constants/constant.json" assert { type: "json" };
import apiHelper from "../../helper/apiHelper.js";
import fs from "fs";
import assert from "assert";
import snLoginPage from "../../page-objects/sn.login.page.js";

Given(
  /^As (a|an) (.*) user I login to inventory web app$/,
  async function (prefixTxt, userType, dataTable) {
    reporter.addStep(this.testid, "info", "Login to sauce demo");
    // Getting data from data table
    let dt = dataTable.hashes();
    

    try {
      await sauceHomePage.navigateTo(browser.options.sauceDemoURL);
      await sauceHomePage.loginToSauceApp(
        this.testid,
        process.env.TEST_STD_USERNAME,
        process.env.TEST_STD_PASSWORD
      );
    } catch (e) {
      e.message = `${this.testid} Failed at login step, ${e.message}`;
      throw e;
    }

    reporter.addStep(this.testid, "info", "Login successful");
  }
);

/**
 * Get list of users from reqres api
 * Sub-steps:
 * 1. Get payload data
 * 2. Make get call by using API helper
 * 3. Store results
 */
Given(/^Get list of (.*) from reqres.in$/, async function (endpointRef) {
  try {
    if (!endpointRef)
      throw Error(`Given endpoint ref: ${endpointRef} is not valid`);

    /**1. Get payload data */
    reporter.addStep(
      this.testid,
      "info",
      `Getting the payload data for endpoint: ${endpointRef}`
    );
    let endpoint = "";
    if (endpointRef.trim().toUpperCase() === "USERS") {
      endpoint = constants.REQRES.GET_USERS;
    }
    if (!endpoint)
      throw Error(
        `Error getting endpoint: ${endpoint} from the constants.json`
      );

    /** 2. Make get call by using API helper */
    let res;
    let testid = this.testid;
    await browser.call(async function () {
      res = await apiHelper.GET(
        testid,
        browser.options.reqresBaseURL,
        endpoint,
        "",
        constants.REQRES.QUERY_PARAM
      );
    });

    if (res.status !== 200)
      chai.expect.fail(
        `Failed getting the users from :${browser.options.reqresBaseURL}/${endpoint}`
      );
    reporter.addStep(
      this.testid,
      "info",
      `API response received, data: ${JSON.stringify(res.body)}`
    );

    /**3. Store results */
    let data = JSON.stringify(res.body, undefined, 4);
    let filename = `${process.cwd()}/data/api-res/reqresAPIUsers.json`;
    fs.writeFileSync(filename, data);
    reporter.addStep(
      this.testid,
      "info",
      `Saved API res data from ${endpoint} to json file`
    );
  } catch (e) {
    e.message = `${this.testid}: Failed at getting API users from reqres, ${e.message}`;
    throw e;
  }
});

/**
 * Users: 
 * 1. admin === SN_ADMIN_USERNAME
 * 2. knowledge_user === SN_KNOWLEDGE_USER_USERNAME
 * 3. knowledge_mananger === SN_KNOWLEDGE_MANAGER_USERNAME
 * 4. knowledge_admin === SN_KNOWLEDGE_ADMIN_USERNAME
 */
Given(/(.*): As (a|an) "(.*)" user, I login to SN Dev Instance$/, async function (testid, prefixTxt, user) {
  reporter.addStep(this.testid, 'info', `Starting to login to SN Dev Instance`);
  try {
    // navigate to SN 
  
    
    //Get username and password
    let username = "";
    let password = "";
    switch (user) {
      case "admin":
        username = process.env.SN_ADMIN_USERNAME;
        password = process.env.SN_ADMIN_PASSWORD;        
        break;
      case "knowledge":
        username = process.env.SN_KNOWLEDGE_USER_USERNAME;
        password = process.env.SN_KNOWLEDGE_USER_PASSWORD;        
        break;
      case "knowledge mananger":
        username = process.env.SN_KNOWLEDGE_MANAGER_USERNAME;
        password = process.env.SN_KNOWLEDGE_MANAGER_PASSWORD;        
        break;
      case "knowledge admin":
        username = process.env.SN_KNOWLEDGE_ADMIN_USERNAME;
        password = process.env.SN_KNOWLEDGE_ADMIN_PASSWORD;        
        break;
    }
    
    await snLoginPage.loginToSN(this.testid, username, password);
    reporter.addStep(this.testid,'info', `>> Logged in as ${user} user, username: ${username} successful`);
  } catch (e) {
    e.message = `${this.testid}: Failed at Login to SN step, ${e.message}`;
    throw e;
  }
  reporter.addStep(this.testid, 'info', `Login to SN Dev Instance successful`);
});
