import { createContext, useContext, useState } from 'react';

const context = createContext<{
  setDrawSettings: any;
  drawSettings: any;
  setCurrentTab: any;
  currentTab: string;
  setEraserSettings: any;
  eraserSettings: any;
  setCanvasSettings: any;
  canvasSettings: any;
}>({
  drawSettings: {},
  setDrawSettings: null,
  setCurrentTab: null,
  currentTab: 'draw',
  setEraserSettings: null,
  eraserSettings: {},
  setCanvasSettings: null,
  canvasSettings: {},
});

context.displayName = 'Drawing context';
export const useDrawingContext = () => useContext(context);

export const DrawingContext = ({ children }: any) => {
  const [eraserSettings, setEraserSettings] = useState({
    width: '10',
  });
  const [currentTab, setCurrentTab] = useState('draw');
  const [drawSettings, setDrawSettings] = useState({
    smooth_line: true,
    round_line_join: true,
    round_line_cap: true,
    color: 'white',
    width: '3',
  });
  const [canvasSettings, setCanvasSettings] = useState({
    bg_color: 'white',
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
      }}
    >
      {children}
    </context.Provider>
  );
};