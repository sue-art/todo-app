import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { userContext } from "../../pages/userContext";

const AuthRegister = () => {
  const [userName, setUserName] = useContext(userContext);

  const auth = getAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [variant, setVariant] = useState("");
  const [formerrors, setFormErrors] = useState("");

  const handleFocus = (event) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
    validate();
  };
  const handleChange = (event) => {
    event.preventDefault();

    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const validate = () => {
    //email field validation
    console.log(values);

    if (values.email) {
      setErrors((errors) => ({
        ...errors,
        email: false,
      }));
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      setErrors((errors) => ({
        ...errors,
        email: "Email address is invalid",
      }));
    } else {
      setErrors((errors) => ({
        ...errors,
        email: "Empty field!",
      }));
    }

    //password field validation
    if (values.password) {
      setErrors((errors) => ({
        ...errors,
        password: false,
      }));
    } else {
      setErrors((errors) => ({
        ...errors,
        password: "Empty field!",
      }));
    }
  };
  const hideAlert = (event) => {
    setShowMessage(false);
    setErrorMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validate();
    if (!values.email || !values.password) {
    } else {
      signUp();
    }
  };

  const signUp = () => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((result) => {
        const user = result.user;
        if (user) {
          setUserName(user.email);
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
        const errorMessage = err.message.split(": ")[1].trim();
        setVariant("danger");
        if (errorMessage == "Error (auth/wrong-password).") {
          setErrorMessage(
            "Your username and password does not match, please try again."
          );
        } else {
          setErrorMessage(errorMessage);
        }
      });
  };

  return (
    <div>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Card
          variant="outlined"
          sx={{
            mb: 2,
            p: 3,
            bgcolor: "background.white",
            borderRadius: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {" "}
          <Avatar
            sx={{
              m: 1,
              bgcolor: "secondary.main",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <CardHeader title="Sing Up" />
          <CardContent sx={{ "& .MuiTextField-root": { mb: 2 } }}>
            {errorMessage && (
              <Alert
                key={variant}
                fullWidth
                variant="alert-danger"
                className="alert-danger"
                sx={{ mb: 2 }}
              >
                {errorMessage && <p className="">{errorMessage}</p>}
                <Button onClick={hideAlert}>Close this alert</Button>
              </Alert>
            )}
            <Grid container spacing={2} columns={12}>
              <Grid item xs={12}>
                <TextField
                  id="filled-basic-id"
                  label="Email"
                  value={values.email}
                  onFocus={handleFocus}
                  onChange={handleChange}
                  placeholder
                  name="email"
                  fullWidth
                  error={errors.email ? true : false}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="filled-basic-pw"
                  label="Password"
                  value={values.password}
                  fullWidth
                  placeholder
                  name="password"
                  type="password"
                  onFocus={handleFocus}
                  onChange={handleChange}
                  error={errors.password ? true : false}
                  helperText={errors.password}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container justifyContent="flex-end">
              <Button
                type="submit"
                sx={{ ml: 1 }}
                variant="contained"
                disableElevation
              >
                Sign up
              </Button>
            </Grid>
          </CardActions>
        </Card>
        <Typography sx={{ pl: 1 }}>Already a member?</Typography>
        <Button color="primary">
          <Link to="/login">Login</Link>
        </Button>
      </Box>
    </div>
  );
};

export default AuthRegister;
