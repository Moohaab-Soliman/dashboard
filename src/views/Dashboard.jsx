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
import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import firebase from "../Firebase";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar,
} from "variables/Variables.jsx";

class Dashboard extends Component {
  state = {
    docData: [],
    socialData: [],
    totalNumofTabs: 0,
  };
  componentDidMount() {
    this.handleUserData();
    this.handleSocialData();
  }

  getTotalNum = () => {
    var num = 0;
    this.state.docData.map((data) => {
      if (data.nOfTabs !== undefined) {
        num = num + data.nOfTabs;
      }
    });

    this.setState({ totalNumofTabs: num });
    console.log("test", num);
  };
  handleUserData = () => {
    const db = firebase.firestore();
    let docData = [];
    db.collection("profile")
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          docData.push(doc.data());

          this.setState({ docData });
        });
        this.getTotalNum();
      });
  };

  handleSocialData = () => {
    const db = firebase.firestore();
    let socialData = [];
    db.collection("socialLinks")
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          socialData.push(doc.data());

          this.setState({ socialData });
        });
      });
  };

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-server text-warning" />}
                statsText="Total Users"
                statsValue={this.state.docData.length}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-success" />}
                statsText="Total Tabs"
                statsValue={this.state.totalNumofTabs}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-graph1 text-danger" />}
                statsText="Number Of Social Links"
                statsValue={this.state.socialData.length}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            {/* <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-twitter text-info" />}
                statsText="Followers"
                statsValue="+45"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col> */}
          </Row>
          <Row>
            <Col md={8}></Col>
            <Col md={4}></Col>
          </Row>

          <Row>
            <Col md={6}></Col>

            <Col md={6}></Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
