const defaultURL = "https://api.themoviedb.org/3";

export const request = (url) => {
  let language;
  const localLanguage = localStorage.getItem("language") || "ru";
  const myHeaders = new Headers();

  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0M2MwY2Q4ZDZlMDY3MmY5YzFjNTM5MDdjOTQzY2MzOCIsInN1YiI6IjYxMDk0ZjU2YzYxM2NlMDA3ZjdkMGFjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mbaI8EathUd4PQiFL1D_AnYB15_F_RMELOg2h-AqEgo"
  );

  let urlParams = new URLSearchParams(url.split("?")[1]);
  let params = Object.fromEntries(urlParams.entries());

  Object.keys(params).length
    ? (language = `&language=${localLanguage}`)
    : (language = `?language=${localLanguage}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  console.log("1");

  return fetch(`${defaultURL}${url}${language}`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log("error", error));
};
