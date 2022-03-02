import React, { useEffect, useState } from "react";
import Chat from "../../layout/chatapp/Chat";
import Plist from "../../layout/chatapp/Plist";
import "./chatApp.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function ChatApp() {
  const [conversationId, setConverstionId] = useState(null);
  const [fetchConverstion, setfetchConverstion] = useState(null);
  const [fetGetMessage, setFetGetMessage] = useState(null);
  const accessToken = localStorage.getItem("accessToken");
  const [sendMassage, setSendMassage] = useState();
  const [userinfo, setUserInfo] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [showMsg, setShowMsg] = useState(false);

  const HandelsendMessage = () => {
    // POST request using fetch()
    console.log("ok");
    fetch(
      `http://95.217.96.131:8080/api/conversation/sendmessage`,
      {
        // Adding method type
        method: "POST",
        // Adding body or contents to send
        body: JSON.stringify({
          conversation_id: userinfo.conversation_id,
          message: sendMassage,
        }),
        // Adding headers to the request
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text-plain, */*",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: accessToken,
        },
      }
    )
      // Converting to JSON
      .then((response) => response.json())
      // // Displaying results to console
      .then((json) => {
        getMessage(userinfo.conversation_id);
      });
  };

  const converstionIndex = () => {
    // POST request using fetch()
    fetch(`http://95.217.96.131:8080/api/conversation`, {
      // Adding method type
      method: "GET",
      // Adding body or contents to send

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
        setfetchConverstion(json);
      });
  };

  const getMessage = (id) => {
    setShowMsg(true);
    setFetGetMessage(null);
    fetch(
      `http://95.217.96.131:8080/api/conversation/getmessage/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text-plain, */*",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: accessToken,
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        setFetGetMessage(json.data);
      });
  };

  const HandelUserClick = (id, item) => {
    getMessage(id);
    setUserInfo(item);
  };

  useEffect(() => {
    conversationId && getMessage(conversationId);
  }, [conversationId, refresh]);

  useEffect(() => {
    converstionIndex();
  }, []);

  return (
    <div className="indexHome">
      <div class="row clearfix">
        <div class="col-lg-12">
          <div class="card chat-app">
            <Plist
              fetchConverstion={fetchConverstion}
              setfetchConverstion={setfetchConverstion}
              HandelUserClick={HandelUserClick}
            />
            <Chat
              showMsg={showMsg}
              fetGetMessage={fetGetMessage}
              setFetGetMessage={setFetGetMessage}
              userinfo={userinfo}
              setSendMassage={setSendMassage}
              sendMassage={sendMassage}
              HandelsendMessage={HandelsendMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChatApp;
