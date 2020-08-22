import React, { useState, useEffect, useRef } from "react";
import "../css/Chat.css";
import {
  Avatar,
  IconButton,
  Button,
} from "@material-ui/core";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import AttachFile from "@material-ui/icons/AttachFile";
import Add from "@material-ui/icons/Add";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import SendIcon from "@material-ui/icons/Send";
import { useParams, withRouter } from "react-router-dom";
import db from "../firebase";
import firebase from "firebase";
import { useStateValue } from "../StateProvider";
import Hamburger from "./Hamburger";

function Chat({ history }) {
  const [state, setState] = useState({
    initial: false,
    clicked: null,
    menuName: "Menu",
  });
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }] = useStateValue();
  let chatBody = useRef(null);

  useEffect(() => {
    if (roomId) {
      try {
        db.collection("rooms")
          .doc(roomId)
          .onSnapshot((snapshot) => {
            setRoomName(snapshot.data().name);
          });

        db.collection("rooms")
          .doc(roomId)
          .collection("messages")
          .orderBy("timestamp", "asc")
          .onSnapshot((snapshot) => {
            setMessages(
              snapshot.docs.map((doc) => doc.data())
            );
          });
      } catch (e) {
        alert(e.message);
      }
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  useEffect(() => {
    history.listen(() => {
      setState({
        clicked: false,
        menuName: "Menu",
      });
    });
  });

  const handleMenu = () => {
    if (state.initial === false) {
      setState({
        initial: null,
        clicked: true,
        menuName: "Close",
      });
    } else if (state.clicked === true) {
      setState({
        clicked: !state.clicked,
        menuName: "Menu",
      });
    } else if (state.clicked === false) {
      setState({
        clicked: !state.clicked,
        menuName: "Close",
      });
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    // console.log("typed", input);
    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .add({
        message: input,
        name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    chatBody.scrollTop = chatBody.scrollHeight;
    setInput("");
  };

  return (
    <div className="chat">
      <Hamburger state={state} />
      <div className="chat__header">
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
        />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last seen at{" "}
            {new Date(
              messages[
                messages.length - 1
              ]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton
            className="toggle"
            onClick={handleMenu}
          >
            <Add />
          </IconButton>
        </div>
      </div>

      <div
        ref={(el) => (chatBody = el)}
        className="chat__body"
      >
        {messages.map((message) => (
          <p
            className={`chat__message ${
              message.name === user.displayName &&
              "chat__reciever"
            }`}
            key={Math.floor(Math.random() * 5000)}
          >
            <span className="chat__name">
              {message.name}
            </span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(
                message.timestamp?.toDate()
              ).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <Button onClick={sendMessage} type="submit">
            <SendIcon />
          </Button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default withRouter(Chat);
