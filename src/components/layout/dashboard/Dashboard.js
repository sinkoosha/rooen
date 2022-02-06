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
import PriceListIndex from "../../Pages/priceList/priceListIndex";
import AddpriceList from "../../Pages/priceList/AddpriceList/AddPriceList";
import EditpriceList from "../../Pages/priceList/ٍEditePriceList/EditePriceList";
import MealIndex from "../../Pages/meal/MealIndex";
import AddMeal from "../../Pages/meal/Addmeal/AddMeal";
import EditMeals from "../../Pages/meal/EditMeals/EditMeals";

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
            <Route
              path="/priceList"
              element={<PriceListIndex />}
            ></Route>
            <Route
              path="/priceList"
              element={<PriceListIndex />}
            ></Route>
            <Route
              path="/addpriceList"
              element={<AddpriceList />}
            ></Route>
            <Route
              path="/editPriceList/:id"
              element={<EditpriceList />}
            ></Route>
            <Route path="/meals" element={<MealIndex />}></Route>
            <Route path="/addMeal" element={<AddMeal />}></Route>
            <Route
              path="/editMeals/:id"
              element={<EditMeals />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default Dashboard;
