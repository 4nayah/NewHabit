import React from "react";
import config from "./config";
import * as firebase from "firebase";
import { useSelector, useDispatch } from "react-redux";

export default function NavBar() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  const auth = firebase.auth();
  const dispatch = useDispatch();

  const Disconnect = () => {
    firebase.auth().signOut();
    dispatch({
      type: "DECONNEXION"
    });
    console.log("deco");
  };

  return (
    <div className="NavBar">
      <button onClick={() => Disconnect()}>Disconnect</button>
    </div>
  );
}

//
