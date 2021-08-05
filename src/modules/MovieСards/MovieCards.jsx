import React, { useEffect, useReducer, useState } from "react";
import MovieCardPreview from "./MovieCardPreview/MovieCardPreview";
import Pagination from "rc-pagination";
import localeInfo from "./../Pagination/ru_Ru";
import {
  appReducer,
  initialState,
  LANGUAGE,
  SHOW_LOADER,
} from "../../contextReduser/AppReduser";
import "./style.scss";
import { request } from "../../service/Service";
import Loader from "../Loader/Loader";
import Search from "../Search/Search";
import Language from "../Language/Language";
import { navigate } from "hookrouter";
import { parseUrl } from "../ParseURL/ParseURL";

const MovieCards = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [total, setTotal] = useState(null);
  const [data, setData] = useState([]);
  /*  const [valueSearch, setValueSearch] = useState(null);*/
  const [reload, setReload] = useState(false);
  const [current, setCurrent] = useState(1);

  const fnRequest = (page) => {
    dispatch({
      type: SHOW_LOADER,
      payload: true,
    });
    request(page)
      .then((res) => {
        setData(res.results);
        setTotal(res.total_pages);
        dispatch({
          type: SHOW_LOADER,
          payload: false,
        });
      })
      .catch((err) => {
        console.log("err", err);
        dispatch({
          type: SHOW_LOADER,
          payload: false,
        });
      });
  };

  useEffect(() => {
    let url;
    const parseQuery = parseUrl("query", "&");
    const parsePage = parseUrl("page", "/");

    if (parseQuery) {
      if (parsePage) {
        url = `/search/movie?query=${parseQuery}&page=${parsePage}`;
        setCurrent(+parsePage);
      } else {
        url = `/search/movie?query=${parseQuery}`;
      }
    } else {
      if (parsePage) {
        url = `/movie/top_rated?page=${parsePage}`;
        setCurrent(+parsePage);
      } else {
        url = "/movie/top_rated";
      }
    }
    fnRequest(url);
  }, [reload]);

  const reloadSearch = (name) => {
    setReload((e) => !e);
    setTotal(null);
    setCurrent(1);
    dispatch({
      type: LANGUAGE,
      payload: name,
    });
  };

  const searchData = (data) => {
    setData(data.results);
    /*    setValueSearch(value);*/
    setTotal(data.total_pages);
  };

  const onChangePagination = (current) => {
    let url = "";
    let navigateUrl = "";
    const parseQuery = parseUrl("query", "&");

    if (parseQuery) {
      url += `/search/movie?query=${parseQuery}&page=${current}`;
      navigateUrl += `&query=${parseQuery}&page=${current}`;
      setCurrent(current);
    } else {
      if (current === 1) {
        url += `/movie/top_rated?page=${current}`;
      } else {
        url += `/movie/top_rated?page=${current}`;
        navigateUrl += `&page=${current}`;
      }
      setCurrent(current);
    }

    fnRequest(url);
    navigate(`/${navigateUrl}`);
  };

  return (
    <>
      {state.showLoader ? <Loader /> : null}
      <div className="header">
        <Search
          setCurrent={setCurrent}
          setReload={reloadSearch}
          searchData={searchData}
          language={state.language}
        />
        <Language setReload={reloadSearch} />
      </div>

      <MovieCardPreview data={data} />

      {total ? (
        <div className="wrapper-pagination">
          <Pagination
            showSizeChanger
            className="text-center mt-3"
            defaultPageSize={10}
            defaultCurrent={1}
            current={current}
            onChange={onChangePagination}
            total={total}
            locale={localeInfo}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default MovieCards;
