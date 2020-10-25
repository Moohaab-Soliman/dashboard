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
import ModalNew from "./ModalNew";

class TableList extends Component {
  state = {
    docData: [],
    name: "kspkspsspsp",
    link: "",
    colored: "",
    isMinimal: "",
    image: "",
    imgColorLink: "",
    imgMinLink: "",
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
          return doc.id !== userId;
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
  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state.name);
  }

  handleChange = (e, myText, prop) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (myText === "colored") {
      if (e.target.files[0]) {
        console.log("heey");
        const colored = e.target.files[0];
        this.setState(() => ({ colored }));
        this.handleUpload(e, prop, colored, myText);
      }
    } else {
      if (e.target.files[0]) {
        console.log("heey12");

        const isMinimal = e.target.files[0];
        this.setState(() => ({ isMinimal }));

        this.handleUpload(e, prop, isMinimal, myText);
      }
    }
  };

  submitData = (e, prop) => {
    e.preventDefault();

    console.log(this.state.name);
    console.log(prop.id);

    var myName = this.state.name === "" ? prop.name : this.state.name;
    var myLink = this.state.link === "" ? prop.link : this.state.link;
    var myColImg =
      this.state.imgColorLink === "" ? prop.img : this.state.imgColorLink;
    var myMinImg =
      this.state.imgMinLink === "" ? prop.imgMinimal : this.state.imgMinLink;

    firebase.firestore().collection("socialLinks").doc(prop.id).update({
      name: myName,
      img: myColImg,
      imgMinimal: myMinImg,
      id: prop.id,
      link: myLink,
    });
  };
  handleUpload = (e, prop, ourImg, imageType) => {
    console.log(prop);
    e.preventDefault();

    const storage = firebase.storage();

    console.log(ourImg);
    storage
      .ref()
      .child(imageType + "/" + ourImg.name)
      .put(ourImg)
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          if (imageType === "colored") {
            this.setState({ imgColorLink: url });
          } else if (imageType === "isMinimal") {
            this.setState({ imgMinLink: url });
          }
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
                title="Social Links Table"
                category="Here is a subtitle for this table"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <>
                    <ModalNew />
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
                                <img
                                  alt=""
                                  width="40px"
                                  src={prop.imgMinimal}
                                />
                              </td>
                              <td>
                                <img alt="" width="40px" src={prop.img} />
                              </td>
                              <td>
                                <Button
                                  variant="danger"
                                  onClick={() => this.handleDelete(prop.id)}
                                >
                                  X
                                </Button>
                                <Modall
                                  modalBody={
                                    <>
                                      <form
                                        id="myForm"
                                        onSubmit={(e) =>
                                          this.submitData(e, prop)
                                        }
                                      >
                                        <span className="label other">
                                          name
                                        </span>
                                        <input
                                          type="text"
                                          name="name"
                                          placeholder={prop.name}
                                          onChange={(e) => this.onChange(e)}
                                        ></input>
                                        <br />
                                        <br />
                                        <span className="label other">
                                          link
                                        </span>
                                        <input
                                          type="text"
                                          name="link"
                                          placeholder={prop.link}
                                          onChange={(e) => this.onChange(e)}
                                        ></input>
                                        <br />
                                        <br />

                                        <>
                                          <span className="label other">
                                            Colorfull Img
                                          </span>
                                          <input
                                            type="file"
                                            name="colored"
                                            onChange={(e) =>
                                              this.handleChange(
                                                e,
                                                "colored",
                                                prop
                                              )
                                            }
                                          />
                                        </>
                                        <br />
                                        <br />
                                        <span className="label other">
                                          Minimal Img
                                        </span>
                                        <input
                                          type="file"
                                          name="isMinimal"
                                          onChange={(e) =>
                                            this.handleChange(
                                              e,
                                              "isMinimal",
                                              prop
                                            )
                                          }
                                        />

                                        <br />
                                        <br />
                                      </form>
                                    </>
                                  }
                                  modalFooter={
                                    <Button
                                      variant="primary"
                                      type="submit"
                                      form="myForm"
                                    >
                                      Save Changes
                                    </Button>
                                  }
                                />
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
          </Row>
        </Grid>
      </div>
    );
  }
}

export default TableList;
