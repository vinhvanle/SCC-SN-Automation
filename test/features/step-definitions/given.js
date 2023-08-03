import { Given } from "@wdio/cucumber-framework";
import chai from "chai";
import sauceHomePage from "../../page-objects/sauce.home.page.js";


Given(/^As (a|an) (.*) user I login to inventory web app$/, async function (prefixTxt, userType, dataTable) {
    // let dt = dataTable.hashes();
    
    try {
        await sauceHomePage.navigateTo('https://saucedemo.com');
        await sauceHomePage.loginToSauceApp('standard_user', 'secret_sauce');
    } catch (e) {
        e.message = `Failed at login step, ${e.message}`;
        throw e;
    }
})