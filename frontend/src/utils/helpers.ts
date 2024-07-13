import { NewTagObject, TagObject } from "../../../types";

/** This function converts an integer value (on 1-12 scale) to the coorsponding month, abbreviated to 3 chars long
 *  
 * @param index index of month, with 1 being January and 12 being December
 * @returns the month for the index in a short, 3 char length form
 */
export function intToShortMonth(index:number){
  if(index < 1 || index > 12){
    return 'Invalid Index for Short Month';
  }

  let shortMonthsArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return shortMonthsArray[index - 1];
}

//TODO: move this to a globally accessible part of the project
//TODO: should be asserting the types of the params as part of this typeGaurd?
export function isTagObject(obj: any): obj is TagObject {
  return typeof obj === 'object' && obj !== null &&
   'text' in obj && 'id' in obj && 'createdAt' in obj && 'deletedAt' in obj;
}

export function isNewTagObject(obj: any): obj is NewTagObject {
  return typeof obj === 'object' && obj !== null && 'text' in obj;
}

export function isStrictlyNewTagObject(obj: any): obj is NewTagObject {
  return typeof obj === 'object' && obj !== null && 'text' in obj && !('id' in obj) 
    && !('createdAt' in obj) && !('deletedAt' in obj);
}