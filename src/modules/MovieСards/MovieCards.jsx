import React, { useEffect, useReducer, useState } from "react";
import MovieCardPreview from "./MovieCardPreview/MovieCardPreview";
import Pagination from "rc-pagination";
import ru from "./../Pagination/ru_Ru";
import en from "./../Pagination/en_En";
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
import { noData } from "../NoData/NoData";
import { languageList } from "../../config";

const MovieCards = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [total, setTotal] = useState(null);
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);
  const [current, setCurrent] = useState(1);
  const [language, setLanguage] = useState(localStorage.getItem("language"));

  const fnRequest = (page) => {
    dispatch({
      type: SHOW_LOADER,
      payload: true,
    });
    request(page)
      .then((res) => {
        dispatch({
          type: SHOW_LOADER,
          payload: false,
        });
        if (!res.hasOwnProperty("results")) {
          navigate(`/not-found/&${res.errors.join(", ")}`, true);
        }
        setData(res.results);

        if (!res.results.length) return false;

        setTotal(res.total_pages);
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
    const parsePage = +parseUrl("page", "/");

    if (!isNaN(parsePage) && typeof parsePage !== "number") return false;

    setLanguage(localStorage.getItem("language"));

    if (parseQuery) {
      if (parsePage) {
        url = `/search/movie?query=${parseQuery}&page=${parsePage}`;
        setCurrent(parsePage);
      } else {
        url = `/search/movie?query=${parseQuery}`;
      }
    } else {
      if (parsePage) {
        url = `/movie/top_rated?page=${parsePage}`;
        setCurrent(parsePage);
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
        <div className="header-left col-80">
          <Search
            setCurrent={setCurrent}
            setReload={reloadSearch}
            searchData={searchData}
            language={language}
          />
          {data && !data.length ? (
            <button
              className="btn"
              onClick={() => {
                reloadSearch();
                navigate("/", true);
              }}
            >
              {languageList[language].a13}
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="col-20 text-right">
          <Language setReload={reloadSearch} />
        </div>
      </div>

      {data && data.length ? (
        <MovieCardPreview data={data} language={language} />
      ) : (
        noData(language)
      )}

      {total ? (
        <div className="wrapper-pagination">
          <Pagination
            showSizeChanger
            className="text-center mt-3"
            defaultPageSize={1}
            defaultCurrent={1}
            current={current}
            onChange={onChangePagination}
            total={total}
            locale={language === "ru" ? ru : en}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default MovieCards;
