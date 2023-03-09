import { tw } from 'twind';
import Tooltip from './Tooltip';
import { CircularProgress, TooltipProps } from '@mui/material';
import { ReactElement } from 'react';

export const Button = ({
  children,
  loading = false,
  className = '',
  tooltipProps = { title: '' },
  ...rest
}: {
  children: ReactElement;
  loading: boolean;
  className: string;
  tooltipProps?: Omit<TooltipProps, 'children'>;
}) => {
  return (
    <Tooltip {...tooltipProps}>
      <button
        disabled={loading}
        className={tw(
          `bg-SecondaryBg px-5 text-black font-medium outline-none focus:outline-none py-2.5 rounded-lg flex justify-center items-center font-nunitoSans`,
          className
        )}
        {...rest}
      >
        {loading ? (
          <CircularProgress size={24} className={tw('text-black')} />
        ) : (
          children
        )}
      </button>
    </Tooltip>
  );
};
