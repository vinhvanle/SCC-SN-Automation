import { When } from "@wdio/cucumber-framework";
import chai from "chai";
import reporter from "../../helper/reporter.js";
import nopCommerceHomePage from "../../page-objects/nopCommerce.home.page.js";

When(/^As an (.*) user login to nocomerce site$/, async function (user) {
  if (!user) throw Error(`Given user: ${user} is not valid`);
  user = user.trim().toUpperCase();
  try {
    reporter.addStep(this.testid, "info", `Login to nocommerce demo site...`);
    await nopCommerceHomePage.loginToNopCommerceWeb(
      this.testid,
      browser.options.nopCommerceBaseURL,
      process.env[`TEST_NOP_${user}_USERNAME`],
      process.env[`TEST_NOP_${user}_PASSWORD`]
    );

  } catch (e) {
    e.message = `${this.testid}: Failed at nopCommerce login step, ${e.message}`
    throw e;
  }
});

// When(/^Search users in customer list$/, async function () {

// });
