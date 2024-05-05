import { v4 as uuidv4 } from "uuid";
export interface IBullet {
  id: string;
  x: number;
  y: number;
  height: number;
  width: number;
  setup(x: number, y: number): void;
  render(delta: number): void;
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

  function setup(xPos: number, yPos: number): void {
    x = xPos;
    y = yPos;
  }

  function render(delta: number): void {
    let speed = velocity * delta;
    ctx.fillStyle = "green";
    ctx.fillRect(x, y, width, height);

    if (y > 0 && x < ctx.canvas.width && y < ctx.canvas.height && x > 0) {
      y -= speed;
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
