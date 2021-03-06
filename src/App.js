import React from "react";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Login from "./views/Login";
// import AdminLayout from "layouts/Admin.jsx";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import Admin from "./layouts/Admin";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Admin} />
          <Route
            path="/login"
            render={(props) => {
              // console.log(currentUser);
              var cond = true;
              if (cond) {
                return <Login />;
              } else {
                return <Redirect from="/" to="/admin/dashboard" />;
              }
            }}
          />

          {/* <Route path="/admin/" render={(props) => <Admin {...props} />} /> */}
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
