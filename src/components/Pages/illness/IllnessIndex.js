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
function IllnessIndex() {
  const programId = useParams().id;

  const programItem = useLocation().state;
  console.log("programItem", programItem);

  const accessToken = localStorage.getItem("accessToken");
  const [fetchIllness, setFetchIllness] = useState(null);
  const [refresh, setRefresh] = useState(0);
  let counter = 1;
  const illnessIndex = () => {
    // POST request using fetch()
    fetch(`http://95.217.96.131:8080/api/admin/index-illness`, {
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
          ? setFetchIllness([])
          : setFetchIllness(json.data);
      });
  };

  useEffect(() => {
    illnessIndex();
  }, [refresh]);

  const handelIllnessRefresh = () => {
    setRefresh(refresh + 1);
  };

  return (
    <div className="indexHome">
      <div class="card">
        <div class="card-header">
          <h5>مشاهده بیماری</h5>
          <Link
            to={`/addQes/${programId}`}
            className="btn btn-primary"
            state={programItem}
          >
            افزودن بیماری{" "}
          </Link>
        </div>
        <div class="card-body">
          <table class="table table-bordered table-wetAsfalt">
            <thead>
              <tr>
                <th scope="col">ردیف</th>
                <th scope="col">نام بیماری</th>
                <th scope="col">ویرایش</th>
              </tr>
            </thead>
            <tbody>
              {fetchIllness != null ? (
                fetchIllness.length != 0 ? (
                  fetchIllness.map((item) => (
                    <tr>
                      <th scope="row">{counter++}</th>
                      <td>{item.name}</td>

                      <td>
                        <Link
                          to={`/editIlness/${item.id}`}
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
                    onChange={handelIllnessRefresh}
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

export default IllnessIndex;
