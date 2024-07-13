import React, { useState } from "react";
import MonthPicker from "./MonthPicker";
import DatePicker from "./DateOfMonthPicker";
import YearPicker from "./YearPicker";
import { DateObject } from "../../../types";

type OptionalDatePickerProps = {
  inclusiveMinYearBound: number,
  inclusiveMaxYearBound: number,
  dateObject: DateObject,
  setDateObject: any
};

const OptionalDatePicker: React.FC<OptionalDatePickerProps> = ({inclusiveMinYearBound, inclusiveMaxYearBound, dateObject, setDateObject}) => {
  
  const handleMonthChange = (event:any) => {
    console.log(event.target)
    let valueToSave = (event.target.value == "") ? null : Number(event.target.value);
    setDateObject({...dateObject, month: valueToSave});
  }

  const handleDateChange = (event:any) => {
    let valueToSave = (event.target.value == "") ? null : Number(event.target.value);
    setDateObject({...dateObject, date: valueToSave});
  }

  const handleYearChange = (event:any) => {
    let valueToSave = (event.target.value == "") ? null : Number(event.target.value);
    setDateObject({...dateObject, year: valueToSave});
  }

  let numberDaysInMonth;
  let isLeapYear = dateObject.year && (dateObject.year % 400 == 0 || dateObject.year % 100 != 0 && dateObject.year % 4 == 0);
  if (dateObject.month == 4 || dateObject.month == 6 || dateObject.month == 9 || dateObject.month == 11){
    numberDaysInMonth = 30;
  } else if (dateObject.month == 2 && isLeapYear){
    numberDaysInMonth = 29;
  } else if (dateObject.month == 2){
    numberDaysInMonth = 28;
  } else {
    numberDaysInMonth = 31;
  }

  return (
    <div>
      <MonthPicker
        selectedValue={dateObject.month}
        onChange={handleMonthChange}
        includeNoValueOption={true}
      />
      <DatePicker 
        selectedValue={dateObject.date} 
        onChange={handleDateChange} 
        numberDaysInMonth={numberDaysInMonth} 
        includeNoValueOption={true}
      />
      <YearPicker 
        selectedValue={dateObject.year} 
        onChange={handleYearChange} 
        inclusiveMinYearBound={inclusiveMinYearBound} 
        inclusiveMaxYearBound={inclusiveMaxYearBound} 
        includeNoValueOption={true}
      />
    </div>
  )
}

export default OptionalDatePicker;