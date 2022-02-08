import React from "react";
function EditMultiQestion({ inputShortQes, setInputShortQes }) {
  console.log("ss", inputShortQes);
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputShortQes];
    list[index][name] = value;
    setInputShortQes(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputShortQes];
    list.splice(index, 1);
    setInputShortQes(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputShortQes([...inputShortQes, { qestion: "" }]);
  };

  return (
    <div>
      {inputShortQes.map((x, i) => {
        return (
          <div class="input-group short-item">
            <input
              name="qestion"
              type="text"
              class="form-control"
              placeholder="سوال کوتاه"
              value={x.qestion}
              onChange={(e) => handleInputChange(e, i)}
            />
            {inputShortQes.length !== 1 && (
              <button
                className="btn btn-danger"
                onClick={(e) => {
                  e.preventDefault();
                  handleRemoveClick(i);
                }}
              >
                حذف کردن
              </button>
            )}
            {inputShortQes.length - 1 === i && (
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

export default EditMultiQestion;
