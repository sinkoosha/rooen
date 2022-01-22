import React from "react";

function Loginform({
  loginSubmit,
  handelMobilChange,
  mobilError,
}) {
  return (
    <>
      <div class="fadeIn first">
        <h2>لطفا شماره همراه خود را وارد کنید</h2>
      </div>
      <div>
        <form id="loginform" onSubmit={loginSubmit}>
          <input
            type="text"
            id="login"
            class="fadeIn second"
            name="mobil"
            placeholder="شماره موبایل خود را وارد کنید"
            onChange={handelMobilChange}
          />
          <small
            id="emailHelp"
            className="text-danger form-text"
          >
            {mobilError}
          </small>

          <input
            type="submit"
            class="fadeIn fourth"
            value="Log In"
          />
        </form>
      </div>
    </>
  );
}

export default Loginform;
