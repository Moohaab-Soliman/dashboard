import React, { Component, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import firebase from "../Firebase";

class ModalNew extends Component {
  state = {
    show: false,
    colored: "",
    isMinimal: "",
    imgMinLink: "",
    imgColorLink: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    console.log(e.target.value);
  };

  handleChange = (e, myText) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (myText === "colored") {
      if (e.target.files[0]) {
        console.log("heey");
        const colored = e.target.files[0];
        this.setState(() => ({ colored }));
        this.handleUpload(e, colored, myText);
      }
    } else {
      if (e.target.files[0]) {
        console.log("heey12");

        const isMinimal = e.target.files[0];
        this.setState(() => ({ isMinimal }));

        this.handleUpload(e, isMinimal, myText);
      }
    }
  };

  submitData = (e) => {
    e.preventDefault();
    let r = Math.random().toString(36).substring(7);

    firebase
      .firestore()
      .collection("socialLinks")
      .doc(r)
      .set({
        name: this.state.name,
        img: this.state.imgColorLink,
        imgMinimal: this.state.imgMinLink,
        id: r,
        link: this.state.link,
      })
      .then(() => {});
  };

  handleUpload = (e, ourImg, imageType) => {
    e.preventDefault();

    const storage = firebase.storage();

    console.log(ourImg);
    storage
      .ref()
      .child(imageType + "/" + ourImg.name)
      .put(ourImg)
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          if (imageType == "colored") {
            this.setState({ imgColorLink: url });
          } else if (imageType == "isMinimal") {
            this.setState({ imgMinLink: url });
          }
        });
      });
  };
  render() {
    const { prop } = this.props;

    return (
      <>
        <Button
          variant="primary"
          style={{ marginLeft: "1%" }}
          onClick={this.showModal}
        >
          Add
        </Button>

        <Modal show={this.state.show} onHide={this.hideModal} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form id="myForm" onSubmit={(e) => this.submitData(e)}>
              <span className="label other">name</span>
              <input
                type="text"
                name="name"
                placeholder=""
                onChange={(e) => this.onChange(e)}
              ></input>
              <br />
              <br />
              <span className="label other">link</span>
              <input
                type="text"
                name="link"
                placeholder=""
                onChange={(e) => this.onChange(e)}
              ></input>
              <br />
              <br />
              <>
                <span className="label other">Colorfull Img</span>
                <input
                  type="file"
                  name="colored"
                  onChange={(e) => this.handleChange(e, "colored")}
                />
              </>
              <br />
              <br />
              <span className="label other">Minimal Img</span>
              <input
                type="file"
                name="isMinimal"
                onChange={(e) => this.handleChange(e, "isMinimal")}
              />

              <br />
              <br />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideModal}>
              Close
            </Button>
            <Button variant="primary" type="submit" form="myForm">
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
}

export default ModalNew;
