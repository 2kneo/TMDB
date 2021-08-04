export const parseUrl = (el, separator) => {
  const urlParamsDefault = new URLSearchParams(
    window.location.pathname.split(separator)[1]
  );
  const paramsDefault = Object.fromEntries(urlParamsDefault.entries());
  return paramsDefault[el];
};
