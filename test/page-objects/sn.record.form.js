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

  /**Define actions */

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
            (await versionField.getAttribute("value")).toLocaleUpperCase()
          );
          break;
        case "WORKFLOW":
          let workflowField = await this.workflowField;
          actualFieldValue = (
            (await workflowField.getAttribute("value")).toLocaleUpperCase()
          );
          break;
      }
      if (actualFieldValue === expectedFieldValue){
        reporter.addStep(testid, 'info', `${fieldName} field is verified with value: ${expectedFieldValue} successful`);
      } else {
        throw new Error(`Given ${fieldName} field value: ${fieldValue} doesn't match with ${expectedFieldValue}`);
      }
    } catch (e) {
      e.message = `${testid}: Failed at verifyFieldState, ${e.message}`;
      throw e;
    }
  }
}

export default new snRecordForm();
