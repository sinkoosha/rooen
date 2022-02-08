import React, { useContext, useState, useEffect } from "react";
import auth from "../../../../contax/authContax";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

function EditMeals() {
  const MealsIteam = useLocation().state;
  console.log(MealsIteam);
  const navigate = useNavigate();
  const [detailsMeal, setDetailsMeal] = useState(
    MealsIteam.details
  );
  const [season, setSeason] = useState(MealsIteam.season);
  const [mealType, setMealType] = useState(MealsIteam.meal_type);
  const [calory, setCalory] = useState(1);
  const [sumCalories, setsumCalories] = useState(
    MealsIteam.sumcalories
  );
  const [illnessItem, setIllnessItem] = useState(null);
  const [illnessId, setIllnessId] = useState(
    MealsIteam.illness_id
  );
  const [refresh, setRefresh] = useState();
  const [description, SetDescription] = useState(
    MealsIteam.description
  );

  const hanelDetailsMeals = (e) => {
    setDetailsMeal(e.target.value);
    console.log(detailsMeal);
  };

  const hanelDescription = (e) => {
    SetDescription(e.target.value);
  };

  const handelseason = (e) => {
    setSeason(e.target.value);
  };
  const handelmealType = (e) => {
    setMealType(e.target.value);
  };
  const handelSumcolories = (e) => {
    setsumCalories(e.target.value);
  };

  const handelIllness = (e) => {
    setIllnessId(e.target.value);
  };
  const handelMealType = (e) => {
    setMealType(e.target.value);
  };

  const accessToken = localStorage.getItem("accessToken");
  const illnessIndex = () => {
    // POST request using fetch()
    fetch("http://95.217.96.131:8080/api/admin/index-illness/", {
      // Adding method type
      method: "GET",
      // Adding body or contents to send

      // Adding headers to the request
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text-plain, */*",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: accessToken,
      },
    })
      // Converting to JSON
      .then((response) => response.json())
      // // Displaying results to console
      .then((json) => {
        setIllnessItem(json.data);
      });
  };

  useEffect(() => {
    illnessIndex();
  }, [refresh]);

  const HandelSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("details", detailsMeal);
    formData.append("season", season);
    formData.append("meal_type", mealType);
    formData.append("sumcalories", sumCalories);
    formData.append("illness_id", illnessId);
    formData.append("description", description);
    formData.append("meal_id", MealsIteam.id);
    fetch("http://95.217.96.131:8080/api/admin/edit-meal", {
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
          // window.location.href = `/program/indexQuestion/${programItem.id}`;
          navigate("/meals");
        }
      });
  };

  return illnessItem !== null ? (
    <div className="indexHome ">
      <div class="">
        <div class="card-header">ویرایش وعده غذایی</div>
        <div class="card-body">
          <form className="col-md-6" onSubmit={HandelSubmit}>
            <div class="mb-3">
              <label for="disabledTextInput" class="form-label">
                نام پکیج غذایی
              </label>
              <input
                type="text"
                id="disabledTextInput"
                class="form-control"
                placeholder="نام پکیج غذایی"
                onChange={hanelDetailsMeals}
                value={detailsMeal}
              />
            </div>
            <div class="mb-3">
              <label for="disabledTextInput" class="form-label">
                فصل
              </label>
              <select
                class="form-select"
                id="inputGroupSelect0"
                onChange={handelseason}
              >
                <option>انتخاب فصل</option>
                <option
                  value="0"
                  selected={season == 0 && "selected"}
                >
                  تمام فصول
                </option>
                <option
                  value="1"
                  selected={season == 1 && "selected"}
                >
                  بهار
                </option>
                <option
                  value="2"
                  selected={season == 2 && "selected"}
                >
                  تابستان
                </option>
                <option
                  value="3"
                  selected={season == 3 && "selected"}
                >
                  پاییز
                </option>
                <option
                  value="4"
                  selected={season == 4 && "selected"}
                >
                  زمستان
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label for="disabledTextInput" class="form-label">
                نام وعده غذایی
              </label>
              <select
                class="form-select"
                id="inputGroupSelect0"
                onChange={handelMealType}
              >
                <option>انتخاب وعده غذایی</option>
                <option value="0">صبحانه</option>
                <option value="1">ناهار</option>
                <option value="2">شام</option>
              </select>
            </div>

            <div class="mb-3">
              <label for="disabledTextInput" class="form-label">
                نام بیماری
              </label>
              <select
                class="form-select"
                id="inputGroupSelect0"
                onChange={handelIllness}
              >
                <option>انتخاب بیماری</option>
                {illnessItem.map((item) => {
                  return (
                    <option
                      value={item.id}
                      selected={
                        illnessId == item.id && "selected"
                      }
                    >
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div class="mb-3">
              <label for="disabledTextInput" class="form-label">
                مجموعه کالری
              </label>
              <input
                value={sumCalories}
                type="text"
                id="disabledTextInput"
                class="form-control"
                placeholder="مجموعه کالری"
                onChange={handelSumcolories}
              />
            </div>
            <div class="mb-3">
              <label for="disabledTextInput" class="form-label">
                توضیحات
              </label>
              <textarea
                class="form-control"
                onChange={hanelDescription}
                rows="2"
              >
                {description}
              </textarea>
            </div>

            <div></div>

            <button type="submit" class="btn btn-primary">
              ویرایش کردن
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <div className="indexHome ">
      <p>در حال لود</p>
    </div>
  );
}

export default EditMeals;
