type StrongOrSpanProps = {
  part: string;
  str: string;
};

const StrongOrSpan = ({ part, str }: StrongOrSpanProps) =>
  str.toLowerCase() === part.toLocaleLowerCase() ? (
    <strong>{part}</strong>
  ) : (
    <span>{part}</span>
  );

export default StrongOrSpan;
