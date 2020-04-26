import { Console } from "console";

import { setAuth } from "./net/user";

const con = new Console(process.stdout, process.stderr);

export let token: string;

async function getToken(cookie: string) {
  const headers = new Headers();
  headers.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0");
  headers.append("Accept", "application/json");
  headers.append("Accept-Language", "en");
  headers.append("app-platform", "WebPlayer");
  headers.append("spotify-app-version", "1587806893");
  headers.append("DNT", "1");
  headers.append("Referer", "https://open.spotify.com/");
  headers.append("Connection", "keep-alive");
  headers.append("Cookie", cookie);
  headers.append("TE", "Trailers");


  const requestOptions: RequestInit = {
    cache: "no-cache",
    credentials: "same-origin",
    headers,
    method: "GET",
    mode: "cors",
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  // tslint:disable-next-line: max-line-length
  await fetch("https://open.spotify.com/get_access_token?reason=transport&productType=web_player", requestOptions)
    .then((response: any) => response.json())
    .then((result: any) => {
      con.log("Got access token.");
      token = result.accessToken;
      con.log(result);
      setAuth(result);
    })
    .catch((error: any) => con.log("error", error));
}

export { getToken };
