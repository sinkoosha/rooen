import React from "react";

function Plist() {
  return (
    <div>
      {" "}
      <div id="plist" class="people-list">
        <div class="input-group">
          <div class="input-group-prepend"></div>
        </div>
        <ul class="list-unstyled chat-list mt-2 mb-0">
          <li class="clearfix">
            <img
              src="https://bootdey.com/img/Content/avatar/avatar3.png"
              alt="avatar"
            />
            <div class="about">
              <div class="name">Mike Thomas</div>
              <div class="status">
                {" "}
                <i class="fa fa-circle online"></i> online{" "}
              </div>
            </div>
          </li>
          <li class="clearfix">
            <img
              src="https://bootdey.com/img/Content/avatar/avatar7.png"
              alt="avatar"
            />
            <div class="about">
              <div class="name">Christian Kelly</div>
              <div class="status">
                {" "}
                <i class="fa fa-circle offline"></i> left 10
                hours ago{" "}
              </div>
            </div>
          </li>
          <li class="clearfix">
            <img
              src="https://bootdey.com/img/Content/avatar/avatar8.png"
              alt="avatar"
            />
            <div class="about">
              <div class="name">Monica Ward</div>
              <div class="status">
                {" "}
                <i class="fa fa-circle online"></i> online{" "}
              </div>
            </div>
          </li>
          <li class="clearfix">
            <img
              src="https://bootdey.com/img/Content/avatar/avatar3.png"
              alt="avatar"
            />
            <div class="about">
              <div class="name">Dean Henry</div>
              <div class="status">
                {" "}
                <i class="fa fa-circle offline"></i> offline
                since Oct 28{" "}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Plist;
