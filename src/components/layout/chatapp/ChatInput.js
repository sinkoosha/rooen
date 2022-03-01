import React, { useState } from "react";

function ChatInput({
  sendMassage,
  setSendMassage,
  HandelsendMessage,
}) {
  return (
    <div class="chat-message clearfix">
      <div class="input-group mb-0">
        <div class="input-group-prepend">
          <button
            className="btn btn-danger"
            onClick={HandelsendMessage}
          >
            ارسال
          </button>
        </div>
        <input
          type="text"
          class="form-control"
          placeholder="Enter text here..."
          onChange={(e) => {
            setSendMassage(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default ChatInput;
