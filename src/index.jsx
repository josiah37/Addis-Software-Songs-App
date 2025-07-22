// import React from "react";
// // import ReactDOM from "react-dom";
// import { createRoot } from "react-dom/client";
// import App from "./App";
// // ReactDOM.render(<App />, document.getElementById("root"));

// // const root = ReactDOM.createRoot(document.getElementById("root"));

// // since i am on v18 so the set up :
// const root = createRoot(document.getElementById("root"));
// root.render(<App />);

// connecting  React to Redux
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./apps/store";

const root = createRoot(document.getElementById("root"));
root.render(
   <Provider store={store}>
      <App />
   </Provider>
);
