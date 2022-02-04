import React, { useState } from "react";

function DescriptiveQestion({
  descriptiveQestion,
  setDescriptiveQestion,
}) {
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...descriptiveQestion];
    list[index][name] = value;
    setDescriptiveQestion(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...descriptiveQestion];
    list.splice(index, 1);
    setDescriptiveQestion(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setDescriptiveQestion([
      ...descriptiveQestion,
      { qestion: "" },
    ]);
  };

  return (
    <div>
      {descriptiveQestion.map((x, i) => {
        return (
          <div class="input-group short-item">
            <textarea
              name="qestion"
              class="form-control"
              rows="3"
              placeholder="سوال بلند"
              onChange={(e) => handleInputChange(e, i)}
            >
              {descriptiveQestion.qestion}
            </textarea>
            {descriptiveQestion.length !== 1 && (
              <button
                className="btn btn-danger"
                onClick={() => handleRemoveClick(i)}
              >
                حذف کردن
              </button>
            )}
            {descriptiveQestion.length - 1 === i && (
              <button
                className="btn btn-primary"
                onClick={handleAddClick}
              >
                اضافه کردن
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default DescriptiveQestion;
