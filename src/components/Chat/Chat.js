import React, { useState, useEffect } from "react";
import classes from "./Chat.module.css";
import { useParams } from "react-router-dom";
import db from "../../Firebase";
import firebase from "firebase";

import { Avatar, IconButton } from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import AttachFileOutlinedIcon from "@material-ui/icons/AttachFileOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonOutlinedIcon from "@material-ui/icons/InsertEmoticonOutlined";
import SendIcon from "@material-ui/icons/Send";
import { useStateValue } from "../../Store/StateProvider";

const Chat = () => {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState(" ");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }] = useStateValue();
  const { roomId } = useParams();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timeStamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(roomId);
  }, [roomId]);

  const sendMessage = (event) => {
    event.preventDefault();
    db.collection("rooms").doc(roomId).collection("messages").add({
      name: user.displayName,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
    });
    setInput("");
  };

  return (
    <div className={classes.chat}>
      <div className={classes.chat__header}>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className={classes.chat__headerInfo}>
          <h3>{roomName}</h3>
          <p>
            Last seen {" "}
            { new Date(
              messages[messages.length - 1]?.timeStamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className={classes.chat__headerRight}>
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileOutlinedIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className={classes.chat__body}>
        {messages.map((message, index) => (
          <p
            className={
              message.name === user.displayName
                ? [classes.chat__message, classes.chat__receiver].join(" ")
                : classes.chat__message
            }
            key={index}
          >
            <span className={classes.chat__name}>{message.name}</span>
            {message.message}
            <span className={classes.chat__timeStamp}>
              {new Date(message.timeStamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      <div className={classes.chat__footer}>
        <IconButton>
          <InsertEmoticonOutlinedIcon className={classes.chat__footerIcon} />
        </IconButton>
        <form onSubmit={(event) => sendMessage(event)}>
          <input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button type="submit">
            <SendIcon />
          </button>
        </form>
        <IconButton>
          <MicIcon className={classes.chat__footerIcon} />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
