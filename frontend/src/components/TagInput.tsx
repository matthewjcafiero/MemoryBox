import React from "react";
import CreatableSelect from "react-select/creatable";
import { NewTagObject, TagObject } from "../../../types";
import { useQuery } from "react-query";
import { getAllTags } from "../services/serverConnection";

type TagInputProps = {
  //TODO: do we want to allow undefined to be a valid inout for TagInput components, or should we handle that before and never have it reach the component
  selectedTags: (TagObject|NewTagObject)[],
  setSelectedTags: any
}

//TODO: use the actual props for the option component here?
//These are the types of the option component which the multi select uses
type OptionComponentProps = {
  value: string //TODO: fix this typing, because the type isn't only strngs, it can be NewTagObjects or TagObjects but it wont let me put that
  label: string
}

const TagInput: React.FC<TagInputProps> = ({selectedTags, setSelectedTags}) => {
  
  //We pull the tags here as this is the highest level where a component needs this data 
  //just like how in the monthPicker we build the month options at the monthPicker.tsx level
  const { data, error, isLoading } = useQuery('tags', getAllTags);
  let tags = data;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>; 
  if (!tags) return <div>No data found</div>

  let options = tags?.map((tag:TagObject) => {
    return {value: tag, label: tag.text}
  })

  let handleSelectChange = (e:any) => {

    //This function convers the object components that the multi select uses, and converts them into NewTagOptions or TagOptions
    //for storage of said data in our local state/db
    let selectedOptionsParsedToObjects:(NewTagObject|TagObject)[] = 
      e.map((selectedOption:OptionComponentProps):NewTagObject|TagObject => {
        if(typeof selectedOption.value === 'string' ){
          //If the value of the option is a string, this means its a newly created tag, so create a NewTagObject for it
          let newTagObject:NewTagObject = {text: selectedOption.value};
          return newTagObject;
        }
        //Otherwise, option.value should already be of type TagObject or type NewTagObject implictly
        return selectedOption.value;
      }
    );

    setSelectedTags(selectedOptionsParsedToObjects);
  }

  let convertSelectedTagsIntoOptionValueFormat = (selectedTags:(TagObject|NewTagObject)[]) => {
    return selectedTags?.map((tag:TagObject|NewTagObject) => {
      return {value: tag, label: tag.text}
    })
  }

  //TODO: do I need to use selectedTags as the value field?
  return(
    <div>
        <CreatableSelect 
          isMulti
          options={options}
          value={convertSelectedTagsIntoOptionValueFormat(selectedTags)}
          onChange={handleSelectChange}
        />
    </div>
  )
} 

export default TagInput;