import React, { useEffect, useState } from "react";
import { request } from "../../service/Service";
import { navigate } from "hookrouter";
import { ReactComponent as Close } from "./../../assets/close.svg";
import { placeholderLanguage } from "./config";
import "./style.scss";
import { parseUrl } from "../ParseURL/ParseURL";

const Search = ({ language, searchData, setReload }) => {
  const [value, setValue] = useState("");
  const [list, setList] = useState(null);
  const [visibleClose, setVisibleClose] = useState(false);

  useEffect(() => {
    setValue(parseUrl("query", "&"));
    setVisibleClose(true);
  }, []);

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

    if (value.length > 1) {
      request(`/search/movie?query=${value}`).then((res) => {
        setList(res.results);
      });
    } else if (value.length < 1) {
      navigate(`/`, false);
      request(`/movie/top_rated`).then((res) => {
        searchData(res, value);
        setList(null);
      });
    }
  };

  const handleClose = () => {
    setValue("");
    setList(null);
    setVisibleClose(false);
    setReload((el) => !el);
    navigate(`/`, false);
  };

  const searchDoctor = (e) => {
    if (e.key === "Enter") {
      if (value) {
        navigate(`/search/&query=${value}`, false);
        request(`/search/movie?query=${value}`).then((res) => {
          searchData(res, value);
          setList(null);
        });
      }
    }
  };

  return (
    <>
      <div className="wrapper-search">
        <div className="search">
          <input
            type="text"
            value={value}
            onChange={onSearch}
            onKeyUp={searchDoctor}
            placeholder={placeholderLanguage[language]}
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
