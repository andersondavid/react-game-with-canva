interface Hero {
  x: number;
  y: number;
  height: number;
  width: number;
}

export const hero = (ctx: CanvasRenderingContext2D) => {
  let heroInstance: Hero = { x: 600, y: 600, height: 80, width: 80 };
  let spaceRange = { startX: 200, startY: 100, endX: 1720, endY: 0 };
  let pressedKeys: Record<string, boolean> = {};

  const setup = () => {
    ctx.fillStyle = "red";
    heroInstance = { x: 600, y: 600, height: 80, width: 80 };
    spaceRange = { startX: 200, startY: 100, endX: 1720, endY: 0 };
    pressedKeys = {};
  };

  const render = (delta: number) => {
    const speed = (50 / 100) * delta;

    ctx.fillRect(heroInstance.x, heroInstance.y, 80, 80);

    if (pressedKeys["ArrowLeft"]) heroInstance.x -= speed;
    if (pressedKeys["ArrowRight"]) heroInstance.x += speed;
    if (pressedKeys["ArrowUp"]) heroInstance.y -= speed;
    if (pressedKeys["ArrowDown"]) heroInstance.y += speed;

    const keyPress = (event: KeyboardEvent) => {
      pressedKeys = { ...pressedKeys, [event.key]: true };
    };

    const keyReleased = (event: KeyboardEvent) => {
      pressedKeys = { ...pressedKeys, [event.key]: false };
    };

    document.addEventListener("keydown", keyPress);
    document.addEventListener("keyup", keyReleased);
  };

  return { setup, render };
};
