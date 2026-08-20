import { useState, useEffect } from "react";
import "../styles/colorSelector.css";

const ColorSelector = ({ colors = [], onSelect }) => {
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    if (colors.length > 0) {
      setSelectedColor(colors[0]);

      if (onSelect) {
        onSelect(colors[0]);
      }
    }
  }, [colors]);

  const handleSelect = (color) => {
    setSelectedColor(color);

    if (onSelect) {
      onSelect(color);
    }
  };

  return (
    <div className="colorSelector">

      <h3 className="selectorTitle">
        Available Colors
      </h3>

      <div className="colorList">

        {colors.map((color, index) => (

          <button
            key={index}
            className={
              selectedColor === color
                ? "colorBtn active"
                : "colorBtn"
            }
            onClick={() => handleSelect(color)}
          >
            {color}
          </button>

        ))}

      </div>

      {selectedColor && (
        <p className="selectedColor">
          Selected:
          <span> {selectedColor}</span>
        </p>
      )}

    </div>
  );
};

export default ColorSelector;