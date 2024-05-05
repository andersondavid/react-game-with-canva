import { RefObject } from "react";
import { AliensZone, IAliens } from "./aliens-zone";
import { Hero } from "./hero";
import { Bullet, IBullet } from "./bullet";

export function GameCore(canvasRef: RefObject<HTMLCanvasElement>) {
  let lastFrameTime = 0;

  if (!canvasRef) return;
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext("2d");
  if (!ctx) return;

  let heroInstance = Hero(ctx);
  let aliensInstance = AliensZone(ctx);

  let bulletList: IBullet[] = [];

  const shoot = () => {
    let jutShoot = true;
    const keyPress = (event: KeyboardEvent) => {
      if (jutShoot && event.key == " ") {
        jutShoot = false;
        let bulletInstance = Bullet(ctx);
        bulletInstance.setup(heroInstance.x + 45, heroInstance.y + 45);
        bulletList.push(bulletInstance);
      }
    };

    const keyReleased = (event: KeyboardEvent) => (jutShoot = true);

    document.addEventListener("keydown", keyPress);
    document.addEventListener("keyup", keyReleased);
  };

  const main = () => {
    heroInstance.setup(0, 0);
    aliensInstance.setup(0, 0);
    shoot();
  };

  const loop = (deltaTime: number) => {
    heroInstance.render(deltaTime);
    aliensInstance.render(deltaTime);

    bulletList = bulletList.filter((bullet) => bullet.die == false);

    bulletList.forEach((bullet) => {
      bullet.render(deltaTime);
    });

    detectCollisionsForAliens(bulletList, aliensInstance.aliensList);
  };

  function detectCollisionsForAliens(array1: IBullet[], array2: IAliens[]) {
    function detectCollision(bullet: IBullet, alien: IAliens) {
      const overlapX =
        bullet.x < alien.x + alien.width && bullet.x + bullet.width > alien.x;
      const overlapY =
        bullet.y < alien.y + alien.height && bullet.y + bullet.height > alien.y;
      return overlapX && overlapY;
    }
    array1.forEach((bullet) => {
      array2.forEach((alien) => {
        if (detectCollision(bullet, alien)) {
          alien.die = true;
          bullet.die = true;
        }
      });
    });
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
}
