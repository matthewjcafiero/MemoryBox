import React from 'react';

type SelectedValueType = any;

type DropdownPickerProps = {
  options: SelectedValueType[],
  selectedValue: SelectedValueType
  onChange: any
};

const DropdownPicker: React.FC<DropdownPickerProps> = ({ options, selectedValue, onChange }) => {
  return (
    <select value={(selectedValue == null) ? "" : selectedValue} onChange={onChange}>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default DropdownPicker;
