import { DateTime } from "luxon";
import { DATE_FORMATS } from "./constants";

export const generateDate = () => DateTime.now().toLocaleString();

export const generateDateTime = () => DateTime.now().toFormat(DATE_FORMATS.DATETIME);

export const dateTimeToDate = (dateTime) =>
  DateTime.fromFormat(dateTime, DATE_FORMATS.DATETIME).toFormat(DATE_FORMATS.DATE);

export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const mergeClasses = (classes, separator) =>
  Array.isArray(classes)
    ? classes.reduce((acc, className) => (acc.length > 0 ? (acc += separator + className) : (acc = className)), "")
    : "";

export const getWeatherWithIcon = (weather) => {
  switch (weather.toLowerCase()) {
    case "солнечно":
    case "ясно":
      return (
        <i>
          ☀️ <span>{weather}</span>
        </i>
      );
    case "пасмурно":
      return (
        <i>
          ☁️ <span>{weather}</span>
        </i>
      );
    case "облачно":
      return (
        <i>
          ⛅ <span>{weather}</span>
        </i>
      );
    case "дождь":
      return (
        <i>
          🌧️ <span>{weather}</span>
        </i>
      );
    case "снег":
    case "снегопад":
      return (
        <i>
          🌨️ <span>{weather}</span>
        </i>
      );
    default:
      return (
        <i>
          💨 <span>{weather}</span>
        </i>
      );
  }
};
