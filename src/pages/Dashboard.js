import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// material-ui
import Grid from "@mui/material/Grid";

// project imports
import { userContext } from "./userContext";
import Todo from "../components/Todo/Todo";
import ProfileSection from "../components/User/ProfileSection";

const Dashboard = () => {
  const [userName] = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userName.length === 0) navigate("/login");
  }, [userName, navigate]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <ProfileSection />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Todo />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
