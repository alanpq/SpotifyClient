import { ITrack } from "./Track";

export interface IPlayerState {
  timestamp: number;

  context_uri: string;
  context_url: string;
  context_restrictions: any;
  context_metadata: {
    zelda: {
      context_uri: string;
    };
    track_count: number;
  };

  play_origin: {
    feature_identifier: string;
    feature_version: string;
    view_uri: string;
    referrer_identifier: string;
    feature_classes: string[];
  };
  index: {
    page: number;
    track: number;
  };
  track: ITrack;
  playback_id: string;
  playback_speed: number;
  position_as_of_timestamp: number;
  duration: number;
  is_playing: boolean;
  is_paused: boolean;
  is_system_initiated: boolean;
  options: {
    shuffling_context: boolean;
    repeating_context: boolean;
    repeating_track: boolean;
  };
  restrictions: {
    disallow_resuming_reasons: string[];
  };
  suppressions: any; // TODO: find type
  prev_tracks: ITrack[];
  next_tracks: ITrack[];
  page_metadata: any; // TODO: find type
  session_id: string;
  queue_revision: string; // big number so string for now
}

export const parsePlayerState = (raw: any): IPlayerState => {
  return {
    timestamp: parseInt(raw.timestamp, 10),

    context_uri: raw.context_uri as string,
    context_url: raw.context_url as string,
    context_restrictions: raw.context_restrictions as any,
    context_metadata: {
      zelda: {
        context_uri: raw.context_uri as string,
      },
      track_count: raw.track_count as number,
    },

    play_origin: {
      feature_identifier: raw.feature_identifier as string,
      feature_version: raw.feature_version as string,
      view_uri: raw.view_uri as string,
      referrer_identifier: raw.referrer_identifier as string,
      feature_classes: raw.feature_classes as string[],
    },
    index: {
      page: parseInt(raw.page, 10),
      track: parseInt(raw.track, 10),
    },
    track: raw.track as ITrack,
    playback_id: raw.playback_id as string,
    playback_speed: parseInt(raw.playback_speed, 10),
    position_as_of_timestamp: parseInt(raw.position_as_of_timestamp, 10),
    duration: parseInt(raw.duration, 10),
    is_playing: raw.is_playing as boolean,
    is_paused: raw.is_paused as boolean,
    is_system_initiated: raw.is_system_initiated as boolean,
    options: {
      shuffling_context: raw.shuffling_context as boolean,
      repeating_context: raw.repeating_context as boolean,
      repeating_track: raw.repeating_track as boolean,
    },
    restrictions: {
      disallow_resuming_reasons: raw.disallow_resuming_reasons as string[],
    },
    suppressions: raw.suppressions,
    prev_tracks: raw.prev_tracks as ITrack[],
    next_tracks: raw.next_tracks as ITrack[],
    page_metadata: raw.page_metadata,
    session_id: raw.session_id as string,
    queue_revision: raw.queue_revision as string,
  };
};
