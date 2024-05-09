import React from "react";
import ReactDom from "react-dom/client";
// import { queryclient } from "./queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { queryclient } from "./queryClient/queryClient";
import "./styles/global.scss";

const root = ReactDom.createRoot(document.querySelector("#app")!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryclient}>
        <App />
        {/* <StoreApp /> */}
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
