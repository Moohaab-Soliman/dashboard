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
        history.push("/admin/dashboard");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const currentUser = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <center>
        <h1></h1>
      </center>

      <form onSubmit={handleLogin}>
        <div className="container">
          <label>Email</label>
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
          <label>Password</label>
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
                backgroundColor: "#4caf50",
                width: "50%",
                color: "Black",
                padding: "15px",
                margin: "10px 0px",
                border: "none",
                cursor: "pointer",
              }}
              type="submit"
            >
              Log in
            </button>
          </center>
        </div>
      </form>
    </div>
  );
};

export default withRouter(Login);
