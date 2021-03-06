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
import Dashboard from "views/Dashboard.jsx";

import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
// import SignIn from "views/SignIn";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin",
  },

  {
    path: "/list",
    name: "Users List",
    icon: "pe-7s-note2",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/social",
    name: "Social Links",
    icon: "pe-7s-news-paper",
    component: Typography,
    layout: "/admin",
  },
];

export default dashboardRoutes;
