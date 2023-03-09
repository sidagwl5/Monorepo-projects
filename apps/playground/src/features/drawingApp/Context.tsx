import { createContext, useContext, useRef, useState } from 'react';

const context = createContext<{
  setDrawSettings: any;
  drawSettings: any;
  setCurrentTab: any;
  currentTab: string;
  setEraserSettings: any;
  eraserSettings: any;
  setCanvasSettings: any;
  canvasSettings: any;
  currentAspectRatio: any;
  setCurrentAspectRatio: any;
  shapesSettings: any;
  setShapesSettings: any;
  coordinatesRef: any[];
}>({
  drawSettings: {},
  setDrawSettings: null,
  setCurrentTab: null,
  currentTab: 'draw',
  setEraserSettings: null,
  eraserSettings: {},
  setCanvasSettings: null,
  canvasSettings: {},
  currentAspectRatio: null,
  setCurrentAspectRatio: null,
  shapesSettings: {},
  setShapesSettings: null,
  coordinatesRef: [],
});

context.displayName = 'Drawing context';
export const useDrawingContext = () => useContext(context);

export const DrawingContext = ({ children }: any) => {
  const coordinatesRef = useRef<any[]>([]);
  const [currentAspectRatio, setCurrentAspectRatio] = useState<number | null>(
    null
  );
  const [eraserSettings, setEraserSettings] = useState({
    lineWidth: '10',
  });
  const [currentTab, setCurrentTab] = useState('draw');
  const [drawSettings, setDrawSettings] = useState({
    smooth_line: true,
    lineJoin: true,
    line: false,
    lineCap: true,
    strokeStyle: 'white',
    customColor: '#B3FFA1',
    lineWidth: 3,
  });
  const [shapesSettings, setShapesSettings] = useState({
    type: 'rectangle',
    strokeStyle: 'white',
    customColor: '#B3FFA1',
    lineWidth: '3',
  });
  const [canvasSettings, setCanvasSettings] = useState({
    bg_color: '#303143',
    customColor: '#303143',
  });

  return (
    <context.Provider
      value={{
        drawSettings,
        setDrawSettings,
        setCurrentTab,
        currentTab,
        setEraserSettings,
        eraserSettings,
        setCanvasSettings,
        canvasSettings,
        currentAspectRatio,
        setCurrentAspectRatio,
        shapesSettings,
        coordinatesRef: coordinatesRef.current,
        setShapesSettings,
      }}
    >
      {children}
    </context.Provider>
  );
};
