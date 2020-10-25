import React, { useCallback, useContext } from "react";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Login from "./views/Login";
import AdminLayout from "layouts/Admin.jsx";
import { AuthProvider, AuthContext } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import Admin from "./layouts/Admin";
import { fun } from "./deyw";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Route
            path="/login"
            render={(props) => {
              // console.log(currentUser);
              var cond = true;
              if (cond) {
                return <Login />;
              } else {
                return <Redirect from="/" to="/admin12/dashboard" />;
              }
            }}
          />

          <Route path="/admin/" render={(props) => <Admin {...props} />} />
          <PrivateRoute exact path="/" component={Admin} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
