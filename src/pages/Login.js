import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// material-ui
import Grid from "@mui/material/Grid";

// project imports
import AuthLogin from "../components/User/AuthLogin";
import { userContext } from "./userContext";

const Login = () => {
  const [userName] = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userName && userName.length !== 0) navigate("/dashboard");
  }, [userName, navigate]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <AuthLogin />
      </Grid>
    </Grid>
  );
};

export default Login;
