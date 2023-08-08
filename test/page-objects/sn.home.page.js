import Page from "./page.js";
import chai from "chai";
import reporter from "../helper/reporter.js";
import constants from "../../data/constants/constant.json" assert { type: "json" };

/**
 * @param {string} testid
 * @param {WebdriverIO.Element}ele
 */
class snHomePage extends Page {
  constructor() {
    super();
  }
  /**Define page object */
  get knowledgeBase() {
    return $(`[value='70eeaf9e4723211048b0750cd36d43a3']`);
  }

  get articleTemplate() {
    return $(`[value='kb_knowledge']`);
  }

  get navNextBtn() {
    return $(`/html//div[@class='main-content ng-scope']/nav[1]//button[@class='btn btn-primary next-btn']`);
  }
  /**Define actions */ 

  async navigateToModule(testid, url) {
    try {
      await this.navigateTo(url);
      await this.knowledgeBase.waitForClickable();
      reporter.addStep(testid, 'info', `Successfully navigated to: ${url}`);
    } catch (e) {
      e.message = `${testid}: Failed at navigatetoModule, url: ${url}`;
    }
  }
  
  async clickWhenAvailable(testid, ele){
    try {
      await ele.waitForClickable();
      await this.click(ele);
    } catch (e) {
      e.message = `${testid}: Failed at clicking ${ele.elementId}`;
    }
  }

  async openCreateNewArticlePage(testid, url) {
    try {
      await this.navigateTo(`${browser.options.devInstanceBaseURL}/${constants.SN.ARTICLES_CREATE_NEW}`);
      reporter.addStep(testid, 'info', `Clicked Article > Create New successful`);
      await this.knowledgeBase.waitForDisplayed();
      await this.click(this.knowledgeBase);
      reporter.addStep(testid, 'info', `Clicked knowledge base successful`);
      await this.articleTemplate.waitForClickable();
      await this.click(this.articleTemplate);
      reporter.addStep(testid, 'info', `Clicked article template successful `);
      await this.navNextBtn.waitForClickable();
      await this.click(this.navNextBtn);
      reporter.addStep(testid, 'info', `Clicked Next Nav button successful`);

    } catch (e) {
      e.message = `Error navigating to New Article page, ${e.message}`;
      throw e;
    }
  }

  


}

export default new snHomePage();
