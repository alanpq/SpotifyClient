// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import {createWindow} from "./../login";

export let user: any;

const usernames = document.querySelectorAll(".txt_displayName");
const avatars = document.querySelectorAll("img.avatar");

const updateUser = (usr: any) => {
  user = usr;
  usernames.forEach((v) => v.innerHTML = escape(usr.display_name));
  avatars.forEach((v: HTMLImageElement) => v.src = usr.images[0].url);
};

document.querySelector("#loginBtn").addEventListener("click", () => {
  createWindow(updateUser);
});
