import React from "react";
import "./styles.scss";
import Auth from "./Auth.js";
import { useSelector } from "react-redux";

import Main from "./Main";

export default function App() {
  const uid = useSelector((state) => state.uid);
  return <div className="App">{uid ? <Main /> : <Auth />}</div>;
}

//
