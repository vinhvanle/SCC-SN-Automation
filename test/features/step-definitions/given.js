import { Given } from "@wdio/cucumber-framework";
import chai from "chai";
import sauceHomePage from "../../page-objects/sauce.home.page.js";
import logger from "../../helper/logger.js";


Given(/^As (a|an) (.*) user I login to inventory web app$/, async function (prefixTxt, userType, dataTable) {
    logger.info(`${this.testid}: Started to login sauce demo app...`);
    let dt = dataTable.hashes();
    console.log(`>> Given step Test ID: ${this.testid}`);

    
    try {
        await sauceHomePage.navigateTo('https://saucedemo.com');
        await sauceHomePage.loginToSauceApp(process.env.TEST_STD_USERNAME, process.env.TEST_STD_PASSWORD);
    } catch (e) {
        e.message = `Failed at login step, ${e.message}`;
        throw e;
    }

    
})