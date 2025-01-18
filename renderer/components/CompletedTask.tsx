import React from "react";
type Props = {
  title:string
}

const CompletedTask = ({title}:Props) => {
  return <div>{title}</div>;
};

export default CompletedTask;
