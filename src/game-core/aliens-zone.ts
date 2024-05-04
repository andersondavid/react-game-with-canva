interface Aliens {
  positionX: number;
  positionY: number;
  height: number;
  width: number;
}

export const aliensZone = (ctx: CanvasRenderingContext2D) => {
  const aliensList: Aliens[] = [];
  const spaceRange = { startX: 200, startY: 100, endX: 1720, endY: 0 };
  const speed = 10
  let moveToRight = true;
  let positionMain = { x: spaceRange.startX, y: spaceRange.startY };

  const createAliens = () => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 3; j++) {
        aliensList.push({
          positionX: i * 100,
          positionY: j * 100,
          height: 100,
          width: 100,
        });
      }
    }
  };

  if (aliensList.length <= 0) {
    createAliens();
  }

  const renderAliens = () => {
    aliensList.forEach((alien, index) => {
      if (index == 0)
        console.log(
          "alien.positionX + positionMain.x + spaceRange.startX",
          alien.positionX + positionMain.x
        );

      ctx.fillStyle = "blue";
      ctx.fillRect(
        alien.positionX + positionMain.x - 40,
        alien.positionY + positionMain.y - 40,
        80,
        80
      );

      ctx.strokeStyle = "red";
      ctx.strokeRect(
        alien.positionX + positionMain.x - 50,
        alien.positionY + positionMain.y - 50,
        alien.width,
        alien.height
      );
    });
  };

  const animateAliens = () => {
    if (moveToRight) {
      positionMain.x += speed;
    } else {
      positionMain.x -= speed;
    }

    if (positionMain.x + 900 >= spaceRange.endX) {
      moveToRight = false;
    } else if (positionMain.x <= spaceRange.startX) {
      moveToRight = true;
    }

    renderAliens();
  };

  renderAliens();

 // setInterval(() => animateAliens(), 100);
};
