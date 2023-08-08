import Page from "./page.js";
import chai from "chai";
import reporter from "../helper/reporter.js";
import constants from "../../data/constants/constant.json" assert { type: "json" };

/**
 * @param {string} testid
 */
class snList extends Page {
  constructor() {
    super();
  }
  /**Define page object */
  get articleNumberFields() {
    return $$(
      `/html//table[@id='kb_knowledge_table']/tbody[@class='list2_body']//tr//td[@class="vt"]//a[@class="linked formlink"]`
    );
  }

  /**Define actions */

  async openRecord(testid, number, recordType) {
    try {
      let eleArr;
      /**
       * What type of record is being looked up?
       */
      switch (recordType) {
        case 'ARTICLE':
          return eleArr = await this.articleNumberFields;
      }
      
      if(!number || !recordType) throw Error(`Given record number: ${number}, or record type: ${recordType} is not valid`);      
      let record;
      let correctRecordNumber;
      for (let i = 0; i < eleArr.length; i++) {
        let recordNumber = await eleArr[i].getText();
        if (recordNumber === number) {
          correctRecordNumber = recordNumber;
          record = eleArr[i];
          console.log(`index number: ${i}`);
        } 
      }
      console.log(`>> recordNumber: ${correctRecordNumber}`);
      // console.log(`awaiting page load`);
      // await this.waitForPageLoadComplete();
      try {
        await this.click(record);
        reporter.addStep(testid, 'info', `Clicked record field ${correctRecordNumber} successfuly`);
      } catch (e) {
        e.message = `${testid}: Failed at clicking the record ${correctRecordNumber}`;
      }
      // console.log(`awaiting page load`);
      // await this.waitForPageLoadComplete();
      reporter.addStep(testid, 'info', `Open record number ${number} successful`);
      
    } catch (e) {
      console.log(`Error opening record ${number}, ${e}`);
      throw e;
    }
  }  
}

export default new snList();
