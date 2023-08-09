import Page from "./page.js";
import chai from "chai";
import reporter from "../helper/reporter.js";
import constants from "../../data/constants/constant.json" assert { type: "json" };

/**
 * @param {string} testid
 */
class snRecordForm extends Page {
  constructor() {
    super();
  }
  /**Define page object */

  get versionField() {
    return $(`/html//input[@id="kb_knowledge.version_label"]`);
  }

  get workflowField() {
    return $(`/html//input[@id="kb_knowledge.workflow_state"]`);
  }

  get publishButton() {
    return $(`/html//button[@value="d0c86952eb8321007128a5fc5206fe64"]`);
  }
  get notificationMessage() {
    return $(
      `//div[@id='output_messages']/div[@role='region']//div[@class='outputmsg_text']`
    );
  }

  /**Define actions */
  async clickUIAction(testid, button, message) {
    if (!testid) throw Error(`given testid: ${testid} or ${button} is invalid`);
    try {
      await this.click(this.publishButton);
      reporter.addStep(
        testid,
        "info",
        `Clicked ${button} UI Action successful`
      );
      await browser.waitUntil(
        async function () {
          return (await this.notificationMessage.getText()) === message;
        },
        { timeout: 10000 }
      );
    } catch (e) {
      e.message = `${testid}: Failed at clicking ${button} UI Action`;
    }
  }
  async verifyFieldState(testid, fieldName, expectedFieldValue) {
    if (!testid || !fieldName)
      throw Error(
        `Given testid: ${testid} or fieldName: ${fieldName} is invalid`
      );
    try {
      let actualFieldValue;
      switch (fieldName) {
        case "VERSION":
          let versionField = await this.versionField;
          actualFieldValue = (
            await versionField.getAttribute("value")
          ).toLocaleUpperCase();
          break;
        case "WORKFLOW":
          let workflowField = await this.workflowField;
          actualFieldValue = (
            await workflowField.getAttribute("value")
          ).toLocaleUpperCase();
          break;
      }
      if (actualFieldValue === expectedFieldValue) {
        reporter.addStep(
          testid,
          "info",
          `${fieldName} field is verified with value: ${expectedFieldValue} successful`
        );
      } else {
        throw new Error(
          `Given ${fieldName} field value: ${fieldValue} doesn't match with ${expectedFieldValue}`
        );
      }
    } catch (e) {
      e.message = `${testid}: Failed at verifyFieldState, ${e.message}`;
      throw e;
    }
  }
}

export default new snRecordForm();
