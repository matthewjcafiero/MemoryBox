import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { DataEntry, NewDataEntry } from '../../../types';

let pathToFile = 'src/data/data.json';

export function getDataById(id:string): DataEntry | undefined {
    try{
        let existingData:any= {};
        if (fs.existsSync(pathToFile)) {
            existingData = JSON.parse(fs.readFileSync(pathToFile).toString());
        }
        if(existingData[id].deletedAt){
            throw Error("Data was previously deleted");
        }
        return existingData[id];
    } catch (err) {
        console.log('Error finding data in file:', err);
    }
}

export function getAllData(): DataEntry[] | undefined {
    try{
        let existingData:any= {};
        if (fs.existsSync(pathToFile)) {
            existingData = JSON.parse(fs.readFileSync(pathToFile).toString());
        }
        let keys = Object.keys(existingData);
        for(let key of keys){
            if (existingData[key].deletedAt){
                delete existingData[key];
            }
        }
        return existingData;
    } catch (err) {
        console.log('Error finding data in file:', err);
    }
}

// Function to append data to a file//
export function saveData(data:NewDataEntry): DataEntry | undefined {
    try {
        console.log(`Attempting to save to data.json: `, data);
        // Read existing data from file
        let existingData:any = {};
        if (fs.existsSync(pathToFile)) {
            existingData = JSON.parse(fs.readFileSync(pathToFile).toString());
        }
        let id = uuidv4();
        existingData[id] = {id: id, ...data, createdAt: new Date(), deletedAt: null};

        // Write the updated array back to the file
        fs.writeFileSync(pathToFile, JSON.stringify(existingData, null, 2) + '\n');
        console.log(`Data saved to data.json successfully.  New id created of ${id}`);
        return existingData[id];
    } catch (err) {
        console.error('Error appending data to file:', err);
    }
}

export function archiveDataById(id:string): DataEntry | undefined {
    try{
        let existingData:any= {};
        if (fs.existsSync(pathToFile)) {
            existingData = JSON.parse(fs.readFileSync(pathToFile).toString());
        }
        if (!existingData[id]){
            throw Error();
        }
        let updatedEntry = { ...existingData[id], deletedAt: new Date()}
        existingData[id] = updatedEntry;
        // Write the updated array back to the file
        fs.writeFileSync(pathToFile, JSON.stringify(existingData, null, 2) + '\n');

        console.log(`Successfully archived data with id of ${id}`);
        return existingData[id];
    } catch (err) {
        console.log('Error finding data in file:', err);
    }
}

export function editDataById(id:string, newData:NewDataEntry): DataEntry | undefined {
    try{
        let existingData:any= {};
        if (fs.existsSync(pathToFile)) {
            existingData = JSON.parse(fs.readFileSync(pathToFile).toString());
        }
        if (!existingData[id]){
            throw Error();
        }
        let updatedEntry = { ...existingData[id], ...newData}
        existingData[id] = updatedEntry;
        // Write the updated array back to the file
        fs.writeFileSync(pathToFile, JSON.stringify(existingData, null, 2) + '\n');

        console.log(`Successfully edited data with id of ${id}`);
        return existingData[id];
    } catch (err) {
        console.log('Error finding data in file:', err);
    }
}