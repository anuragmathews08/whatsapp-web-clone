import React, {useState, useEffect} from "react";
import classes from "./Sidebar.module.css";

import { Avatar, IconButton } from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SidebarChat from './SidebarChat/SidebarChat';
import db from '../../Firebase';
import { useStateValue } from "../../Store/StateProvider";


const Sidebar = () => {

  const [rooms, setRooms] = useState([]);
  const [{ user },] = useStateValue();

  useEffect(() => {
   const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
      setRooms(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    ));
    return () => {
      unsubscribe();
    }
  },[]);

  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebar__header}>
        <Avatar src={user?.photoURL}/>
        <div className={classes.sidebar__headerRight}>
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className={classes.sidebar__search}>
        <div className={classes.sidebar__searchContainer}>
          <SearchOutlinedIcon className={classes.sidebar__searchIcon}/>
          <input placeholder="Search or start a new chat" type="text" />
        </div>
      </div>

      <div className={classes.sidebar__chats}>
        <SidebarChat addNewChat/>
        {rooms.map(room => (
          <SidebarChat 
          key={room.id}
          id={room.id}
          name={room.data.name}/>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
