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
  <h3>بلی / خیر</h3>
      </div>
    </div>
  );
}

export default TrueFalse;
