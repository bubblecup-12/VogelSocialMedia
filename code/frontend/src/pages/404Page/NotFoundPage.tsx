import React, { useEffect, useRef, useState } from "react";
import "./notFound.css";
import ButtonPrimary from "../../components/ButtonRotkehlchen";

type Block = {
  x: number;
  height: number;
  passed: boolean;
};

const GAP = 300;
const BLOCK_WIDTH = 60;
const GRAVITY = 0.2;
const FLAP_VELOCITY = -8;
const BIRD_SIZE = 25;
const BLOCK_SPAWN_DISTANCE = 400; // px

export const NotFound = () => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const targetRef = useRef<HTMLSpanElement>(null);
  const gameRef = useRef<HTMLDivElement>(null);

  // State für das UI
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [textPos, setTextPos] = useState<number>(screenWidth / 2);
  const [rotation, setRotation] = useState(0);
  const [renderBlocks, setRenderBlocks] = useState<Block[]>([]);
  const [birdPos, setBirdPos] = useState({ x: 0, y: 0 });

  // Refs für schnelle Game-Logik
  const distanceSinceLastBlock = useRef(0);
  const speedRef = useRef(2);
  const birdPosRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef(0);
  const blocksRef = useRef<Block[]>([]);
  const scoreRef = useRef(0);
  const hasStartedRef = useRef(hasStarted);
  const gameOverRef = useRef(gameOver);
  const textPosRef = useRef(textPos);

  // Initiale Bird-Position berechnen
  useEffect(() => {
    if (targetRef.current && gameRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      const gameBox = gameRef.current.getBoundingClientRect();
      const yPos = rect.top - gameBox.top;
      const x = rect.left + rect.width / 2;
      const y = yPos + 15;
      birdPosRef.current = { x, y };
      setBirdPos({ x, y });
    }
  }, []);

  // Tastatursteuerung
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (!gameOverRef.current) {
          setHasStarted(true);
          hasStartedRef.current = true;
          velocityRef.current = FLAP_VELOCITY;
        }
      } else if (e.code === "Enter") {
        e.preventDefault();
        if (gameOverRef.current) {
          window.location.reload();
        }
      } else if (e.code === "KeyR") {
        window.location.reload();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Haupt-Game-Loop
  useEffect(() => {
    let lastBlockTime = Date.now();
    let animationId: number;

    function loop() {
      if (!hasStartedRef.current || gameOverRef.current) {
        setRenderBlocks([...blocksRef.current]);
        setBirdPos({ ...birdPosRef.current });
        return;
      }

      // Bird Bewegung
      velocityRef.current += GRAVITY;
      birdPosRef.current.y += velocityRef.current;
      setRotation(Math.max(Math.min(velocityRef.current * 2, 90), -15));

      // Text Bewegung
      textPosRef.current -= speedRef.current;
      setTextPos(textPosRef.current);

      // Block-Spawn
      distanceSinceLastBlock.current += speedRef.current;

      if (distanceSinceLastBlock.current >= BLOCK_SPAWN_DISTANCE) {
        const blockHeight = Math.random() * (screenHeight - GAP - 100) + 50;
        blocksRef.current.push({
          x: screenWidth,
          height: blockHeight,
          passed: false,
        });
        distanceSinceLastBlock.current = 0;
      }

      // Blöcke bewegen und kollidieren
      blocksRef.current = blocksRef.current
        .map((block) => {
          const newX = block.x - speedRef.current;
          let passed = block.passed;

          // Collision
          if (
            newX <= birdPosRef.current.x + BIRD_SIZE &&
            newX + BLOCK_WIDTH >= birdPosRef.current.x - BIRD_SIZE
          ) {
            if (
              birdPosRef.current.y + BIRD_SIZE >= block.height + GAP ||
              birdPosRef.current.y - BIRD_SIZE <= block.height
            ) {
              setGameOver(true);
              gameOverRef.current = true;
            }
          }

          // Score erhöhen
          if (
            !passed &&
            newX + BLOCK_WIDTH < birdPosRef.current.x - BIRD_SIZE
          ) {
            scoreRef.current += 1;
            speedRef.current += 0.1;
            setScore(scoreRef.current);
            passed = true;
          }

          return { ...block, x: newX, passed };
        })
        .filter((block) => block.x + BLOCK_WIDTH > 0);

      // Boden-Kollision
      if (
        birdPosRef.current.y >= screenHeight - BIRD_SIZE ||
        birdPosRef.current.y <= 0
      ) {
        setGameOver(true);
        gameOverRef.current = true;
      }

      // Render aktualisieren
      setRenderBlocks([...blocksRef.current]);
      setBirdPos({ ...birdPosRef.current });

      if (!gameOverRef.current) {
        animationId = requestAnimationFrame(loop);
      }
    }

    if (hasStarted) {
      hasStartedRef.current = true;
      gameOverRef.current = false;
      animationId = requestAnimationFrame(loop);
    }

    return () => cancelAnimationFrame(animationId);
    // eslint-disable-next-line
  }, [hasStarted]);

  // Start/Flap per Click
  const handleGameClick = () => {
    if (gameOver) return;
    if (!hasStarted) {
      setHasStarted(true);
      hasStartedRef.current = true;
      velocityRef.current = FLAP_VELOCITY;
    } else {
      velocityRef.current = FLAP_VELOCITY;
    }
  };

  // Bird Sprite je nach Velocity
  const birdSprite =
    velocityRef.current === 0
      ? "/assets/images/logoWithoutStick.png"
      : velocityRef.current > 0
      ? "/assets/images/flipp.png"
      : "/assets/images/flapp.png";

  return (
    <div className="game-container" ref={gameRef} onClick={handleGameClick}>
      <img
        src={birdSprite}
        className="bird"
        style={{
          top: birdPos.y,
          left: birdPos.x,
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        }}
        alt="bird"
      />
      <div
        className="text"
        style={{
          left: textPos,
        }}
      >
        <h1 key={"404"}>
          4<span ref={targetRef}>0</span>4 Not Found
        </h1>
      </div>
      {hasStarted && !gameOver && (
        <div className="points body-l">Score: {score}</div>
      )}
      {renderBlocks.map((block, index) => (
        <React.Fragment key={index}>
          <div
            className="tree-trunk top"
            style={{
              top: 0,
              left: block.x,
              width: BLOCK_WIDTH,
              height: block.height,
              backgroundColor: "tomato",
            }}
          ></div>
          <div
            className="tree-trunk bottom"
            style={{
              top: block.height + GAP,
              left: block.x,
              width: BLOCK_WIDTH,
              height: screenHeight - block.height - GAP,
              backgroundColor: "tomato",
            }}
          ></div>
        </React.Fragment>
      ))}
      {gameOver && (
        <div className="gameOver small-title">
          <h1>You have killed the bird</h1>
          <p>Your Score is {score}</p>
          <ButtonPrimary
            style="primary"
            label="restart"
            type="reset"
            onClick={() => window.location.reload()}
          />
        </div>
      )}
    </div>
  );
};
