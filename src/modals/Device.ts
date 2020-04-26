export interface IDevice {
  brand?: string;
  capabilities?: {
    change_volume?: boolean;
    audio_podcasts?: boolean;
    enable_play_token?: boolean;
    play_token_lost_behavior?: string;
    disable_connect?: boolean;
    video_playback?: boolean;
    manifest_formats?: string[];
  };
  device_id?: string;
  device_type?: string;
  metadata?: any;
  model?: string;
  name?: string;
  platform_identifier?: string;
}
// TODO: complete IDevice definition
/*
"bruh": {
  "can_play": true,
  "volume": 65535,
  "name": "Spotify Client!",
  "capabilities": {
    "can_be_player": true,
    "gaia_eq_connect_id": true,
    "supports_logout": true,
    "is_observable": true,
    "volume_steps": 64,
    "supported_types": ["audio/track", "audio/episode", "video/episode"],
    "command_acks": true,
    "supports_playlist_v2": true,
    "is_controllable": true,
    "supports_external_episodes": true,
    "supports_command_request": true
  },
  "metadata": [{
    "type": "client_id",
    "metadata": "d8a5ed958d274c2e8ee717e6a4b0971d"
  }],
  "device_software_version": "harmony:4.2.0-6f9b9aa/track-playback",
  "device_type": "COMPUTER",
  "spirc_version": "3.2.1",
  "device_id": "bruh",
  "client_id": "d8a5ed958d274c2e8ee717e6a4b0971d",
  "brand": "spotify",
  "model": "web_player"
},
*/