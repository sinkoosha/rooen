import react, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Index from "./components/index/Index";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Topnavbar from "./components/topnavbar/Topnavbar";
import Login from "./components/Pages/login/Login";
import RightBar from "./components/rightbar/Rightbar";
import Dashboard from "./components/layout/dashboard/Dashboard";
import auth from "./contax/authContax";

function App() {
  const [mobil, setMobil] = useState("");
  const [authLogin, setAuthLogin] = useState();
  const [apiInfo, setApiInfo] = useState({});
  localStorage.getItem("accessToken")
    ? console.log("ok")
    : console.log("nok");

  return (
    <auth.Provider value={{}}>
      <div className="App">
        {!localStorage.getItem("accessToken") ? (
          <Login
            authLogin={authLogin}
            setAuthLogin={setAuthLogin}
            apiInfo={apiInfo}
            setApiInfo={setApiInfo}
          />
        ) : (
          <Dashboard
            authLogin={authLogin}
            setAuthLogin={setAuthLogin}
          />
        )}
      </div>
    </auth.Provider>
  );
}

export default App;
