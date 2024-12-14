import React from 'react';

const InputColor = ({v }) => {
  return (
    <div className="relative inline-block w-48">
      <select
        id={`sp-${v.color}`}
        name="color-select"
        value={v.color}
        className="block w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer"
      >
        <option
          value={v}
          className="text-white"
          style={{ backgroundColor: v.color }}
        >
          {v.color} {/* Mostramos el color como texto */}
        </option>
      </select>
    </div>
  );
};

export default InputColor;
