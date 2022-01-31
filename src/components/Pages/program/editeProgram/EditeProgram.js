import React, { useContext, useState, useEffect } from "react";
import auth from "../../../../contax/authContax";
import {
  Link,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
function EditProgram() {
  const Nav = useNavigate();
  const [programTitle, SetProgramTitle] = useState(
    useLocation().state.name
  );
  const [programType, setProgramType] = useState(
    useLocation().state.diet_type
  );
  const itemId = useLocation().state.id;

  const handelTitleProgram = (e) => {
    e.persist();
    SetProgramTitle(e.target.value);
  };
  const handelTypeProgarm = (e) => {
    e.persist();
    setProgramType(e.target.value);
  };

  const accessToken = localStorage.getItem("accessToken");

  const HandelSubmit = (e) => {
    e.preventDefault();
    fetch(
      "http://95.217.96.131:8080/api/admin/edit-titleprogram/",
      {
        // Adding method type
        method: "POST",
        // Adding body or contents to send

        // Adding headers to the request
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text-plain, */*",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: accessToken,
        },

        body: JSON.stringify({
          name: programTitle,
          diet_type: programType,
          tile_program_id: itemId,
        }),
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

  return (
    <div className="indexHome ">
      <div class="">
        <div class="card-header">ویرایش برنامه</div>
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

            <button type="submit" class="btn btn-primary">
              ویرایش برنامه
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProgram;
