import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Alert from "@mui/material/Alert";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";

import { userContext } from "../../pages/userContext";

// firebase imports
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

const AuthLogin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [userName, setUserName] = useContext(userContext);

  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [variant, setVariant] = useState("");

  const handleFocus = (event) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
    validate();
  };

  //this method handles the each form field changing and updates the relevant
  //state value for that input
  const handleChange = (event) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));

    validate();
  };

  //the rules for each field
  const validate = () => {
    //email field validation
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
      console.log("field reqired");
      return false;
    } else {
      loginWithEmailAndPassword();
    }
  };
  const loginWithEmailAndPassword = async () => {
    await signInWithEmailAndPassword(auth, values.email, values.password)
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

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        if (user) {
          setUserName(user.email);
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {}, []);

  return (
    <div>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Card
          variant="outlined"
          sx={{ mb: 2, p: 3, bgcolor: "background.white", borderRadius: 5 }}
        >
          <CardHeader title="Login" />
          <CardContent sx={{ "& .MuiTextField-root": { mb: 2 } }}>
            <p></p>
            {errorMessage && (
              <Alert
                key={variant}
                variant="alert-danger"
                className="alert-danger"
                sx={{ mb: 2 }}
              >
                {errorMessage && <p className="">{errorMessage}</p>}
                <Button onClick={hideAlert}>Close this alert</Button>
              </Alert>
            )}

            <TextField
              id="emailfilled"
              label="Email"
              onFocus={handleFocus}
              onChange={handleChange}
              name="email"
              fullWidth
              error={errors.email ? true : false}
              helperText={errors.email}
            />

            <TextField
              id="passwordfilled"
              label="Password"
              fullWidth
              name="password"
              type="password"
              onFocus={handleFocus}
              onChange={handleChange}
              error={errors.password ? true : false}
              helperText={errors.password}
            />
          </CardContent>

          <CardActions>
            <Button variant="text" type="submit">
              Login
            </Button>
            <Button variant="text" onClick={signInWithGoogle}>
              Login with Google
            </Button>
          </CardActions>
        </Card>
      </Box>
      <Typography sx={{ mb: 2, pl: 1, color: "white" }}>
        You don't have an account?
      </Typography>
      <Button color="primary">
        <Link to="/register">Sign up</Link>
      </Button>
    </div>
  );
};

export default AuthLogin;
