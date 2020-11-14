import React, { useEffect, useState } from "react";
import classes from "./SidebarChat.module.css";
import { Avatar } from "@material-ui/core";
import db from "../../../Firebase";
import { Link } from "react-router-dom";

const SidebarChats = (props) => {
  const [seed, setSeed] = useState(" ");
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (props.id) {
      db.collection("rooms")
        .doc(props.id)
        .collection("messages")
        .orderBy("timeStamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [props.id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter name for chat room");

    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return !props.addNewChat ? (
    <Link to={`/rooms/${props.id}`} className={classes.roomLinks}>
      <div className={classes.sidebarChat}>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className={classes.sidebarChat__info}>
          <h2>{props.name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className={classes.sidebarChat}>
      <h2>Add new Chat</h2>
    </div>
  );
};

export default SidebarChats;
