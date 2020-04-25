// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import {createWindow} from "./../login";

export let user: any;

const usernames = document.querySelectorAll(".txt_displayName");

const updateUser = (usr: any) => {
  user = usr;
  usernames.forEach((v) => v.innerHTML = escape(user.display_name));
  console.log(usr);
};

document.querySelector('#loginBtn').addEventListener('click', () => {
  createWindow(updateUser);
});
