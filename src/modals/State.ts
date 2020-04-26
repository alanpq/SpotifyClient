import { IDevice } from "./Device";
import { IPlayerState, parsePlayerState } from "./PlayerState";

export interface IState {
  timestamp: number;
  active_device_id: string;
  player_state: IPlayerState;
  devices: { [name: string]: IDevice };
  transfer_data_timestamp: number;
}

export const parseState = (raw: any): IState => {
  const devices: { [name: string]: IDevice } = {};
  for (const [k, v] of raw.devices) {
    devices[k] = v as IDevice;
  }
  return {
    active_device_id: raw.active_device_id as string,
    devices,
    player_state: parsePlayerState(raw.player_state) as IPlayerState,
    timestamp: parseInt(raw.timestamp, 10),
    transfer_data_timestamp: parseInt(raw.transfer_data_timestamp, 10),
  };
};
