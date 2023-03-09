import { Popover, Tooltip } from '@mui/material';
import { useMemo, useRef, useState } from 'react';
import { SketchPicker } from 'react-color';
import { tw } from 'twind/style';

const colors = [
  {
    title: 'White',
    resolveStyle: function () {
      return `bg-[${this.value}]`;
    },
    value: 'white',
  },
  {
    title: 'Green',
    resolveStyle: function () {
      return `bg-[${this.value}]`;
    },
    value: '#34d399',
  },
  {
    title: 'Blue',
    resolveStyle: function () {
      return `bg-[${this.value}]`;
    },
    value: '#60a5fa',
  },
  {
    title: 'Red',
    resolveStyle: function () {
      return `bg-[${this.value}]`;
    },
    value: '#f87171',
  },
  {
    title: 'Yellow',
    resolveStyle: function () {
      return `bg-[${this.value}]`;
    },
    value: '#fbbf24',
  },
];

export const ColorPalette = ({
  currentColor,
  updateColor,
  customColor,
}: any) => {
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const finalColors = useMemo(() => {
    if (customColor) {
      return [
        ...colors,
        {
          title: `Custom | ${customColor}`,
          resolveStyle: () => `bg-[${customColor}]`,
          value: customColor,
        },
      ];
    } else return colors;
  }, [customColor]);

  return (
    <div className={tw('w-full flex gap-2')}>
      {finalColors.map((color, index) => (
        <Tooltip
          arrow
          key={index}
          title={color.title}
          disableInteractive
          disableFocusListener
          placement="top"
        >
          <div
            ref={color.value === customColor ? anchorRef : undefined}
            onClick={
              color.value === customColor && currentColor === customColor
                ? setPopoverOpen.bind(this, true)
                : undefined
            }
            className={tw(
              'relative cursor-pointer flex justify-center items-center w-6 h-6 rounded-full overflow-hidden bg-[#3c2641]',
              `border-[${color.value}]`,
              color.value === currentColor && 'border-[3px]'
            )}
          >
            <div
              onClick={() => {
                updateColor(color.value, customColor);
              }}
              className={tw(
                'w-full h-full',
                color.resolveStyle(),
                color.value === currentColor && 'w-4 h-4 rounded-full'
              )}
            />
          </div>
        </Tooltip>
      ))}

      <Popover
        open={popoverOpen}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'center',
        }}
        onClose={(e) => {
          setPopoverOpen(false);
        }}
        anchorEl={anchorRef.current}
      >
        <SketchPicker
          color={customColor}
          styles={{
            default: {
              Saturation: {
                padding: '40px !important',
                pointerEvents: 'none',
              },
            },
          }}
          onChange={(e) => {
            updateColor(e.hex, e.hex);
          }}
        />
      </Popover>
    </div>
  );
};
