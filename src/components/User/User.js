import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

// firebase imports
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// material-ui
import Grid from "@mui/material/Grid";

// project imports
import AuthLogin from "./AuthLogin";
import ProfileSection from "./ProfileSection";

const User = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  //const { setUser } = useContext(AuthContext);
  const signInWithGoogle = () => {
    /*
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        if (user && setUser) {
          setUser(user);
          //    navigate("/");
        }

        // ...
      })
      .catch((error) => {
        console.log(error);
      });
      */
  };
  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user) {
          console.log(userCredential);
          navigate("/");
        }

        // ...
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loginWithEmailAndPassword = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response.email);
        sessionStorage.setItem(
          "Auth Token",
          response._tokenResponse.refreshToken
        );

        console.log(email);
        console.log(user);
        //console.log(UserState);
        /*
        const user = userCredential.email;  
        if (user && setUser) {
          setUser(user);
  }
 */
      })

      .catch((err) => {
        console.log(err);
      });
  };
  const handleLogout = () => {
    auth.signOut();
  };
  /*
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);
*/
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <AuthLogin
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            loginWithEmailAndPassword={loginWithEmailAndPassword}
            signInWithGoogle={signInWithGoogle}
            signUp={signUp}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default User;
