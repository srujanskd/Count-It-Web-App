import React from 'react';

function BoundingBoxList({ boundingBoxes }) {
  return (
    <div>
      <h2>Bounding Boxes:</h2>
      {boundingBoxes.length === 0 && <p>No bounding boxes</p>}
      <ul>
        {boundingBoxes.map((box, index) => (
          <li key={index}>
            ({box.startX}, {box.startY}) - ({box.endX}, {box.endY})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BoundingBoxList;
