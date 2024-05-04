import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import { useGameCore } from "@/game-core/main";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [windowsSize, setWindowsSize] = useState<{
    height: number;
    width: number;
  }>();
  const gameCore = useGameCore;
  useEffect(() => {
    gameCore(canvasRef);
  });

  useEffect(() => {
    setWindowsSize({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  }, []);

  return (
    <>
      <Head>
        <title>Next Game</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={``}>
        <canvas
          ref={canvasRef}
          className={styles.mainCanvas}
          height={windowsSize?.height}
          width={windowsSize?.width}
        ></canvas>
      </main>
    </>
  );
}
