const {Builder, By, Key, until} = require('selenium-webdriver')
const SauceLabs = require('saucelabs').default;
const assert = require('assert');
const utils = require('./utils')
const {workingCapabilities} = require("./utils");

const SAUCE_USERNAME = process.env.SAUCE_USERNAME;
const SAUCE_ACCESS_KEY = process.env.SAUCE_ACCESS_KEY;
//const ONDEMAND_URL = `https://${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.eu-central-1.saucelabs.com/wd/hub`;
// NOTE: Use the URL below if using our EU datacenter (e.g. logged in to app.eu-central-1.saucelabs.com)
const ONDEMAND_URL = `https://${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.eu-central-1.saucelabs.com:443/wd/hub`;

/**
 * Task I: Update the test code so when it runs, the test clicks the "I am a link" link.
 *
 * Task II - Comment out the code from Task I. Update the test code so when it runs,
 * the test is able to write "Sauce" in the text box that currently says "I has no focus".
 *
 * Task III - Update the test code so when it runs, it adds an email to the email field,
 * adds text to the comments field, and clicks the "Send" button.
 * Note that email will not actually be sent!
 *
 * Task IV - Add a capability that adds a tag to each test that is run.
 * See this page for instructions: https://docs.saucelabs.com/dev/test-configuration-options/
 *
 * Task V: Set the status of the test so it shows as "passed" instead of "complete".
 * We've included the node-saucelabs package already. For more info see:
 * https://github.com/saucelabs/node-saucelabs
 */

describe('Working Sauce', function () {
    it('should go to Guinea-Pig Sauce', async function () {
        let driver = await new Builder().withCapabilities(utils.workingCapabilities)
            .usingServer(ONDEMAND_URL).build();
        try {

            /**
             * Goes to Sauce Lab's guinea-pig page and verifies the title
             */
            //https://saucelabs.com/test/guinea-pig
            await driver.get("https://saucelabs.com/test/guinea-pig");
            await assert.strictEqual("I am a page title - Sauce Labs", await driver.getTitle());

            // Task I
            //driver.findElement(By.id("i am a link")).click();

            // Task II
            let inputField = await driver.findElement(By.id("i_am_a_textbox"));
            await inputField.clear()
            await inputField.sendKeys("Sauce");

            // Task III
            let inputEmail = await driver.findElement(By.id("fbemail"));
            await inputEmail.clear();
            await inputEmail.sendKeys("alina.ghetler@gmail.com")
            let inputCommentField = await driver.findElement(By.id("comments"));
            await inputCommentField.clear();
            inputCommentField.sendKeys("This is just a test");
            let buttonSend = await driver.findElement(By.id("submit"));
            await buttonSend.click();
            await driver.executeScript(
                'sauce:job-result=passed'
            );
        } finally {
            await driver.quit();
        }
    });
});
