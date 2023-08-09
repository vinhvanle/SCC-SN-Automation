import Page from "./page.js";
import chai from "chai";
import reporter from "../helper/reporter.js";

/**
 * @param {string} username
 * @param {string} password
 * @param {string} testid
 */
class snLoginPage extends Page {
  constructor() {
    super();
  }
  /**Define page object */
  get usernameInputBox() {
    return $(`/html//input[@id='user_name']`);
  }

  get passwordInputBox() {
    return $(`/html//input[@id='user_password']`);
  }

  get loginBtn() {
    return $(`/html//button[@id='sysverb_login']`);
  }

  /**Define actions */

  async enterUsername(testid, username) {
    if (!username) throw Error(`Given username: ${username} is not valid`);
    try {
      username = username.trim();
      await this.typeInto(this.usernameInputBox, username);
      reporter.addStep(testid, "info", `Username entered successfully`);
    } catch (e) {
      e.message = `Error entering username: ${username}, ${e.message}`;
      throw e;
    }
  }

  async enterPassword(testid, password) {
    if (!password) throw Error(`Given password is not valid`);
    try {
      password = password.trim();
      await this.typeInto(this.passwordInputBox, password);
      reporter.addStep(testid, "info", `Password entered successfully`);
    } catch (e) {
      e.message = `Error entering password, ${e.message}`;
      throw e;
    }
  }

  async clickLoginBtn(testid) {
    try {
      await this.click(await this.loginBtn);
      reporter.addStep(testid, "info", `Clicked Login button successfully`);
    } catch (e) {
      e.message = `Error clicking login button, ${e.message}`;
      throw e;
    }
  }

  async loginToSN(testid, username, password) {
    try {
      await this.navigateTo(browser.options.devInstanceBaseURL);
      await this.enterUsername(testid, username);
      await this.enterPassword(testid, password);
      await this.clickLoginBtn(testid);
    } catch (e) {
      throw e;
    }
  }

  async logoutSN(testid) {
    try {
      let link = browser.options.devInstanceBaseURL;
      let path = `${link}/logout.do`;
      await this.navigateTo(path);
      reporter.addStep(testid, "info", `${testid}: Logout of SN successful`);
    } catch (e) {
      e.message = `${testid}: Failed at logoutSN, ${e.message}`;
      throw e;
    }
  }
}

export default new snLoginPage();
