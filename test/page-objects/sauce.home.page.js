import Page from "./page.js";
import chai from "chai";

/**
 * @param {string} username
 * @param {string} password
 */
class HomePage extends Page {
  constructor() {
    super();
  }
  /**Define page object */
  get usernameInputBox() {
    return $(`#user-name`);
  }

  get passwordInputBox() {
    return $(`#password`);
  }

  get loginBtn() {
    return $(`#login-button`);
  }

  /**Define actions */

  async enterUsername(username) {
    if (!username) throw Error(`Given username: ${username} is not valid`);
    try {
      username = username.trim();
      await this.typeInto(this.usernameInputBox, username);
    } catch (e) {
      e.message = `Error entering username: ${username}, ${e.message}`;
    }
  }

  async enterPassword(password) {
    if (!password) throw Error(`Given password is not valid`);
    try {
      password = password.trim();
      await this.typeInto(this.passwordInputBox, password);
    } catch (e) {
      e.message = `Error entering password, ${e.message}`;
    }
  }

  async clickLoginBtn() {
    try {
      await this.click(await this.loginBtn);
    } catch (e) {
      e.message = `Error clicking login button, ${e.message}`;
    }
  }

  async loginToSauceApp(username, password) {
    try {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginBtn();
    } catch (e) {
        throw e;
    }
  }
}

export default new HomePage();
