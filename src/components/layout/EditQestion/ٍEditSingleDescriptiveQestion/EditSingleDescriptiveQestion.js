import React, { useState } from "react";

function EditSingleDescriptiveQestion({
  singleDescriptiveQestion,
  setSingleDescriptiveQestion,
}) {
  const handleInputChange = (e) => {
    const { value } = e.target;
    const list = [...singleDescriptiveQestion];
    list[0].qestion = value;
    setSingleDescriptiveQestion(list);
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
          value={singleDescriptiveQestion[0].qestion}
        ></textarea>
        <pre>
          {JSON.stringify(singleDescriptiveQestion, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default EditSingleDescriptiveQestion;
