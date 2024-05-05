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
  const spaceRange = {
    startX: 0,
    startY: 0,
    endX: ctx.canvas.width,
    endY: ctx.canvas.height,
  };
  const velocity = 30;
  let aliensList: IAliens[] = [];
  let moveToRight = true;
  let positionMain = { x: 0, y: 0 };

  function setup() {
    const createAliens = () => {
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 3; j++) {
          aliensList.push({
            x: i * 100,
            y: j * 100,
            height: 100,
            width: 100,
            die: false,
            id: uuidv4(),
          });
        }
      }
    };

    if (aliensList.length <= 0) {
      createAliens();
    }
  }

  function render(delta: number) {
    const speed = (velocity / 100) * delta;

    aliensList.forEach((alien) => {
      ctx.fillStyle = "blue";
      ctx.fillRect(alien.x, alien.y, alien.width, alien.height);
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

      if (positionMain.x + 1000 >= spaceRange.endX) {
        moveToRight = false;
      } else if (positionMain.x <= spaceRange.startX) {
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
