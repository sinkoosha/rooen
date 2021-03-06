import React, { useContext, useEffect, useState } from "react";
import auth from "../../../../contax/authContax";

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
function ProgramQuestion() {
  const programId = useParams().id;

  const programItem = useLocation().state;
  console.log("programItem", programItem);

  const accessToken = localStorage.getItem("accessToken");
  const [fetchQuestion, setFetchQuestion] = useState(null);
  const [refresh, setRefresh] = useState(0);
  let counter = 1;
  const questionIndex = () => {
    // POST request using fetch()
    fetch(
      `http://95.217.96.131:8080/api/admin/index-question/${programId}`,
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
          ? setFetchQuestion([])
          : setFetchQuestion(json.data);
      });
  };

  useEffect(() => {
    questionIndex();
  }, [refresh]);

  const handelQuestionRefresh = () => {
    setRefresh(refresh + 1);
  };

  return (
    <div className="indexHome">
      <div class="card">
        <div class="card-header">
          <h5>مدیریت پرسش ها - {programItem.name}</h5>
          <Link
            to={`/addQes/${programId}`}
            className="btn btn-primary"
            state={programItem}
          >
            افزودن پرسش
          </Link>
        </div>
        <div class="card-body">
          <table class="table table-bordered table-wetAsfalt">
            <thead>
              <tr>
                <th scope="col">ردیف</th>
                <th scope="col">پرسش</th>
                <th scope="col">ویرایش</th>
              </tr>
            </thead>
            <tbody>
              {fetchQuestion != null ? (
                fetchQuestion.length != 0 ? (
                  fetchQuestion.map((item) => (
                    <tr>
                      <th scope="row">{counter++}</th>
                      <td>{item.title_question}</td>

                      <td>
                        <Link
                          to={`/editQes/${item.id}`}
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
                    onChange={handelQuestionRefresh}
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

export default ProgramQuestion;
