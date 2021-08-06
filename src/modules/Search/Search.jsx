import React, { useEffect, useState } from "react";
import { request } from "../../service/Service";
import { navigate } from "hookrouter";
import { ReactComponent as CloseIco } from "./../../assets/close.svg";
import { ReactComponent as SearchIco } from "./../../assets/search.svg";
import "./style.scss";
import { parseUrl } from "../ParseURL/ParseURL";
import { languageList } from "../../config";

const Search = ({ searchData, setReload, setCurrent, language }) => {
  const [value, setValue] = useState("");
  const [list, setList] = useState(null);
  const [visibleClose, setVisibleClose] = useState(false);

  useEffect(() => {
    if (parseUrl("query", "&")) {
      setValue(parseUrl("query", "&"));
      value && setVisibleClose(true);
    }
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
        searchData(res);
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

  const fnSearch = () => {
    navigate(`/&query=${value}`, false);
    request(`/search/movie?query=${value}`).then((res) => {
      searchData(res, value);
      setCurrent(1);
      setList(null);
    });
  };

  const searchDoctor = (e) => {
    if (e.key === "Enter") {
      if (value) {
        fnSearch();
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
            placeholder={languageList[language].a12}
          />
          <button className="btn-search" onClick={fnSearch}>
            <SearchIco />
          </button>
          {visibleClose && (
            <div className="close" onClick={handleClose}>
              <CloseIco />
            </div>
          )}
        </div>
        {list && <ul className="search-list">{handleList()}</ul>}
      </div>
    </>
  );
};

export default Search;
