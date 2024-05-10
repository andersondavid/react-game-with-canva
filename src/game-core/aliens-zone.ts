import { v4 as uuidv4 } from "uuid";

export interface IAliens {
  id: string;
  x: number;
  y: number;
  height: number;
  width: number;
  die: boolean;
}
export interface IAliensZone {
  setup(x: number, y: number): void;
  render(delta: number): void;
  aliensList: IAliens[];
}

export function AliensZone(ctx: CanvasRenderingContext2D): IAliensZone {
  const velocity = 30;
  let aliensList: IAliens[] = [];
  let moveToRight = true;
  let positionMain = { x: 0, y: 0 };

  const alienH = ctx.canvas.width / 20;
  const alienW = ctx.canvas.width / 20;

  let alienSprite = new Image();

  function setup(x: number, y: number) {
    const createAliens = () => {
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 3; j++) {
          aliensList.push({
            x: i * alienW,
            y: j * alienH,
            height: alienH,
            width: alienW,
            die: false,
            id: uuidv4(),
          });
        }
      }
    };

    if (aliensList.length <= 0) {
      createAliens();
    }

    alienSprite.src = "/alien.png";
  }

  function render(delta: number) {
    const speed = (velocity / 100) * delta;

    aliensList.forEach((alien) => {
      ctx.drawImage(alienSprite, alien.x, alien.y, alien.width, alien.height);
    });

    const animateAliens = () => {
      if (moveToRight) {
        positionMain.x += speed;
      } else {
        positionMain.x -= speed;
      }

      aliensList = aliensList.map((alien) => ({
        ...alien,
        x: alien.x + (moveToRight ? speed : -speed),
      }));

      if (positionMain.x + 10 * alienW >= ctx.canvas.width - 100) {
        moveToRight = false;
      } else if (positionMain.x <= 100) {
        moveToRight = true;
      }
    };
    animateAliens();

    aliensList = aliensList.filter((alien) => !alien.die);
  }

  const aliensZone = {
    get aliensList() {
      return aliensList;
    },

    set aliensList(newArr) {
      this.aliensList = newArr;
    },
    setup,
    render,
  };

  return aliensZone;
}
