import React, { useContext, useState } from "react";
import auth from "../../../../contax/authContax";
import axios from "axios";
import { Route , useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import "./addprogram.css";
function AddProgram() {
  const [programTitle, SetProgramTitle] = useState();
  const [programType, setProgramType] = useState();
  const [programFileUpload, setProgramFile] = useState();
  const [programFileUploadName, setProgramFileName] = useState();
  const [loadIng, setLoadIng] = useState(false);

  const handelTitleProgram = (e) => {
    SetProgramTitle(e.target.value);
    console.log(programTitle);
  };
  const handelTypeProgarm = (e) => {
    setProgramType(e.target.value);
  };
  const handelChangeImage = (e) => {
    setProgramFile(e.target.files[0]);
    console.log(programFileUpload);
  };
  const accessToken = localStorage.getItem("accessToken");

  const HandelSubmit = (e) => {
    setLoadIng(true);
    e.preventDefault();
    const formData = new FormData();

    formData.append("title_program", programTitle);
    formData.append("diet_type", programType);
    formData.append("image", programFileUpload);

    fetch(
      "http://95.217.96.131:8080/api/admin/insert-titleprogram",
      {
        // Adding method type
        method: "POST",
        // Adding body or contents to send

        // Adding headers to the request
        headers: {
          Authorization: accessToken,
        },

        body: formData,
      }
    )
      // Converting to JSON
      .then((response) => response.json())
      // // Displaying results to console
      .then((json) => {
        console.log("ok", json[0].msg);
        if (json[0].msg == "success") {
          console.log();
          window.location.href = "/program";
        }
      });
  }
  const navigate = useNavigate()
  const back =()=>{
    navigate(-1)
  }

  return (
    <div className="indexHome ">
      <div class="">
        <div class="card-header">
          <div>   ?????????? ???????? ????????????</div>
          <button className="btn btn-danger" onClick={back}>????????????</button>


       </div>
        <div class="card-body">
          <form className="col-md-6" onSubmit={HandelSubmit}>
            <div class="mb-3">
              <label for="disabledTextInput" class="form-label">
                ?????? ????????????
              </label>
              <input
                type="text"
                id="disabledTextInput"
                class="form-control"
                placeholder="?????? ????????????"
                onChange={handelTitleProgram}
              />
            </div>
            <div class=" mb-3">
              <label for="disabledTextInput" class="form-label">
                ?????? ????????????
              </label>
              <select
                class="form-select"
                id="inputGroupSelect01"
                onChange={handelTypeProgarm}
              >
                <option selected>?????? ???????????? ...</option>
                <option value="0">????????</option>
                <option value="1">????????????????</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="formFileSm" class="form-label">
                ???????????? ??????????
              </label>
              <input
                class=""
                id="formFileSm"
                type="file"
                onChange={handelChangeImage}
              />
            </div>
            <div></div>

            <button type="submit" class="btn btn-primary">
              ?????????? ????????
            </button>
            {loadIng && (
              <>
                <Box sx={{ display: "flex", marginTop: "30px" }}>
                  <CircularProgress />
                </Box>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProgram;
