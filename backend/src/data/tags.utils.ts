import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { NewTagObject, TagObject } from "../../../types";

let pathToFile = 'src/data/tags.json';

export function getTagById(id:string): TagObject | undefined {
  try{
    let existingTags:TagObject[] = [];
    if (fs.existsSync(pathToFile)) {
      existingTags = JSON.parse(fs.readFileSync(pathToFile).toString());
    }
    for(let tag of existingTags){
      if (tag.id === id){
        return tag;
      }
    }
  } catch (err) {
    console.log('Error accessing tags from file:', err);
  }
}

export function getAllTags(): TagObject[] | undefined {
  try{
    let existingTags:TagObject[] = [];
    if (fs.existsSync(pathToFile)) {
      existingTags = JSON.parse(fs.readFileSync(pathToFile).toString());
    }
    return existingTags;
  } catch (err) {
    console.log('Error accessing tags from file:', err);
  }
}

export function saveNewTag(newTagObject: NewTagObject): TagObject | undefined {
  try{
    let existingTags:TagObject[] = [];
    if (fs.existsSync(pathToFile)) {
      existingTags = JSON.parse(fs.readFileSync(pathToFile).toString());
    }
    let id = uuidv4();
    let createdTagObject:TagObject = {id: id, ...newTagObject, createdAt: new Date(), deletedAt: null};
    existingTags.push(createdTagObject);

    fs.writeFileSync(pathToFile, JSON.stringify(existingTags, null, 2) + '\n');
    console.log(`Data saved to tags.json successfully.  New id created of ${id}`);

    return createdTagObject;
  } catch (err) {
    console.log('Error adding tag to file:', err);
  }
}