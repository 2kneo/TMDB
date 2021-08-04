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
  const [valueSearch, setValueSearch] = useState(null);
  const [reload, setReload] = useState(false);
  const [current, setCurrent] = useState(1);

  const requestFn = (page) => {
    dispatch({
      type: SHOW_LOADER,
      payload: true,
    });
    request(page)
      .then((res) => {
        setData(res.results);
        setTotal(res.total_pages);
        if (res.page === 1) {
          navigate(`/`, false);
        } else {
          navigate(`/&page=${res.page}`, false);
        }

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

  const urlPars = (separator, flag, current) => {
    let url = "";
    let urlParamsDefault = new URLSearchParams(
      window.location.pathname.split(separator)[1]
    );
    let paramsDefault = Object.fromEntries(urlParamsDefault.entries());
    const queryData = flag ? paramsDefault["query"] : valueSearch;

    if (paramsDefault["query"]) {
      url += `/search/movie/?page=${current}&query=${queryData}`;
    } else {
      url += `/movie/top_rated?page=${current}`;
    }

    return url;
  };

  useEffect(() => {
    const defaultPage = parseUrl("page", "&");
    if (defaultPage) {
      requestFn(urlPars("&", true, +defaultPage));
      setCurrent(+defaultPage);
    } else {
      requestFn(urlPars("&", true, current));
    }
  }, [reload]);

  const onChangePagination = (current) => {
    setCurrent(current);
    requestFn(urlPars("&", true, current));
  };

  const reloadSearch = (name) => {
    setReload((e) => !e);
    setTotal(null);
    setCurrent(1);
    dispatch({
      type: LANGUAGE,
      payload: name,
    });
  };

  const searchData = (data, value) => {
    setData(data.results);
    setValueSearch(value);
    setTotal(data.total_pages);
  };

  return (
    <>
      {state.showLoader ? <Loader /> : null}
      <div className="header">
        <Search
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
            defaultPageSize={1}
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
