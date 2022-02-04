import react from "react";
const expertsIndex = () => {
  let jsonData;

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
      Authorization: localStorage.getItem("accessToken"),
    },
  })
    // Converting to JSON
    .then((response) => response.json())
    // // Displaying results to console
    .then((json) => {
      return json.data;
    });
};

const fetchProgram = () => {
  let jsonData = null;

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
        Authorization: localStorage.getItem("accessToken"),
      },
    }
  )
    // Converting to JSON
    .then((response) => response.json())
    // // Displaying results to console
    .then((json) => {
      return json.data;
    });
};
export { expertsIndex, fetchProgram };
