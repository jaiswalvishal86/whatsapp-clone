import React from "react";
import "../css/Welcome.css";
import { Button } from "@material-ui/core";
import Add from "@material-ui/icons/Add";

function Welcome() {
  return (
    <div className="welcome">
      <div className="welcome__container">
        <h2>Welcome to Whatsapp Clone!</h2>
        <p>
          Use the sidebar to chat in a particular room or
          add a new chat.
        </p>
        <Button>
          <Add />
        </Button>
      </div>
    </div>
  );
}

export default Welcome;
