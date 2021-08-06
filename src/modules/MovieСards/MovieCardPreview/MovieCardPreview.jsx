import React from "react";
import Rating from "../../Rating/Rating";
import { parseUrl } from "../../ParseURL/ParseURL";
import { momentDate } from "../../MomentDate/MomentDate";
import { navigate } from "hookrouter";
import defaultImg from "./../../../assets/noimage.jpg";
import { defaultUrlImg, languageList } from "../../../config";
import "./style.scss";

const MovieCardPreview = ({ data, language }) => {
  const handlePreviewCard = (e) => {
    let url = `/card/${e.id}`;
    const parseQuery = parseUrl("query", "&");
    const parsePage = parseUrl("page", "/");

    if (parseQuery) {
      url += `&query=${parseQuery}`;
    }

    if (parsePage) {
      url += `&page=${parsePage}`;
    }

    navigate(url, false);
  };

  const imgUrl = (e) => {
    if (e.hasOwnProperty("poster_path") && e.poster_path) {
      return defaultUrlImg + e.poster_path;
    } else {
      return defaultImg;
    }
  };

  const message = () => {
    return languageList[language].a1;
  };

  const addItem = () => {
    return data.map((e) => {
      return (
        <div
          className="item-preview"
          key={e.id}
          onClick={() => handlePreviewCard(e)}
        >
          <div className="img">
            <img src={imgUrl(e)} alt="" />
          </div>
          <div className="preview-text">
            <h3>{e.title}</h3>
            <div className="preview-footer">
              <div className="col-50">
                <Rating rating={e.vote_average} />
              </div>
              <span className="col-50 preview-date">
                {momentDate(e, language)}
              </span>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      {data && data.length ? (
        <div className="wrapper-movie">{addItem()}</div>
      ) : (
        message()
      )}
    </>
  );
};

export default MovieCardPreview;
