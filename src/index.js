/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
import Login from "./views/Login";
import { AuthProvider } from "./Auth";
import AdminLayout from "layouts/Admin.jsx";
import Admin from "layouts/Admin.jsx";
import PrivateRoute from "./PrivateRoute";

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <Switch>
        <Route
          path="/login"
          render={(props) => {
            var cond = true;
            if (cond) {
              return <Login />;
            } else {
              return <Redirect from="/" to="/admin/dashboard" />;
            }
          }}
        />

        <Route path="/admin" render={(props) => <Admin {...props} />} />
      </Switch>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById("root")
);
