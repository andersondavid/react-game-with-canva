import { RefObject } from "react";
import { aliensZone } from "./aliens-zone";
import { hero } from "./hero";

export const useGameCore = (canvasRef: RefObject<HTMLCanvasElement>) => {
  let lastFrameTime = 0;

  if (!canvasRef) return;
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext("2d");
  if (!ctx || !canvas) return;

  let heroInstance = hero(ctx);
  let aliensInstace = aliensZone(ctx)

  const setupMain = () => {
    heroInstance.setup();
    aliensInstace.setup()
  };

  const animate = (currentTime: number) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const deltaTime = currentTime - lastFrameTime;

    heroInstance.render(deltaTime);
    aliensInstace.render(deltaTime)
    lastFrameTime = currentTime;

    requestAnimationFrame(animate);
  };

  requestAnimationFrame(function (timestamp) {
    lastFrameTime = timestamp;
    animate(timestamp);
  });

  setupMain();
};
