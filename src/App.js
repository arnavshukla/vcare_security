import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import SignIn from "./components/UserAccess/SignIn";

const App = () => {
  return (
    <BrowserRouter>
        <div className="app-container">
          <SignIn />
        </div>
    </BrowserRouter>
  );
};

export default App;
