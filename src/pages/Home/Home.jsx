import React, { createContext, useEffect, useReducer } from "react";
import MovieCards from "../../modules/MovieСards/MovieCards";
import {
  appReducer,
  initialState,
  LANGUAGE,
} from "../../contextReduser/AppReduser";
import MovieCardItem from "../../modules/MovieСards/MovieCardItem/MovieCardItem";
import NotFound from "../NotFound";
import { useRoutes } from "hookrouter";

export const AppContext = createContext({});

const Home = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const value = { state, dispatch };

  useEffect(() => {
    if (!localStorage.getItem("language")) {
      localStorage.setItem("language", "ru");
    }
  }, []);

  const routes = {
    "/": () => <MovieCards />,
    "/:id": ({ id }) => <MovieCards />,
    "/search/:id": ({ id }) => <MovieCards id={id} />,
    "/card/:id": ({ id }) => <MovieCardItem id={id} />,
  };
  const routeResult = useRoutes(routes);

  return (
    <>
      <AppContext.Provider value={value}>
        {routeResult || <NotFound />}
      </AppContext.Provider>
    </>
  );
};

export default Home;
