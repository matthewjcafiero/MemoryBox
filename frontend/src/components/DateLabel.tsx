import React from "react";
import { DateObject } from "../../../types";
import { intToShortMonth } from "../utils/helpers";

type DateLabelProps = {dateToDisplay: DateObject}

const DateLabel: React.FC<DateLabelProps> = ({dateToDisplay}) => {

  if (!dateToDisplay){
    return (
      <div>
        <p>N/A</p>
      </div>
    )
  } 
  
  return (
    <div>
      <p>
        {dateToDisplay.month ? `${intToShortMonth(dateToDisplay.month)} ` : ''}
        {dateToDisplay.date ? `${dateToDisplay.date}, ` : ''}
        {dateToDisplay.year ? `${dateToDisplay.year}` : ''}
      </p>
    </div>
  )
}

export default DateLabel;