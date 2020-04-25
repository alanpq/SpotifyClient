// import {SpotifyURI} from "./modals/Spotify";
export let auth: {
  clientId: string,
  accessToken: string,
  accessTokenExpirationTimestampMs: number,
};

export function setAuth(newAuth: any) {
  auth = {
    accessToken                      : newAuth.accessToken,
    accessTokenExpirationTimestampMs : newAuth.accessTokenExpirationTimestampMs,
    clientId                         : newAuth.clientId,
  }
}

// tslint:disable-next-line: interface-name
export interface User {
  birthdate: Date;
  country: string;
  displayName: string;
  email: string;
  explicitContent: {
    filterEnabled: boolean,
    filterLocked: boolean,
  };
  externalURLS: any;
  followers: {
    href: string,
    total: number,
  };
  href: string;
  id: string;
  images: [
    {
      height: number,
      url: string,
      width: number,
    }
  ];
  product: string;
  showsCollection: boolean;
  uri: string; // TODO: represent uri's internally
}

export async function getUser(token: string) {
  const headers = new Headers();
  headers.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0");
  headers.append("Accept", "application/json");
  headers.append("Accept-Language", "en");
  headers.append("Referer", "https://open.spotify.com/");
  headers.append("app-platform", "WebPlayer");
  headers.append("spotify-app-version", "1587806893");
  headers.append("Origin", "https://open.spotify.com");
  headers.append("DNT", "1");
  headers.append("Connection", "keep-alive");
  headers.append("Authorization", "Bearer " + token);

  const requestOptions: RequestInit = {
    cache: "no-cache",
    credentials: "same-origin",
    headers,
    method: "GET",
    mode: "cors",
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  return await fetch("https://api.spotify.com/v1/me", requestOptions)
    .then ((response: any) => response.json())
    .then ((result: any)   => {
      const usr: User = {
        birthdate: new Date(result.birthdate),
        country: result.country,
        displayName: result.display_name,
        email: result.email,
        explicitContent: result.explicit_content,
        externalURLS: result.external_urls,
        followers: result.followers,
        href: result.href,
        id: result.id,
        images: result.images,
        product: result.product,
        showsCollection: result.shows_collection,
        uri: result.uri,
      };
      return usr;
    })
    .catch((error: any)    => console.log("error", error));
}
