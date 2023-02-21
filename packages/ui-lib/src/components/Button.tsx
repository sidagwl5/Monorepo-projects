import { nunitoSans, secondaryBg } from 'packages/ui-lib/config/twind.config';
import { tw } from 'twind';

export const Button = ({ children, className = '', ...rest }) => {
  return (
    <button
      className={tw(
        `bg-[${secondaryBg}] px-5 text-black font-medium py-2.5 rounded-lg flex justify-center items-center font-[${nunitoSans}]!`,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
