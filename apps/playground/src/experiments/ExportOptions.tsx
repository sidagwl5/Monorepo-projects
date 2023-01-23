import DownloadIcon from '@mui/icons-material/Download';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { css, tw } from 'twind/style';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';

export const ExportOptions = () => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    aspectRatio: 0,
  });
  const [aspectRatio, setAspectRatio] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  useEffect(() => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;
    const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;

    canvasElement.width = window.innerWidth / 2.5;
    canvasElement.height = (canvasElement.width * 3) / 4;

    setDimensions({
      width: canvasElement.width,
      height: canvasElement.height,
      aspectRatio: canvasElement.width / canvasElement.height,
    });

    window.addEventListener('resize', (e) => {
      const backupCanvas = document.createElement('canvas');
      const backupCanvasContext = backupCanvas.getContext(
        '2d'
      ) as CanvasRenderingContext2D;

      backupCanvas.width = canvasElement.width;
      backupCanvas.height = canvasElement.height;

      backupCanvasContext.drawImage(canvasElement, 0, 0);

      canvasElement.width = window.innerWidth / 2.5;
      canvasElement.height = (canvasElement.width * 3) / 4;

      context.drawImage(backupCanvas, 0, 0);
    });
  }, []);

  useEffect(() => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;
    const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;

    context.fillStyle = 'white';
    context.fillRect(0, 0, canvasElement.width, canvasElement.height);

    context.fillStyle = 'blue';
    context.fillRect(50, 50, 100, 50);
  }, []);

  return (
    <>
      <Dialog classes={{ paper: tw('w-full') }} open={dialogOpen}>
        <DialogTitle>Export Options</DialogTitle>
        <DialogContent
          className={tw('w-full bg-yellow-400 flex flex-col gap-3 p-8!')}
        >
          <div className={tw('flex gap-2')}>
            <input
              onChange={(e) =>
                setDimensions((prev) => ({
                  ...prev,
                  width: Number(e.target.value),
                  height: Math.round(
                    aspectRatio
                      ? Number(e.target.value) * (1 / prev.aspectRatio)
                      : prev.height
                  ),
                }))
              }
              value={dimensions.width}
              type="number"
            />
            <input
              onChange={(e) =>
                setDimensions((prev) => ({
                  ...prev,
                  height: Number(e.target.value),
                  width: Math.round(
                    aspectRatio
                      ? Number(e.target.value) * prev.aspectRatio
                      : prev.width
                  ),
                }))
              }
              value={dimensions.height}
              type="number"
            />
          </div>
          <div>
            <AspectRatioIcon
              onClick={setAspectRatio.bind(this, !aspectRatio)}
            />
          </div>

          <div className={tw('w-full')}>
            <Select value={'Webp'}>
              <MenuItem value={'Webp'}>Webp</MenuItem>
              <MenuItem value={'PNG'}>PNG</MenuItem>
              <MenuItem value={'JPEG'}>JPEG</MenuItem>
            </Select>
          </div>
        </DialogContent>
      </Dialog>
      <div
        className={tw(
          'flex w-full h-[600px] max-w-[1200px] p-6 w-full items-center justify-center'
        )}
      >
        <div
          className={tw(
            'h-full flex-1 flex justify-center items-center',
            css({ background: '#1b1b1b' })
          )}
        >
          <canvas
            className={tw(
              css({
                transition: '0.3s all ease-out',
                background: 'rgba(255, 255, 255, 0.08)',
              })
            )}
            id="canvas"
          />
        </div>
        <div
          className={tw(
            'h-full max-w-[100px] p-2 flex flex-col gap-2',
            css({ background: 'rgba(255, 255, 255, 0.15)' })
          )}
        >
          <button
            onClick={() => {
              // const canvasElement = document.getElementById(
              //   'canvas'
              // ) as HTMLCanvasElement;

              // const imageURI = canvasElement.toDataURL('image/jpeg', 1);

              // const anchorElement = document.createElement('a');
              // anchorElement.href = imageURI;
              // anchorElement.download = 'Drawing.jpeg';

              // anchorElement.click();

              setDialogOpen(true);
            }}
            className={tw(
              'w-full text-white py-1 rounded-md w-9 h-9 bg-green-500 ml-auto flex items-center justify-center outline-none!'
            )}
          >
            <DownloadIcon className={tw('text-[20px]!')} />
          </button>
        </div>
      </div>
    </>
  );
};
