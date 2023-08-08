import { setWorldConstructor } from "@wdio/cucumber-framework";
import chai from "chai";

/**
 * @param {string} testid
 * @param {string} articleNumber
 */
class CustomWorld {

    constructor() {
        this.testid = "";
        this.submittedArticleNumber= "";
    }


}

setWorldConstructor(CustomWorld);