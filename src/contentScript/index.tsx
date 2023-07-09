import { goatFatherTitle, openGoatfatherSettings } from "./utils";
import "./jqueryExtend";
import { calibratePair } from "./calibration";
import { getFieldValuesInModal, getOverviewValues } from "./scrapeFields";
import { updateFieldsValuesInModal } from "./updateFields";

chrome.runtime.onMessage.addListener(async (msg, sender, response) => {
  if (msg.from === "popup" && msg.subject === "IsGoatfatherSettingsOpen") {
    if ($(goatFatherTitle).length > 0) {
      response(true);
    } else {
      // If the settings modal is not open, open it
      openGoatfatherSettings();
      response(true);
    }
  }
  if (msg.from === "popup" && msg.subject === "GetPairSettings") {
    const fields = await getFieldValuesInModal();
    const overview = await getOverviewValues();

    response({
      overview,
      fields,
    });
  }
  if (msg.from === "popup" && msg.subject === "PopulatePairSettings") {
    await updateFieldsValuesInModal(msg.data);
    response("done");
  }
  if (msg.from === "popup" && msg.subject === "Calibrate") {
    await calibratePair();
    response("done");
  }
});
