import React from "react";

import { useFormik } from "formik";

import { useSelector, useDispatch } from "react-redux";

import { auth } from "../../firebaseConfig";

const SignIn = () => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state) => state.user.isSignedIn);
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid Email Format";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      resetForm();
      if (!isSignedIn) {
        auth
          .signInWithEmailAndPassword(values.email, values.password)
          .then(() => {
            dispatch({ type: "signIn" });
          });
        setSubmitting(false);
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
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

export default SignIn;
