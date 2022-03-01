import React from "react";
import ChatInput from "./ChatInput";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
function Chat({
  fetGetMessage,
  setFetGetMessage,
  userinfo,
  sendMassage,
  setSendMassage,
  HandelsendMessage,
}) {
  return (
    <div class="chat">
      <div class="chat-header clearfix">
        <div class="row">
          <div class="col-lg-6">
            <div class="chat-about">
              <h6 class="m-b-0">
                {userinfo && userinfo.reciever_name}
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div class="chat-history">
        <ul class="m-b-0">
          {fetGetMessage ? (
            fetGetMessage.map((item) => (
              <li class="clearfix">
                <div class="message-data text-right">
                  <span class="message-data-time">
                    {item.name}
                  </span>
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    alt="avatar"
                  />
                </div>
                <div class="message other-message float-right">
                  {item.message}
                </div>
              </li>
            ))
          ) : (
            <>
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            </>
          )}
        </ul>
      </div>
      <ChatInput
        setSendMassage={setSendMassage}
        sendMassage={sendMassage}
        HandelsendMessage={HandelsendMessage}
      />
    </div>
  );
}

export default Chat;
