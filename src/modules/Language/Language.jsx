import React, { useEffect, useReducer, useState } from "react";
import "./style.scss";
import { appReducer, initialState } from "../../contextReduser/AppReduser";

const Language = ({ setReload }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [update, setUpdate] = useState(false);
  const [listLanguage, setListLanguage] = useState({
    ru: {
      id: 1,
      title: "Ru",
    },
    en: {
      id: 2,
      title: "En",
    },
  });

  useEffect(() => {
    const language = localStorage.getItem("language") || "ru";
    setListLanguage({
      ...listLanguage,
      [language]: {
        ...listLanguage[language],
        active: true,
      },
    });
  }, [update]);

  const handleLanguage = (e) => {
    const { name } = e.target;
    const activeStorage = localStorage.getItem("language");

    if (activeStorage && activeStorage === name.toLowerCase()) {
      return false;
    }

    localStorage.setItem("language", name.toLowerCase());
    const objKeys = Object.keys(listLanguage);

    objKeys.forEach((e) => {
      if (name.toLowerCase() === e) {
        setListLanguage({
          ...listLanguage,
          [e]: {
            ...listLanguage[e],
            active: true,
          },
        });
      } else {
        listLanguage[e].active = false;
      }
    });

    setUpdate((e) => !e);
    setReload((el) => !el);
  };

  const addLanguage = () => {
    const objKeys = Object.keys(listLanguage);
    return objKeys.map((e) => {
      const _this = listLanguage[e];
      return (
        <button
          key={_this.id}
          className={_this.active ? "active" : ""}
          name={_this.title}
          onClick={handleLanguage}
        >
          {_this.title}
        </button>
      );
    });
  };

  return <div className="wrapper-language">{addLanguage()}</div>;
};

export default Language;
