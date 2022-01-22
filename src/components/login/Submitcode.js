import React from "react";

function Submitcode({ codeSubmit, setConfarmCode, codeRef }) {
  return (
    <>
      <div class="fadeIn first">
        <h2>کد تایید را وارد کنید</h2>
      </div>
      <form id="loginform" onSubmit={codeSubmit}>
        <input
          type="text"
          class="fadeIn second"
          name="code"
          placeholder="کد تایید را وارد کنید"
          onChange={(e) => {
            setConfarmCode(e.target.value);
          }}
          ref={codeRef}
        />
        <small
          id="emailHelp"
          className="text-danger form-text"
        ></small>

        <input
          type="submit"
          class="fadeIn fourth"
          value="تایید"
        />
      </form>
    </>
  );
}

export default Submitcode;
