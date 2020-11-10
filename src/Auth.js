import React, { useEffect, useState } from "react";
import firebase from "./Firebase";
import { withRouter, Redirect } from "react-router";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const [pending, setPending] = useState(true);

  useEffect(() => {
    // firebase.auth().signOut();

    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user !== null) {
        if (user.email === "team@lassoshare.com") {
          setCurrentUser(user);
        } else {
          setCurrentUser(null);
          alert("that's not an Admin Acc!");
        }
      }
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
