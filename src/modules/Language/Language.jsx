import React, { useEffect, useState } from "react";
import "./style.scss";

const Language = ({ setReload }) => {
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

    if (activeStorage && activeStorage === name) {
      return false;
    }

    localStorage.setItem("language", name);
    const objKeys = Object.keys(listLanguage);

    objKeys.forEach((e) => {
      if (name === e) {
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
    setReload(name);
  };

  const addLanguage = () => {
    const objKeys = Object.keys(listLanguage);
    return objKeys.map((e) => {
      const _this = listLanguage[e];
      return (
        <button
          key={_this.id}
          className={_this.active ? "active" : ""}
          name={_this.title.toLowerCase()}
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
