/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./Register.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import app from "../../firebase/firebase.init";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const Register = () => {
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setSuccess(false);

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    console.log(name, email, password);

    if (!/(?=.*?[A-Z]).*[A-Z]/.test(password)) {
      setPasswordError("please provide at least two Uppercase");
    }
    if (password.length < 6) {
      setPasswordError("please should be 6 character");
    }
    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setPasswordError("please provide a a special characters");
    }
    setPasswordError("");

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setSuccess(true);
        form.reset();
        // verify email
        verifyEmail();
        // update user
        updateUserName(name);
      })
      .catch((error) => {
        console.log("error", error);
        setPasswordError(error.message);
      });
    const verifyEmail = () => {
      sendEmailVerification(auth.currentUser).then(() => {
        alert("Please check your email and verify it");
      });
    };

    const updateUserName = (name) => {
      updateProfile(auth.currentUser, {
        displayName: name,
      })
        .then(() => {
          console.log("User successfully update");
        })
        .catch((error) => console.log(error));
    };
  };

  return (
    <div className="register">
      <form onSubmit={handleOnSubmit} className="shadow mt-5">
        <h5>Please Register Here</h5>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name please"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
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
          Already Register<Link to="/login">Please Login</Link>
        </p>
        <button type="submit" className="btn btn-primary">
          Register
        </button>

        <p className="text-danger">{passwordError}</p>
        {success && <p className="text-success">Register successfully Done</p>}
      </form>
    </div>
  );
};

export default Register;
