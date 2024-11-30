import React, { useRef, useEffect } from "react";
import gameMap from "../assets/codesk game map.png";
import playerDown from "../assets/playerDown.png";

const CanvasWithImage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mapOffset = useRef({ x: -600, y: -200 }); // Initial map offset
  const image = new Image();
  const playerImage = new Image();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    const drawCanvas = () => {
      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

        // Draw the game map
        ctx.drawImage(
          image,
          mapOffset.current.x,
          mapOffset.current.y
        );

        // Draw the player (fixed at the center)
        const playerWidth = playerImage.width / 4;
        const playerHeight = playerImage.height;

        ctx.drawImage(
          playerImage,
          0,
          0,
          playerWidth,
          playerHeight,
          canvas.width / 2 - playerWidth / 2,
          canvas.height / 2 - playerHeight / 2,
          playerWidth,
          playerHeight
        );
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
        case "w":
          mapOffset.current.y += 5; // Move map down (player "moves up")
          break;
        case "ArrowDown":
        case "s":
          mapOffset.current.y -= 5; // Move map up (player "moves down")
          break;
        case "ArrowLeft":
        case "a":
          mapOffset.current.x += 5; // Move map right (player "moves left")
          break;
        case "ArrowRight":
        case "d":
          mapOffset.current.x -= 5; // Move map left (player "moves right")
          break;
        default:
          break;
      }
      drawCanvas(); // Redraw after map offset update
    };

    if (canvas && ctx) {
      image.src = gameMap;
      playerImage.src = playerDown;

      image.onload = () => {
        playerImage.onload = () => {
          drawCanvas(); // Initial render
        };
      };
    }

    // Attach event listener
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900 relative overflow-hidden">
      

      {/* Main Content */}
      <canvas
        ref={canvasRef}
        width={1400}
        height={600}
        className="border-purple-900 rounded-lg mt-3 mx-auto block bg-sky-300 shadow-gray-100"
      />
    </div>
  );
};

export default CanvasWithImage;
