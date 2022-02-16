import React, { useContext, useEffect, useState } from "react";
import auth from "../../../contax/authContax";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import PregnantWomanOutlinedIcon from "@mui/icons-material/PregnantWomanOutlined";
import ManOutlinedIcon from "@mui/icons-material/ManOutlined";
import WomanOutlinedIcon from "@mui/icons-material/WomanOutlined";
import CachedSharpIcon from "@mui/icons-material/CachedSharp";
import { Link } from "react-router-dom";
import { InsertEmoticonRounded } from "@mui/icons-material";

function IndexExpertRequest({ refreshItem, setRefreshItem }) {
  const accessToken = localStorage.getItem("accessToken");
  const [fetchExpres, setfetchExpres] = useState(null);
  const [fetchExpresRequest, setfetchExpresRequest] =
    useState(null);

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
        setfetchExpres(json.data);
      });
  };
  const expertsRequestIndex = () => {
    // POST request using fetch()
    fetch(
      "http://95.217.96.131:8080/api/admin/index-expert-request",
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
        setfetchExpresRequest(json.data);
      });
  };

  const findIndexExpert = (id) => {
    if (fetchExpres) {
      return fetchExpres.filter((item) => item.id == id);
    }
  };

  useEffect(() => {
    expertsIndex();
    expertsRequestIndex();
  }, [refreshItem]);

  const genderHandele = (value) => {
    if (value == 0) {
      return <ManOutlinedIcon>مرد </ManOutlinedIcon>;
    } else {
      return <WomanOutlinedIcon>زن</WomanOutlinedIcon>;
    }
  };
  const statusHandele = (value) => {
    if (value == 0) {
      return "غیر فعال";
    } else {
      return "فعال";
    }
  };
  const handelExpertsRefresh = () => {
    setRefreshItem(refreshItem + 1);
  };

  const handelUserInfo = (userId) => {};

  return (
    <div className="indexHome">
      <div class="card">
        <div class="card-header">مدیریت درخواست ها</div>
        <div class="card-body">
          <table class="table table-bordered table-wetAsfalt">
            <thead>
              <tr>
                <th scope="col">ردیف</th>
                <th scope="col">نام و نام خانوادگی</th>
                <th scope="col">تاریخ درخواست</th>
                <th scope="col">توضیحات</th>
                <th scope="col">اطلاعات بیشتر</th>
              </tr>
            </thead>
            <tbody>
              {fetchExpres != null &&
              fetchExpresRequest != null ? (
                fetchExpresRequest.map((item) => (
                  <tr>
                    <th scope="row">1</th>
                    <td>
                      {findIndexExpert(item.expert_id)[0].name}
                    </td>
                    <td>{item.date}</td>
                    <td>{item.description}</td>

                    <td>
                      <Link
                        to={`/expertReqest/${item.id}`}
                        state={
                          findIndexExpert(item.expert_id)[0]
                        }
                      >
                        اطلاعات بیشتر
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress />
                  </Box>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default IndexExpertRequest;
