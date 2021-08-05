import React, { useEffect, useReducer, useState } from "react";
import { request } from "../../../service/Service";
import {
  appReducer,
  initialState,
  SHOW_LOADER,
} from "../../../contextReduser/AppReduser";
import Loader from "../../Loader/Loader";
import { navigate } from "hookrouter";
import { defaultUrlImg, languageList } from "../../../config";
import "./style.scss";
import defaultImg from "../../../assets/noimage.jpg";
import { parseUrl } from "../../ParseURL/ParseURL";

const MovieCardItem = ({ id }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [data, setData] = useState(null);
  const language = localStorage.getItem("language");

  useEffect(() => {
    dispatch({
      type: SHOW_LOADER,
      payload: true,
    });
    request(`/movie/${id}`)
      .then((res) => {
        setData(res);
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
  }, [id]);

  const back = () => {
    let url = "";
    const patch = window.location.pathname;
    const patchPage = patch.split("page=")[1];
    const parseQuery = parseUrl("query", "&");
    const parsePage = parseUrl("page", "&");

    if (parseQuery) {
      url += `&query=${parseQuery}`;
      if (patchPage) {
        url += `&page=${patchPage}`;
      }
    }

    if (parsePage) {
      url += `&page=${parsePage}`;
    }

    navigate(`/${url}`, false);
  };

  const imgUrl = () => {
    if (data.hasOwnProperty("poster_path") && data.poster_path) {
      return defaultUrlImg + data.poster_path;
    } else {
      return defaultImg;
    }
  };

  return (
    <div>
      {state.showLoader ? <Loader /> : null}

      <div className="wrapper-item">
        <div className="header-item">
          <span className="btn" onClick={back}>
            {languageList[language].a2}
          </span>
        </div>
        {data && (
          <div className="item">
            <div className="img">
              <img src={imgUrl()} alt="" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCardItem;
