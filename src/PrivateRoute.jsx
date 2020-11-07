import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";

import Admin from "./layouts/Admin";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  console.log("I am hereeee");
  const currentUser = useContext(AuthContext);
  const admin = currentUser
    ? currentUser.providerData.map((c) => c.email === "mohab@m.com")
    : null;
  {
    // console.log(currentUser.providerData.map((c) => c.email));
  }
  // const getUserData = currentUser
  //   ? currentUser.providerData.map((c) => c.email === "mohab@m.com")
  //   : alert("that's not an admin account");

  // console.log(currentUser.providerData.map((c) => c.email));

  return !!currentUser ? (
    <Route path="/admin/" render={(props) => <Admin {...props} />} />
  ) : (
    <>
      <Redirect to={"/login"} />
    </>
  );
};

export default PrivateRoute;
