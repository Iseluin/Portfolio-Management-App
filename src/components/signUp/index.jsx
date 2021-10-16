import React from "react";

import { useFormik } from "formik";

import { useSelector, useDispatch } from "react-redux";

import { auth } from "../../firebaseConfig";
import { removeOneProp, setUserDocument } from "../utils/helpers";

const SignUp = () => {
  const dispatch = useDispatch();
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid Email Format";
    }
    if (!values.firstName) {
      errors.firstName = "Required";
    } else if (values.firstName.length > 15) {
      errors.firstName = "Must be 15 characters or less";
    }
    if (!values.lastName) {
      errors.lastName = "Required";
    } else if (values.lastName.length > 20) {
      errors.lastName = "Must be 20 characters or less";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    if (!values.repeatedPassword) {
      errors.repeatedPassword = "Required";
    } else if (values.repeatedPassword !== values.password) {
      errors.repeatedPassword = "Passwords do not match";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      funds: 10000,
    },
    validate,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      resetForm();
      const objWithRepPassRemoved = removeOneProp(values, "repeatedPassword");
      auth
        .createUserWithEmailAndPassword(values.email, values.password)
        .then((userCred) => {
          setUserDocument(userCred.user.uid, objWithRepPassRemoved);
          console.log(userCred)
          return userCred;
        })
        .then((userCred) => {
          dispatch({ type: "SignUp" });
        })
      setSubmitting(false);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />
      {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}

      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />
      {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}

      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.errors.email ? <div>{formik.errors.email}</div> : null}

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <div className="error-msg">{formik.errors.password}</div>
      ) : null}

      <button type="submit">Submit</button>
    </form>
  );
};

export default SignUp;
