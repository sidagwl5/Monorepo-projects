import { IconButton as MuiIconButton } from '@mui/material';
import { tw, style } from 'twind/style';
import Tooltip from './Tooltip';
import { forwardRef } from 'react';

const iconButtonStyles = style({
  base: 'max-w-[48px] min-w-[48px] min-h-[48px] p-[13px] max-h-[48px] rounded-none outline-none focus:outline-none',
  variants: {
    active: {
      false: 'bg-[#484344] hover:bg-[#484344]',
      true: 'bg-SecondaryBg hover:bg-SecondaryBg',
    },
  },
  defaults: {
    active: 'false',
  },
});

export const IconButton = forwardRef(
  (
    { children, active = false, tooltipProps = {}, className = '', ...rest },
    ref
  ) => {
    console.log(rest, ref);

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
