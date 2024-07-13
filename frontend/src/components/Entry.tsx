import React, { useState } from "react";
import { DataEntry, DataEntryEditRequest, DateObject } from "../../../types";
import DateLabel from "./DateLabel";
import { archiveEntry, editEntry } from "../services/serverConnection";
import { useMutation, useQueryClient } from "react-query";
import OptionalDatePicker from "./OptionalDatePicker";

type EntryProps = {
  entry: DataEntry,
  key: string
}

const Entry: React.FC<EntryProps> = ({entry, ...otherProps}) => {

  const queryClient = useQueryClient();

  const [inEditingMode, setEditingMode] = useState(false);
  const [textInputValue, setTextInputValue] = useState(entry.message);
  const [dateObjectInputValue, setDateObjectInputValue] = useState<DateObject>({...entry.dateObject});


  const deleteEntryMutation = useMutation<any, unknown, any>(
    archiveEntry,
    {
      onSuccess: () => {
        // Invalidating and refetching data after mutation succeeds (for the key of entries)
        queryClient.invalidateQueries('entries');
      },
    }
  );

  const saveEditsMutation = useMutation<any, unknown, DataEntryEditRequest>(
    editEntry,
    {
      onSuccess: () => {
        // Invalidating and refetching data after mutation succeeds (for the key of entries)
        queryClient.invalidateQueries('entries');
      },
    }
  )

  const handleEditButtonClick = () => {
    console.log(`Clicked edit button for entry with id of "${entry.id}"`);
    setEditingMode(true);
    setTextInputValue(entry.message);
  }

  const handleTextInputChange = (e:any) => {
    setTextInputValue(e.target.value);
  };

  const handleCancelEditClick = () => {
    setEditingMode(false);
    setTextInputValue(entry.message);
  }

  const handleEditSubmit = (e:any) => {
    e.preventDefault();

    let editedEntryRequest:DataEntryEditRequest = {
      id: entry.id,
      message: textInputValue,
      dateObject: dateObjectInputValue
    }

    saveEditsMutation.mutate(editedEntryRequest);
    setEditingMode(false);
  }

  const handleDeleteButtonClick = () => {
    console.log(`Clicked delete button for entry with id of "${entry.id}"`);
    deleteEntryMutation.mutate(entry.id);
  }

  if(inEditingMode){
    return (
      <div>
        <form onSubmit={handleEditSubmit}>
          <OptionalDatePicker 
            inclusiveMinYearBound={2000} 
            inclusiveMaxYearBound={2024} 
            dateObject={dateObjectInputValue} 
            setDateObject={setDateObjectInputValue}
          />
          <input
            type="text"
            id="updateEntryInput"
            value={textInputValue}
            onChange={handleTextInputChange}
          />
          <button type="submit" disabled={saveEditsMutation.isLoading}>
            {saveEditsMutation.isLoading ? 'Updating...' : 'Submit'}
          </button>
        </form>
        <button onClick={handleCancelEditClick}>Cancel</button>
      </div>
    )
  }

  return (
    <div>
        <DateLabel dateToDisplay={entry.dateObject}/>
        {entry.message}
        <button onClick={handleEditButtonClick}>Edit</button>
        <button onClick={handleDeleteButtonClick}>Delete</button>
    </div>
  )
}

export default Entry;