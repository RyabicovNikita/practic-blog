import { DateTime } from "luxon";

export const generateDate = () => DateTime.now().toLocaleString();

export const generateDateTime = () => DateTime.now().toFormat("dd.MM.yyyy TT");

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
