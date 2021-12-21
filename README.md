# Facebook Chat Role

This is an implementation of [facebook-chat-api](https://github.com/Schmavery/facebook-chat-api), that allows for `@everyone` mention in any messenger group chat, provided the thread ID.

# Requirements

[nodejs](https://nodejs.org/en/)<br>
[facebook-chat-api](https://github.com/Schmavery/facebook-chat-api)<br>
[puppeteer](https://pptr.dev/)<br>
[dotenv](https://github.com/motdotla/dotenv)<br>
[npm](https://github.com/npm/npm)

# Install

To install nodejs on Debian-based:
```
sudo apt install nodejs
sudo apt install npm
```

Then clone this repo, and install the dependencies:
```
git clone https://github.com/cr105ph1nx/fb-chat-role.git
cd fb-chat-role/
npm install
```

# Usage

1. Create a `.env` file in the root directory
```
touch .env
```
2. Copy into `.env` the following:
environement variables and fill them accordingy:
```
EMAIL = email@here.com
PASSWORD = thisisapassword
THREAD_ID = 000000000000000
```
3. Run the script:
```
node index.js
```
This generates the appstate.json file using the `EMAIL` and `PASSWORD` variables you defined in `.env` file. Next, it will fetch teh info of all participants in the `THREAD_ID` variable and add their ID to the mention property of the message to be sent.


# Note

For security reasons, make sure to check the [password safety](https://github.com/Schmavery/facebook-chat-api/blob/master/DOCS.md#password-safety)
section in the [facebook-chat-api](https://github.com/Schmavery/facebook-chat-api) repo.

Read more of [dotenv](https://www.npmjs.com/package/dotenv) about environement variables policies
