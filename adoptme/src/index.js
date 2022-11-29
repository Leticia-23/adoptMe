import React from "react";
import ReactDOM from "react-dom/client";
// BrowserRouter
// A <Router> that uses the HTML5 history API
// (pushState, replaceState and the popstate event)
// to keep your UI in sync with the URL.
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import Navigation from "./Navigation";

import Home from "./Home";

import UserProvider from "./environment/UserProvider";
import TokenProvider from "./environment/TokenProvider";

(async function () {
  await import("bootstrap/dist/css/bootstrap.min.css");
  await import("./index.css");
})();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <TokenProvider>
        <Router>
          <Navigation />

          <Routes>
            {/* <Route path="/lab2" element={<Lab2 />} />
            <Route path="/lab3-signup" element={<Lab3Signup />} />
            <Route path="/lab3-login" element={<Lab3Login />} />
            <Route path="/lab3message" element={<Lab3message />} /> */}

            <Route path="/" exact element={<Home />} />
          </Routes>
        </Router>
      </TokenProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
