import React, { useEffect, useContext, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./ExpertProfile.css";
import ManOutlinedIcon from "@mui/icons-material/ManOutlined";
import WomanOutlinedIcon from "@mui/icons-material/WomanOutlined";
import Switch from "@mui/material/Switch";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import auth from "../../../contax/authContax";
function ExpertReqestProfile({ refreshItem, setRefreshItem }) {
  const accessToken = localStorage.getItem("accessToken");
  const experts = useLocation().state;

  const [fetchExpres, setfetchExpres] = useState(null);
  const [fetchExpresRequest, setfetchExpresRequest] =
    useState(null);
  console.log(experts);

  const statusHandeler = (id) => {
    if (id === 0) {
      return "آفلاین";
    }
    if (id === 1) {
      return "آنلاین";
    }
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

  const expertStatusSwitch = (requsetId, status) => {
    fetch(
      "http://95.217.96.131:8080/api/admin/change-expert-request",
      {
        // Adding method type
        method: "POST",
        // Adding body or contents to send
        body: JSON.stringify({
          request_id: requsetId,
          result: status == 1 ? "0" : "1",
        }),
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
        setRefreshItem(refreshItem + 1);
      });
  };
  useEffect(() => {
    expertsRequestIndex();
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    if (fetchExpresRequest) {
      return fetchExpresRequest.filter(
        (item) => item.expert_id == experts.id
      );
    }
  };

  return fetchExpresRequest !== null ? (
    <div className="indexHome">
      <div class="page-content page-container" id="page-content">
        <div class="padding">
          <div class="row container d-flex justify-content-center">
            <div class="col-xl-12 col-md-12">
              <div class="card user-card-full">
                <div className="card-header">
                  مشاهده در خواست
                </div>
                <div class="card-body row m-l-0 m-r-0">
                  <div class="col-sm-4 bg-c-lite-green user-profile">
                    <div class="card-block text-center text-white">
                      <div class="m-b-25">
                        <img
                          src="https://img.icons8.com/bubbles/100/000000/user.png"
                          class="img-radius"
                          alt="User-Profile-Image"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-8">
                    <div class="card-block">
                      <div class="row">
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">نام</p>
                          <h6 class="text-muted f-w-400">
                            {experts.name}
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">
                            تاریخ درخواست
                          </p>
                          <h6 class="text-muted f-w-400">
                            {fetchProfile()[0].date}
                          </h6>
                        </div>
                      </div>

                      <div class="row">
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">وضعیت</p>
                          <h6 class="text-muted f-w-400">
                            <strong
                              classNam={
                                fetchProfile()[0].result == 0
                                  ? "red"
                                  : "green"
                              }
                            >
                              {statusHandeler(
                                fetchProfile()[0].result
                              )}
                            </strong>
                          </h6>
                          <h6>
                            <Switch
                              onChange={() => {
                                expertStatusSwitch(
                                  fetchProfile()[0].id,
                                  fetchProfile()[0].result
                                );
                              }}
                              checked={fetchProfile()[0].result}
                              inputProps={{
                                "aria-label": "controlled",
                              }}
                            />
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">توضیحات</p>
                          <h6 class="text-muted f-w-400">
                            {fetchProfile()[0].description}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="indexHome">
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    </div>
  );
}

export default ExpertReqestProfile;
