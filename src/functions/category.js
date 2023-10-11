import { UrlConfig } from "../config";


export async function fetchCategories() {
  let url = new URL(UrlConfig.serverUrl + "/Category");

  return await fetch(url).then((res) => {
    return res.json();
  });
}
