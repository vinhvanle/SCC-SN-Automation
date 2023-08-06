import Page from "./page.js";
import chai from "chai";
import reporter from "../helper/reporter.js";

/**
 * @param {string} testid
 * @param {string} firstname
 * @param {string} lastname
 */
class CustList extends Page {
  constructor() {
    super();
  }
  /**Page objects */
  get firstNameInputBox() {
    return $(`#SearchFirstName`);
  }
  get lastNameInputBox() {
    return $(`#SearchLastName`);
  }
  get searchBtn() {
    return $(`#search-customers`);
  }
  get noResultsMessage() {
    return $(`td=No data available in table`);
  }

  /**Page actions */

  async searchNameAndConfirm(testid, firstname, lastname) {
    if(!firstname || !lastname) throw Error(`Invalid firtname: ${firstname} or lastname: ${lastname} to search`);
    let nameNotExist = false;
    firstname= firstname.trim();
    lastname = lastname.trim();
    reporter.addStep(testid, 'info', `Searching user: ${firstname} ${lastname}`);
    try {
        await this.typeInto(await this.firstNameInputBox, firstname);
        await this.typeInto(await this.lastNameInputBox, lastname);
        await this.click(await this.searchBtn);
        browser.pause(1000);
        let isNotDisplayed = (await this.noResultsMessage).isDisplayed();
        if (isNotDisplayed) nameNotExist = true;
    } catch (e) {
        throw `Failed searching given firstname: ${firstname} and lastname: ${lastname} on customer page, ${e}`
    }
    return nameNotExist;
  }
}

export default new CustList();