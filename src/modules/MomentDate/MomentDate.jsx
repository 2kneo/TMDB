import moment from "moment";

export const momentDate = (data, language) => {
  if (!data?.hasOwnProperty("release_date")) return false;

  if (data.release_date) {
    return moment(data.release_date)
      .locale(language === "ru" ? "ru" : "en-ca")
      .format("DD MMMM YYYY");
  }
};
