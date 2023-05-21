import { Dialog, DialogContent, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import { tw, css } from 'twind/style';
import { useDrawingContext } from '../Context';
import CloseIcon from '@mui/icons-material/Close';
import { Canvas } from '../../../classes/canvas.class';

const ExportDialog = ({
  setIsExportDialogOpen,
}: {
  setIsExportDialogOpen: any;
}) => {
  const { canvasSettings } = useDrawingContext();
  const [imageUrl, setImageUrl] = useState('');
  const [dimensions, setDimensions] = useState<any>({
    width: 0,
    height: 0,
    aspectRatio: 0,
    quality: 1,
    type: 'webp',
  });

  useEffect(() => {
    const { canvas } = Canvas.getElements();

    setDimensions((prev: any) => ({
      ...prev,
      width: canvas.width,
      height: canvas.height,
    }));
  }, []);

  useEffect(() => {
    const { canvas } = Canvas.getElements();

    const imageURI = canvas.toDataURL(
      `image/${dimensions.type}`,
      dimensions.quality
    );

    setImageUrl(imageURI);
  }, [dimensions]);

  const saveImage = () => {
    const { canvas } = Canvas.getElements();

    const imageURI = canvas.toDataURL(
      `image/${dimensions.type}`,
      dimensions.quality
    );

    const anchorElement = document.createElement('a');
    anchorElement.href = imageURI;
    anchorElement.download = `Drawing-${dimensions.type}.${dimensions.type}`;

    anchorElement.click();
    setIsExportDialogOpen(false);
  };

  return (
    <Dialog
      classes={{ paper: tw('m-4! sm:m-8! w-full rounded-lg! max-w-[800px]!') }}
      open
    >
      {/* <DialogTitle>Export Options</DialogTitle> */}
      <DialogContent
        className={tw(
          'w-full bg-[#3E2828] flex flex-col items-center sm:flex-row gap-6 md:gap-8 p-6!'
        )}
      >
        <div className={tw('flex flex-1 max-w-[350px] items-center gap-4')}>
          <img src={imageUrl} alt="" />
        </div>

        <div className={tw('flex text-[#F5EAEA] flex-1 w-full flex-col gap-4')}>
          <h1
            className={tw(
              'text-2xl md:text-3xl mb-4 font-semibold flex justify-between items-center text-white'
            )}
          >
            Export Options
            <CloseIcon
              onClick={setIsExportDialogOpen.bind(this, false)}
              className={tw('relative top-1 cursor-pointer text-2xl!')}
            />
          </h1>

          <div className={tw('flex flex-col gap-1')}>
            <label className={tw('font-medium')} htmlFor="">
              Width
            </label>
            <input
              className={tw('w-full h-10 bg-[#6D4F4F] rounded-md px-3')}
              value={dimensions.width}
              type="number"
              disabled
            />
          </div>

          <div className={tw('flex flex-col gap-1')}>
            <label className={tw('font-medium')} htmlFor="">
              Height
            </label>
            <input
              className={tw('w-full h-10 bg-[#6D4F4F] rounded-md px-3')}
              value={dimensions.height}
              type="number"
              disabled
            />
          </div>

          <div className={tw('flex flex-col gap-1 mt-3')}>
            <label className={tw('font-medium')} htmlFor="">
              Quality
            </label>
            <Select
              variant="standard"
              disableUnderline
              disabled={dimensions.type === 'png'}
              onChange={(e) =>
                setDimensions((prev: any) => ({
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
              <MenuItem value={1}>No compression</MenuItem>
              <MenuItem value={0.8}>80%</MenuItem>
              <MenuItem value={0.6}>60%</MenuItem>
              <MenuItem value={0.4}>40%</MenuItem>
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
                  quality: e.target.value === 'png' ? 1 : prev.quality,
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
  );
};

export default ExportDialog;
