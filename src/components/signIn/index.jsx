import React from "react";

import { useFormik } from "formik";

import { useSelector, useDispatch } from "react-redux";

import { auth } from "../../firebaseConfig"

const SignIn = () => {
    const dispatch = useDispatch();
    
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

      
    
}