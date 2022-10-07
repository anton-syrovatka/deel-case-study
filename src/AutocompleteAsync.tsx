import React from "react";

import Word from "./components/Word";
import "./Autocomplete.css";

type AutocompleteProps = {
  label?: string;
  loading?: boolean;
  options: string[];
  onChange: (input: string) => void;
};

const Autocomplete = ({
  label,
  loading,
  options,
  onChange,
}: AutocompleteProps) => {
  const [isShow, setIsShow] = React.useState<boolean>(false);
  const [active, setActive] = React.useState<number>(0);
  const [input, setInput] = React.useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    setActive(0);
    setInput(input);
    onChange(input);
    setIsShow(true);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      setActive(0);
      setInput(options[active]);
      setIsShow(false);
    } else if (e.code === "ArrowUp") {
      return active === 0 ? null : setActive(active - 1);
    } else if (e.code === "ArrowDown") {
      return active - 1 === options.length ? null : setActive(active + 1);
    }
  };

  const handleOptionClick = (e: React.MouseEvent<HTMLElement>) => {
    const { index } = e.currentTarget.dataset;
    if (!index) {
      return;
    }
    const active = parseInt(index, 10);
    setActive(0);
    setInput(options[active]);
    setIsShow(false);
  };

  return (
    <div className="autocomplete">
      {label && (
        <label htmlFor="sync-auto">
          {label} {loading && "loading"}
        </label>
      )}
      <input
        type="text"
        placeholder="Start typing"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      <div className="autocomplete-items">
        {isShow &&
          options.map((option, index) => (
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
