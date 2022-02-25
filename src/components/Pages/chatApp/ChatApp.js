import React, { useState } from "react";
import Chat from "../../layout/chatapp/Chat";
import Plist from "../../layout/chatapp/Plist";
import "./chatApp.css";
function ChatApp() {
  return (
    <div className="indexHome">
      <div class="row clearfix">
        <div class="col-lg-12">
          <div class="card chat-app">
            <Plist />
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChatApp;
