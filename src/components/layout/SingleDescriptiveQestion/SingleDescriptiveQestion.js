import React, { useState } from "react";

function SingleDescriptiveQestion({
  singleDescriptiveQestion,
  setSingleDescriptiveQestion,
}) {
  const handleInputChange = (e) => {
    const { value } = e.target;
    let toJson = [
      {
        qestion: value,
      },
    ];
    setSingleDescriptiveQestion(toJson);
  };

  return (
    <div>
      <div class="input-group short-item">
        <textarea
          name="qestion"
          class="form-control"
          rows="3"
          placeholder="تشریحی متن کامل"
          onChange={handleInputChange}
        ></textarea>
      </div>
    </div>
  );
}

export default SingleDescriptiveQestion;
