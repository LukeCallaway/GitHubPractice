import React, { useState } from 'react';

const useFlip = (initialState = true) => {
  const [state, setState] = useState(initialState);
  const toggleState = () => {
    setState(state => !state)
  }
  const flipCard = () => {
    setState(isUp => !isUp);
  };

  return [state, toggleState, flipCard]
}

export default useFlip;
