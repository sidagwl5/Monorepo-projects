import { CircularProgress, TooltipProps } from '@mui/material';
import { ButtonHTMLAttributes } from 'react';
import { tw } from 'twind';
import Tooltip from './Tooltip';
interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  className?: string;
  tooltipProps?: Omit<TooltipProps, 'children'>;
}

export const Button = ({
  children,
  loading = false,
  className = '',
  disabled,
  tooltipProps = { title: '' },
  ...rest
}: IButton) => {
  return (
    <Tooltip {...tooltipProps}>
      <button
        disabled={loading || disabled}
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
