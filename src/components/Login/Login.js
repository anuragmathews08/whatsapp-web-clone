import React from "react";
import classes from "./Login.module.css";

import { Button } from "@material-ui/core";
import { auth, provider } from "../../Firebase";
import { useStateValue } from "../../Store/StateProvider";
import { actionTypes } from "../../Store/Reducer/reducer";

const Login = () => {

  const [, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((response) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: response.user
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className={classes.login}>
      <div className={classes.login__container}>
        <img
          src="http://pngimg.com/uploads/whatsapp/whatsapp_PNG20.png"
          alt="WhatsApp Logo"
        />
        <div className={classes.login__text}>
          <h1>Sign in to WhatsApp</h1>
        </div>

        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </div>
  );
};

export default Login;
