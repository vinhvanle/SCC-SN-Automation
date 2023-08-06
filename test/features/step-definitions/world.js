import { setWorldConstructor } from "@wdio/cucumber-framework";
import chai from "chai";

/**
 * @param {string} testid
 */
class CustomWorld {

    constructor() {
        this.testid = "";
    }


}

setWorldConstructor(CustomWorld);