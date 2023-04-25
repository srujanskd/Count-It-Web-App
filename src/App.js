import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import BoundingBox from './BoundingBox';
import BoundingBoxList from './BoundingBoxList';
import SubmitButton from './SubmitButton';

function App() {
  const [imageFile, setImageFile] = useState(null);
  const [boundingBoxes, setBoundingBoxes] = useState([]);

  return (
    <div>
      <ImageUpload setImageFile={setImageFile} />
      <BoundingBox imageFile={imageFile} boundingBoxes={boundingBoxes} setBoundingBoxes={setBoundingBoxes} />
      <BoundingBoxList boundingBoxes={boundingBoxes} />
      <SubmitButton imageFile={imageFile} boundingBoxes={boundingBoxes} />
    </div>
  );
}

export default App;
