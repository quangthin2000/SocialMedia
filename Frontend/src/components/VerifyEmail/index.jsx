import EmailIcon from "@mui/icons-material/Email";
import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function VerifyEmail(props) {
  const { emailVerify } = useSelector((state) => state.reducer);

  return (
    <Container>
      <Box sx={{ margin: "auto", textAlign: "center" }}>
        <Box sx={{ background: "#cfe8fc" }}>
          <EmailIcon sx={{ fontSize: "200px" }} />
        </Box>
        <Box>
          <Typography variant="h2" sx={{ fontWeight: "bold" }}>
            Verify your email address
          </Typography>
          <Typography variant="p">
            We are sent an email to <b>{emailVerify}</b> to verify your email
            address and active your account. The link in the email will expire
            in 24 hours.
          </Typography>
          <Typography>
            <br />
            <Link to={"/register"}>Click here</Link> if you did not received an
            email or would like to change the email address your signed up with
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default VerifyEmail;
