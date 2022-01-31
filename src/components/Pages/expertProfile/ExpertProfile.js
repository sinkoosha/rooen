import React, { useEffect, useContext, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./ExpertProfile.css";
import ManOutlinedIcon from "@mui/icons-material/ManOutlined";
import WomanOutlinedIcon from "@mui/icons-material/WomanOutlined";
import Switch from "@mui/material/Switch";

import auth from "../../../contax/authContax";
function ExpertProfile() {
  const accessToken = localStorage.getItem("accessToken");
  const location = useLocation();
  const ParamIndex = useParams();
  const [fetchExpres, setfetchExpres] = useState(null);
  const [dataLoaded, setDataloaded] = useState(false);
  const [refresh, setRefresh] = useState(0);
  let itemProfile = 0;
  const expertsIndex = () => {
    // POST request using fetch()
    fetch("http://95.217.96.131:8080/api/admin/index-expert", {
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
        const findItemIndex = json.data.findIndex(
          (item) => item.id == ParamIndex.id
        );
        setfetchExpres(json.data[findItemIndex]);
        setDataloaded(true);
      });
  };
  useEffect(() => {
    expertsIndex();
  }, [refresh]);

  const genderHandele = (value) => {
    if (value == 0) {
      return <ManOutlinedIcon>مرد </ManOutlinedIcon>;
    } else {
      return <WomanOutlinedIcon>زن</WomanOutlinedIcon>;
    }
  };

  const expertStatusSwitch = (profileId, status) => {
    console.log("is run?1?1");
    fetch("http://95.217.96.131:8080/api/admin/confirm-expert", {
      // Adding method type
      method: "POST",
      // Adding body or contents to send
      body: JSON.stringify({
        expert_id: profileId,
        active: status == 1 ? "0" : "1",
      }),
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
        console.log(json);
        setRefresh(refresh + 1);
      });
  };

  return (
    <div className="indexHome">
      {dataLoaded ? (
        <div className="container rounded bg-white mt-5 mb-5 card">
          <div className="row">
            <div className="col-md-3 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img
                  className="rounded-circle mt-5"
                  width="150px"
                  //   {item.avatar === "nopic.jpg" ? (src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg") :
                  //   (src=item.pic) }
                  src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                />
                <span className="font-weight-bold">
                  {fetchExpres.name}
                </span>
                <span className="text-black-50">
                  {fetchExpres.email}
                </span>

                <h3>
                  {fetchExpres.is_active == 0
                    ? "غیر فعال"
                    : "فعال"}
                </h3>

                <div class="switch">
                  <Switch
                    onChange={() => {
                      expertStatusSwitch(
                        fetchExpres.id,
                        fetchExpres.is_active
                      );
                    }}
                    checked={
                      fetchExpres.is_active == 1 ? true : false
                    }
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-5 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">اطلاعات پروفایل</h4>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="labels">
                      نام و نام خانوادگی
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="first name"
                      value={fetchExpres.name}
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="labels">جنسیت</label>
                    {genderHandele(fetchExpres.gender)}
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">شماره تماس</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter phone number"
                      value={fetchExpres.mobile}
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">شهر</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      value={fetchExpres.city}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      ) : (
        "nodata"
      )}
    </div>
  );
}

export default ExpertProfile;
