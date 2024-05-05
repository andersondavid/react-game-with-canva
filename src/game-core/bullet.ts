interface IBullet {
  x: number;
  y: number;
  setup(x: number, y: number): void;
  render(delta: number): void;
}

export function Bullet(ctx: CanvasRenderingContext2D): IBullet {
  let speed = 1;
  let x = 0;
  let y = 0;
  let width = 10;
  let height = 10;

  function setup(xPos: number, yPos: number): void {
    ctx.fillStyle = "green";

    ctx.closePath();
    ctx.stroke();
    x = xPos;
    y = yPos;
  }

  function render(delta: number): void {
    speed = delta; // Ajuste da velocidade de acordo com delta
    ctx.fillRect(x, y, width, height);

    if (y > 0 && x < ctx.canvas.width && y < ctx.canvas.height && x > 0) {
      y += speed;
      console.log(y);
    }
  }

  return {
    x,
    y,
    setup,
    render,
  };
}
