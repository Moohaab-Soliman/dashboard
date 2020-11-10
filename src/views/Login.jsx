import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import firebase from "../Firebase";
import { AuthContext } from "../Auth.js";
import "./login.css";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const currentUser = useContext(AuthContext);
  if (currentUser !== null) {
    if (currentUser.email !== "team@lassoshare.com") {
      history.push("/login");
    } else {
      history.push("/admin/dashboard");
    }
  }

  return (
    <div>
      <center>
        <h1></h1>
      </center>

      <form onSubmit={handleLogin}>
        <div className="container">
          <label style={{ color: "white" }}>Email</label>
          <br />
          <center>
            <input
              name="email"
              type="textemail"
              placeholder="Email"
              autoComplete="true"
              required
            />
          </center>
          <br />
          <label style={{ color: "white" }}>Password</label>
          <br />
          <center>
            <input
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="true"
              required
            />
          </center>

          <center>
            <button
              style={{
                backgroundColor: "white",
                width: "50%",
                color: "Black",
                padding: "15px",
                margin: "10px 0px",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              type="submit"
            >
              LOGIN
            </button>
          </center>
        </div>
      </form>
    </div>
  );
};

export default withRouter(Login);
