import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DownloadIcon from '@mui/icons-material/Download';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import GestureIcon from '@mui/icons-material/Gesture';
import InterestsIcon from '@mui/icons-material/Interests';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';
import { CircularProgress, Tooltip } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useMedia } from 'react-use';
import { css, tw } from 'twind/style';
import { useDrawingContext } from './Context';
import { Canvas } from './classes/canvas.class';
import { CanvasSettings } from './components/CanvasSettings';
import DrawSettings from './components/DrawSettings';
import { EraserSettings } from './components/EraserSettings';
import ExportDialog from './components/ExportDialog';
import { ShapesSettings } from './components/ShapesSettings';
import { useInitializeCanvas } from './hooks/useInitializeCanvas';

export const DrawingApp = () => {
  const [loading, setLoading] = useState(true);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const isTablet = useMedia('(max-width: 768px)');
  const [sidebarOpen, setSidebarOpen] = useState(!isTablet);
  const { enqueueSnackbar } = useSnackbar();
  const { setCurrentTab, currentTab, canvasSettings } = useDrawingContext();

  const tabOptions = [
    {
      title: 'Draw',
      key: 'draw',
      icon: <GestureIcon className={tw('text-[20px]!')} />,
    },
    {
      title: 'Eraser',
      key: 'eraser',
      icon: <DriveFileRenameOutlineIcon className={tw('text-[20px]!')} />,
    },
    {
      title: 'Shapes',
      key: 'shapes',
      icon: <InterestsIcon className={tw('text-[20px]!')} />,
    },

    {
      title: 'Canvas',
      key: 'canvas',
      icon: <DashboardIcon className={tw('text-[20px]!')} />,
    },
  ];

  useEffect(() => {
    setSidebarOpen(!isTablet);
  }, [isTablet]);

  useInitializeCanvas(setLoading);

  const reset = () => {
    Canvas.clearCanvas();
    Canvas.storeImageData();
    enqueueSnackbar(
      { message: 'Canvas reset successfull', variant: 'success' },
      { key: 'reset' }
    );
  };

  return (
    <>
      {loading ? (
        <div
          className={tw(
            'w-full h-full absolute top-0 left-0 z-20 bg-black flex justify-center items-center'
          )}
        >
          <CircularProgress />
        </div>
      ) : null}
      <section
        className={tw(
          'flex w-full overflow-hidden relative max-w-[1300px] md:m-6 w-full items-center justify-center',
          isTablet ? 'h-full' : css({ height: 'calc(100% - 15vh)' })
        )}
      >
        {isTablet && <div className={tw('w-[50px]')} />}

        <div
          className={tw(
            'h-full max-w-[250px] z-10 w-full transition left-0 p-4 flex bg-[#3c2641] flex-col gap-6 absolute md:relative',
            !sidebarOpen && 'left-[-200px]',
            css({ transition: '0.2s all ease-out' })
          )}
        >
          <div className={tw('w-full flex gap-2 items-center')}>
            {tabOptions.map(({ icon, key, title }) => (
              <Tooltip title={title} arrow placement="top">
                <button
                  onClick={() => {
                    setCurrentTab(key);
                  }}
                  className={tw(
                    'w-full text-white py-1 rounded-md w-9 h-9 flex items-center justify-center outline-none!',
                    css({ background: 'rgba(255, 255, 255, 0.12)' }),
                    currentTab === key && 'bg-blue-600!'
                  )}
                >
                  {icon}
                </button>
              </Tooltip>
            ))}

            <div
              onClick={setSidebarOpen.bind(this, !sidebarOpen)}
              className={tw(
                'text-white cursor-pointer ml-auto rotate-0 md:hidden',
                !sidebarOpen && 'rotate-180',
                css({ transition: '0.2s all ease-out' })
              )}
            >
              <ArrowBackIcon />
            </div>
          </div>
          {loading ? null : (
            <div
              className={tw(
                'opacity-100 flex flex-col gap-6',
                !sidebarOpen && 'opacity-0',
                css({ transition: '0.2s all ease-out' })
              )}
            >
              {currentTab === 'eraser' && <EraserSettings />}
              {currentTab === 'draw' && <DrawSettings />}
              {currentTab === 'canvas' && <CanvasSettings />}
              {currentTab === 'shapes' && <ShapesSettings />}
            </div>
          )}
        </div>

        <div
          id="canvas_container"
          className={tw(
            'h-full flex-1 flex justify-center overflow-hidden items-center',
            css({ background: '#ffffff1a', willChange: 'width' })
          )}
        >
          <canvas
            ref={Canvas.initialize}
            className={tw(
              'relative',
              css({
                transition: '0.3s background ease-out',
                background: 'rgba(255, 255, 255, 0.08)',
              })
            )}
            id="canvas"
          />
        </div>

        <div
          className={tw(
            !isTablet
              ? 'h-full max-w-[100px] p-2 flex flex-col gap-2 bg-white bg-opacity-20'
              : 'fixed py-2 px-5 flex gap-4 bottom-3 right-3 border-1 rounded-full border-white border-opacity-30'
          )}
        >
          <Tooltip title="Save progress" arrow placement="top">
            <button
              onClick={() => {
                localStorage.setItem(
                  'progress',
                  Canvas.getElements().canvas.toDataURL('image/png', 1)
                );
                enqueueSnackbar(
                  {
                    message: 'Progress saved successfully',
                    variant: 'success',
                  },
                  { key: 'progress_saved' }
                );
              }}
              className={tw(
                'w-full text-white py-1 rounded-md w-9 h-9 bg-green-500 ml-auto flex items-center justify-center outline-none!'
              )}
            >
              <SaveIcon className={tw('text-[20px]!')} />
            </button>
          </Tooltip>

          <Tooltip title="Export as image" arrow placement="top">
            <button
              onClick={() => {
                setIsExportDialogOpen(true);
              }}
              className={tw(
                'w-full text-white py-1 rounded-md w-9 h-9 bg-green-500 ml-auto flex items-center justify-center outline-none!'
              )}
            >
              <DownloadIcon className={tw('text-[20px]!')} />
            </button>
          </Tooltip>

          <Tooltip title="Reset Canvas" arrow placement="top">
            <button
              onClick={reset}
              className={tw(
                'w-full text-white py-1 rounded-md w-9 h-9 bg-red-500 ml-auto flex items-center justify-center outline-none!'
              )}
            >
              <RestartAltIcon className={tw('text-[20px]!')} />
            </button>
          </Tooltip>
        </div>
        {isExportDialogOpen && (
          <ExportDialog setIsExportDialogOpen={setIsExportDialogOpen} />
        )}
      </section>
    </>
  );
};

export default DrawingApp;
