import React, { useContext, useState } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

function AddpriceList() {
  const [priceListTitle, setPriceListTitle] = useState();

  const navigate = useNavigate();
  const programItem = useLocation().state;

  const handelPriceListTitle = (e) => {
    setPriceListTitle(e.target.value);
    console.log(priceListTitle);
  };

  const accessToken = localStorage.getItem("accessToken");

  const HandelSubmit = (e) => {
    // e.preventDefault();
    // const formData = new FormData();
    // formData.append("name", illnesTitle);
    // fetch(
    //   "http://95.217.96.131:8080/api/api/admin/insert-pricelist",
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

  return (
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

export default AddpriceList;