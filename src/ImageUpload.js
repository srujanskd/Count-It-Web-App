import React from 'react';

function ImageUpload({ setImageFile }) {
  function handleImageUpload(event) {
    setImageFile(event.target.files[0]);
  }

  return (
    <div>
      <label htmlFor="image-upload">Upload an image:</label>
      <input type="file" id="image-upload" accept="image/*" onChange={handleImageUpload} />
    </div>
  );
}

export default ImageUpload;
