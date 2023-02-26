import { tw } from 'twind';
import Tooltip from './Tooltip';

export const Button = ({
  children,
  className = '',
  tooltipProps = {},
  ...rest
}) => {
  return (
    <Tooltip {...tooltipProps}>
      <button
        className={tw(
          `bg-SecondaryBg px-5 text-black font-medium py-2.5 rounded-lg flex justify-center items-center font-nunitoSans`,
          className
        )}
        {...rest}
      >
        {children}
      </button>
    </Tooltip>
  );
};
