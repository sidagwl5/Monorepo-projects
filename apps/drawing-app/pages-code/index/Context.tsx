import { createContext, useContext, useRef, useState } from 'react';
import { layouts } from './staticData';

const drawingContext = createContext({});

export const useDrawingContext = () => useContext(drawingContext);

export const DrawingContextProvider = ({ children }) => {
  const coordinatesRef = useRef<any[]>([]);

  const [eraserSettings, setEraserSettings] = useState({
    lineWidth: '10',
  });
  const [drawSettings, setDrawSettings] = useState({
    smooth_line: true,
    lineJoin: true,
    line: false,
    lineCap: true,
    strokeStyle: 'white',
    customColor: '#B3FFA1',
    lineWidth: 3,
  });

  const [currentAspectRatio, setCurrentAspectRatio] = useState(
    layouts[0].value
  );

  return (
    <drawingContext.Provider
      value={{
        handleCurrentAspectRatio: [currentAspectRatio, setCurrentAspectRatio],
        handleEraserSettings: [eraserSettings, setEraserSettings],
        handleDrawSettings: [drawSettings, setDrawSettings],
        coordinatesRef: coordinatesRef.current,
      }}
    >
      {children}
    </drawingContext.Provider>
  );
};
