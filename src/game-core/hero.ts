interface Hero {
  x: number;
  y: number;
  height: number;
  width: number;
  setup(x: number, y: number): void;
  render(delta: number): void;
}

export function Hero(ctx: CanvasRenderingContext2D): Hero {
  let x: number = 0;
  let y: number = 0;
  let height: number = 100;
  let width: number = 100;
  let pressedKeys: Record<string, boolean> = {};

  function setup(xPos: number, yPos: number): void {
    x = xPos;
    y = yPos;

    document.addEventListener("keydown", keyPress);
    document.addEventListener("keyup", keyReleased);
  }

  function keyPress(event: KeyboardEvent) {
    pressedKeys = { ...pressedKeys, [event.key]: true };
  }

  function keyReleased(event: KeyboardEvent) {
    pressedKeys = { ...pressedKeys, [event.key]: false };
  }

  function render(delta: number): void {
    const speed = (50 / 100) * delta;
    ctx.fillStyle = "red";
    ctx.fillRect(x, y, width, height);

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
    height,
    width,
    setup,
    render,
  };

  return hero;
}
