import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import DownloadIcon from '@mui/icons-material/Download';
import { Dialog, DialogContent, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import { css, tw } from 'twind/style';

export const ExportOptions = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [dimensions, setDimensions] = useState<any>({
    width: 0,
    height: 0,
    aspectRatio: 0,
    quality: 0.9,
    type: 'png',
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

    setDimensions((prev) => ({
      ...prev,
      width: canvasElement.width,
      height: canvasElement.height,
      aspectRatio: canvasElement.width / canvasElement.height,
    }));

    context.fillStyle = 'white';
    context.fillRect(0, 0, canvasElement.width, canvasElement.height);

    context.fillStyle = 'blue';
    context.fillRect(50, 50, 100, 50);

    setImageUrl(canvasElement.toDataURL('png'));
  }, []);

  const saveImage = () => {
    const canvasElement = document.getElementById(
      'canvas'
    ) as HTMLCanvasElement;

    const url = canvasElement.toDataURL(dimensions.type, dimensions.quality);
    const anchor = document.createElement('a');

    anchor.download = `drawing.${dimensions.type}`;
    anchor.href = url;

    anchor.click();
    anchor.remove();
  };

  return (
    <>
      <Dialog
        classes={{ paper: tw('w-full rounded-lg! max-w-[800px]!') }}
        open={dialogOpen}
      >
        {/* <DialogTitle>Export Options</DialogTitle> */}
        <DialogContent className={tw('w-full bg-[#3E2828] flex gap-8 p-6!')}>
          <div className={tw('flex w-[50%] items-center gap-4')}>
            <img src={imageUrl} alt="" />
          </div>

          <div className={tw('flex text-[#F5EAEA] w-[50%] flex-col gap-3')}>
            <h1 className={tw('text-3xl mb-4 font-semibold text-white')}>
              Export Options
            </h1>

            <div className={tw('flex flex-col gap-1')}>
              <label className={tw('font-medium')} htmlFor="">
                Width
              </label>
              <input
                className={tw('w-full h-10 bg-[#6D4F4F] rounded-md px-3')}
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
            </div>

            <div className={tw('flex flex-col gap-1')}>
              <label className={tw('font-medium')} htmlFor="">
                Height
              </label>
              <input
                className={tw('w-full h-10 bg-[#6D4F4F] rounded-md px-3')}
                onChange={(e) =>
                  setDimensions((prev) => ({
                    ...prev,
                    height: e.target.value
                      ? Number(e.target.value)
                      : e.target.value,
                    width: e.target.value
                      ? Math.round(
                          aspectRatio
                            ? Number(e.target.value) * prev.aspectRatio
                            : prev.width
                        )
                      : prev.width,
                  }))
                }
                value={dimensions.height}
                type="number"
              />
            </div>

            <div className={tw('flex gap-2')}>
              <label className={tw('font-medium')} htmlFor="">
                Aspect Ratio
              </label>
              <AspectRatioIcon
                onClick={setAspectRatio.bind(this, !aspectRatio)}
              />
            </div>

            <div className={tw('flex flex-col gap-1 mt-3')}>
              <label className={tw('font-medium')} htmlFor="">
                quality
              </label>
              <Select
                variant="standard"
                disableUnderline
                onChange={(e) =>
                  setDimensions((prev) => ({
                    ...prev,
                    quality: e.target.value,
                  }))
                }
                className={tw('w-full bg-[#6D4F4F] rounded-md border-none')}
                classes={{
                  select: tw(
                    'px-3! py-2! text-[15px]!',
                    css({
                      '&': { color: 'rgba(255, 255, 255, 0.8) !important' },
                    })
                  ),
                  icon: tw(
                    'right-1!',
                    css({
                      '&': {
                        color: 'rgba(255, 255, 255, 0.8) !important',
                      },
                    })
                  ),
                }}
                MenuProps={{
                  classes: {
                    paper: tw('mt-1.5'),
                    list: tw('p-0!'),
                  },
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={dimensions.quality}
              >
                <MenuItem value={0.9}>90%</MenuItem>
                <MenuItem value={0.8}>80%</MenuItem>
                <MenuItem value={0.7}>70%</MenuItem>
              </Select>
            </div>

            <div className={tw('flex flex-col gap-1')}>
              <label className={tw('font-medium')} htmlFor="">
                Type
              </label>
              <Select
                variant="standard"
                disableUnderline
                onChange={(e) =>
                  setDimensions((prev) => ({
                    ...prev,
                    type: e.target.value,
                  }))
                }
                className={tw('w-full bg-[#6D4F4F] rounded-md border-none')}
                classes={{
                  select: tw(
                    'px-3! py-2! text-[15px]!',
                    css({
                      '&': { color: 'rgba(255, 255, 255, 0.8) !important' },
                    })
                  ),
                  icon: tw(
                    'right-1!',
                    css({
                      '&': {
                        color: 'rgba(255, 255, 255, 0.8) !important',
                      },
                    })
                  ),
                }}
                MenuProps={{
                  classes: {
                    paper: tw('mt-1.5'),
                    list: tw('p-0!'),
                  },
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={dimensions.type}
              >
                <MenuItem value={'png'}>PNG</MenuItem>
                <MenuItem value={'jpeg'}>JPEG</MenuItem>
                <MenuItem value={'webp'}>WEBP</MenuItem>
              </Select>
            </div>

            <button
              onClick={saveImage}
              className={tw('bg-green-500 max-w-max self-end px-4 py-2')}
            >
              Save
            </button>
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
