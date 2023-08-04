import { setWorldConstructor } from "@wdio/cucumber-framework";
import chai from "chai";

/**
 * @param {string} appid
 * @param {string} testid
 */
class CustomWorld {

    constructor() {
        this.testid = "";
    }


}

setWorldConstructor(CustomWorld);