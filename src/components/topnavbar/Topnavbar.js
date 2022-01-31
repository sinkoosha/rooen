import React from "react";
import "./topnavbar.css";
import {
  NotificationsNone,
  Language,
  Settings,
} from "@mui/icons-material";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">
            <h3>رویین تن پنل مدیریت کاربران</h3>
          </span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer"></div>
        </div>
      </div>
    </div>
  );
}
