import React from "react";
import "./Magazines.scss";

const Magazines: React.FC = () => {
  return (
    <div className="main__magazines">
      <div className="magazine elle"></div>
      <div className="magazine cosmopolitan"></div>
      <div className="magazine vogue"></div>
      <div className="magazine grazia"></div>
      <div className="magazine bazaar"></div>
    </div>
  );
};

export default Magazines;
