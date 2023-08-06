import reporter from "../helper/reporter.js";
import Page from "./page.js";
import chai from "chai";

/**
 * @param {string} username
 * @param {string} password
 * @param {string} testid
 * @param {string} url
 * 
 */
class nopCommerceHomePage extends Page {
  constructor() {
    super();
  }

  /**Define page object */
  get usernameInputBox() {
    return $(`#Email`);
  }

  get passwordInputBox() {
    return $(`#Password`);
  }

  get loginBtn() {
    return $(`button=Log in`);
  }

  /**Define actions */

  async loginToNopCommerceWeb(testid, url, username, password) {
    if (!url || !username || !password) {
      throw Error(`Given data, url: ${url}, username: ${username}, or password is not valid`);
    }
    url = url.trim();
    username = username.trim();
    try {
      reporter.addStep(testid, 'info', `Login to ${url} with ${username}`);
      await this.navigateTo(url);
      await this.typeInto(await this.usernameInputBox, username);
      await this.typeInto(await this.passwordInputBox, password);
      await this.click(await this.loginBtn);
      reporter.addStep(testid, 'info', `Login to ${url}, with ${username} is successful`);
    } catch (e) {
      e.message = `Failed login to nocommerce web: ${url}, with username: ${username}`;
      throw e;      
    }
  }
}

export default new nopCommerceHomePage();
