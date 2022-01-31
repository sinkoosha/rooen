import React, { useState } from "react";
import Index from "../../index/Index";
import Topnavbar from "../../topnavbar/Topnavbar";
import RightBar from "../../rightbar/Rightbar";
import "./dashbord.css";
import ExpertsIndex from "../../Pages/experts/ExpertsIndex";
import auth from "../../../contax/authContax";
import ExpertProfile from "../../Pages/expertProfile/ExpertProfile";
import ProgramIndex from "../../Pages/program/ProgramIndex/ProgramIndex";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import ProgramQuestion from "../../Pages/program/programQuestion/ProgramQuestion";
import AddProgram from "../../Pages/program/addProgram/AddProgram";
import EditProgram from "../../Pages/program/editeProgram/EditeProgram";
import AddProgramQuestion from "../../Pages/program/programQuestion/addProgramQuestion/AddProgramQuestion";
import EditeProgramQuestion from "../../Pages/program/programQuestion/editeProgramQuestion/EditeProgramQuestion";
import IllnessIndex from "../../Pages/illness/IllnessIndex";
import AddIllness from "../../Pages/illness/AddIllnes/AddIllness";
import EditEllness from "../../Pages/illness/editIllness/EditIllness";

function Dashboard() {
  return (
    <>
      <Topnavbar />
      <div className="con">
        <BrowserRouter>
          <RightBar />
          <Routes>
            <Route path="/" element={<ExpertsIndex />}></Route>
            <Route
              path="/users/:id"
              element={<ExpertProfile />}
            ></Route>
            <Route
              path="/program"
              element={<ProgramIndex />}
            ></Route>
            <Route
              path="/program/indexQuestion/:id"
              element={<ProgramQuestion />}
            ></Route>
            <Route
              path="/addProgram"
              element={<AddProgram />}
            ></Route>
            <Route
              path="/editProgram/:id"
              element={<EditProgram />}
            ></Route>
            <Route
              path="/addQes/:id"
              element={<AddProgramQuestion />}
            ></Route>
            <Route
              path="/editQes/:id"
              element={<EditeProgramQuestion />}
            ></Route>
            <Route
              path="/Illness"
              element={<IllnessIndex />}
            ></Route>
            <Route
              path="/addIllness"
              element={<AddIllness />}
            ></Route>
            <Route
              path="/editIlness/:id"
              element={<EditEllness />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default Dashboard;
