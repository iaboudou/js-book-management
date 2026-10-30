import { timer } from "./config.js";

export function resetInput() {
  document.querySelector(".inputform").reset();
}

export function resetMsgs() {
  document.querySelector(".newbookaddedmsg").classList.add("hidden");
  document.querySelector(".newbookaddederror").classList.add("hidden");
  clearTimeout(timer);
}
