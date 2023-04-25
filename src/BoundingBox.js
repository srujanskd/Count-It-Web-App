import React, { useState, useEffect, useRef } from 'react';

function BoundingBox({ imageFile, boundingBoxes, setBoundingBoxes }) {
  const [image, setImage] = useState(null);
  const [boxCoords, setBoxCoords] = useState({ startX: 0, startY: 0, endX: 0, endY: 0 });
  const canvasRef = useRef(null);

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          setImage(img);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(imageFile);
    }
  }, [imageFile]);

  function handleMouseDown(event) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    setBoxCoords({
      startX: (event.clientX - rect.left) * scaleX,
      startY: (event.clientY - rect.top) * scaleY,
      endX: (event.clientX - rect.left) * scaleX,
      endY: (event.clientY - rect.top) * scaleY
    });

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
  }

  function handleMouseMove(event) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    setBoxCoords(prevBoxCoords => ({
      ...prevBoxCoords,
      endX: (event.clientX - rect.left) * scaleX,
      endY: (event.clientY - rect.top) * scaleY
    }));
  }

  function handleMouseUp() {
    const newBox = {
      startX: boxCoords.startX,
      startY: boxCoords.startY,
      endX: boxCoords.endX,
      endY: boxCoords.endY
    };

    setBoundingBoxes(prevBoundingBoxes => [...prevBoundingBoxes, newBox]);

    const canvas = canvasRef.current;
    canvas.removeEventListener('mousemove', handleMouseMove);
    canvas.removeEventListener('mouseup', handleMouseUp);
  }

  useEffect(() => {
    if (image) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      boundingBoxes.forEach(box => {
        context.strokeStyle = 'red';
        context.lineWidth = 2;
        context.strokeRect(box.startX, box.startY, box.endX - box.startX, box.endY - box.startY);
      });
    }
  }, [image, boundingBoxes]);

  return (
    <div>
      {image && (
        <canvas
          ref={canvasRef}
          width={image.width}
          height={image.height}
          onMouseDown={handleMouseDown}
          style={{ border: '1px solid black' }}
        />
      )}
    </div>
  );
}

export default BoundingBox;
