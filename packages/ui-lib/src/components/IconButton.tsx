import { IconButton as MuiIconButton } from '@mui/material';
import { tw, style } from 'twind/style';
import Tooltip from './Tooltip';

const iconButtonStyles = style({
  base: 'max-w-[52px] min-w-[52px] min-h-[52px] p-4 max-h-[52px] rounded-none outline-none focus:outline-none',
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

export const IconButton = ({
  children,
  active,
  tooltipProps = {},
  ...rest
}) => {
  return (
    <Tooltip {...tooltipProps}>
      <MuiIconButton {...rest} className={tw(iconButtonStyles({ active }))}>
        {children}
      </MuiIconButton>
    </Tooltip>
  );
};
