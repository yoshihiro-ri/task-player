interface Props {
  elapsedTime: string;
}

export const ElapsedTime: React.FC<Props> = ({ elapsedTime }) => {
  return <div>{`/ ${elapsedTime}`}</div>;
};
