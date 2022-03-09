import React, { useState, useRef, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import Loginform from "../../login/Loginform";
import Submitcode from "../../login/Submitcode";
import auth from "../../../contax/authContax";

function Login({
  setAuthLogin,
  authLogin,
  setApiInfo,
  apiInfo,
}) {
  const [password, setPassword] = useState("");
  const [mobil, setMobil] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [mobilError, setemobilError] = useState("");
  const textInput = useRef(null);
  const codeRef = useRef(null);
  const [confarmCode, setConfarmCode] = useState("");
  const [confarmCodeStatue, setConfarmCodeStatue] =
    useState(false);

  const handelMobilChange = (e) => {
    setMobil(e.target.value);
  };

  const handleValidation = (event) => {
    let formIsValid = true;

    if (!mobil.match("^(\\+98|0)?9\\d{9}$")) {
      formIsValid = false;
      setemobilError("شماره موبایل معتبر نیست ");

      textInput.current.value = "";

      return false;
    } else {
      setemobilError("");
      formIsValid = true;
    }

    return formIsValid;
  };

  const loginSubmit = (e) => {
    e.preventDefault();

    let formvalid = handleValidation();

    if (formvalid) {
      setApiInfo({
        ...apiInfo,
        mobil: mobil,
      });

      setConfarmCodeStatue(true);
      console.log(mobil);
      // main.js

      // POST request using fetch()
      fetch("http://95.217.96.131:8080/api/checkuser", {
        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify({
          mobile: mobil,
        }),

        // Adding headers to the request
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text-plain, */*",
          "X-Requested-With": "XMLHttpRequest",
        },
      })
        // Converting to JSON
        .then((response) => response.json())

        // // Displaying results to console
        .then((json) => {
          console.log("");
          if (json.status == "ok") {
            setConfarmCodeStatue(true);
          } else {
            setemobilError("خطای ایی رخ داده است ");
          }
        });
    }
  };

  const codeSubmit = (e) => {


    e.preventDefault();
    fetch("http://95.217.96.131:8080/api/getauthcode", {
      method: "POST",
      body: JSON.stringify({
        mobile: mobil,
        code: confarmCode,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text-plain, */*",
        "X-Requested-With": "XMLHttpRequest",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        localStorage.setItem(
          "accessToken",
          `bearer ${json.access_token} `
        );
        localStorage.setItem("mobil", mobil);
        setAuthLogin(`bearer ${json.access_token} `);
      });
    console.log("auth", authLogin);
  };

  return (
    <div class="wrapper fadeInDown">
      <div id="formContent">
        {!confarmCodeStatue ? (
          <>
            <Loginform
              loginSubmit={loginSubmit}
              handelMobilChange={handelMobilChange}
              mobilError={mobilError}
            />
          </>
        ) : (
          <Submitcode
            codeSubmit={codeSubmit}
            setConfarmCode={setConfarmCode}
            codeRef={codeRef}
          />
        )}

        <div id="formFooter"></div>
      </div>
    </div>
  );
}

export default Login;
