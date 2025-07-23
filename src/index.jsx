import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./apps/store";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";
const root = createRoot(document.getElementById("root"));
root.render(
   <Provider store={store}>
      <ThemeProvider theme={theme}>
         <App />
      </ThemeProvider>
   </Provider>
);
