import React from "react";

function ChatInput() {
  return (
    <div class="chat-message clearfix">
      <div class="input-group mb-0">
        <div class="input-group-prepend">
          <button className="btn btn-danger">ارسال</button>
        </div>
        <input
          type="text"
          class="form-control"
          placeholder="Enter text here..."
        />
      </div>
    </div>
  );
}

export default ChatInput;
