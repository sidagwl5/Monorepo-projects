import { createContext, useContext, useState } from 'react';
import { layouts } from './staticData';

const drawingContext = createContext({});

export const useDrawingContext = () => useContext(drawingContext);

export const DrawingContextProvider = ({ children }) => {
  const [currentAspectRatio, setCurrentAspectRatio] = useState(
    layouts[0].value
  );

  return (
    <drawingContext.Provider
      value={{
        handleCurrentAspectRatio: [currentAspectRatio, setCurrentAspectRatio],
      }}
    >
      {children}
    </drawingContext.Provider>
  );
};
