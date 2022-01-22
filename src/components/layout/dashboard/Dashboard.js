import React, { useState } from "react";
import Index from "../../index/Index";
import Topnavbar from "../../topnavbar/Topnavbar";
import RightBar from "../../rightbar/Rightbar";
import "./dashbord.css";
import ExpertsIndex from "../../Pages/experts/ExpertsIndex";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

function Dashboard() {
  return (
    <>
      <div className="con">
        <BrowserRouter>
          <RightBar />
          <Routes>
            <Route path="/" element={<ExpertsIndex />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default Dashboard;
