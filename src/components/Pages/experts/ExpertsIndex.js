import React, { useContext, useEffect, useState } from "react";
import auth from "../../../contax/authContax";

import PregnantWomanOutlinedIcon from "@mui/icons-material/PregnantWomanOutlined";
import ManOutlinedIcon from "@mui/icons-material/ManOutlined";
import WomanOutlinedIcon from "@mui/icons-material/WomanOutlined";
import CachedSharpIcon from "@mui/icons-material/CachedSharp";
import { Link } from "react-router-dom";
import { InsertEmoticonRounded } from "@mui/icons-material";

function ExpertsIndex() {
  const accessToken = localStorage.getItem("accessToken");
  const [fetchExpres, setfetchExpres] = useState(null);
  const [refresh, setRefresh] = useState(0);

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
  const statusHandele = (value) => {
    if (value == 0) {
      return "غیر فعال";
    } else {
      return "فعال";
    }
  };
  const handelExpertsRefresh = () => {
    setRefresh(refresh + 1);
  };

  const handelUserInfo = (userId) => {};

  return (
    <div className="indexHome">
      <div class="card">
        <div class="card-header">مدیریت کارشناس ها</div>
        <div class="card-body">
          <table class="table table-bordered table-wetAsfalt">
            <thead>
              <tr>
                <th scope="col">ردیف</th>
                <th scope="col">نام و نام خانوادگی</th>
                <th scope="col">جنسیت</th>
                <th scope="col">شماره تماس</th>
                <th scope="col">وضعیت</th>
                <th scope="col">اطلاعات بیشتر</th>
              </tr>
            </thead>
            <tbody>
              {fetchExpres != null ? (
                fetchExpres.map((item) => (
                  <tr>
                    <th scope="row">1</th>
                    <td>{item.name}</td>
                    <td>{genderHandele(item.gender)}</td>
                    <td>{item.mobile}</td>
                    <td>{statusHandele(item.is_active)}</td>

                    <td>
                      <Link to={`users/${item.id}`} state={item}>
                        اطلاعات بیشتر
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  <div>اطلاعاتی یافت نشد</div>
                  <button onClick={handelExpertsRefresh}>
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

export default ExpertsIndex;
