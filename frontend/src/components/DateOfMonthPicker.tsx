import React, { useState } from "react";
import DropdownPicker from "./DropdownPicker";

type DatePickerProps = {
  selectedValue: any,
  onChange: any,
  numberDaysInMonth: number,
  includeNoValueOption?: boolean
}

const DatePicker: React.FC<DatePickerProps> = ({selectedValue, onChange, numberDaysInMonth, includeNoValueOption}) => {

  const dateOptions = [];
  if(includeNoValueOption) dateOptions.push({ value: "", label: '-'});
  for(let i = 1; i <= numberDaysInMonth; i++){
    dateOptions.push({value: i, label: i});
  }

  return(
    <div>
      <DropdownPicker
        options={dateOptions}
        selectedValue={selectedValue}
        onChange={onChange}
      />
    </div>
  )
}

export default DatePicker;