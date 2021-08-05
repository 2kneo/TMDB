import React from "react";
import { defaultUrlImg } from "../../../config";
import moment from "moment";
import Rating from "../../Rating/Rating";
import { navigate } from "hookrouter";
import "./style.scss";
import defaultImg from "./../../../assets/noimage.jpg";
import { parseUrl } from "../../ParseURL/ParseURL";

const MovieCardPreview = ({ data }) => {
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

  const addItem = () => {
    return data.map((e) => {
      return (
        <div
          className="item-preview"
          key={e.id}
          onClick={() => handlePreviewCard(e)}
        >
          <div className="img">
            <img
              src={`${
                e.hasOwnProperty("poster_path")
                  ? defaultUrlImg + e.poster_path
                  : defaultImg
              }`}
              alt=""
            />
          </div>
          <div className="preview-text">
            <h3>{e?.title}</h3>
            <div className="preview-footer">
              <Rating rating={e?.vote_average} />
              <span className="preview-date">
                {moment(e?.release_date).format("DD MMMM YYYY")}
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
        "Нет данных"
      )}
    </>
  );
};

export default MovieCardPreview;
