import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
function Plist({
  fetchConverstion,
  setFetchConverstion,
  HandelUserClick,
  refresh,
}) {
  return (
    <div>
      <div id="plist" class="people-list">
        <div class="input-group">
          <div class="input-group-prepend"></div>
        </div>
        <ul class="list-unstyled chat-list mt-2 mb-0">
          {fetchConverstion ? (
            fetchConverstion.map((item) => (
              <>
                <li class="clearfix">
                  <button
                    className="ChatuserBtn"
                    onClick={() => {
                      HandelUserClick(
                        item.conversation_id,
                        item
                      );
                    }}
                  >
                    {item.unread_msg_count != 0 && (
                      <span class="badge">
                        {item.unread_msg_count}
                      </span>
                    )}

                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar3.png"
                      alt="avatar"
                    />
                    <div class="about">
                      <div class="name">
                        {item.reciever_name}
                      </div>
                      <div class="status">
                        <i class="fa fa-circle online"></i>{" "}
                        {item.title}
                      </div>
                    </div>
                  </button>
                </li>
              </>
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
    </div>
  );
}

export default Plist;
