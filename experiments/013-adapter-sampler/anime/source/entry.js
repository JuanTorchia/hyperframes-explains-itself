import { animate } from "animejs";

const card = document.getElementById("anime-card");
const animation = animate(card, {
  x: [0, 1280],
  rotate: [0, 360],
  scale: [1, 1.18],
  duration: 3000,
  autoplay: false,
  ease: "inOutCubic",
});

function seek(time) {
  animation.seek(Math.max(0, Math.min(3000, time * 1000)));
}

window.__timelines = window.__timelines || {};
window.__timelines["anime-adapter"] = {
  duration: () => 3,
  pause: () => animation.pause(),
  seek,
};

seek(0);

