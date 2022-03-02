import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import DescriptiveQestion from "../../../../layout/DescriptiveQestion/DescriptiveQestion";
import ImageQestion from "../../../../layout/ImageQestion/ImageQestion";
import MultiQestionWimage from "../../../../layout/MultiQestionWImage/MultiQestionWimage";
import MultiQestionShortly from "../../../../layout/mutiqestion-Shortly/multiQestionShortly";
import MultiQestionShortlyWimage from "../../../../layout/mutiqestionShortlyWimage/multiQestionShortlyWimage";
import SingleDescriptiveQestion from "../../../../layout/SingleDescriptiveQestion/SingleDescriptiveQestion";
import TrueFalse from "../../../../layout/trueFalse/TrueFalse";

function AddProgramQuestion() {
  const [questionTitle, setQuestionTitle] = useState();
  const [questionType, setQuestionType] = useState();

  const [questionPolicy, setQuestionPolicy] = useState();
  const [inputShortQes, setInputShortQes] = useState([
    { qestion: "" },
  ]);

  const [isDuration, setIsduration] = useState(0);

  const [bolQes, setBolQes] = useState();
  const [singleDescriptiveQestion, setSingleDescriptiveQestion] =
    useState();

  const [descriptiveQestion, setDescriptiveQestion] = useState([
    { qestion: "" },
  ]);
  const [finalQestion, setFinalQestion] = useState();
  const [imageQestion, setImageQestion] = useState([
    { qestion: "", imgqes: "" },
  ]);

  const navigate = useNavigate();
  const programItem = useLocation().state;
  const handelisDuration = (e) => {
    setIsduration(e.target.value);
  };
  const handelTitleQuestion = (e) => {
    setQuestionTitle(e.target.value);
    console.log(questionTitle);
  };
  const handelTypeQuestion = (e) => {
    setQuestionType(e.target.value);
  };
  const handelquestionPolicy = (e) => {
    setQuestionPolicy(e.target.value);
    console.log("qp", questionPolicy);
  };
  const accessToken = localStorage.getItem("accessToken");
  const formData = new FormData();
  const handelFinalQestion = () => {
    if (questionType == 1) {
      return JSON.stringify(inputShortQes);
    }
    if (questionType == 2) {
      return JSON.stringify(descriptiveQestion);
    }
    if (questionType == 3) {
      return JSON.stringify(imageQestion);
      imageQestion.map((item, index) => {
        formData.append(`photo${index + 1}`, item.imgqes);
      });
    }
    if (questionType == 7) {
      return null;
    }
    if (questionType == 4) {
      console.log(JSON.stringify(bolQes));
      return JSON.stringify(bolQes);
    }
    if (questionType == 5) {
      return JSON.stringify(singleDescriptiveQestion);
    }
    if (questionType == 6) {
      console.log(
        "singleDescriptiveQestion",
        singleDescriptiveQestion
      );
      return JSON.stringify(singleDescriptiveQestion);
    }
  };

  const HandelSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (questionType == 3) {
      imageQestion.map((item, index) => {
        formData.append(`photo${index + 1}`, item.imgqes);
        console.log(index);
      });
    }
    formData.append("title_question", questionTitle);
    formData.append("options_question", handelFinalQestion());
    formData.append("title_program_id", programItem.id);
    formData.append("type_of_question", questionType);
    formData.append("is_necessary", questionPolicy);
    formData.append("is_duration", isDuration);

    fetch(
      "http://95.217.96.131:8080/api/admin/insert-question/",
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
                <option value="1">
                  چند گزینه ایی متن کوتاه
                </option>
                <option value="2">چند گزینه ایی متن بلند</option>
                <option value="3">
                  چند گزیته ایی متن و عکس
                </option>
                <option value="4">بله / خیر</option>
                <option value="5">تشریحی متن کامل</option>
                <option value="6">فقط عدد</option>
                <option value="7">آپلود عکس</option>
              </select>
            </div>
            {questionType == 1 && (
              <MultiQestionShortly
                inputShortQes={inputShortQes}
                setInputShortQes={setInputShortQes}
              />
            )}
            {questionType == 2 && (
              <DescriptiveQestion
                descriptiveQestion={descriptiveQestion}
                setDescriptiveQestion={setDescriptiveQestion}
              />
            )}
            {questionType == 3 && (
              <>
                <MultiQestionShortlyWimage
                  imageQestion={imageQestion}
                  setImageQestion={setImageQestion}
                />
              </>
            )}
            {questionType == 4 && (
              <TrueFalse bolQes={bolQes} setBolQes={setBolQes} />
            )}

            {questionType == 5 && (
              <SingleDescriptiveQestion
                singleDescriptiveQestion={
                  singleDescriptiveQestion
                }
                setSingleDescriptiveQestion={
                  setSingleDescriptiveQestion
                }
              />
            )}
            {questionType == 6 && (
              <SingleDescriptiveQestion
                singleDescriptiveQestion={
                  singleDescriptiveQestion
                }
                setSingleDescriptiveQestion={
                  setSingleDescriptiveQestion
                }
              />
            )}
            {questionType == 7 && <ImageQestion />}

            <div class=" mb-3">
              <label for="disabledTextInput" class="form-label">
                اهمیت
              </label>
              <select
                class="form-select"
                id="inputGroupSelect1"
                onChange={handelquestionPolicy}
              >
                <option selected>نوع</option>
                <option value="1">ضروری</option>
                <option value="0">غیر ضروری</option>
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
                <option selected>نوع</option>
                <option value="1">بلی</option>
                <option value="0">خیر</option>
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
