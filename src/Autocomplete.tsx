import React from "react";
import { useOutsideClick } from "./utils";
import Word from "./components/Word";
import "./Autocomplete.css";

type AutocompleteProps = {
  label?: string;
  options: string[];
};

const Autocomplete = ({ label, options }: AutocompleteProps) => {
  const [active, setActive] = React.useState<number>(0);
  const [filtered, setFiltered] = React.useState<string[]>([]);
  const [input, setInput] = React.useState<string>("");
  const divRef = React.useRef<HTMLDivElement>(null);

  useOutsideClick(divRef, () => {
    setFiltered([]);
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    const filteredOptions = input
      ? options.filter(
          (option) =>
            option.toLocaleLowerCase().indexOf(input.toLocaleLowerCase()) > -1
        )
      : [];

    setActive(0);
    setFiltered(filteredOptions);
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      setActive(0);
      setInput(filtered[active]);
      setFiltered([]);
    } else if (e.code === "ArrowUp") {
      return active === 0 ? null : setActive(active - 1);
    } else if (e.code === "ArrowDown") {
      return active - 1 === filtered.length ? null : setActive(active + 1);
    }
  };

  const handleOptionClick = (e: React.MouseEvent<HTMLElement>) => {
    const { index } = e.currentTarget.dataset;
    if (!index) {
      return;
    }

    const active = parseInt(index, 10);
    setActive(0);
    setInput(filtered[active]);
    setFiltered([]);
  };

  return (
    <div className="autocomplete" ref={divRef}>
      {label && <label htmlFor="sync-auto">{label}</label>}
      <input
        id="sync-auto"
        type="text"
        placeholder="Start typing"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      <div className="autocomplete-items">
        {filtered.map((option, index) => (
          <div
            key={option}
            data-index={index}
            className={index === active ? "autocomplete-active" : ""}
            onClick={handleOptionClick}
          >
            <Word word={option} str={input} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Autocomplete;
