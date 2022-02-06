import React, { useState, useEffect } from "react";
import auth from "../../../../contax/authContax";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

function EditpriceList() {
  const priceListItem = useLocation().state;
  console.log(priceListItem);
  const [priceListTitle, setPriceListTitle] = useState(
    priceListItem.name
  );
  const [price, setPrice] = useState(priceListItem.price);
  const [packageDay, setPackageDay] = useState(
    priceListItem.total_days
  );
  const [dietId, setdietId] = useState(priceListItem.diet_id);
  const [fetchProgram, setFetchProgram] = useState(null);
  const navigate = useNavigate();
  const handelPriceListTitle = (e) => {
    setPriceListTitle(e.target.value);
  };
  const [refresh, setRefresh] = useState(1);

  const handelPrice = (e) => {
    e.persist();
    setPrice(e.target.value);
  };
  const handelpackageDay = (e) => {
    e.persist();
    setPackageDay(e.target.value);
  };

  const handelTypeProgram = (e) => {
    e.persist();
    setdietId(e.target.value);
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
    formData.append("diet_id", dietId);
    formData.append("pricelist_id", priceListItem.id);
    fetch("http://95.217.96.131:8080/api/admin/edit-pricelist", {
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
          navigate("/priceList");
        }
      });
  };

  return fetchProgram !== null ? (
    <div className="indexHome ">
      <div class="">
        <div class="card-header"> ویرایش لیست قیمت</div>
        <div class="card-body">
          <form className="col-md-6" onSubmit={HandelSubmit}>
            <div class="mb-3">
              <label for="disabledTextInput" class="form-label">
                نام پکیج
              </label>
              <input
                value={priceListTitle}
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
                value={price}
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
                  return (
                    <option
                      value={item.id}
                      selected={
                        item.id == priceListItem.diet_id &&
                        "selected"
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
                مدت پکیج
              </label>
              <input
                value={packageDay}
                type="text"
                id="disabledTextInput"
                class="form-control"
                placeholder="مدت پکیج"
                onChange={handelpackageDay}
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
  ) : (
    <div className="indexHome ">
      <p>...در حال لود</p>
    </div>
  );
}

export default EditpriceList;
