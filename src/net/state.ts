import { IDevice } from "../modals/Device";
import { put } from "./request";

export const getDeviceState = async (device: IDevice, connectionID: string) => {
  return await put(`https://gew-spclient.spotify.com/connect-state/v1/devices/hobs_${device.device_id}`,
    JSON.stringify({
      device: {
        device_info: {
          capabilities: { // TODO: investigate these options
            can_be_player: false,
            hidden: true,
          },
        },
      },
      member_type: "CONNECT_STATE",
    }), [{ key: "X-Spotify-Connection-Id", value: connectionID }]);
};
