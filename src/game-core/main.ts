import { RefObject } from "react";
import { aliensZone } from "./aliens-zone";
import { hero } from "./hero";
import { Bullet } from "./bullet";

export const useGameCore = (canvasRef: RefObject<HTMLCanvasElement>) => {
  let lastFrameTime = 0;

  if (!canvasRef) return;
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext("2d");
  if (!ctx) return;

  let heroInstance = hero(ctx);
  let aliensInstance = aliensZone(ctx);

  let bulletList: any[] = [];

  const shoot = () => {
    let jutShoot = false;
    const keyPress = (event: KeyboardEvent) => {
      jutShoot = true;
      let bulletInstance = Bullet(ctx);
      bulletInstance.setup(500, 500);
      bulletList.push(bulletInstance);
    };

    const keyReleased = (event: KeyboardEvent) => (jutShoot = false);

    document.addEventListener("keydown", keyPress);
    document.addEventListener("keyup", keyReleased);
  };

  const main = () => {
    heroInstance.setup();
    aliensInstance.setup();
    shoot();
  };

  const loop = (deltaTime: number) => {
    heroInstance.render(deltaTime);
    aliensInstance.render(deltaTime);
    bulletList.forEach((bullet) => bullet.render(deltaTime));
  };

  function colision(){
    
  }

  const animate = (currentTime: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const deltaTime = currentTime - lastFrameTime;
    loop(deltaTime);
    lastFrameTime = currentTime;
    requestAnimationFrame(animate);
  };

  requestAnimationFrame(function (timestamp) {
    lastFrameTime = timestamp;
    animate(timestamp);
  });

  main();
};
