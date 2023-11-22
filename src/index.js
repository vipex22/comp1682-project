import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react'
// import { app } from "./firebase";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // app={app}
  <Provider store={store} >
    <PersistGate loading={"loading"} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
