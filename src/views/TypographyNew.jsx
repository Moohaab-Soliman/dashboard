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
import { Grid, Row, Col, Table, Button } from "react-bootstrap";
import firebase from "../Firebase";
import Card from "components/Card/Card.jsx";
import Modall from "./Modall";

class TableList extends Component {
  state = {
    docData: [],
  };

  componentDidMount() {
    this.handleData();
  }

  handleData = () => {
    const db = firebase.firestore();
    let docData = [];
    db.collection("socialLinks")
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          docData.push(doc.data());

          this.setState({ docData });
        });
      });
  };

  handleDelete = (userId) => {
    firebase
      .firestore()
      .collection("socialLinks")
      .doc(userId)
      .delete()
      .then(() => {
        var docData = this.state.docData.filter((doc) => {
          return doc.uid !== userId;
        });
        console.log(docData);
        this.setState({
          docData,
        });
      });
  };
  render() {
    const thArray = ["Name", "Minimal Icons", "Colorfull icons", "Tools"];

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Users List"
                category="Here is a subtitle for this table"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.docData.map((prop, key) => {
                        return (
                          <tr key={key}>
                            <td>{prop.name}</td>
                            <td>
                              <img width="40px" src={prop.imgMinimal} />
                            </td>
                            <td>
                              <img width="40px" src={prop.img} />
                            </td>
                            <td>
                              <Button
                                variant="danger"
                                onClick={() => this.handleDelete(prop.id)}
                              >
                                X
                              </Button>
                              <Modall prop={prop} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col>

            {/* <Col md={12}>
              <Card
                plain
                title="Striped Table with Hover"
                category="Here is a subtitle for this table"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table hover>
                    <thead>
                      <tr>
                        {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {tdArray.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.map((prop, key) => {
                              return <td key={key}>{prop}</td>;
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col> */}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default TableList;
