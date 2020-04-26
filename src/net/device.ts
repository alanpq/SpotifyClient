import { IDevice } from "../modals/Device";
import { post } from "./request";

export const registerDevice = async (device: IDevice) => {
  return await post("https://gew-spclient.spotify.com/track-playback/v1/devices", JSON.stringify({
    client_version: "harmony:4.2.0-6f9b9aa", // TODO: investigate custom client versions
    connection_id: "brotha", // TODO: generate connection ids
    device,
    volume: 65535,
  }));
};
