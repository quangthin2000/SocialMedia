import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import Copyright from "../../components/Copyright";
import CustomField from "../../components/CustomField";
import { login } from "../../redux/action";
import "./style.scss";

function Login(props) {
  const [remember, setRemember] = useState(false);
  const prevEmail = localStorage.getItem("prevEmail");

  const dispatch = useDispatch();

  const initialValues = {
    email: prevEmail || "",
    password: "",
  };
  const validateSchema = Yup.object().shape({
    email: Yup.string().required("Required!").email("Invalid Email!"),
    password: Yup.string().min(8, "Too Short!").required("Required!"),
  });

  const handleSubmitForm = (values) => {
    dispatch(
      login({
        ...values,
        checkRemember: remember,
      })
    );
  };

  return (
    <section className="login">
      <Box className="login__container">
        <Box>
          <Avatar sx={{ m: "1px auto", bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validateSchema}
          onSubmit={(values) => handleSubmitForm(values)}
        >
          <Form>
            <CustomField
              name="email"
              label="Email"
              placeholder="Enter your email..."
              type="text"
              prevEmail={prevEmail}
            />
            <CustomField
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password..."
            />
            <FormControlLabel
              sx={{ display: "flex", justifyItems: "start" }}
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  onChange={() => setRemember(!remember)}
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ margin: "4px 0", width: "100%" }}
            >
              Login
            </Button>
            <Grid container sx={{ marginTop: 2 }}>
              <Grid item xs sx={{ textAlign: "left" }}>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
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

export default Login;
