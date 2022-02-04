import React from "react";

function ImageQestion({ imageQestion, setImageQestion }) {
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...imageQestion];
    list[index][name] = value;
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
          <div class="input-group short-item">
            <input
              type="file"
              name="qestion"
              placeholder="اپلود تصویر"
              onChange={(e) => handleInputChange(e, i)}
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
        );
      })}
    </div>
  );
}

export default ImageQestion;