import React, { useContext } from "react";
import { firebaseAuth } from "provider/AuthProvider";
import { authMethods } from "authmethods";

const Signup = () => {
  const { handleSignup, inputs, setInputs } = useContext(firebaseAuth);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      Signup
      <input
        onChange={handleChange}
        name="email"
        placeholder="email"
        value={inputs.email}
      />
      <input
        onChange={handleChange}
        name="password"
        placeholder="password"
        value={inputs.password}
      />
      <button>signup</button>
    </form>
  );
};

export default Signup;
