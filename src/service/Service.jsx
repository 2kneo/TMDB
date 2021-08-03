const defaultURL = "https://api.themoviedb.org/3/movie";
const localLanguage = localStorage.getItem("language");
const language = localLanguage ? `?language=${localLanguage}` : "?language=ru";

export const request = (url) => {
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0M2MwY2Q4ZDZlMDY3MmY5YzFjNTM5MDdjOTQzY2MzOCIsInN1YiI6IjYxMDk0ZjU2YzYxM2NlMDA3ZjdkMGFjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mbaI8EathUd4PQiFL1D_AnYB15_F_RMELOg2h-AqEgo"
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  return fetch(`${defaultURL}${url}${language}`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log("error", error));
};
