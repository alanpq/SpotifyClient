export interface ITrack { // TODO: organise this like the parseTrack
  uri: string;
  uid: string;
  metadata: {
    duration: number;
    entity_uri: string;
    iteration: number;
    album_disc_count: string;
    context_uri: string;
    album_track_number: string;
    has_lyrics: boolean;
    artist_uri: string;
    artist_name: string;
    is_local: string;
    image_large_url: string;
    popularity: number;
    image_xlarge_url: string;
    album_uri: string;
    is_explicit: boolean;
    album_title: string;
    image_url: string;
    album_disc_number: number;
    available_file_formats: string[];
    collection: {
      can_add: boolean;
      in_collection: boolean;
    };
    track_player: string;
    title: string;
    album_track_count: number;
    album_artist_name: string;
    image_small_url: string;
  };
  provider: string;
}

export const parseTrack = (raw: any): ITrack => {
  return {
    metadata: {
      available_file_formats: raw.available_file_formats,

      duration: raw.duration as number,
      popularity: raw.popularity as number,
      title: raw.title as string,

      album_artist_name: raw.album_artist_name as string,
      album_disc_count: raw.album_disc_count,
      album_disc_number: raw.album_disc_number as number,
      album_title: raw.album_title as string,
      album_track_count: raw.album_track_count as number,
      album_track_number: raw.album_track_number,
      album_uri: raw.album_uri as string,

      artist_name: raw.artist_name,
      artist_uri: raw.artist_uri,

      image_large_url: raw.image_large_url,
      image_small_url: raw.image_small_url as string,
      image_url: raw.image_url as string,
      image_xlarge_url: raw.image_xlarge_url as string,

      collection: {
        can_add: raw["collection.can_add"] as boolean,
        in_collection: raw["collection.in_collection"] as boolean,
      },

      context_uri: raw.context_uri,
      entity_uri: raw.entity_uri,
      iteration: raw.iteration as number,
      track_player: raw.track_player as string,

      has_lyrics: raw.has_lyrics as boolean,
      is_explicit: raw.is_explicit as boolean,
      is_local: raw.is_local,

    },
    provider: raw.provider,
    uid: raw.uid,
    uri: raw.uri,
  };
};
