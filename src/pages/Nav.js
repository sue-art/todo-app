import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { styled } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { Button } from "@mui/material";
import Box from "@mui/material/Box";

import { userContext } from "./userContext";

const useStyles = styled((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const Nav = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userName, setUserName] = useContext(userContext);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const handleLogout = () => {
    setUserName(null);
    navigate("/login");
  };
  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar variant="dense">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              To do List
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {userName && userName.length !== 0 ? (
                <Typography sx={{ color: "white" }}>
                  Welcome: {userName}
                </Typography>
              ) : (
                <Button>
                  <Link sx={{ my: 2, color: "white" }} to="/login">
                    Login
                  </Link>
                </Button>
              )}
              {userName && userName.length !== 0 ? (
                <Button onClick={handleLogout}>
                  <Link to="/register">Log out</Link>
                </Button>
              ) : (
                <Button>
                  <Link to="/register">Sign Up</Link>
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
};

export default Nav;
