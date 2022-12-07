import React from "react";
import ReactDOM from "react-dom/client";
// BrowserRouter
// A <Router> that uses the HTML5 history API
// (pushState, replaceState and the popstate event)
// to keep your UI in sync with the URL.
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import Navigation from "./Navigation";

import {
  UserProvider,
  TokenProvider,
  InstitutionProvider,
} from "./environment";

import {
  Home,
  Signup,
  Login,
  AboutUs,
  Footer,
  Animal,
  EditAnimal,
  ListAnimals,
  EditInstitution,
  Institution,
  InstitutionPanel,
  ListInstitutions,
  AdminPanel,
  EditProfile,
  Profile,
} from "./views";

(async function () {
  await import("bootstrap/dist/css/bootstrap.min.css");
  await import("bootstrap");
  await import("./index.css");
})();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <InstitutionProvider>
        <TokenProvider>
          <Router>
            <Navigation />
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route path="/animal" element={<Animal />} />
              <Route path="/editAnimal" element={<EditAnimal />} />
              <Route path="/animals" element={<ListAnimals />} />
              <Route path="/editInstitution" element={<EditInstitution />} />
              <Route path="/institution" element={<Institution />} />
              <Route path="/institutionPanel" element={<InstitutionPanel />} />
              <Route path="/institutions" element={<ListInstitutions />} />
              <Route path="/adminPanel" element={<AdminPanel />} />
              <Route path="/editProfile" element={<EditProfile />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/:userId" element={<Profile />} />
            </Routes>
            <Footer />
          </Router>
        </TokenProvider>
      </InstitutionProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
