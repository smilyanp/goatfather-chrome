import { useEffect, useState } from "react";
import { sendTabMessage } from "../utils";

export const useIsGoatfatherOpen = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    sendTabMessage("IsGoatfatherSettingsOpen", (response) => {
      setIsSettingsOpen(response);
    });
  }, []);

  return isSettingsOpen;
};
