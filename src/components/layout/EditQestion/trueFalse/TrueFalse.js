import React from "react";

function TrueFalse({ bolQes, setBolQes }) {
  const handelChange = (e) => {
    const { name, value } = e.target;
    console.log(bolQes);

    setBolQes({
      ...bolQes,
      [name]: value,
    });
  };

  return (
    <div>
      <div class="input-group short-item">
        <input
          name="qestion1"
          type="text"
          class="form-control"
          placeholder="سوال یک"
          onChange={handelChange}
        />
        <input
          name="qestion2"
          type="text"
          class="form-control"
          placeholder="سوال 2"
          onChange={handelChange}
        />
      </div>
    </div>
  );
}

export default TrueFalse;
