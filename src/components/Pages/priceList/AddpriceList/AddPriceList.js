import React, { useContext, useState, useEffect } from "react";
import auth from "../../../../contax/authContax";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function AddpriceList() {
  const [priceListTitle, setPriceListTitle] = useState();
  const [price, setPrice] = useState();
  const [packageDay, setPackageDay] = useState();
  const [dietId, setdietId] = useState(1);
  const [fetchProgram, setFetchProgram] = useState(null);
  const navigate = useNavigate();
  const handelPriceListTitle = (e) => {
    setPriceListTitle(e.target.value);
  };
  const [refresh, setRefresh] = useState();
  const [ProgramType, setProgramType] = useState(1);
  const [loadIng, setLoadIng] = useState(true);

  const handelPrice = (e) => {
    setPrice(e.target.value);
  };
  const handelpackageDay = (e) => {
    setPackageDay(e.target.value);
  };

  const handelTypeProgram = (e) => {
    setProgramType(e.target.value);
  };

  const accessToken = localStorage.getItem("accessToken");
  const programIndex = () => {
    // POST request using fetch()
    fetch(
      "http://95.217.96.131:8080/api/admin/index-titleprogram/",
      {
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
      }
    )
      // Converting to JSON
      .then((response) => response.json())
      // // Displaying results to console
      .then((json) => {
        setFetchProgram(json.data);
      });
  };

  useEffect(() => {
    programIndex();
  }, [refresh]);

  const HandelSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", priceListTitle);
    formData.append("price", price);
    formData.append("total_days", packageDay);
    formData.append("diet_id", ProgramType);
    fetch(
      "http://95.217.96.131:8080/api/admin/insert-pricelist",
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
          navigate("/priceList");
        }
      });
  };

  return fetchProgram !== null ? (
    <div className="indexHome ">
      <div class="">
        <div class="card-header"> افزودن لیست قیمت</div>
        <div class="card-body">
          <form className="col-md-6" onSubmit={HandelSubmit}>
            <div class="mb-3">
              <label for="disabledTextInput" class="form-label">
                نام پکیج
              </label>
              <input
                type="text"
                id="disabledTextInput"
                class="form-control"
                placeholder="نام پکیج"
                onChange={handelPriceListTitle}
              />
            </div>
            <div class="mb-3">
              <label for="disabledTextInput" class="form-label">
                قیمت پکیج
              </label>
              <input
                type="text"
                id="disabledTextInput"
                class="form-control"
                placeholder="قیمت پکیج"
                onChange={handelPrice}
              />
            </div>
            <div class="mb-3">
              <label for="disabledTextInput" class="form-label">
                نوع برنامه
              </label>
              <select
                class="form-select"
                id="inputGroupSelect0"
                onChange={handelTypeProgram}
              >
                {fetchProgram.map((item, i) => {
                  return <option value={i}>{item.name}</option>;
                })}
              </select>
            </div>
            <div class="mb-3">
              <label for="disabledTextInput" class="form-label">
                مدت پکیج
              </label>
              <input
                type="text"
                id="disabledTextInput"
                class="form-control"
                placeholder="مدت پکیج"
                onChange={handelpackageDay}
              />
            </div>

            <div></div>

            <button type="submit" class="btn btn-primary">
              اضافه کردن
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

export default AddpriceList;
