interface Hero {
  x: number;
  y: number;
  height: number;
  width: number;
  setup(x: number, y: number): void;
  render(delta: number): void;
  lifes: number;
}

export function Hero(ctx: CanvasRenderingContext2D): Hero {
  let x: number = 0;
  let y: number = 0;
  let height: number = ctx.canvas.width / 20;
  let width: number = ctx.canvas.width / 20;
  let pressedKeys: Record<string, boolean> = {};
  let lifesN: number = 3;
  var heroSprite = new Image();

  function setup(xPos: number, yPos: number): void {
    x = xPos;
    y = yPos;
    document.addEventListener("keydown", keyPress);
    document.addEventListener("keyup", keyReleased);

    heroSprite.src = "/hero.png";
  }

  function keyPress(event: KeyboardEvent) {
    pressedKeys = { ...pressedKeys, [event.key]: true };
  }

  function keyReleased(event: KeyboardEvent) {
    pressedKeys = { ...pressedKeys, [event.key]: false };
  }

  function render(delta: number): void {
    const speed = (50 / 100) * delta;

    ctx.drawImage(heroSprite, x, y, width, height);

    if (pressedKeys["ArrowLeft"]) x -= speed;
    if (pressedKeys["ArrowRight"]) x += speed;
    if (pressedKeys["ArrowUp"]) y -= speed;
    if (pressedKeys["ArrowDown"]) y += speed;
  }

  const hero = {
    get x() {
      return x;
    },
    get y() {
      return y;
    },
    get lifes() {
      return lifesN;
    },

    set lifes(number) {
      lifesN = number;
    },
    height,
    width,
    setup,
    render,
  };

  return hero;
}
