import { v4 as uuidv4 } from "uuid";
export interface IBullet {
  id: string;
  x: number;
  y: number;
  height: number;
  width: number;
  setup(x: number, y: number, setShooter: "hero" | "alien"): void;
  render(delta: number): void;
  shooter: string;
  fromShooter: string;
  die: boolean;
}

export function Bullet(ctx: CanvasRenderingContext2D): IBullet {
  const id = uuidv4();
  let velocity = 0.3;
  let x = 0;
  let y = 0;
  let width = 10;
  let height = 10;
  let isDead = false;
  let fromShooter = "";

  function setup(xPos: number, yPos: number, setShooter: string): void {
    x = xPos;
    y = yPos;
    fromShooter = setShooter;
  }

  function render(delta: number): void {
    let speed = velocity * delta;
    ctx.fillStyle = "green";
    ctx.fillRect(x, y, width, height);
    if (y > 0 && x < ctx.canvas.width && y < ctx.canvas.height && x > 0) {
      y = y + (fromShooter == "hero" ? -speed : speed);
    } else {
      isDead = true;
    }
  }

  const bullet: IBullet = {
    id,
    height,
    width,
    setup,
    render,
    fromShooter,
    set shooter(from: string) {
      fromShooter = from;
    },
    get shooter() {
      return fromShooter;
    },
    get x() {
      return x;
    },
    get y() {
      return y;
    },
    set die(state) {
      isDead = state;
    },
    get die() {
      return isDead;
    },
  };

  return bullet;
}
