import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";

import reducer from "./store/reducer";
import { Provider } from "react-redux";

import App from "./App";

const rootElement = document.getElementById("root");
const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  rootElement
);
