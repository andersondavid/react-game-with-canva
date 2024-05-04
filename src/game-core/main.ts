import { RefObject } from "react";
import { aliensZone } from "./aliens-zone";

export const useGameCore = (canvasRef: RefObject<HTMLCanvasElement>) => {
  if (!canvasRef) return;
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext("2d");
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  aliensZone(ctx)

};
