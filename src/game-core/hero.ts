interface Hero {
  x: number;
  y: number;
  height: number;
  width: number;
}

export const hero = (ctx: CanvasRenderingContext2D) => {
  const hero: Hero = { x: 600, y: 600, height: 80, width: 80 };
  const spaceRange = { startX: 200, startY: 100, endX: 1720, endY: 0 };
  let pressedKeys: Record<string, boolean> = {};
  const speed = 10;

  const renderHero = () => {
    ctx.fillStyle = "red";
    ctx.fillRect(hero.x, hero.y, 80, 80);
  };

  const updatePosition = () => {
    if (pressedKeys["ArrowLeft"]) hero.x -= speed;
    if (pressedKeys["ArrowRight"]) hero.x += speed;
    if (pressedKeys["ArrowUp"]) hero.y -= speed;
    if (pressedKeys["ArrowDown"]) hero.y += speed;

    console.log('updatePosition ', hero);

  };

  const keyPress = (event: KeyboardEvent) => {
    pressedKeys = { ...pressedKeys, [event.key]: true };
  };

  const keyReleased = (event: KeyboardEvent) => {
    pressedKeys = { ...pressedKeys, [event.key]: false };
  };

  document.addEventListener("keydown", keyPress);
  document.addEventListener("keyup", keyReleased);

  const update = () => {
    updatePosition();
    renderHero();
    
  };
  
  setInterval(() => update(), 40)

  renderHero();
};
