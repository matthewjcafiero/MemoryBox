import axios from 'axios';
import { DataEntry, DataEntryEditRequest, DataEntryWithTagObjects, NewDataEntry, NewTagObject, TagObject } from '../../../types';

const API_BASE_URL = 'http://localhost:3001';

// Create an instance of Axios with the base URL configured
const api = axios.create({
  baseURL: API_BASE_URL,
});

export async function testServerConnection(): Promise<DataEntryWithTagObjects> {
  try {
    const response = await api.get(`/entry/7b021bdd-85a5-4732-a058-83c40fabf6d5`);
    console.log("Server connection worked:", response);
    return response.data;
  } catch (error) {
    console.error('Test server connection error:', error);
    throw error; // Optionally re-throw the error for the caller to handle
  }
}

export async function postNewEntry(payload:NewDataEntry): Promise<void> {
  try {
    console.log("Attempted payload: ", payload);

    const response = await api.post(`/newEntry`, payload);
    
    // Handle the response if needed
    console.log('Response from server:', response.data);
  } catch (error) {
    // Handle errors
    console.error('Error sending data to server:', error);
    throw error; // Optionally re-throw the error for the caller to handle
  }
};

export async function getAllEntries(): Promise<DataEntryWithTagObjects[]> {
  try {
    const response = await api.get(`/entry/all`);
    console.log("Get all entries here:", response.data);
    return Object.values(response.data);
  } catch (error) {
    console.error('Error getting data from server:', error);
    throw error;
  }
}

export async function archiveEntry(id:string): Promise<DataEntry | undefined> {
  try {
    const response = await api.put(`/entry/${id}/archive`);
    console.log("Achived entry response: ", response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting data from server:', error);
    throw error;
  }
}

export async function editEntry(payload:DataEntryEditRequest): Promise<DataEntry | undefined> {
  try {
    const response = await api.put(`/entry/${payload.id}/edit`, payload);
    console.log("Edited entry response: ", response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting data from server:', error);
    throw error;
  }
}

export async function getAllTags(): Promise<TagObject[]> {
  try {
    const response = await api.get(`/tag/all`);
    console.log("Get all tags here:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error getting data from server:', error);
    throw error;
  }
}

export async function postNewTag(payload:NewTagObject): Promise<TagObject> {
  try {
    console.log("Attempted post new tag payload: ", payload);

    const response = await api.post(`/newTag`, payload);
    
    // Handle the response if needed
    console.log('New tag response from server:', response.data);
    return response.data;
  } catch (error) {
    // Handle errors
    console.error('Error sending data to server:', error);
    throw error; // Optionally re-throw the error for the caller to handle
  }
}