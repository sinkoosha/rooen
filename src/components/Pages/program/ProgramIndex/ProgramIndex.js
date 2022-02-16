import React, { useContext, useEffect, useState } from "react";
import auth from "../../../../contax/authContax";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import PregnantWomanOutlinedIcon from "@mui/icons-material/PregnantWomanOutlined";
import ManOutlinedIcon from "@mui/icons-material/ManOutlined";
import WomanOutlinedIcon from "@mui/icons-material/WomanOutlined";
import CachedSharpIcon from "@mui/icons-material/CachedSharp";
import { Link } from "react-router-dom";
import { InsertEmoticonRounded } from "@mui/icons-material";

function ProgramIndex() {
  const accessToken = localStorage.getItem("accessToken");
  const [fetchProgram, setFetchProgram] = useState(null);
  const [refresh, setRefresh] = useState(0);
  let counter = 1;
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

  const handelExpertsRefresh = () => {
    setRefresh(refresh + 1);
  };

  return (
    <div className="indexHome">
      <div class="card">
        <div class="card-header">مدیریت برنامه ها </div>
        <div class="card-body">
          <table class="table table-bordered table-wetAsfalt">
            <thead>
              <tr>
                <th scope="col">ردیف</th>
                <th>نام برنامه</th>
                <th scope="col">مدیریت پرسش ها</th>
                <th scope="col">ویرایش</th>
              </tr>
            </thead>
            <tbody>
              {fetchProgram != null ? (
                fetchProgram.map((item) => (
                  <tr>
                    <th scope="row">{counter++}</th>
                    <td>{item.name}</td>

                    <td>
                      <Link
                        to={`indexQuestion/${item.id}`}
                        state={item}
                      >
                        مدیریت پرسش ها
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/editProgram/${item.id}`}
                        state={item}
                      >
                        ویرایش
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

export default ProgramIndex;
