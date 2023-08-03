import chai from "chai";
/**
 * @param {WebdriverIO.Element} ele
 * @param {string} path 
 * @param {string} text
 */

export default class Page{
    constructor() {

    }

    /**ALl reuseable web functions */

    async navigateTo(path) {
        await browser.url(path);
        await browser.maximizeWindow();
    }

    async click(ele) {
        await ele.waitForClickable({timeout: 5000})
        if (!ele.elementId) {
            throw Error(ele.error.message)
        }
        await ele.click();
    }

    async typeInto(ele, text) {
        await ele.waitForDisplayed({timeout: 5000})
        if (!ele.elementId) {
            throw Error(ele.error.message)
        }
        await ele.setValue(text)
    }
}