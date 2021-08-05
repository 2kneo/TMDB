import React from "react";
import { defaultUrlImg, languageList } from "../../../config";
import moment from "moment";
import Rating from "../../Rating/Rating";
import { navigate } from "hookrouter";
import "./style.scss";
import defaultImg from "./../../../assets/noimage.jpg";
import { parseUrl } from "../../ParseURL/ParseURL";

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
              <Rating rating={e.vote_average} />
              <span className="preview-date">
                {moment(e.release_date)
                  .locale(language === "ru" ? "ru" : "en-ca")
                  .format("DD MMMM YYYY")}
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
