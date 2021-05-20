const fs = require("fs");
const puppeteer = require("puppeteer");
const appstatePath = "./appstate.json";

module.exports = {
  getAppstate: async function getAppstate(EMAIL, PASSWORD, callback) {
    if (fs.existsSync(appstatePath))
      callback("appstate.json already exists.", "");
    else {
      try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const navigationPromise = page.waitForNavigation({
          waitUntil: "networkidle0",
        });

        await page.goto("https://www.facebook.com/");

        await page.waitForSelector("#email");
        await page.type("#email", EMAIL);
        await page.type("#pass", PASSWORD);
        await page.click('button[name="login"]');

        await page.waitForSelector("div[role=feed]");

        cookies = await page.cookies();
        cookies = cookies.map(({ name: key, ...rest }) => ({ key, ...rest }));
        fs.writeFileSync(appstatePath, JSON.stringify(cookies));

        await browser.close();

        callback("created appstate.json successfully", "");
      } catch (err) {
        callback(
          "",
          "failed to create appstate.json for the following reason(s):\n" + err
        );
      }
    }
  },
};
