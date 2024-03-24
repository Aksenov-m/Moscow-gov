import { data } from "./data";

export function fakeFetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
        resolve(data)
    }, 2000);
  });
}
