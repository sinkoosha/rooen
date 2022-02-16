import React, { useContext, useState } from "react";
import auth from "../../contax/authContax";
import "./rightbar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  AddShoppingCart,
  FoodBank,
  MenuBook,
  Keyboard,
  Accessible,
  AlarmAdd,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Rightbar() {
  const accessToken = localStorage.getItem("accessToken");
  const mobil = localStorage.getItem("mobil");
  const authInfo = useContext(auth);
  const LogOutBtn = () => {
    console.log(authInfo);
    fetch("http://95.217.96.131:8080/api/logout", {
      // Adding method type
      method: "POST",
      // Adding body or contents to send
      body: JSON.stringify({
        mobil: mobil,
      }),
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
        localStorage.clear();
        window.location.href = `/`;
      });
  };

  return (
    <div className="sidebar">
      <button className="btn btn-danger" onClick={LogOutBtn}>
        خروج
      </button>
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">مدیریت کارشناس ها</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                مدیریت کار شناس ها
              </li>
            </Link>
            <Link to="/indexExpertRequest" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                مدیریت در خواست ها
              </li>
            </Link>
          </ul>
        </div>

        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">مدیریت برنامه ها</h3>
            <ul className="sidebarList">
              <Link to="/addProgram" className="link">
                <li className="sidebarListItem">
                  <AlarmAdd className="sidebarIcon" />
                  افزودن برنامه
                </li>
              </Link>
              <Link to="/program" className="link">
                <li className="sidebarListItem">
                  <AlarmAdd className="sidebarIcon" />
                  مشاهده برنامه
                </li>
              </Link>
            </ul>
          </div>
        </div>

        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">مدیریت وعده غذایی </h3>
            <ul className="sidebarList">
              <Link to="/addMeal" className="link">
                <li className="sidebarListItem">
                  <FoodBank className="sidebarIcon" />
                  افزودن وعده غذایی
                </li>
              </Link>
              <Link to="/meals" className="link">
                <li className="sidebarListItem">
                  <MenuBook className="sidebarIcon" />
                  مشاهده وعده غذایی
                </li>
              </Link>
            </ul>
          </div>
        </div>

        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">مدیریت بیماری ها</h3>
            <ul className="sidebarList">
              <Link to="/addIllness" className="link">
                <li className="sidebarListItem">
                  <Accessible className="sidebarIcon" />
                  افزودن بیماری
                </li>
              </Link>
              <Link to="/illness" className="link">
                <li className="sidebarListItem">
                  <Accessible className="sidebarIcon" />
                  مشاهده بیماری
                </li>
              </Link>
            </ul>
          </div>
        </div>

        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">مدیریت کلید واژه </h3>
            <ul className="sidebarList">
              <Link to="/addkeyword" className="link">
                <li className="sidebarListItem">
                  <Keyboard className="sidebarIcon" />
                  افزودن کلید واژه
                </li>
              </Link>
              <Link to="/keyword" className="link">
                <li className="sidebarListItem">
                  <Keyboard className="sidebarIcon" />
                  مدیریت کلید واژه
                </li>
              </Link>
            </ul>
          </div>
        </div>

        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">مدیریت لیست قیمت </h3>
            <ul className="sidebarList">
              <Link to="/addpriceList" className="link">
                <li className="sidebarListItem">
                  <AddShoppingCart className="sidebarIcon" />
                  افزودن لیست قیمت
                </li>
              </Link>
              <Link to="/priceList" className="link">
                <li className="sidebarListItem">
                  <AddShoppingCart className="sidebarIcon" />
                  مشاهده لیست قیمت
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
