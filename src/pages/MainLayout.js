import React, { useState } from "react";
import { Outlet } from "react-router-dom";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import { AppBar, Box } from "@mui/material";

// project imports
import { app } from "../config/firebase";

import Nav from "./Nav";

import { userContext } from "./userContext";

// styles
const Main = styled("div")(({ theme, open }) => ({
  ...theme.typography.mainContent,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  transition: theme.transitions.create(
    "margin",
    open
      ? {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }
      : {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }
  ),
}));

// ==============================|| MAIN LAYOUT ||============================== //
/**
 *
 */
const MainLayout = () => {
  const theme = useTheme();
  const [userName, setUserName] = useState([]);
  return (
    <div>
      <userContext.Provider value={[userName, setUserName]}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          sx={{}}
        >
          {/* header */}
          <AppBar
            enableColorOnDark
            position="fixed"
            color="inherit"
            elevation={0}
            sx={{
              bgcolor: theme.palette.background.default,
            }}
          >
            <Nav />
          </AppBar>
          {/* main content */}
          <Main
            theme={theme}
            sx={{
              pt: 10,
              bgcolor: theme.palette.white,
            }}
          >
            <Outlet />
          </Main>
        </Box>
      </userContext.Provider>
    </div>
  );
};

export default MainLayout;
