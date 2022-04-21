import { Typography } from "@mui/material";
import React from "react";

function Copyright(props) {
  return (
    <section>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        Your Website
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </section>
  );
}

export default Copyright;
