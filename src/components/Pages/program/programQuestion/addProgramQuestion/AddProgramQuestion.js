import React, { useContext, useState } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

function AddProgramQuestion() {
  const [questionTitle, setQuestionTitle] = useState();
  const [questionType, setQuestionType] = useState();
  const [questionPolicy, setQuestionPolicy] = useState();
  const navigate = useNavigate();
  const programItem = useLocation().state;

  const handelTitleQuestion = (e) => {
    setQuestionTitle(e.target.value);
    console.log(questionTitle);
  };
  const handelTypeQuestion = (e) => {
    setQuestionType(e.target.value);
    console.log(questionType);
  };
  const handelquestionPolicy = (e) => {
    setQuestionPolicy(e.target.value);
    console.log(questionPolicy);
  };
  const accessToken = localStorage.getItem("accessToken");

  const HandelSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("question", questionTitle);
    formData.append("title_program_id", programItem.id);
    formData.append("type_of_question", questionType);
    formData.append("is_public", questionPolicy);

    fetch(
      "http://95.217.96.131:8080/api/admin/insert-question",
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
          // window.location.href = `/program/indexQuestion/${programItem.id}`;
          navigate(-1);
        }
      });
  };

  return (
    <div className="indexHome ">
      <div class="">
        <div class="card-header">
          {" "}
          {programItem.name} - اضافه کردن پرسش های برنامه
        </div>
        <div class="card-body">
          <form className="col-md-6" onSubmit={HandelSubmit}>
            <div class="mb-3">
              <label for="disabledTextInput" class="form-label">
                نام پرسش
              </label>
              <input
                type="text"
                id="disabledTextInput"
                class="form-control"
                placeholder="نام پرسش"
                onChange={handelTitleQuestion}
              />
            </div>
            <div class=" mb-3">
              <label for="disabledTextInput" class="form-label">
                نوع پرسش
              </label>
              <select
                class="form-select"
                id="inputGroupSelect0"
                onChange={handelTypeQuestion}
              >
                <option selected>نوع پرسش ...</option>
                <option value="0">پرسش مدل 0</option>
                <option value="1">پرسش مدل 1</option>
              </select>
            </div>
            <div class=" mb-3">
              <label for="disabledTextInput" class="form-label">
                خصوصی / عمومی
              </label>
              <select
                class="form-select"
                id="inputGroupSelect1"
                onChange={handelquestionPolicy}
              >
                <option selected>نوع</option>
                <option value="0">خصوصی</option>
                <option value="1">عمومی</option>
              </select>
            </div>

            <div></div>

            <button type="submit" class="btn btn-primary">
              اضافه کردن
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProgramQuestion;
