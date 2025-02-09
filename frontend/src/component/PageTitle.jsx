import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="rajdhani-bold gap-1.5 flex font-semibold justify-center items-center text-4xl pt-5 pb-7 mb-10">
      <h1 className="head1">{text1}</h1>
      <h1 className="head2">{text2}</h1>
    </div>
  );
};

export default Title;
