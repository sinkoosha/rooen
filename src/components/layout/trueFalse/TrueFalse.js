import React from "react";

function TrueFalse({ bolQes, setBolQes }) {
  const handelChange = (e, index) => {
    const { name, value } = e.target;
    console.log(bolQes);
    const list = [...bolQes];
    list[index][name] = value;
    setBolQes(list);
  };

  return (
    <div>
      <div class="input-group short-item">
        <input
          name="qestion1"
          type="text"
          class="form-control"
          placeholder="سوال یک"
          onChange={(e) => handelChange(e, 0)}
        />
        <input
          name="qestion2"
          type="text"
          class="form-control"
          placeholder="سوال 2"
          onChange={(e) => handelChange(e, 1)}
        />
      </div>
      <pre>{JSON.stringify(bolQes, null, 2)}</pre>
    </div>
  );
}

export default TrueFalse;
