"use strict";

let gc_dataStore = {
  selected: 0,
};

const f_select = (pPos) => {
  let oldElement = document.querySelector(".selected");
  if (oldElement) {
    oldElement.classList.remove("selected");
    oldElement.querySelector("span.navigate").textContent = "";
  }
  let navElement = document.querySelectorAll("span.navigate")[pPos];
  navElement.textContent = "X";
  navElement.closest("div").classList.add("selected");
};

const f_goUp = () => {
  if (gc_dataStore.selected > 0) {
    f_select(--gc_dataStore.selected);
  }
};
const f_goDown = () => {
  let totalElements = document.querySelectorAll("span.navigate").length;

  if (gc_dataStore.selected < totalElements - 1) {
    f_select(++gc_dataStore.selected);
  }
};

const f_rand = (pMax) => {
  const array = new Uint8Array(1); // Creates an array to hold one random byte.
  crypto.getRandomValues(array); // Fills the array with a random value.
  return array[0] % (pMax + 1); // Modulo operation to limit the range (0 to max).
};

const f_getPassword = (pType) => {
  let chars = "abcdefghijklmnopqrstuvwxyz1234567890";
  chars += chars.toUpperCase();

  if (pType === "strong") {
    chars += "!@#$%^&*()~";
  }

  let password = [];

  while (password.length < 24) {
    password.push(chars.at(f_rand(chars.length)));
  }

  return password.join("");
};

const f_renderPassword = () => {
  let actionLabel = document.querySelector(".selected > span.action-label");
  let passwordElement = document.querySelector(".selected > span.password");
  let { passwordType } = actionLabel.dataset;

  actionLabel.classList.toggle("hide");

  passwordElement.textContent = actionLabel.classList.contains("hide") ? f_getPassword(passwordType) : "";

  if (passwordElement.textContent) {
    navigator.clipboard.writeText(passwordElement.textContent); //only works for https
  }
};

const f_init = () => {
  f_select(gc_dataStore.selected);
};

f_init();
