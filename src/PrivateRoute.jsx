import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";

import Admin from "./layouts/Admin";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  console.log("I am hereeee");
  const currentUser = useContext(AuthContext);
  {
    console.log(currentUser);
  }
  return !!currentUser ? (
    <>
      <Redirect to="/admin/dashboard" />
      <Route path="/admin/" render={(props) => <Admin {...props} />} />
    </>
  ) : (
    <>
      <Redirect to={"/login"} />
    </>
  );
};

export default PrivateRoute;
