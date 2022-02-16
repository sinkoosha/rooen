import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import PregnantWomanOutlinedIcon from "@mui/icons-material/PregnantWomanOutlined";
import CircularProgress from "@mui/material/CircularProgress";
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
import { fetchProgram } from "../../../utils/apiConfig";
function PriceListIndex() {
  const accessToken = localStorage.getItem("accessToken");
  const [fetchPriceList, setFetchPriceList] = useState(null);
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

  const priceListIndex = () => {
    // POST request using fetch()
    fetch(
      `http://95.217.96.131:8080/api/admin/index-pricelist/`,
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
        json.data == 0
          ? setFetchPriceList([])
          : setFetchPriceList(json.data);
      });
  };

  useEffect(() => {
    programIndex();
    priceListIndex();
  }, [refresh]);

  const handelPriceListRefresh = () => {
    setRefresh(refresh + 1);
  };

  const findProgramName = (id) => {
    if (fetchProgram) {
      return fetchProgram.filter((item) => item.id == id);
    }
  };

  return (
    <div className="indexHome">
      <div class="card">
        <div class="card-header">
          <h5>مشاهده لیست قیمت</h5>
        </div>
        <div class="card-body">
          <table class="table table-bordered table-wetAsfalt">
            <thead>
              <tr>
                <th scope="col">ردیف</th>
                <th scope="col">نام پکیج</th>
                <th scope="col">نام برمامه</th>
                <th scope="col">قیمت</th>
                <th scope="col">مدت</th>
                <th scope="col">ویرایش</th>{" "}
              </tr>
            </thead>
            <tbody>
              {fetchPriceList != null && fetchProgram != null ? (
                fetchPriceList.length != 0 ? (
                  fetchPriceList.map((item) => (
                    <tr>
                      <th scope="row">{counter++}</th>
                      <td>{item.name}</td>
                      <td>
                        {findProgramName(item.diet_id)[0].name}
                      </td>
                      <td>{item.price}</td>
                      <td>{item.total_days} روز</td>

                      <td>
                        <Link
                          to={`/editPriceList/${item.id}`}
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
                  <>
                    <Box sx={{ display: "flex" }}>
                      <CircularProgress />
                    </Box>
                  </>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PriceListIndex;
