# 🚀 iVendi Dev Tools Chrome Extension with React 🚀

<img src="src/static/ivendi_logo.png" alt= “” width="100">

**This tool is not yet Production ready!**

## Dependencies

NodeJS @ ^16

## Local development

1. `git clone git@github.com:iVendi/ivendi-dev-tools.git`

2. `cd ivendi-dev-tools`

3. `npm i`

4. Build

   `npm run build` // if you just want to run the extension

   `npm run watch` // if you're developing actively

5. In Chrome open `chrome://extensions/`
6. Enable `Developer mode` (top-right)
7. Click `Load unpacked` and select the `/dist` folder in this repository

## Notes

This tool only works for `.dev.co/dealership/platform` based urls. This means you will still need Twingate and the correct login credentials before you cna use it on the Dealership Platform.
