import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import AdminLayout from "layouts/Admin.jsx";
import Admin from "./layouts/Admin";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  console.log("I am hereeee");
  const { currentUser } = useContext(AuthContext);

  return !!currentUser ? (
    <>
      {console.log(currentUser)}
      <Route path="/admin/" render={(props) => <Admin {...props} />} />
    </>
  ) : (
    <>
      {console.log(currentUser)}

      <Redirect to={"/login"} />
    </>
  );
};

export default PrivateRoute;