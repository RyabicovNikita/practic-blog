export const generateDate = () =>
  new Date(Math.random() * 1000000000000 + 1999999999999).toISOString().substring(0, 16).replace("T", "");

export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
