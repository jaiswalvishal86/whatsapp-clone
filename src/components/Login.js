import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import "../css/Login.css";
import { auth, provider } from "../firebase";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";

function Login() {
  // eslint-disable-next-line
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      dispatch({
        type: actionTypes.SET_USER,
        user: user,
      });
    });
  }, [dispatch]);

  const signin = () => {
    auth
      .signInWithPopup(provider)
      .then((response) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: response.user,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div>
      <div className="login">
        <div className="login__container">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="whatsapp logo"
          />
          <div className="login__text">
            <h2>Sign in to WhatsApp</h2>
          </div>
          <Button onClick={signin}>
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
