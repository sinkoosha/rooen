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
    const formData = new FormData();
    formData.append("name", illnessTitle);
    formData.append("illness_id", illnessItem.id);
    console.log("ilness", illnessTitle, illnessItem.id);
    e.preventDefault();
    fetch("http://95.217.96.131:8080/api/admin/edit-illness", {
      // Adding method type
      method: "POST",
      // Adding body or contents to send
      headers: {
        Authorization: accessToken,
      },
      // Adding headers to the request

      body: formData,
    })
      // Converting to JSON
      .then((response) => response.json())
      // // Displaying results to console
      .then((json) => {
        if (json[0].msg == "success") {
          Nav(-1);
        }
      });
  };
  const back =()=>{
    Nav(-1)
  }
  return (
    <div className="indexHome ">
      <div class="">
        <div class="card-header">
          <div>
          ویرایش بیماری
          </div>
          <button className="btn btn-danger" onClick={back}>بازگشت</button>


        </div>
        <div class="card-body">
          <form className="col-md-6" onSubmit={HandelSubmit}>
            <div class="mb-3">
              <label for="disabledTextInput" class="form-label">
                نام بیماری
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
