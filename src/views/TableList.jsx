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
import { thArray } from "variables/Variables.jsx";

class TableList extends Component {
  state = {
    docData: [],
    search: "",
  };

  componentDidMount() {
    this.handleData();
  }

  handleData = () => {
    const db = firebase.firestore();
    let docData = [];
    db.collection("profile")
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
      .collection("profile")
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
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { docData, search } = this.state;
    const filterd =
      docData && search
        ? docData.filter((data) => data.username === search)
        : docData;
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
                  <>
                    <input
                      style={{
                        marginLeft: "1%",
                        width: " 200px",
                        marginRight: "3%",
                      }}
                      type="text"
                      name="search"
                      placeholder="Enter user name to search"
                      onChange={(e) => this.onChange(e)}
                    ></input>

                    <Table striped hover>
                      <thead>
                        <tr>
                          {thArray.map((prop, key) => {
                            return <th key={key}>{prop}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {console.log(
                          filterd.filter((c) => c.username === "abdul")
                        )}
                        {filterd.map((prop, key) => {
                          return (
                            <tr key={key}>
                              <td>{prop.username}</td>
                              <td>{prop.displayName}</td>
                              <td>{prop.email}</td>
                              <td>{prop.location}</td>
                              <td>{prop.nOfTabs}</td>
                              <td>
                                <Button
                                  onClick={() => this.handleDelete(prop.uid)}
                                >
                                  X
                                </Button>
                                <Button
                                  href={
                                    "https://lasso.vercel.app/" + prop.username
                                  }
                                  target="_Blank"
                                >
                                  View user
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </>
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
