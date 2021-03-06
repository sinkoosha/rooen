import React, { useContext, useState, useEffect } from "react";
import auth from "../../../../contax/authContax";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

function AddMeal() {
  const navigate = useNavigate();
  const [detailsMeal, setDetailsMeal] = useState();
  const [season, setSeason] = useState(null);
  const [mealType, setMealType] = useState();
  const [calory, setCalory] = useState(1);
  const [sumCalories, setsumCalories] = useState(null);
  const [illnessItem, setIllnessItem] = useState(null);
  const [illnessId, setIllnessId] = useState(null);
  const [refresh, setRefresh] = useState();
  const [description, SetDescription] = useState();
  const [loadIng, setLoadIng] = useState(true);

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
    fetch("http://95.217.96.131:8080/api/admin/insert-meal", {
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
        <div class="card-header">???????????? ???????? ?????? ??????????</div>
        <div class="card-body">
          <form className="col-md-6" onSubmit={HandelSubmit}>
            <div class="mb-3">
              <label for="disabledTextInput" class="form-label">
                ?????? ???????? ??????????
              </label>
              <input
                type="text"
                id="disabledTextInput"
                class="form-control"
                placeholder="?????? ???????? ??????????"
                onChange={hanelDetailsMeals}
              />
            </div>
            <div class="mb-3">
              <label for="disabledTextInput" class="form-label">
                ??????
              </label>
              <select
                class="form-select"
                id="inputGroupSelect0"
                onChange={handelseason}
              >
                <option>???????????? ??????</option>
                <option value="0">???????? ????????</option>
                <option value="1">????????</option>
                <option value="2">??????????????</option>
                <option value="3">??????????</option>
                <option value="4">????????????</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="disabledTextInput" class="form-label">
                ?????? ???????? ??????????
              </label>
              <select
                class="form-select"
                id="inputGroupSelect0"
                onChange={handelMealType}
              >
                <option>???????????? ???????? ??????????</option>
                <option value="0">????????????</option>
                <option value="1">??????????</option>
                <option value="2">??????</option>
                <option value="3">???????? ????????</option>
              </select>
            </div>

            <div class="mb-3">
              <label for="disabledTextInput" class="form-label">
                ?????? ????????????
              </label>
              <select
                class="form-select"
                id="inputGroupSelect0"
                onChange={handelIllness}
              >
                <option>???????????? ????????????</option>
                {illnessItem.map((item) => {
                  return (
                    <option value={item.id}>{item.name}</option>
                  );
                })}
              </select>
            </div>
            <div class="mb-3">
              <label for="disabledTextInput" class="form-label">
                ???????????? ??????????
              </label>
              <input
                type="text"
                id="disabledTextInput"
                class="form-control"
                placeholder="???????????? ??????????"
                onChange={handelSumcolories}
              />
            </div>
            <div class="mb-3">
              <label for="disabledTextInput" class="form-label">
                ??????????????
              </label>
              <textarea
                class="form-control"
                onChange={hanelDescription}
                rows="2"
              ></textarea>
            </div>

            <div></div>

            <button type="submit" class="btn btn-primary">
              ?????????? ????????
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <div className="indexHome ">
      {loadIng && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "30px",
            }}
          >
            <CircularProgress />
          </Box>
        </>
      )}
    </div>
  );
}

export default AddMeal;
