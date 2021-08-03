import React, { useEffect, useReducer, useState } from "react";
import { request } from "../../../service/Service";
import {
  appReducer,
  initialState,
  SHOW_LOADER,
} from "../../../contextReduser/AppReduser";
import Loader from "../../Loader/Loader";
import { navigate } from "hookrouter";
import { defaultUrlImg } from "../../../config";
import "./style.scss";

const MovieCardItem = ({ id }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [data, setData] = useState(null);

  useEffect(() => {
    dispatch({
      type: SHOW_LOADER,
      payload: true,
    });
    request(`/${id}`)
      .then((res) => {
        setData(res);
        console.log("res.data", res);
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
  }, []);

  const back = () => {
    navigate("/", false);
  };

  return (
    <div>
      {state.showLoader ? <Loader /> : null}
      {data && (
        <>
          <span className="btn" onClick={back}>
            Вернутся назад
          </span>
          <div className="wrapper-item">
            <div className="img">
              <img src={`${defaultUrlImg}${data.poster_path}`} alt="" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieCardItem;
