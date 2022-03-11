import React from "react";

function EditTrueFalse({ bolQes, setBolQes }) {
  const handleInputChange = (e) => {
    const { value } = e.target;
    const list = [...bolQes];
    list[0].qestion = value;
    setBolQes(list);
  };

  return (
    <div>
      <div>
        <div class="input-group short-item">
          <h3>صحیح / غلط</h3>
          {/* <pre>{JSON.stringify(bolQes, null, 2)}</pre> */}
        </div>
      </div>
    </div>
  );
}

export default EditTrueFalse;
