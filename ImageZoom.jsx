import React from "react";

const ImageZoom = ({
  url,
  width = "50%",
  height = "auto",
  zoomLevel = 2.5,
  lensSize = 180,
}) => {
  const containerRef = React.useRef(null);
  const imgRef = React.useRef(null);
  const [showLens, setShowLens] = React.useState(false);
  const [caretPosition, setCaretPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!imgRef.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCaretPosition({ x: x - lensSize / 2, y: y - lensSize / 2 });
  };
  return (
    <div
      className="container"
      style={{ width, height }}
      ref={containerRef}
      onMouseEnter={() => setShowLens(true)}
      onMouseLeave={() => setShowLens(false)}
      onMouseMove={handleMouseMove}
    >
      <img ref={imgRef} src={url} alt="Zoomable" className="zoomable-image" />
      {showLens && (
        /* Lens and zoomed image rendering logic goes here */
        <>
          <div>Lens and zoomed image would be rendered here</div>
          <div
            className="lens"
            style={{
              width: lensSize,
              height: lensSize,
              right: caretPosition.x,
              top: caretPosition.y,
              // Additional styles for positioning and background
            }}
          ></div>
          <div className="result">
            <img
              src={url}
              alt="Zoomed"
              style={{
                width: `${zoomLevel * 100}%`,
                height: `${zoomLevel * 100}%`,
                objectFit: "cover",
                objectPosition: `${-caretPosition.x * zoomLevel}px ${
                  -caretPosition.y * zoomLevel
                }px`,
                // Additional styles for positioning based on caretPosition
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ImageZoom;
