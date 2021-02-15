import dva from "dva";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import DVAapp from "./model/app";
// ReactDOM.render(, document.getElementById("root"));

export const app = dva({
  // onError: globalErrorHandler,
});

app.model(DVAapp);

app.router(() => <App />);

app.start(document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
