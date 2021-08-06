import { A } from "hookrouter";
import React from "react";
import { languageList } from "../../config";
import "./NotFound.scss";

const NotFound = () => {
  const language = localStorage.getItem("language");

  const message = () => {
    return (
      <>
        <div className="main">
          <h1>
            <span>404</span>
            <br /> {languageList[language].a3}
            <div className="fof" />
          </h1>
          <A href="/">{languageList[language].a4}</A>
        </div>
      </>
    );
  };

  return message();
};

export default NotFound;
