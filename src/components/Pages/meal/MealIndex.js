import React, { useContext, useEffect, useState } from "react";

import PregnantWomanOutlinedIcon from "@mui/icons-material/PregnantWomanOutlined";
import ManOutlinedIcon from "@mui/icons-material/ManOutlined";
import WomanOutlinedIcon from "@mui/icons-material/WomanOutlined";
import CachedSharpIcon from "@mui/icons-material/CachedSharp";
import {
  Link,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { InsertEmoticonRounded } from "@mui/icons-material";
import { fetchIllness } from "../../../utils/apiConfig";
function MealIndex() {
  const accessToken = localStorage.getItem("accessToken");
  const [fetchMeals, setFetchMeals] = useState(null);
  const [fetchIllness, setfetchIllness] = useState(null);
  const [refresh, setRefresh] = useState(0);
  let counter = 1;

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
        setfetchIllness(json.data);
      });
  };

  const mealIndex = () => {
    // POST request using fetch()
    fetch("http://95.217.96.131:8080/api/admin/index-meal/", {
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
        json.data == 0
          ? setFetchMeals([])
          : setFetchMeals(json.data);
      });
  };

  useEffect(() => {
    illnessIndex();
    mealIndex();
  }, [refresh]);

  const handelPriceListRefresh = () => {
    setRefresh(refresh + 1);
  };

  const findillnessName = (id) => {
    if (fetchIllness) {
      let illnessNameIndex = null;

      illnessNameIndex = fetchIllness.findIndex(
        (item) => item.id == id
      );

      return fetchIllness[illnessNameIndex] == undefined
        ? "-"
        : fetchIllness[illnessNameIndex].name;
    }
  };
  const findSeason = (id) => {
    let season = "تمام فصول";
    id == 1 && (season = "بهار");
    id == 2 && (season = "تابستان");
    id == 3 && (season = "پاییز");
    id == 4 && (season = "زمستان");

    return season;
  };

  return (
    <div className="indexHome">
      <div class="card">
        <div class="card-header">
          <h5>نام وعده غذایی</h5>
        </div>
        <div class="card-body">
          <table class="table table-bordered table-wetAsfalt">
            <thead>
              <tr>
                <th scope="col">ردیف</th>
                <th scope="col">نام وعده غذایی</th>
                <th scope="col">نام بیماری</th>
                <th scope="col">میزان کالری</th>
                <th scope="col">مجموعه کالری ها</th>
                <th scope="col">فصل</th>
                <th scope="col">ویرایش</th>{" "}
              </tr>
            </thead>
            <tbody>
              {fetchMeals != null && fetchIllness != null ? (
                fetchMeals.length != 0 ? (
                  fetchMeals.map((item) => (
                    <tr>
                      <th scope="row">{counter++}</th>
                      <td>{item.details}</td>
                      <td>{findillnessName(item.illness_id)}</td>
                      <td>{item.calory}</td>
                      <td>{item.sumcalories}</td>
                      <td>{findSeason(item.season)} </td>

                      <td>
                        <Link
                          to={`/editMeals/${item.id}`}
                          state={item}
                        >
                          ویرایش
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  "ایتمی وجود ندارد"
                )
              ) : (
                <>
                  <div>اطلاعاتی یافت نشد</div>
                  <button
                    className=""
                    onChange={handelPriceListRefresh}
                  >
                    <CachedSharpIcon />
                  </button>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MealIndex;
