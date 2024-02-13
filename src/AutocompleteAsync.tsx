import {
  ChangeEvent,
  ElementRef,
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
  MouseEvent,
} from 'react';
import { useOutsideClick } from './utils';
import Word from './components/Word';
import './Autocomplete.css';

type Props = {
  label?: string;
  loading?: boolean;
  options: string[];
  onChange: (input: string) => void;
};

function Autocomplete({ label, loading, options, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [input, setInput] = useState('');

  const autocompleteRef = useRef<ElementRef<'div'>>(null);
  const listRef = useRef<ElementRef<'ul'>>(null);

  useOutsideClick(autocompleteRef, () => {
    setIsOpen(false);
  });

  useEffect(() => {
    // Scroll to active options when it goes beyond the visible part
    if (listRef.current && activeIndex !== -1) {
      const activeElement = listRef.current.children[activeIndex];

      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }
  }, [activeIndex]);

  const updateValue = (value: string) => {
    setInput(value);
    onChange(value);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    setActiveIndex(0);
    setIsOpen(true);
    updateValue(input);
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
        updateValue(options[activeIndex]);
        break;
      case 'ArrowUp':
        setActiveIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : options.length - 1
        );
        break;
      case 'ArrowDown':
        setActiveIndex((prevIndex) =>
          prevIndex < options.length - 1 ? prevIndex + 1 : 0
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
    updateValue(options[active]);
  };

  return (
    <div className="autocomplete" ref={autocompleteRef}>
      {label && (
        <label htmlFor="sync-auto">
          {label} {loading && 'loading'}
        </label>
      )}
      <input
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
          options.map((option, index) => (
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
