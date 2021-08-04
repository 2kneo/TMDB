import React, { useReducer, useState } from "react";
import "./style.scss";
import { request } from "../../service/Service";
import { navigate } from "hookrouter";
import { ReactComponent as Close } from "./../../assets/close.svg";
import { appReducer, initialState } from "../../contextReduser/AppReduser";
import { placeholderLanguage } from "./config";

const Search = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [value, setValue] = useState("");
  const [list, setList] = useState(null);
  const [visibleClose, setVisibleClose] = useState(false);
  const handleList = () => {
    return list.map((e) => {
      return (
        <li key={e.id} onClick={() => navigate(`/card/${e.id}`, false)}>
          {e.title}
        </li>
      );
    });
  };

  const onSearch = (e) => {
    const { value } = e.target;
    setValue(value);
    value.length ? setVisibleClose(true) : setVisibleClose(false);

    if (value.length > 2) {
      request(`/search/movie?query=${value}`).then((res) => {
        setList(res.results);
      });
    }
  };

  const handleClose = () => {
    setValue("");
    setList(null);
    setVisibleClose(false);
  };

  return (
    <>
      <div className="wrapper-search">
        <div className="search">
          <input
            type="text"
            value={value}
            onChange={onSearch}
            placeholder={placeholderLanguage[state.language]}
          />
          {visibleClose && (
            <div className="close" onClick={handleClose}>
              <Close />
            </div>
          )}
        </div>
        {list && <ul className="search-list">{handleList()}</ul>}
      </div>
    </>
  );
};

export default Search;
