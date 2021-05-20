require("dotenv").config();
const app = require("facebook-chat-api");
const fs = require("fs");
const { exit } = require("process");
const login = require("./login.js");

// create appstate.json file
login.getAppstate(process.env.EMAIL, process.env.PASSWORD, (prompt, err) => {
  // handle error
  if (err) {
    console.log(err);
    // exit program with exit code 1
    process.exit(1)
  }
  // log login.js prompt
  console.log(prompt);
  // mention @everyone in thread id
  app(
    { appState: JSON.parse(fs.readFileSync("appstate.json", "utf8")) },
    (err, api) => {
      fs.writeFileSync("appstate.json", JSON.stringify(api.getAppState()));

      api.setOptions({
        selfListen: true,
        logLevel: "warn",
      });

      api.getThreadInfo(process.env.THREAD_ID, (err, info) => {
        //This is a work-around for a bug (see facebook-chat-api issue #857)
        //mention doesn't work if tag is at index zero in body string
        const emptyChar = '\u200E';
        // create message object with empty mentions 
        var message = { body: emptyChar + "‎@everyone", mentions: [] };
        // fill mentions with participantIDs from given thread
        for (var i = 0; i < info.participantIDs.length; i++) {
          message.mentions.push({
            tag: "@everyone",
            id: info.participantIDs[i],
            fromIndex: 0, // Highlight the first occurence of @everyone
          });
        }

        // send message 
        api.sendMessage(message, process.env.THREAD_ID);

        // display success prompt
        console.log("@everyone mentioned successfully.");
      });
    }
  );
});
