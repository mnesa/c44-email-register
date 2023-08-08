/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../../firebase/firebase.init";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const Login = () => {
  const [success, setSuccess] = useState(false);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setSuccess(false);

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setSuccess(true);
        form.reset();
      })
      .catch((error) => {
        console.log("error", error);
      });

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setSuccess(true);
        form.reset();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div className="register">
      <form onSubmit={handleOnSubmit} className="shadow mt-5">
        <h5>Please Login Here</h5>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email please"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <p>
          New User in Website<Link to="/register"> Please Register</Link>
        </p>

        <button type="submit" className="btn btn-primary">
          Login
        </button>

        {success && <p className="text-success">Login successfully Done</p>}
      </form>
    </div>
  );
};

export default Login;
