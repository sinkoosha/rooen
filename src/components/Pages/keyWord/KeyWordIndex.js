import React, { useContext, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
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
function KeyWordIndex() {
  const programId = useParams().id;

  const programItem = useLocation().state;
  console.log("programItem", programItem);

  const accessToken = localStorage.getItem("accessToken");
  const [fetchKeyWord, setFetchKeyWord] = useState(null);
  const [refresh, setRefresh] = useState(0);
  let counter = 1;
  const keyWordIndex = () => {
    // POST request using fetch()
    fetch(`http://95.217.96.131:8080/api/admin/index-keyword/`, {
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
          ? setFetchKeyWord([])
          : setFetchKeyWord(json.data);
      });
  };

  useEffect(() => {
    keyWordIndex();
  }, [refresh]);

  const handelIllnessRefresh = () => {
    setRefresh(refresh + 1);
  };

  return (
    <div className="indexHome">
      <div class="card">
        <div class="card-header">
          <h5>مشاهده کلید واژه</h5>
          <Link
            to={`/addkeyword`}
            className="btn btn-primary"
            state={programItem}
          >
            افزودن کلید واژه
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
              {fetchKeyWord != null ? (
                fetchKeyWord.length != 0 ? (
                  fetchKeyWord.map((item) => (
                    <tr>
                      <th scope="row">{counter++}</th>
                      <td>{item.name}</td>

                      <td>
                        <Link
                          to={`/editKeyWord/${item.id}`}
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

export default KeyWordIndex;
