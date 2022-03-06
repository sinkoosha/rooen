import React, { useContext, useState, useEffect } from "react";
import { Nav } from "react-bootstrap";

import {
  Link,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import EditDescriptiveQestion from "../../../../layout/EditQestion/EditDescriptiveQestion/EditDescriptiveQestion";
import EditTrueFalse from "../../../../layout/EditQestion/EditTrueFalse/EditTrueFalse";
import EditImageQestion from "../../../../layout/EditQestion/ImageQestion/EditImageQestion";
import EditMultiQestion from "../../../../layout/EditQestion/multiQestion/EditMultiQestion";
import EditSingleDescriptiveQestion from "../../../../layout/EditQestion/ٍEditSingleDescriptiveQestion/EditSingleDescriptiveQestion";
import EditMultiQestionShortlyWimage from "../../../../layout/EditQestion/ٍMultiQestionWImage/EditmultiQestionShortlyWimage";
import "./editQes.css";

function EditeProgramQuestion() {
  const nav = useNavigate();
  const questionitem = useLocation().state;

  try {
    JSON.parse(questionitem.options_question);
  } catch (err) {
    window.location.replace("/servererror");
  }

  console.log("qestion", questionitem.image);
  const [questionTitle, setQuestionTitle] = useState(
    questionitem.title_question
  );
  const [isDuration, setIsduration] = useState(
    questionitem.is_duration
  );
  const [questionType, setQuestionType] = useState(
    questionitem.type_of_question
  );
  const [questionPolicy, setQuestionPolicy] = useState(
    questionitem.is_necessary
  );
  const [isNecessary, setIsNecessary] = useState(
    questionitem.is_necessary
  );
  const [inputShortQes, setInputShortQes] = useState(
    questionitem.type_of_question == 7
      ? questionitem.options_question
      : JSON.parse(questionitem.options_question)
  );
  const [singleDescriptiveQestion, setSingleDescriptiveQestion] =
    useState(
      questionitem.type_of_question == 7
        ? questionitem.options_question
        : JSON.parse(questionitem.options_question)
    );

  const [descriptiveQestion, setDescriptiveQestion] = useState(
    questionitem.type_of_question == 7
      ? questionitem.options_question
      : JSON.parse(questionitem.options_question)
  );
  const [bolQes, setBolQes] = useState(
    questionitem.type_of_question == 7
      ? questionitem.options_question
      : JSON.parse(questionitem.options_question)
  );
  const [imageQestion, setImageQestion] = useState(
    JSON.parse(questionitem.options_question)
  );

  const [MultiQestion, setMultiQestion] = useState(
    questionitem.type_of_question == 3
      ? JSON.parse(questionitem.image)
      : null
  );
  console.log("MultiQestion", MultiQestion);
  const handelTitleQuestion = (e) => {
    setQuestionTitle(e.target.value);
    console.log(questionTitle);
  };
  const handelTypeQuestion = (e) => {
    e.persist();
    setQuestionType(e.target.value);
    console.log(questionType);
  };
  const handelquestionPolicy = (e) => {
    e.persist();
    setQuestionPolicy(e.target.value);
    console.log(questionPolicy);
  };
  const formData = new FormData();
  const accessToken = localStorage.getItem("accessToken");
  const handelisDuration = (e) => {
    setIsduration(e.target.value);
  };
  const handelFinalQestion = () => {
    if (questionType == 1) {
      return JSON.stringify(inputShortQes);
    }
    if (questionType == 2) {
      return JSON.stringify(descriptiveQestion);
    }
    if (questionType == 3) {
      return JSON.stringify(imageQestion);
    }
    if (questionType == 4) {
      return JSON.stringify(bolQes);
    }
    if (questionType == 5) {
      return JSON.stringify(singleDescriptiveQestion);
    }
    if (questionType == 6) {
      return JSON.stringify(singleDescriptiveQestion);
    }

    if (questionType == 7) {
      return null;
    }
  };

  const HandelSubmit = (e) => {
    e.preventDefault();
    formData.append("title_question", questionTitle);
    formData.append("question_id", questionitem.id);
    formData.append("type_of_question", questionType);
    formData.append("options_question", handelFinalQestion());

    formData.append(
      "title_program_id",
      questionitem.title_program_id
    );
    formData.append("is_necessary", questionPolicy);
    formData.append("is_duration", isDuration);

    e.preventDefault();
    fetch("http://95.217.96.131:8080/api/admin/edit-question", {
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
                disabled="disabled"
              >
                <option
                  value="1"
                  selected={questionType == 1 ? "selected" : ""}
                >
                  چند گزینه ایی متن کوتاه
                </option>
                <option
                  value="2"
                  selected={questionType == 2 ? "selected" : ""}
                >
                  چند گزینه ایی متن بلند
                </option>
                <option
                  value="3"
                  selected={questionType == 3 ? "selected" : ""}
                >
                  چند گزینه ایی متن و عکس
                </option>
                <option
                  value="4"
                  selected={questionType == 4 ? "selected" : ""}
                >
                  صحیح / غلط
                </option>
                <option
                  value="5"
                  selected={questionType == 5 ? "selected" : ""}
                >
                  تشریحی کامل
                </option>
                <option
                  value="6"
                  selected={questionType == 6 ? "selected" : ""}
                >
                  فقط عکس
                </option>
                <option
                  value="7"
                  selected={questionType == 7 ? "selected" : ""}
                >
                  آپلود تصویر
                </option>
              </select>
            </div>

            {questionType == 1 && (
              <EditMultiQestion
                inputShortQes={inputShortQes}
                setInputShortQes={setInputShortQes}
              />
            )}

            {questionType == 2 && (
              <EditDescriptiveQestion
                descriptiveQestion={descriptiveQestion}
                setDescriptiveQestion={setDescriptiveQestion}
              />
            )}

            {questionType == 3 && (
              <>
                <EditMultiQestionShortlyWimage
                  imageQestion={imageQestion}
                  setImageQestion={setImageQestion}
                  MultiQestion={MultiQestion}
                />
              </>
            )}

            {questionType == 4 && (
              <EditTrueFalse
                bolQes={bolQes}
                setBolQes={setBolQes}
              />
            )}

            {questionType == 5 && (
              <EditSingleDescriptiveQestion
                singleDescriptiveQestion={
                  singleDescriptiveQestion
                }
                setSingleDescriptiveQestion={
                  setSingleDescriptiveQestion
                }
              />
            )}

            {questionType == 6 && (
              <EditSingleDescriptiveQestion
                singleDescriptiveQestion={
                  singleDescriptiveQestion
                }
                setSingleDescriptiveQestion={
                  setSingleDescriptiveQestion
                }
              />
            )}

            {questionType == 7 && <EditImageQestion />}

            <div class=" mb-3">
              <label for="disabledTextInput" class="form-label">
                اهمیت
              </label>
              <select
                class="form-select"
                id="inputGroupSelect1"
                onChange={(e) => handelquestionPolicy(e)}
              >
                <option
                  value="0"
                  selected={
                    questionPolicy == 0 ? "selected" : ""
                  }
                >
                  غیر ضروری
                </option>
                <option
                  value="1"
                  selected={
                    questionPolicy == 1 ? "selected" : ""
                  }
                >
                  ضروری
                </option>
              </select>
            </div>
            <div class=" mb-3">
              <label for="disabledTextInput" class="form-label">
                سوالات دوره ایی
              </label>
              <select
                class="form-select"
                id="inputGroupSelect1"
                onChange={(e) => handelisDuration(e)}
              >
                <option
                  value="1"
                  selected={isDuration == 1 && "selected"}
                >
                  بلی
                </option>
                <option
                  value="0"
                  selected={isDuration == 0 && "selected"}
                >
                  خیر
                </option>
              </select>
            </div>

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
