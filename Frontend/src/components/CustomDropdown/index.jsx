import { Menu, MenuItem } from "@mui/material";
import React from "react";

function CustomDropdown({ id, open, anchorEl, setAnchorEl, listItem }) {
  return (
    <Menu
      sx={{ marginTop: "50px" }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
    >
      {listItem.map((element, index) => (
        <MenuItem key={index} onClick={element.event}>
          {element.title}
        </MenuItem>
      ))}
    </Menu>
  );
}

export default CustomDropdown;
