import React from "react";

import Autocomplete from "./Autocomplete";
import AutocompleteAsync from "./AutocompleteAsync";

import { countries } from "./data";
import { useDebounce } from "./utils";
import { useGetCountries } from "./api";

import "./App.css";

function App() {
  const [asyncInput, setAsyncInput] = React.useState<string>("");
  const { value: debouncedAsyncInput } = useDebounce(asyncInput, 300);
  const { data, loading } = useGetCountries({ input: debouncedAsyncInput });

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
