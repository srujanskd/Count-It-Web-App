import React from 'react';

function SubmitButton({ onSubmit, disabled }) {
  return (
    <button onClick={onSubmit} disabled={disabled}>
      Submit
    </button>
  );
}

export default SubmitButton;
