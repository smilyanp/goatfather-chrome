import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { setLoggedInUserInStorage } from "../storage";

export const useOnAuthChange = (
  defaultUser: undefined | null | User
): User | null => {
  const [updatedUser, setUpdatedUser] = useState<undefined | null | User>(
    defaultUser
  );
  useEffect(() => {
    const auth = getAuth();

    // Check if the user is logged in
    onAuthStateChanged(auth, (firebaseUser: User | null) => {
      setUpdatedUser(firebaseUser);
      setLoggedInUserInStorage(firebaseUser);
    });
  }, []);

  return updatedUser;
};
