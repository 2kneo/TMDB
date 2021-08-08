import { parseUrl } from "../ParseURL/ParseURL";

export const ParseURLSearch = () => {
  let url = "";
  const patch = window.location.pathname;
  const patchPage = patch.split("page=")[1];
  const parseQuery = parseUrl("query", "&");
  const parsePage = parseUrl("page", "&");

  if (parseQuery) {
    url += `&query=${parseQuery}`;
    if (patchPage) {
      url += `&page=${patchPage}`;
    }
  }

  if (parsePage) {
    url += `&page=${parsePage}`;
  }

  return url;
};
