import React from "react";
import ReactDOM from "react-dom/client";
// BrowserRouter
// A <Router> that uses the HTML5 history API
// (pushState, replaceState and the popstate event)
// to keep your UI in sync with the URL.
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import Navigation from "./Navigation";

import { UserProvider, TokenProvider } from "./environment";

import { Home } from "./views";

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
