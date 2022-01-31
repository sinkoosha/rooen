import React, { useContext, useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

function EditIllness() {
  const [illnessTitle, setIllnessTitle] = useState(
    useLocation().state.name
  );
  console.log(illnessTitle);

  return <div className="indexHome "></div>;
}

export default EditIllness;
