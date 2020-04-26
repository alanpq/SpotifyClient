// tslint:disable: max-classes-per-file
import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { createWindow } from "./login";

import { ISong } from "./modals/Song";
import { User } from "./net/user";

import { useState } from "react";
import { IDevice } from "./modals/Device";
import { IPlayerState } from "./modals/PlayerState";
import { IState, parseState } from "./modals/State";
import { ITrack } from "./modals/Track";
import { registerDevice } from "./net/device";
import { getDeviceState } from "./net/state";
import { getImageURL, getTracks } from "./net/tracks";
import "./style.sass";


const userCtx = React.createContext(undefined);
const playerStateCtx = React.createContext({
  set: (state: IState) => { },
  state: undefined,
});

// TODO: use dispatchers

const device: IDevice = {
  brand: "spotify",
  capabilities: {
    audio_podcasts: true,
    change_volume: true,
    disable_connect: false,
    enable_play_token: true,
    play_token_lost_behavior: "pause",
    video_playback: true,
    manifest_formats: [
      "file_urls_mp3",
      "file_urls_external",
      "file_ids_mp4",
      "file_ids_mp4_dual",
      "manifest_ids_video",
    ],
  },
  device_id: "bruh",
  device_type: "computer",
  metadata: {},
  model: "web_player",
  name: "Spotify Client!",
  platform_identifier: "web_player windows 10;firefox 75.0;desktop",
};


const Profile = ({ user }: any) => {
  if (user) {
    return (
      <a className="profile">
        <img src={user.images[0].url}></img>
        <span>{user.displayName}</span>
      </a>
    );
  } else {
    return (
      <playerStateCtx.Consumer>
        {({ state, set }) => (
          <a onClick={() => {
            createWindow((usr: User) => {
              user = usr;
              registerDevice(device).then(async () => {
                set(parseState(await getDeviceState(device, "brotha")));
              });
            });
          }}>
            Log in
          </a>
        )}
      </playerStateCtx.Consumer>
    );
  }
};

const Nav = () => {
  return (
    <userCtx.Consumer>
      {(user) => (
        <playerStateCtx.Consumer>
          {({ state, set }) => (
            <nav>
              <a onClick={async () => { console.log(await getTracks("0mZ6aZKJ3ziBBoe3saiHjN")); }}>Get Track</a>
              <a onClick={async () => {
                const a = parseState(await getDeviceState(device, "brotha"));
                console.log(a);
                set(a);
              }}>Reload State</a>
              <Profile user={user} />
            </nav >
          )}
        </playerStateCtx.Consumer>
      )}
    </userCtx.Consumer>
  );
};

const Header = () => {
  return (
    <header>
      <Nav />
    </header>
  );
};


const SongInfo = ({ track, timestamp }: { track: ITrack, timestamp: number }) => {
  if (!track || !timestamp) {
    return (
      <section className="song">

      </section>
    );
  }
  return (
    <section className="song">
      <img src={getImageURL(track.metadata.image_small_url)} />
      <section className="title">{track.metadata.title}</section>
      <section className="artist alt">{track.metadata.artist_name}</section>
    </section>
  );
};

const Controls = ({ state }: { state: IPlayerState }) => {
  const [timer, setTimer]: [any, any] = useState(0);

  const tick = () => {
    if (state.is_paused) {
      setTimer(state.position_as_of_timestamp);
      return;
    }
    setTimer(Date.now() - state.timestamp);
  };
  let interval: NodeJS.Timeout;
  React.useEffect(() => {
    interval = setInterval(tick, 200);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <section className="controls">
      <span className="time alt">0:00</span>
      <span className="duration alt">
        {`${Math.floor(state.duration / 60000)}:${Math.round((state.duration / 1000) % 60)}`}
      </span>
      <Bar value={timer / state.duration} />
      <section className="buttons">
        <a className="shuffle"></a>
        <a className="prev"></a>
        <a className="play"></a>
        <a className="next"></a>
        <a className="repeat"></a>
      </section>
    </section >
  );
};

const Bar = ({ value, width }: { value: number, width?: string }) => {
  return (
    <section className="bar" style={{ width: width || "100%" }}>
      <span className="bg"></span>
      <span className="fill" style={{ width: `${value * 100}%` }}></span>
    </section>
  );
};

const Volume = ({ volume, devices }: { volume: number, devices: IDevice[] }) => {
  return (
    <section className="volume">
      <a className="queue"></a>
      <a className="devices"></a>
      <a className="mute"></a>
      <Bar value={0.6} width="70px" />
    </section>
  );
};

const Footer = () => {
  return (
    <footer>
      <playerStateCtx.Consumer>
        {({ state, set }: { state: IState, set: any }) => (
          <>
            <SongInfo track={state.player_state.track} timestamp={state.player_state.timestamp} />
            <Controls state={state.player_state} />
            <Volume volume={65535} devices={Object.values(state.devices)} />
          </>
        )}
      </playerStateCtx.Consumer>
    </footer>
  );
};


const Index = () => {
  const [usrState, setUsrState]: [any, any] = useState(undefined);
  const [playerState, setPlayerState]: [IState, any] = useState({
    devices: {},
    player_state: {
      timestamp: undefined,
      track: undefined,
    },
  } as IState);

  return (
    <Router>
      <main>
        <userCtx.Provider value={usrState}>
          <playerStateCtx.Provider value={{ state: playerState, set: setPlayerState }}>
            <Header />
            <section className="body">
              <Switch>
                <Route path="/">
                </Route>
              </Switch>
            </section>
            <Footer />
          </playerStateCtx.Provider>
        </userCtx.Provider>
      </main>
    </Router>
  );
};

const draw = () => {
  ReactDOM.render(<Index />, document.getElementById("app"));
};

draw();
