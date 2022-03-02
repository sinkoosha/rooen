import React, { useState } from "react";

function EditMultiQestionShortlyWimage({
  imageQestion,
  setImageQestion,
  MultiQestion,
}) {
  console.log(MultiQestion);
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...imageQestion];
    list[index][name] = value;
    setImageQestion(list);
  };
  const handleInputChangeFile = (e, index) => {
    const { name, files } = e.target;
    const list = [...imageQestion];
    list[index][name] = files[0];
    setImageQestion(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...imageQestion];
    list.splice(index, 1);
    setImageQestion(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setImageQestion([...imageQestion, { qestion: "" }]);
  };

  return (
    <div>
      {imageQestion.map((x, i) => {
        return (
          <div className="inputbox">
            <div class="input-group short-item">
              <input
                name="qestion"
                value={x.qestion}
                type="text"
                class="form-control"
                placeholder="سوال کوتاه"
                onChange={(e) => handleInputChange(e, i)}
              />
              <input
                name="imgqes"
                type="file"
                class="form-control"
                onChange={(e) => handleInputChangeFile(e, i)}
              />
              {imageQestion.length !== 1 && (
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveClick(i)}
                >
                  حذف کردن
                </button>
              )}
              {imageQestion.length - 1 === i && (
                <button
                  className="btn btn-primary"
                  onClick={handleAddClick}
                >
                  اضافه کردن
                </button>
              )}
            </div>
            <img
              src={`http://95.217.96.131:8080/storage/images/${MultiQestion[i]}`}
              class="img-thumbnail rounded mx-auto d-block mt-3 mb-3"
            ></img>
          </div>
        );
      })}
    </div>
  );
}

export default EditMultiQestionShortlyWimage;
