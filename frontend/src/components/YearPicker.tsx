import React, { useState } from "react";
import DropdownPicker from "./DropdownPicker";

type YearPickerProps = {
  selectedValue: any,
  onChange: any,
  inclusiveMinYearBound: number,
  inclusiveMaxYearBound: number,
  includeNoValueOption?: boolean
}

const YearPicker: React.FC<YearPickerProps> = ({selectedValue, onChange, inclusiveMinYearBound, inclusiveMaxYearBound, includeNoValueOption}) => {

  const yearOptions = [];
  if(includeNoValueOption) yearOptions.push({ value: "", label: '-'});
  for (let i = inclusiveMinYearBound; i <= inclusiveMaxYearBound; i++){
    yearOptions.push({value: i, label: i}); 
  }

  return(
    <div>
      <DropdownPicker
        options={yearOptions}
        selectedValue={selectedValue}
        onChange={onChange}
      />
    </div>
  )
}

export default YearPicker;