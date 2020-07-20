import React, { Fragment, useState, useEffect } from "react";
import * as firebase from "firebase";
import { useSelector, useDispatch } from "react-redux";
import config from "./config";

export default function Auth() {
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const uid = useSelector(state => state.uid);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  const auth = firebase.auth();

  const Authentification = () => {
    const promise = auth.signInWithEmailAndPassword(user, password);
    promise.catch(e => e.message);
    setPassword("");
  };

  const CreateUser = () => {
    const promise = auth.createUserWithEmailAndPassword(user, password);
  };

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      dispatch({
        type: "CONNEXION",
        payload: firebaseUser.uid
      });
    } else {
    }
  });

  return (
    <Fragment>
      <div className="Auth_Container">
        <input
          type="text"
          onChange={e => setUser(e.target.value)}
          placeholder="Une nouvelle habitude ?"
          value={user}
        />
        <input
          type="password"
          onChange={e => setPassword(e.target.value)}
          placeholder="Une nouvelle habitude ?"
          value={password}
        />
        <button onClick={() => CreateUser()}>S'inscrire</button>
        <button onClick={() => Authentification()}>Connect</button>
      </div>
    </Fragment>
  );
}

//<Main />
