import React from "react";

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
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Rightbar() {
  return (
    <div className="sidebar">
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
            <Link to="/test" className="link">
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
                  <PermIdentity className="sidebarIcon" />
                  افزودن برنامه
                </li>
              </Link>
              <Link to="/program" className="link">
                <li className="sidebarListItem">
                  <PermIdentity className="sidebarIcon" />
                  مشاهده برنامه
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
                  <PermIdentity className="sidebarIcon" />
                  افزودن بیماری
                </li>
              </Link>
              <Link to="/illness" className="link">
                <li className="sidebarListItem">
                  <PermIdentity className="sidebarIcon" />
                  مشاهده بیماری
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
