import {
  getFieldValuesInModal,
  getOverviewValues,
  goatFatherTitle,
  updateFieldsValuesInModal,
} from "./utils";
import "./jqueryExtend";

chrome.runtime.onMessage.addListener(async (msg, sender, response) => {
  if (msg.from === "popup" && msg.subject === "IsGoatfatherSettingsOpen") {
    response($(goatFatherTitle).length > 0);
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
});
