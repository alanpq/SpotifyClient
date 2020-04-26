import { get } from "./request";

export async function getTracks(...ids: string[]) {
  return await get(`https://api.spotify.com/v1/tracks?ids=${escape(ids.join(","))}&market=from_token`);
}

export const getImageURL = (uri: string) => {
  if (!uri) return "INVALID URI"
  const components = uri.split(":");
  if (components.length < 3) return "INVALID_URI";
  if (components[0] !== "spotify" || components[1] !== "image") { return "INVALID_URI"; }
  return `https://i.scdn.co/image/${components[2]}`;
};
