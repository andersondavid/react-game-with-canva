import { RefObject } from "react";
import { AliensZone, IAliens } from "./aliens-zone";
import { Hero } from "./hero";
import { Bullet, IBullet } from "./bullet";
let gameState: string = "running";

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
        bulletInstance.setup(
          heroInstance.x + heroInstance.width / 2,
          heroInstance.y + heroInstance.width / 2,
          "hero"
        );
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
    detectCollisionsForHero(bulletList);

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    var x = 10;
    var y = 40;
    ctx.fillText(heroInstance.lifes + "", x, y);
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

  function detectCollisionsForHero(array1: IBullet[]) {
    function detectCollision(bullet: IBullet, hero: any) {
      const overlapX =
        bullet.x < hero.x + hero.width && bullet.x + bullet.width > hero.x;
      const overlapY =
        bullet.y < hero.y + hero.height && bullet.y + bullet.height > hero.y;
      return overlapX && overlapY;
    }
    array1.forEach((bullet) => {
      if (detectCollision(bullet, heroInstance) && bullet.shooter == "alien") {
        heroInstance.lifes = heroInstance.lifes - 1;
        bullet.die = true;

        if (heroInstance.lifes == 0) {
          gameState = "gameover";
        }
      }
    });
  }

  const animate = (currentTime: number) => {
    const deltaTime = currentTime - lastFrameTime;

    if (gameState == "running") {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      loop(deltaTime);
    } else if (gameState == "gameover") {
      gameOverScreen();
    }


    lastFrameTime = currentTime;
    requestAnimationFrame(animate);
  };

  const gameOverScreen = () => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)"; // cor vermelha com 50% de opacidade
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.font = "50px Impact";
    ctx.fillStyle = "red";
    ctx.textAlign = "left";
    ctx.fillText("Game Over", 500, 500);
  };

  requestAnimationFrame(function (timestamp) {
    lastFrameTime = timestamp;
    animate(timestamp);
  });

  main();
}
