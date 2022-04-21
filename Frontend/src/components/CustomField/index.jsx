import { TextField } from "@mui/material";
import { ErrorMessage, Field } from "formik";
import React from "react";
import "./style.scss";

function CustomField({ name, label, placeholder, type, disabled, prevEmail }) {
  return (
    <section className="field">
      <label className="field__label" htmlFor={name}>
        {label}
      </label>
      <Field name={name}>
        {({ field }) => (
          <TextField
            id={name}
            {...field}
            label={placeholder}
            variant="outlined"
            type={type}
            disabled={disabled ? true : false}
            className={prevEmail ? "field__active" : ""}
          />
        )}
      </Field>
      <div className="field__error">
        <ErrorMessage name={name} />
      </div>
    </section>
  );
}

export default CustomField;
