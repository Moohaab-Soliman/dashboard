import React, { useEffect, useState } from "react";
import firebase from "./Firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const [pending, setPending] = useState(true);

  useEffect(() => {
    firebase.auth().signOut();

    firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);

      setPending(false);
    });
  }, []);
  console.log(children);
  if (pending) {
    return <>Loading...</>;
  }

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};
