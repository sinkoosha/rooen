import React from "react";

function TrueFalse({ bolQes, setBolQes }) {
  const handleInputChange = (e) => {
    const { value } = e.target;
    let toJson = [
      {
        qestion: value,
      },
    ];
    setBolQes(toJson);
  };

  return (
    <div>
      <div class="input-group short-item">
        <textarea
          name="qestion"
          class="form-control"
          rows="3"
          placeholder="سوال"
          onChange={handleInputChange}
        ></textarea>
      </div>
    </div>
  );
}

export default TrueFalse;
