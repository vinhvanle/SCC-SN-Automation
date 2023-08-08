import Page from "./page.js";
import chai from "chai";
import reporter from "../helper/reporter.js";
import constants from "../../data/constants/constant.json" assert { type: "json" };


/**
 * @param {string} testid
 */
class snNewRecordForm extends Page {
  constructor() {
    super();
  }
  /**Define page object */
  get knowledgeBaseField() {
    return $(`/html//input[@id="sys_display.kb_knowledge.kb_knowledge_base"]`);
  }

  get numberField() {
    return $(`/html//input[@id="kb_knowledge.number"]`);
  }

  get categoryField() {
    return $(`/html//input[@id="sys_display.kb_knowledge.kb_category"]`);
  }

  get languageField() {
    return $(`/html//select[@id="kb_knowledge.language"]`);
  }

  get scheduledPublishDate() {
    return $(`/html//input[@id="kb_knowledge.scheduled_publish_date"]`);
  }

  get shortDescription() {
    return $(`/html//input[@id="kb_knowledge.short_description"]`);
  }

  get submitBtn() {
    return $(`/html//button[@id="sysverb_insert"]`);
  }

  /**Define actions */

  

  async setShortDescription(testid, text) {
    try {
      (await this.shortDescription).waitForClickable();
      await this.typeInto(this.shortDescription, text);
      reporter.addStep(testid, "info", `Set shortDescription field successful`);
    } catch (e) {
      e.message = `Error seting short description, ${e.message}`;
      throw e;
    }
  }

  async getNumberField() {
    try {
      let html = await this.numberField.getHTML();
      let breakpoint = " ";
      let delimeter = '"';
      let number = html.split(breakpoint)[4].split(delimeter)[1];
      return number;
    } catch (e) {
      e.message = `Error getting number field, ${e.message}`;
      throw e;
    }
  }

  async submitForm(testid, text) {
    try {
      await this.setShortDescription(testid, text);
      try {
        await this.click(this.submitBtn);
        reporter.addStep(testid, "info", `Click Submit btn successful`);
      } catch (e) {
        e.message = `Error clicking submit button, ${e.message}`;
        throw e;
      }
    } catch (e) {
      e.message = `Error submitting form, ${e.message}`;
      throw e;
    }
  }
}

export default new snNewRecordForm();
