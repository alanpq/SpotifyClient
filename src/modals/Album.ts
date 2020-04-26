import { IArtist } from "./Artist";

export interface IAlbum {
  artists: [
    IArtist
  ];
  external_urls: any;
  href: string;
  id: string;
  images: [
    {

    }
  ];
  name: string;
  release_date: string;
  release_date_precision: string; // day, ...
  total_tracks: number;
  type: string; // album, ...
  uri: string; // TODO: use uri interface
}
