import React, { useContext, useState, useEffect } from "react";
import auth from "../../../../contax/authContax";
import {
  Link,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function EditProgram() {
  const Nav = useNavigate();
  const [programTitle, SetProgramTitle] = useState(
    useLocation().state.name
  );
  const [programType, setProgramType] = useState(
    useLocation().state.diet_type
  );
  const [loadIng, setLoadIng] = useState(false);

  const [programImage, setProgramImage] = useState(null);
  const itemId = useLocation().state.id;

  const handelTitleProgram = (e) => {
    e.persist();
    SetProgramTitle(e.target.value);
  };
  const handelTypeProgarm = (e) => {
    e.persist();
    setProgramType(e.target.value);
  };
  const handelImageProgarm = (e) => {
    e.persist();
    setProgramImage(e.target.files[0]);
  };

  const accessToken = localStorage.getItem("accessToken");
  const formData = new FormData();
  formData.append("name", programTitle);
  formData.append("diet_type", programType);
  formData.append("tile_program_id", itemId);
  formData.append("image", programImage);
  const HandelSubmit = (e) => {
    e.preventDefault();
    setLoadIng(true);
    fetch(
      "http://95.217.96.131:8080/api/admin/edit-titleprogram/",
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
        if (json[0].msg == "success") {
          Nav(-1);
        }
      });
  };
  const navigate = useNavigate()
  const back =()=>{
    navigate(-1)
  }

  return (
    <div className="indexHome ">
      <div class="">
        <div class="card-header">
          <div> ویرایش برنامه</div>
          <button className="btn btn-danger" onClick={back}>بازگشت</button>
         </div>
        <div class="card-body">
          <form className="col-md-6" onSubmit={HandelSubmit}>
            <div class="mb-3">
              <label for="disabledTextInput" class="form-label">
                نام برنامه
              </label>
              <input
                value={programTitle}
                type="text"
                id="disabledTextInput"
                class="form-control"
                placeholder="نام برنامه"
                onChange={handelTitleProgram}
              />
            </div>
            <div class=" mb-3">
              <label for="disabledTextInput" class="form-label">
                نوع برنامه
              </label>
              <select
                class="form-select"
                id="inputGroupSelect01"
                onChange={handelTypeProgarm}
              >
                <option
                  value="0"
                  selected={programType == 0 ? "selected" : ""}
                >
                  دستی
                </option>
                <option
                  value="1"
                  selected={programType == 1 ? "selected" : ""}
                >
                  اتوماتیک
                </option>
              </select>
            </div>
            <div class=" mb-3">
              <label for="disabledTextInput" class="form-label">
                ویرایش تصویر
              </label>
              <img
                src={`http://95.217.96.131:8080/storage/images/${
                  useLocation().state.image
                }`}
                className="img-thumbnail rounded mx-auto d-block mt-3 mb-3"
              />
              <input
                type="file"
                id="disabledTextInput"
                placeholder="نام برنامه"
                onChange={handelImageProgarm}
              />
            </div>

            <button type="submit" class="btn btn-primary">
              ویرایش برنامه
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

export default EditProgram;
