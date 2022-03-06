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
  const [loginFlage, setLoginflage] = useState(false);

  useEffect(() => {
    localStorage.getItem("accessToken")
      ? handelLoginFlage()
      : setLoginflage(false);
  }, []);

  const handelLoginFlage = () => {
    fetch("http://95.217.96.131:8080/api/me", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text-plain, */*",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => response.json())
      .then((json) => {
        // console.log("me", "id" in json);
        setLoginflage("id" in json);
      });
  };

  console.log(loginFlage);
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
