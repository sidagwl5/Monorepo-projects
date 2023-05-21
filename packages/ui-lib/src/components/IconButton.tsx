import {
  IconButtonProps,
  IconButton as MuiIconButton,
  TooltipProps,
} from '@mui/material';
import { tw, style } from 'twind/style';
import Tooltip from './Tooltip';
import { ReactElement, forwardRef } from 'react';

const iconButtonStyles = style({
  base: 'max-w-[44px] min-w-[44px] transition duration-300 min-h-[44px] p-[13px] max-h-[44px] rounded-none outline-none focus:outline-none',
  variants: {
    active: {
      false: 'bg-optionsClr hover:bg-optionsClr',
      true: 'bg-SecondaryBg hover:bg-SecondaryBg',
    },
  },
  defaults: {
    active: 'false',
  },
});

interface IconButtonEl extends IconButtonProps {
  children: ReactElement;
  active?: boolean;
  tooltipProps?: Omit<TooltipProps, 'children'>;
  className?: string;
}

export const IconButton = forwardRef(
  (
    {
      children,
      active = false,
      tooltipProps = { title: '' },
      className,
      ...rest
    }: IconButtonEl,
    ref: IconButtonEl['ref']
  ) => {
    return (
      <Tooltip {...tooltipProps}>
        <MuiIconButton
          {...rest}
          className={tw(iconButtonStyles({ active }), className)}
          ref={ref}
        >
          {children}
        </MuiIconButton>
      </Tooltip>
    );
  }
);
