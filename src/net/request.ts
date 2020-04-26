import { token } from "../auth";

const globHeaders = new Headers();
globHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0");
globHeaders.append("Accept", "*/*");
globHeaders.append("Accept-Language", "en-GB,en;q=0.5");
globHeaders.append("Referer", "https://open.spotify.com/");
globHeaders.append("Origin", "https://open.spotify.com");
globHeaders.append("DNT", "1");
globHeaders.append("Connection", "keep-alive");

export async function get(url: string, headers?: [{ key: string, value: string }]) {
  if (!token) { throw new Error("Not currently authorized!"); }

  globHeaders.append("Authorization", "Bearer " + token);
  if (headers) {
    headers.forEach((header) => {
      globHeaders.append(header.key, header.value);
    });
  }

  const requestOptions: RequestInit = {
    cache: "no-cache",
    credentials: "same-origin",
    headers: globHeaders,
    method: "GET",
    mode: "cors",
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  return await fetch(url, requestOptions)
    .then((response) => response.json())
    .catch((error) => { throw error; });
}

export async function post(url: string, body: string, headers?: [{ key: string, value: string }]) {
  if (!token) { throw new Error("Not currently authorized!"); }

  globHeaders.append("Authorization", "Bearer " + token);
  if (headers) {
    headers.forEach((header) => {
      globHeaders.append(header.key, header.value);
    });
  }

  const requestOptions: RequestInit = {
    body,
    cache: "no-cache",
    credentials: "same-origin",
    headers: globHeaders,
    method: "POST",
    mode: "cors",
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  return await fetch(url, requestOptions)
    .then((response) => response.json())
    .catch((error) => { throw error; });
}

export async function put(url: string, body: string, headers?: [{ key: string, value: string }]) {
  if (!token) { throw new Error("Not currently authorized!"); }

  globHeaders.append("Authorization", "Bearer " + token);
  if (headers) {
    headers.forEach((header) => {
      globHeaders.append(header.key, header.value);
    });
  }

  const requestOptions: RequestInit = {
    body,
    cache: "no-cache",
    credentials: "same-origin",
    headers: globHeaders,
    method: "PUT",
    mode: "cors",
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  return await fetch(url, requestOptions)
    .then((response) => response.json())
    .catch((error) => { throw error; });
}
