import React from "react";
import classes from "./Main.module.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import Chat from "../../components/Chat/Chat";
import Login from '../../components/Login/Login';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "../../Store/StateProvider";

const Main = () => {
  const [{ user },] = useStateValue();

  return (
    <div className={classes.main}>
      {!user ? (
        <Login />
      ) : (
        <div className={classes.main__body}>
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
};

export default Main;
