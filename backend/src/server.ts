import express, { Request, Response } from 'express';
import { archiveDataById, editDataById, getAllData, getDataById, saveData } from "./data/data.utils";
import { DataEntry, TagObject } from '../../types';
import cors from 'cors';
import { getAllTags, saveNewTag } from './data/tags.utils';

const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/entry/all', (req: Request, res: Response) => {
  let data: DataEntry[] | undefined = getAllData();

  (data) ? res.send(data) : res.send(`Unable to get all data.`);
});

app.get('/entry/:id', (req: Request, res: Response) => {
  let id:string = req.params.id;
  let data: DataEntry | undefined = getDataById(id);

  (data) ? res.send(data) : res.send(`Entry with id "${id}" not found.`);
});

app.post('/newEntry', (req: Request, res: Response) => {
  // Extract data from the request body
  console.log("Attempting to create new entry based off the body of :", req.body);
  let entry = saveData(req.body);
  console.log("Returning: ", entry);
  res.json(entry);
});

app.put('/entry/:id/archive', (req: Request, res: Response) => {
  let id:string = req.params.id;

  console.log(`Attepting to archive data of entry id ${id}`);
  let response = archiveDataById(id);

  res.send(response);

});

app.put('/entry/:id/edit', (req: Request, res: Response) => {
  let id:string = req.params.id;

  console.log(`Attepting to edit entry id ${id}`);
  let response = editDataById(id, req.body);

  res.send(response);

});

app.get('/tag/all', (req:Request, res:Response) => {
  let tags: TagObject[] | undefined= getAllTags();

  (tags) ? res.send(tags) : res.send(`Unable to get all tags.`);
});

app.post('/newTag', (req: Request, res: Response) => {
  // Extract data from the request body
  console.log("Attempting to create new tag based off the body of :", req.body);
  let entry = saveNewTag(req.body);
  console.log("Returning: ", entry);
  res.json(entry);
});