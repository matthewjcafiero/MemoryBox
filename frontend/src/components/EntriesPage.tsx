import React, { useState } from "react";
import EntriesList from "./EntriesList";
import NewEntryForm from "./NewEntryForm";

type EntriesPageProps = {}

const EntriesPage: React.FC<EntriesPageProps> = () => {


  return (
    <div>
      <NewEntryForm></NewEntryForm>
      <EntriesList></EntriesList>
    </div>
  );
}

export default EntriesPage;

