import React from "react";
import { useQuery } from "react-query";
import { getAllEntries } from "../services/serverConnection";
import { DataEntry } from "../../../types";
import DateLabel from "./DateLabel";
import Entry from "./Entry";

type EntriesListProps = {}

const EntiresList: React.FC<EntriesListProps> = (props:EntriesListProps) => {
  const { data, error, isLoading } = useQuery('entries', getAllEntries);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>; 
  if (!data) return <div>No data found</div>

  return (
    <div>
      <h1>Memories</h1>
      <ul>
        {data.map((entry: DataEntry) => (
          <Entry entry={entry} key={entry.id} />
        ))}
      </ul>
    </div>
  );
}

export default EntiresList;
