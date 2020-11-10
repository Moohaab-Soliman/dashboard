import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";

import Admin from "./layouts/Admin";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const currentUser = useContext(AuthContext);

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
