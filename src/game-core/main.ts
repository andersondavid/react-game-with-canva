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

  let alienShootInterval = 2000;

  const shoot = () => {
    let jutShoot = true;
    const keyPress = (event: KeyboardEvent) => {
      if (jutShoot && event.key == " ") {
        jutShoot = false;
        let bulletInstance = Bullet(ctx);
        bulletInstance.setup(heroInstance.x + 45, heroInstance.y + 45, "hero");
        bulletList.push(bulletInstance);
      }
    };

    const keyReleased = (event: KeyboardEvent) => (jutShoot = true);

    document.addEventListener("keydown", keyPress);
    document.addEventListener("keyup", keyReleased);
  };

  const alienShoot = (deltaTime: number) => {
    let interval = (alienShootInterval -= deltaTime);

    if (interval <= 0) {
      let rand = Math.random();
      let numberOfAliens = aliensInstance.aliensList.length;
      let randIndex = Math.floor(rand * numberOfAliens);
      let selectedAlien = aliensInstance.aliensList[randIndex];

      let bulletInstance = Bullet(ctx);
      bulletInstance.setup(selectedAlien.x + 45, selectedAlien.y + 45, "alien");
      bulletInstance.fromShooter = "alien";
      bulletList.push(bulletInstance);
      alienShootInterval = 1000;
    }

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";

    // Define a posição do texto no canto superior
    var x = 10; // Posição horizontal
    var y = 40; // Posição vertical

    // Desenha o texto no canvas
    ctx.fillText(bulletList.length + '', x, y);
  };

  const main = () => {
    heroInstance.setup(555, 555);
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

    if (aliensInstance.aliensList.length > 0) alienShoot(deltaTime);
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
        if (detectCollision(bullet, alien) && bullet.shooter == "hero") {
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
