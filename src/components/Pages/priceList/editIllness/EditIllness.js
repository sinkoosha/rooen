import React, { useContext, useState, useEffect } from "react";
import {
  Link,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";

function EditIllness() {
  const Nav = useNavigate();
  const illnessItem = useLocation().state;
  console.log(illnessItem);
  const [illnessTitle, setIllnessTitle] = useState(
    illnessItem.name
  );

  const accessToken = localStorage.getItem("accessToken");
  const handelillnesTitle = (e) => {
    e.persist();
    setIllnessTitle(e.target.value);
  };

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
          name: illnessTitle,
          illness_id: illnessItem.id,
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
        <div class="card-header">ویرایش بیماری</div>
        <div class="card-body">
          <form className="col-md-6" onSubmit={HandelSubmit}>
            <div class="mb-3">
              <label for="disabledTextInput" class="form-label">
                نام برنامه
              </label>
              <input
                value={illnessTitle}
                type="text"
                id="disabledTextInput"
                class="form-control"
                placeholder="نام برنامه"
                onChange={handelillnesTitle}
              />
            </div>

            <button type="submit" class="btn btn-primary">
              ویرایش بیماری
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditIllness;
