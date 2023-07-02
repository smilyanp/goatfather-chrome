import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

export const useOnAuthChange = (): null | User => {
  const [user, setUser] = useState<null | User>(null);

  useEffect(() => {
    const auth = getAuth();

    // Check if the user is logged in
    onAuthStateChanged(auth, (firebaseUser: User | null) => {
      if (!user) {
        setUser(firebaseUser);
      }
    });
  }, [user]);

  return user;
};
