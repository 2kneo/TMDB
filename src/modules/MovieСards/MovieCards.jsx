import React, { useEffect, useReducer, useState } from "react";
import MovieCardPreview from "./MovieCardPreview/MovieCardPreview";
import Pagination from "rc-pagination";
import localeInfo from "./../Pagination/ru_Ru";
import {
  appReducer,
  initialState,
  SHOW_LOADER,
} from "../../contextReduser/AppReduser";
import "./style.scss";
import { request } from "../../service/Service";
import Loader from "../Loader/Loader";

const MovieCards = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [total, setTotal] = useState(null);
  const [data, setData] = useState(null);
  const [testCurrent, setTestCurrent] = useState(1);

  useEffect(() => {
    dispatch({
      type: SHOW_LOADER,
      payload: true,
    });
    request("/top_rated")
      .then((res) => {
        dispatch({
          type: SHOW_LOADER,
          payload: false,
        });
        setData(res.results);
        setTotal(res.count);
      })
      .catch((err) => {
        console.log("err", err);
        dispatch({
          type: SHOW_LOADER,
          payload: true,
        });
      });
  }, []);

  const onChangePagination = (current) => {
    setTestCurrent(current);
    /*let url = "";
    let urlParamsDefault = new URLSearchParams(nextUrl.split("?")[1]);
    let paramsDefault = Object.fromEntries(urlParamsDefault.entries());

    if (paramsDefault["page"]) {
      url += `?page=${current}`;
    }
    console.log('paramsDefault["specialty"]', paramsDefault["specialty"]);
    if (paramsDefault["specialty"]) {
      url += `&specialty=${paramsDefault["specialty"]}`;
    }
    if (paramsDefault["search"]) {
      url += `&search=${paramsDefault["search"]}`;
    }

    dispatch({
      type: SHOW_LOADER,
      payload: true,
    });*/

    /*getRequest(`doctor/${url}`).then((res) => {
      if (res.data.hasOwnProperty("next") && res.data.next) {
        setNextUrl(res.data.next);
        setData(res.data.results);
        setTotal(res.data.count);
        dispatch({
          type: SET_SHOW_LOADER,
          payload: false,
        });
      } else {
        setData(res.data.results);
        setTotal(res.data.count);
        dispatch({
          type: SET_SHOW_LOADER,
          payload: false,
        });
      }
    });*/
  };

  return (
    <>
      {state.showLoader ? <Loader /> : null}
      <MovieCardPreview data={data} />
      {total && (
        <Pagination
          showSizeChanger
          className="text-center mt-3"
          defaultPageSize={10}
          defaultCurrent={1}
          current={testCurrent}
          onChange={onChangePagination}
          total={total}
          locale={localeInfo}
        />
      )}
    </>
  );
};

export default MovieCards;
