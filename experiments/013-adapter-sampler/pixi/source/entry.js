import { Application, Container, Graphics } from "pixi.js";

const mount = document.getElementById("pixi-stage");
const width = 1920;
const height = 1080;

const app = new Application();

window.__timelines = window.__timelines || {};
window.__timelines["pixi-adapter"] = {
  duration: () => 3,
  pause: () => undefined,
  seek: () => undefined,
};

async function main() {
  await app.init({
    width,
    height,
    antialias: true,
    backgroundAlpha: 0,
    resolution: 1,
  });
  mount.appendChild(app.canvas);
  app.ticker.stop();

  const group = new Container();
  group.position.set(1280, 560);
  app.stage.addChild(group);

  const orbit = new Graphics()
    .ellipse(0, 0, 340, 180)
    .stroke({ width: 6, color: 0xf5d36f, alpha: 0.65 });
  group.addChild(orbit);

  const nodes = [];
  for (let index = 0; index < 7; index += 1) {
    const node = new Graphics()
      .circle(0, 0, 44 - index * 2)
      .fill(index % 2 === 0 ? 0xea5a4a : 0x68d8c5)
      .stroke({ width: 4, color: 0xf8f4ec, alpha: 0.9 });
    group.addChild(node);
    nodes.push(node);
  }

  const plate = new Graphics()
    .roundRect(-340, -74, 680, 148, 18)
    .fill({ color: 0xf8f4ec, alpha: 0.1 })
    .stroke({ width: 3, color: 0xf8f4ec, alpha: 0.3 });
  plate.position.set(0, 245);
  group.addChild(plate);

  function draw(time) {
    const progress = time / 3;
    group.rotation = Math.sin(progress * Math.PI * 2) * 0.08;
    group.scale.set(0.92 + Math.sin(progress * Math.PI) * 0.12);

    nodes.forEach((node, index) => {
      const angle = progress * Math.PI * 2 + index * 0.72;
      const radiusX = 300 - index * 18;
      const radiusY = 156 - index * 7;
      node.position.set(Math.cos(angle) * radiusX, Math.sin(angle) * radiusY);
      node.alpha = 0.68 + Math.sin(angle + progress * Math.PI) * 0.24;
    });

    app.renderer.render(app.stage);
  }

  window.__timelines["pixi-adapter"] = {
    duration: () => 3,
    pause: () => undefined,
    seek: draw,
  };

  draw(0);
}

main();
