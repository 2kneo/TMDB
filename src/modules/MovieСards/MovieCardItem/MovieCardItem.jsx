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
import { momentDate } from "../../MomentDate/MomentDate";
import { noData } from "../../NoData/NoData";
import { ParseURLSearch } from "../../ParseURLSearch/ParseURLSearch";

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
        dispatch({
          type: SHOW_LOADER,
          payload: false,
        });
        if (res.hasOwnProperty("success")) {
          navigate(`/not-found/`, false);
        }
        setData(res);
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
    const url = ParseURLSearch();

    navigate(`/${url}`, true);
  };

  const imgUrl = () => {
    if (data.hasOwnProperty("poster_path") && data.poster_path) {
      return defaultUrlImg + data.poster_path;
    } else {
      return defaultImg;
    }
  };

  const listForm = useMemo(() => {
    return [
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
        description: data?.genres?.map((e) => e.name).join(", "),
      },
      {
        id: 4,
        title: languageList[language].a8,
        description: momentDate(data, language),
      },
      {
        id: 5,
        title: languageList[language].a9,
        description: data?.tagline,
      },
      {
        id: 6,
        title: languageList[language].a10,
        description: data?.production_companies?.map((e) => e.name).join(", "),
      },
      {
        id: 7,
        title: languageList[language].a11,
        description: data?.overview,
      },
    ];
  }, [data, language]);

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

      {
        <div className="wrapper-item">
          <div className="header-item">
            <span className="btn" onClick={back}>
              {languageList[language].a2}
            </span>
          </div>
          {data && !data.hasOwnProperty("success") ? (
            <>
              <h1>{data.title}</h1>
              <div className="item">
                <div className="img">
                  <img src={imgUrl()} alt="" />
                </div>
                <div className="text">{description()}</div>
              </div>
            </>
          ) : (
            noData(language)
          )}
        </div>
      }
    </div>
  );
};

export default MovieCardItem;
