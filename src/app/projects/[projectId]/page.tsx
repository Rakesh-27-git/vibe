import React from "react";

interface props {
  params: {
    projectId: string;
  };
}

const Page = ({ params }: props) => {
  const { projectId } = params;
  return (
    <div>
      <h1>Project Id: {projectId}</h1>
    </div>
  );
};

export default Page;
