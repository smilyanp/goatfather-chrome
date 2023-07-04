chrome.runtime.onMessage.addListener(async (msg, sender, response) => {
  if (msg.from === "popup" && msg.subject === "getAccounts") {
    chrome.identity.getProfileUserInfo((accounts) => {});
  }
  return true;
});
