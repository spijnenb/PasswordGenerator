"use strict";

document.addEventListener("keydown", (pEvent) => {
  let actions = {
    ArrowDown: f_goDown,
    ArrowUp: f_goUp,
    Enter: f_renderPassword,
  };

  let { key } = pEvent;

  if (actions[key]) {
    actions[key]();
  }
});
