import React, { useContext, useState, useEffect } from "react";

import {
  Link,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
function EditeProgramQuestion() {
  const nav = useNavigate();
  const questionitem = useLocation().state;
  console.log(questionitem);
  const [questionTitle, setQuestionTitle] = useState(
    questionitem.question
  );
  const [questionType, setQuestionType] = useState(
    questionitem.type_of_question
  );
  const [questionPolicy, setQuestionPolicy] = useState(
    questionitem.is_public
  );

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
    const formData = new FormData();

    formData.append("question", questionTitle);
    formData.append("question_id", questionitem.id);
    formData.append("type_of_question", questionType);
    formData.append("is_public", questionPolicy);
    formData.append(
      "title_program_id",
      questionitem.title_program_id
    );

    e.preventDefault();
    fetch("http://95.217.96.131:8080/api/admin/edit-question", {
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
        question: questionTitle,
        question_id: questionitem.id,
        type_of_question: questionType,
        is_public: questionPolicy,
        title_program_id: questionitem.title_program_id,
      }),
    })
      // Converting to JSON
      .then((response) => response.json())
      // // Displaying results to console
      .then((json) => {
        if (json[0].msg == "success") {
          nav(-1);
        }
      });
  };

  return (
    <div className="indexHome ">
      <div class="">
        <div class="card-header">
          {questionitem.question} - ,ویرایش کردن پرسش های برنامه
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
                value={questionTitle}
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
                <option
                  value="0"
                  selected={questionType == 0 ? "selected" : ""}
                >
                  پرسش مدل 0
                </option>
                <option
                  value="1"
                  selected={questionType == 1 ? "selected" : ""}
                >
                  پرسش مدل 1
                </option>
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
                <option
                  value="0"
                  selected={
                    questionPolicy == 0 ? "selected" : ""
                  }
                >
                  خصوصی
                </option>
                <option
                  value="1"
                  selected={
                    questionPolicy == 0 ? "selected" : ""
                  }
                >
                  عمومی
                </option>
              </select>
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

export default EditeProgramQuestion;
