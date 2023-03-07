import { Tooltip as MuiTooltip, TooltipProps } from '@mui/material';
import { tw, css, apply } from 'twind/style';

const Tooltip = ({ children, ...rest }: Omit<TooltipProps, 'classes'>) => {
  return (
    <MuiTooltip
      arrow
      disableInteractive
      placement="right"
      {...rest}
      classes={{
        tooltipArrow: tw(
          'bg-WildcardBg! rounded-lg px-3 py-1.5 font-nunitoSans text-xs'
        ),
        arrow: tw(css({ '&': { '&:before': apply`bg-WildcardBg!` } })),
      }}
    >
      {children}
    </MuiTooltip>
  );
};

export default Tooltip;
