// import { fetchWhoAmI } from "../utils";

chrome.runtime.onMessage.addListener(async (msg, sender, response) => {
  if (msg.from === "popup" && msg.subject === "getAccounts") {
    chrome.identity.getProfileUserInfo((accounts) => {
      console.log("accounts", accounts);
    });
  }
  // if (msg.from === "content" && msg.subject === "showPageAction") {
  //   // Enable the page-action for the requesting tab.
  //   chrome.pageAction.show(sender.tab.id);
  // }
  return true;
});
