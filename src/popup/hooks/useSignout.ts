import { getAuth } from "firebase/auth";

export const useSignout = () => {
  const signout = () => {
    const auth = getAuth();
    auth.signOut().catch((error) => {
      console.log("error", error);
    });
  };

  return signout;
};
