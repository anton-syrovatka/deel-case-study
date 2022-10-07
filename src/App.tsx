import React from "react";

import Autocomplete from "./Autocomplete";
import AutocompleteAsync from "./AutocompleteAsync";

import { countries } from "./data";
import { useGetCountries } from "./api";

import "./App.css";

function App() {
  const [asyncInput, setAsyncInput] = React.useState<string>("");
  const { data, loading } = useGetCountries({ input: asyncInput });

  return (
    <div className="App">
      <header className="App-header">
        <Autocomplete label="Sync Autocomplete" options={countries} />
        <AutocompleteAsync
          label="Async Autocomplete"
          options={data}
          onChange={setAsyncInput}
          loading={loading}
        />
      </header>
    </div>
  );
}

export default App;
