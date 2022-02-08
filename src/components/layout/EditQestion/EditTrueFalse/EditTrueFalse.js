import React from "react";

function EditTrueFalse({ bolQes, setBolQes }) {
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
          value={bolQes[0].qestion1}
          name="qestion1"
          type="text"
          class="form-control"
          placeholder="سوال یک"
          onChange={(e) => handelChange(e, 0)}
        />
        <input
          value={bolQes[1].qestion2}
          name="qestion2"
          type="text"
          class="form-control"
          placeholder="سوال 2"
          onChange={(e) => handelChange(e, 1)}
        />
      </div>
    </div>
  );
}

export default EditTrueFalse;
