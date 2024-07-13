import React, { useState } from "react";
import DropdownPicker from "./DropdownPicker";
import { intToShortMonth } from "../utils/helpers";

type MonthPickerProps = {
  selectedValue: any,
  onChange: any,
  includeNoValueOption?: boolean
}

const MonthPicker: React.FC<MonthPickerProps> = ({selectedValue, onChange, includeNoValueOption}) => {

  const monthOptions:any[] = [];
  if(includeNoValueOption) monthOptions.push({ value: "", label: '-'});
  for(let i = 1; i <= 12; i++){
    monthOptions.push({ value: i, label: intToShortMonth(i)});
  }

  return(
    <div>
      <DropdownPicker
        options={monthOptions}
        selectedValue={selectedValue}
        onChange={onChange}
      />
    </div>
  )
}

export default MonthPicker;