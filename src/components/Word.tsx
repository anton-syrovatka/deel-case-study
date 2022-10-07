import StrongOrSpan from "./StrongOrSpan";

type WordProps = {
  word: string;
  str: string;
};

const Word = ({ word, str }: WordProps) => {
  const index = word.toLowerCase().indexOf(str.toLocaleLowerCase());
  const end = index + str.length;
  const p1 = word.slice(0, index);
  const p2 = word.slice(index, end);
  const p3 = word.slice(end);
  const parts = [p1, p2, p3];

  return (
    <>
      {parts.map((part, index) => (
        <StrongOrSpan key={part + index} str={str} part={part} />
      ))}
    </>
  );
};

export default Word;
