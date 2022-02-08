import React, { useContext, useState } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

function EditKeyWord() {
  const keywordItem = useLocation().state;
  const [keyWordTitle, setKeyWordTitle] = useState(
    keywordItem.name
  );

  const navigate = useNavigate();

  const handelKeyWordTitle = (e) => {
    setKeyWordTitle(e.target.value);
    console.log(keyWordTitle);
  };

  const accessToken = localStorage.getItem("accessToken");

  const HandelSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", keyWordTitle);
    formData.append("keyword_id", keywordItem.id);

    fetch("http://95.217.96.131:8080/api/admin/edit-keyword", {
      // Adding method type
      method: "POST",
      // Adding body or contents to send

      // Adding headers to the request
      headers: {
        Authorization: accessToken,
      },

      body: formData,
    })
      // Converting to JSON
      .then((response) => response.json())
      // // Displaying results to console
      .then((json) => {
        console.log("ok", json[0].msg);
        if (json[0].msg == "success") {
          console.log();

          navigate(-1);
        }
      });
  };

  return (
    <div className="indexHome ">
      <div class="">
        <div class="card-header"> ویرایش کلید واژه</div>
        <div class="card-body">
          <form className="col-md-6" onSubmit={HandelSubmit}>
            <div class="mb-3">
              <label for="disabledTextInput" class="form-label">
                نام کلید واژه
              </label>
              <input
                type="text"
                id="disabledTextInput"
                class="form-control"
                placeholder="نام کلید واژه"
                onChange={handelKeyWordTitle}
                value={keyWordTitle}
              />
            </div>

            <div></div>

            <button type="submit" class="btn btn-primary">
              ویرایش کردن
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditKeyWord;
