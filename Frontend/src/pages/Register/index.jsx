import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Button, Grid, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import Copyright from "../../components/Copyright";
import CustomField from "../../components/CustomField";
import { register } from "../../redux/action";
import { registerField } from "../../utils/constant";
import "./style.scss";

function Register(props) {
  const dispatch = useDispatch();

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validateSchema = Yup.object().shape({
    fullName: Yup.string().required("This field is required"),
    email: Yup.string()
      .required("This field is required")
      .email("Invalid Email"),
    password: Yup.string().required("This field is required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  const handleRegister = (values) => {
    dispatch(register(values));
  };

  return (
    <section className="register">
      <Box className="register__container">
        <Box>
          <Avatar sx={{ m: "1px auto", bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validateSchema}
          onSubmit={handleRegister}
        >
          <Form>
            {registerField.map((element) => (
              <CustomField
                key={element.id}
                name={element.name}
                label={element.label}
                placeholder={element.placeholder}
                type={element.type}
              />
            ))}

            <Button
              type="submit"
              variant="contained"
              sx={{ margin: "4px 0", width: "100%" }}
            >
              Register
            </Button>
            <Grid container sx={{ marginTop: 2 }}>
              <Grid item xs sx={{ textAlign: "left" }} />
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Have account? Login"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Form>
        </Formik>
      </Box>
    </section>
  );
}

export default Register;
