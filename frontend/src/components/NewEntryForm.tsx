import React, { useState } from "react";
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import { getAllTags, postNewEntry, postNewTag } from "../services/serverConnection";
import { DataEntry, DateObject, NewDataEntry, NewTagObject, TagObject } from "../../../types";
import OptionalDatePicker from "./OptionalDatePicker";
import TagInput from "./TagInput";

type newEntryFormProps = {};

//Default settings for default date, used for component creation and refresh after submit
let defaultDateObject = {
  month: 1,
  date: 1,
  year: 2000
}

const NewEntryForm: React.FC<newEntryFormProps> = (props:newEntryFormProps) => {

  /** HELPER FUNCTIONS */

   //Helper function to clear the form when need be
   const clearForm = () => {
    setInputValue(''); 
    setDateObject({...defaultDateObject});
    setSelectedTags([]);
  }

  /** HOOKS */

  //Setting up access to queryClient instance from root
  const queryClient = useQueryClient();

  //States for the text input and the date picker input
  const [inputValue, setInputValue] = useState<string>('');
  const [dateObject, setDateObject] = useState<DateObject>({...defaultDateObject});
  const [selectedTags, setSelectedTags] = useState<(TagObject|NewTagObject)[]>([]);

  //Mutation hook used for creating new entries upon form submit, triggering a reload of everything on the page
  const entriesMutation = useMutation<void, unknown, NewDataEntry>(
    postNewEntry,
    {
      onSuccess: () => {
        // Invalidating and refetching data after mutation succeeds (for the key of entries)
        queryClient.invalidateQueries('entries');
      },
    }
  );

  const tagsMutation = useMutation<TagObject, unknown, NewTagObject>(
    postNewTag,
    {
      onSuccess: (data: any) => {
        // Invalidating and refetching data after mutation succeeds (for the key of tags)
        queryClient.invalidateQueries('tags');
        console.log("Success on tagsMutation: ", data);
      },
      onError: (error: any) => {
        console.log("Error on tagsMutation: ", error);
      }, 
      onSettled: (settled: any) => {
        console.log("Settled on tagsMutation: ", settled);
      }
    }
  )

  /** HANDLERS */

  //Change handler for the text input
  const handleInputChange = (e:any) => {
    setInputValue(e.target.value);
  };

  //Submit handler for the form
  const handleSubmit = (e:any) => {
    e.preventDefault();

    //We need to mutate against all the NewTagObjects in selectedTags, and create a tag object for each via api
    //TODO: can we batch these so they don't trigger reloads every time
    let tagsToCreate:NewTagObject[] = selectedTags.filter((selectedTag) =>{
      return 'text' in selectedTag && !('id' in selectedTag) && !('createdAt' in selectedTag) && !('updatedAt' in selectedTag);
    })
    let createdTags:(TagObject|undefined)[] = tagsToCreate.map((tagToCreate) => { 
      tagsMutation.mutate(tagToCreate); 
      return tagsMutation.data;
    });
    
    //So this works!  Created tags wil have the newly created tags
    //TODO: After we create the tags, we need to assign them with those new ids to the new entries

    let inputConvertedToNewEntry : NewDataEntry = { message: inputValue, dateObject: dateObject }
    // Call mutate to trigger the mutation function defined above
  entriesMutation.mutate(inputConvertedToNewEntry);

    


    //TODO: tags should only be mutated if new tags were created
    clearForm();
  };

  return (
    <div>
      <h1>Create New Memory</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="updateInput">Memory Text:</label>
        <input
          type="text"
          id="updateInput"
          value={inputValue}
          onChange={handleInputChange}
          required
        />
        <OptionalDatePicker 
          inclusiveMinYearBound={2000} 
          inclusiveMaxYearBound={2024} 
          dateObject={dateObject} 
          setDateObject={setDateObject}
        />
        <TagInput selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
        <button type="submit" disabled={entriesMutation.isLoading || tagsMutation.isLoading}>
          {entriesMutation.isLoading || tagsMutation.isLoading ? 'Updating...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default NewEntryForm;