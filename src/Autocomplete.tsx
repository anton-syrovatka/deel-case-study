import {
  ChangeEvent,
  MouseEvent,
  KeyboardEvent,
  ElementRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useOutsideClick } from './utils';
import Word from './components/Word';
import './Autocomplete.css';

type Props = {
  label?: string;
  options: string[];
};

function Autocomplete({ label, options }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [filtered, setFiltered] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const autocompleteRef = useRef<ElementRef<'div'>>(null);
  const listRef = useRef<ElementRef<'ul'>>(null);

  useOutsideClick(autocompleteRef, () => {
    setIsOpen(false);
  });

  useEffect(() => {
    // Scroll to active options when it goes beyond the visible part
    console.log(listRef.current, activeIndex);
    if (listRef.current && activeIndex !== -1) {
      const activeElement = listRef.current.children[activeIndex];
      console.log(activeElement);
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }
  }, [activeIndex]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    const filteredOptions = input
      ? options.filter(
          (option) =>
            option.toLocaleLowerCase().indexOf(input.toLocaleLowerCase()) > -1
        )
      : [];

    setActiveIndex(0);
    setIsOpen(true);
    setFiltered(filteredOptions);
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (['Escape', 'Enter', 'ArrowUp', 'ArrowDown'].includes(e.code)) {
      e.preventDefault();
    }
    switch (e.code) {
      case 'Escape':
        setIsOpen(false);
        break;
      case 'Enter':
        setActiveIndex(0);
        setIsOpen(false);
        setInput(filtered[activeIndex]);
        break;
      case 'ArrowUp':
        setActiveIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : filtered.length - 1
        );
        break;
      case 'ArrowDown':
        setActiveIndex((prevIndex) =>
          prevIndex < filtered.length - 1 ? prevIndex + 1 : 0
        );
        break;
    }
  };

  const handleOptionClick = (e: MouseEvent<HTMLElement>) => {
    const { index } = e.currentTarget.dataset;
    if (!index) {
      return;
    }

    const active = parseInt(index, 10);
    setActiveIndex(0);
    setIsOpen(false);
    setInput(filtered[active]);
  };

  return (
    <div className="autocomplete" ref={autocompleteRef}>
      {label && <label htmlFor="sync-auto">{label}</label>}
      <input
        id="sync-auto"
        type="text"
        placeholder="Start typing"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="autocomplete-list"
      />
      <ul className="autocomplete-list" ref={listRef}>
        {isOpen &&
          filtered.map((option, index) => (
            <li
              key={option}
              role="option"
              aria-selected={index === activeIndex}
              data-index={index}
              className={index === activeIndex ? 'autocomplete-active' : ''}
              onClick={handleOptionClick}
            >
              <Word word={option} str={input} />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Autocomplete;
