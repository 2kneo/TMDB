import React, { useEffect, useMemo, useReducer, useState } from "react";
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
import { momentDate } from "../../MomentDate/MomentDate";

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

  const listForm = useMemo(
    () => [
      {
        id: 1,
        title: languageList[language].a5,
        description: data?.original_title,
      },
      {
        id: 2,
        title: languageList[language].a6,
        description: data?.original_language,
      },
      {
        id: 3,
        title: languageList[language].a7,
        description: data?.genres.map((e) => e.name).join(", "),
      },
      {
        id: 4,
        title: languageList[language].a8,
        description: momentDate(data, language),
      },
      {
        id: 1,
        title: languageList[language].a9,
        description: data?.tagline,
      },
      {
        id: 1,
        title: languageList[language].a10,
        description: data?.production_companies.map((e) => e.name).join(", "),
      },
      {
        id: 1,
        title: languageList[language].a11,
        description: data?.overview,
      },
    ],
    [data, language]
  );

  const description = () => {
    return listForm.map(({ id, title, description }) => {
      return (
        <p key={id}>
          <strong>{title}</strong>
          {description}
        </p>
      );
    });
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
          <>
            <h1>{data.title}</h1>
            <div className="item">
              <div className="img">
                <img src={imgUrl()} alt="" />
              </div>
              <div className="text">
                {description()}
                {/*<p>
                  <strong>{languageList[language].a5}</strong>
                  {data.original_title}
                </p>
                <p>
                  <strong>{languageList[language].a6}</strong>
                  {data.original_language}
                </p>
                <p>
                  <strong>{languageList[language].a7}</strong>
                  {data.genres.map((e) => e.name).join(", ")}
                </p>
                <p>
                  <strong>{languageList[language].a8}</strong>
                  {momentDate(data, language)}
                </p>
                <p>
                  <strong>{languageList[language].a9}</strong>
                  {data.tagline}
                </p>
                <p>
                  <strong>{languageList[language].a10}</strong>
                  {data.production_companies.map((e) => e.name).join(", ")}
                </p>
                <p>
                  <strong>{languageList[language].a11}</strong>
                  {data.overview}
                </p>*/}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieCardItem;
