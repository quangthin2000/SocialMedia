import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getNotify, logout } from "../../redux/action";
import CustomDropdown from "../CustomDropdown";
import Notify from "../Notify";

function Header(props) {
  const [isNotifyOpen, setNotifyOpen] = useState(null);
  const openNotify = Boolean(isNotifyOpen);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch();
  const { infoUser, notifies } = useSelector((state) => state.reducer);

  useEffect(() => {
    if (infoUser) {
      dispatch(getNotify());
    }
  }, [infoUser, dispatch]);

  const listDataNotRead = useMemo(() => {
    const data = notifies.filter((item) => item.isRead === false);
    if (data.length > 0) return data.length;
    return 0;
  }, [notifies]);

  const handleShowMenuAuth = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotifyOpen = (event) => {
    setNotifyOpen(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
  };

  const listMenu = [
    {
      title: "Profile",
      event: handleMenuClose,
    },
    {
      title: "Account",
      event: handleMenuClose,
    },
    {
      title: "Logout",
      event: handleLogout,
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Link style={{ color: "white", textDecoration: "none" }} to={"/"}>
              PROJECT
            </Link>
          </Typography>
          <Button
            color="inherit"
            size="large"
            sx={{ marginLeft: 3, fontWeight: "bold" }}
          >
            <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
              Home
            </Link>
          </Button>
          <Button
            color="inherit"
            size="large"
            sx={{ marginLeft: 3, fontWeight: "bold" }}
          >
            <Link
              to={"/post"}
              style={{ textDecoration: "none", color: "white" }}
            >
              Post
            </Link>
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          {infoUser.fullName ? (
            <>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <Badge badgeContent={4} color="error">
                    <MailIcon fontSize="large" />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                  aria-controls={openNotify ? "menu-notify" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openNotify ? "true" : undefined}
                  onClick={handleNotifyOpen}
                  id="menu-notify"
                >
                  <Badge badgeContent={listDataNotRead} color="error">
                    <NotificationsIcon fontSize="large" />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls={open ? "menuAuth" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleShowMenuAuth}
                  color="inherit"
                >
                  <AccountCircle fontSize="large" />
                  <Typography style={{ marginLeft: 5, fontSize: 20 }}>
                    {infoUser.fullName}
                  </Typography>
                </IconButton>
              </Box>
            </>
          ) : (
            <>
              <Button color="inherit" sx={{ fontWeight: "bold" }}>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={"/login"}
                >
                  LOGIN
                </Link>
              </Button>
              <Button color="inherit" sx={{ fontWeight: "bold" }}>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={"/register"}
                >
                  REGISTER
                </Link>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <CustomDropdown
        id="menuAuth"
        open={open}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        listItem={listMenu}
      />
      <Notify
        id="menu-notify"
        open={openNotify}
        anchorEl={isNotifyOpen}
        setAnchorEl={setNotifyOpen}
        notifies={notifies}
      />
    </Box>
  );
}

export default Header;
