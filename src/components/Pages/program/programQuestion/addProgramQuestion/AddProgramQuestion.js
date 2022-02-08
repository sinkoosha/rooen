import React, { useEffect, useState } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import DescriptiveQestion from "../../../../layout/DescriptiveQestion/DescriptiveQestion";
import ImageQestion from "../../../../layout/ImageQestion/ImageQestion";
import MultiQestionWimage from "../../../../layout/MultiQestionWImage/MultiQestionWimage";
import MultiQestionShortly from "../../../../layout/mutiqestion-Shortly/multiQestionShortly";
import SingleDescriptiveQestion from "../../../../layout/SingleDescriptiveQestion/SingleDescriptiveQestion";
import TrueFalse from "../../../../layout/trueFalse/TrueFalse";

function AddProgramQuestion() {
  const [questionTitle, setQuestionTitle] = useState();
  const [questionType, setQuestionType] = useState();

  const [questionPolicy, setQuestionPolicy] = useState();
  const [inputShortQes, setInputShortQes] = useState([
    { qestion: "" },
  ]);
  const [bolQes, setBolQes] = useState([
    { qestion1: "" },
    { qestion2: "" },
  ]);
  const [singleDescriptiveQestion, setSingleDescriptiveQestion] =
    useState();

  const [descriptiveQestion, setDescriptiveQestion] = useState([
    { qestion: "" },
  ]);
  const [finalQestion, setFinalQestion] = useState();
  const [imageQestion, setImageQestion] = useState([
    { qestion: "" },
  ]);

  const navigate = useNavigate();
  const programItem = useLocation().state;

  const handelTitleQuestion = (e) => {
    setQuestionTitle(e.target.value);
    console.log(questionTitle);
  };
  const handelTypeQuestion = (e) => {
    setQuestionType(e.target.value);
  };
  const handelquestionPolicy = (e) => {
    setQuestionPolicy(e.target.value);
    console.log(questionPolicy);
  };
  const accessToken = localStorage.getItem("accessToken");

  const handelFinalQestion = () => {
    if (questionType == 0) {
      return JSON.stringify(inputShortQes);
    }
    if (questionType == 1) {
      return JSON.stringify(descriptiveQestion);
    }
    if (questionType == 2) {
      imageQestion.map((index, item) => {});

      return "imageQestion";
    }
    if (questionType == 3) {
      return JSON.stringify(bolQes);
    }
    if (questionType == 4) {
      return JSON.stringify(singleDescriptiveQestion);
    }
  };

  const HandelSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("question", handelFinalQestion());
    formData.append("title_program_id", programItem.id);
    formData.append("type_of_question", questionType);
    formData.append("is_public", questionPolicy);
    formData.append("is_necessary", 1);
    console.log(handelFinalQestion());

    // fetch(
    //   "http://95.217.96.131:8080/api/admin/insert-question/",
    //   {
    //     // Adding method type
    //     method: "POST",
    //     // Adding body or contents to send

    //     // Adding headers to the request
    //     headers: {
    //       Authorization: accessToken,
    //     },

    //     body: formData,
    //   }
    // )
    //   // Converting to JSON
    //   .then((response) => response.json())
    //   // // Displaying results to console
    //   .then((json) => {
    //     console.log("ok", json[0].msg);
    //     if (json[0].msg == "success") {
    //       console.log();
    //       // window.location.href = `/program/indexQuestion/${programItem.id}`;
    //       navigate(-1);
    //     }
    //   });
  };

  const handelOutPutJsonFormat = (value) => {
    let result = "";
    value.map((item, i) => {
      value.length - 1 !== i
        ? (result += `[${item.qestion}],`)
        : (result += `[${item.qestion}]`);
    });
    return result;
  };

  return (
    <div className="indexHome ">
      <div class="">
        <div class="card-header">
          {programItem.name} - اضافه کردن پرسش های برنامه
        </div>
        <div class="card-body">
          <pre>{handelOutPutJsonFormat(descriptiveQestion)}</pre>
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
                <option value="0">
                  چند گزینه ایی متن کوتاه
                </option>
                <option value="1">چند گزینه ایی متن بلند</option>
                <option value="2">
                  چند گزیته ایی متن و عکس
                </option>
                <option value="3">بله / خیر</option>
                <option value="4">تشریحی متن کامل</option>
                <option value="5">آپلود عکس</option>
              </select>
            </div>
            {questionType == 0 && (
              <MultiQestionShortly
                inputShortQes={inputShortQes}
                setInputShortQes={setInputShortQes}
              />
            )}
            {questionType == 1 && (
              <DescriptiveQestion
                descriptiveQestion={descriptiveQestion}
                setDescriptiveQestion={setDescriptiveQestion}
              />
            )}
            {questionType == 2 && (
              <>
                <ImageQestion
                  imageQestion={imageQestion}
                  setImageQestion={setImageQestion}
                />
                <MultiQestionShortly
                  inputShortQes={inputShortQes}
                  setInputShortQes={setInputShortQes}
                />
              </>
            )}
            {questionType == 3 && (
              <TrueFalse bolQes={bolQes} setBolQes={setBolQes} />
            )}
            {questionType == 4 && (
              <SingleDescriptiveQestion
                singleDescriptiveQestion={
                  singleDescriptiveQestion
                }
                setSingleDescriptiveQestion={
                  setSingleDescriptiveQestion
                }
              />
            )}
            {questionType == 5 && (
              <ImageQestion
                imageQestion={imageQestion}
                setImageQestion={setImageQestion}
              />
            )}

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
