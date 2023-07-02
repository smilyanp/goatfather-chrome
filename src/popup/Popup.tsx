import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { Box, Button, Heading } from "@chakra-ui/react";

import { doc, setDoc, getFirestore } from "firebase/firestore";

import firebaseConfig from "./firebase.config";
import { useOnAuthChange } from "./hooks/useOnAuthChange";
import { Field } from "../types/fields";
import Login from "./components/Login";

// Connect to firebase
const firebaseApp = initializeApp(firebaseConfig);

const sendTabMessage = (subject: string, callback: any) => {
  const queryOptions = { active: true, currentWindow: true };
  chrome.tabs.query(queryOptions).then((tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { from: "popup", subject }, callback);
  });
};

const useGetFields = () => {
  const [fields, setFields] = useState<Field[] | []>([]);

  useEffect(() => {
    sendTabMessage("GetPairSettings", (response) => {
      console.log("** response from send message", response);
      setFields(response as Field[]);
    });
  }, []);

  return fields;
};

function Popup() {
  const user = useOnAuthChange();
  const fields = useGetFields();

  const handleSaveFields = async (fields: Field[], pair: string) => {
    const db = getFirestore(firebaseApp);

    const fieldsObj = fields.reduce((acc, field) => {
      return { ...acc, [field.name]: field.value };
    }, {});
    await setDoc(doc(db, "pairSettings", pair), fieldsObj);
  };

  const handlePopulateFields = async (pair: string) => {
    sendTabMessage("PopulatePairSettings", (response) => {
      console.log("** response from send message", response);
    });
  };

  if (!!user) {
    return (
      <Box minWidth={400} minHeight={800} padding={10}>
        <Heading marginBottom={5}>Current pair:</Heading>
        <Box marginBottom={5}>
          <Button onClick={() => handlePopulateFields("USDJPY")}>
            Populate settings
          </Button>
        </Box>
        <Box marginBottom={5}>
          <Button onClick={() => handleSaveFields(fields, "USDJPY")}>
            Save below settings
          </Button>
        </Box>
        <Fields fields={fields} />
      </Box>
    );
  }
  return <Login />;
}

const Fields = ({ fields }: { fields: Field[] | [] | undefined }) => {
  return (
    <Box padding={[0, 10]}>
      {fields &&
        fields.length > 0 &&
        fields.map((field) => (
          <div key={field.name + "-" + field.value} className="p-4">
            <b>{field.name}</b>: {field.value}
          </div>
        ))}
    </Box>
  );
};

export default Popup;
