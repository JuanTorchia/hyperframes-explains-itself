import lottie from "lottie-web";
import animationData from "./minimal-lottie.json";

const animation = lottie.loadAnimation({
  container: document.getElementById("lottie-stage"),
  renderer: "svg",
  loop: false,
  autoplay: false,
  animationData,
});

function seek(time) {
  const frame = Math.max(0, Math.min(89, Math.round(time * 30)));
  animation.goToAndStop(frame, true);
}

animation.addEventListener("DOMLoaded", () => seek(0));

window.__timelines = window.__timelines || {};
window.__timelines["lottie-adapter"] = {
  duration: () => 3,
  pause: () => animation.pause(),
  seek,
};

