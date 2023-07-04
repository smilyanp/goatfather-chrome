import React from "react";
import { createRoot } from "react-dom/client";
import "../assets/css/tailwind.css";
import Popup from "./Popup";
import NonTradingView from "./components/NonTradingView";
import { getCurrentTab } from "../utils";
import { ChakraProvider } from "@chakra-ui/react";
import {
  getCollectedFieldsFromStorage,
  getLoggedInUserFromStorage,
  getSelectedPairFromStorage,
} from "./storage";

function init() {
  const appContainer = document.createElement("div");
  document.body.appendChild(appContainer);

  if (!appContainer) {
    throw new Error("Cannot find appContainer");
  }
  const root = createRoot(appContainer);

  document.addEventListener("DOMContentLoaded", async () => {
    const activeTab = await getCurrentTab();

    await chrome.runtime.sendMessage({
      from: "popup",
      subject: "getAccounts",
    });

    if (activeTab.url.includes("tradingview.com/chart/")) {
      const defaultUser = await getLoggedInUserFromStorage();
      const defaultPair = await getSelectedPairFromStorage();
      const defaultCollectedFields = await getCollectedFieldsFromStorage();

      root.render(
        <ChakraProvider>
          <Popup
            defaultUser={defaultUser}
            defaultPair={defaultPair}
            defaultCollectedFields={defaultCollectedFields}
          />
        </ChakraProvider>
      );
    } else {
      root.render(
        <div className="tailwind">
          <NonTradingView />
        </div>
      );
    }
  });
}

init();
