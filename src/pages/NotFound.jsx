import { A } from "hookrouter";
import React from "react";
import { languageList } from "../config";

const NotFound = () => {
  const language = localStorage.getItem("language");

  const message = () => {
    return (
      <>
        <h1>{languageList[language].a3}</h1>
        <A href="/">{languageList[language].a4}</A>
      </>
    );
  };

  return message();
};

export default NotFound;
