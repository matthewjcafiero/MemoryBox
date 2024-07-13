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