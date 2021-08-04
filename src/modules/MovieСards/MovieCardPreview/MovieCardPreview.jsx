import React from "react";
import { defaultUrlImg } from "../../../config";
import moment from "moment";
import Rating from "../../Rating/Rating";
import { navigate } from "hookrouter";
import "./style.scss";
import defaultImg from "./../../../assets/noimage.jpg";

const MovieCardPreview = ({ data }) => {
  const addItem = () => {
    if (!data.length) return false;

    return data.map((e) => {
      return (
        <div
          className="item-preview"
          key={e.id}
          onClick={() => navigate(`/card/${e.id}`, false)}
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

  return <div className="wrapper-movie">{addItem()}</div>;
};

export default MovieCardPreview;
