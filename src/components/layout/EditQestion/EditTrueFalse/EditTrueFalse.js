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
          <textarea
            name="qestion"
            class="form-control"
            rows="3"
            placeholder="صحیح غلط"
            onChange={handleInputChange}
            value={bolQes[0].qestion}
          ></textarea>
          <pre></pre>
        </div>
      </div>
    </div>
  );
}

export default EditTrueFalse;
