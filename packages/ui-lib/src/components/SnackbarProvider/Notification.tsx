import { useSnackbar } from 'notistack';
import { forwardRef } from 'react';
import { css, style, tw } from 'twind/style';
import {
  crossSvg,
  errorCircleSvg,
  infoCircleSvg,
  tickSquareSvg,
  warningSvg,
} from 'ui-lib';

const notificationStyles = style({
  base: tw(
    'max-w-[350px] w-full h-12 font-nunitoSans text-[14.7px] text-white p-2 rounded-lg flex gap-3 items-center'
  ),
  variants: {
    variant: {
      success: css({
        background: 'linear-gradient(90deg, #359C11 14.62%, #39E736 119.74%)',
      }),
      info: css({
        background: 'linear-gradient(90deg, #1E38C1 14.62%, #48A6FC 119.74%)',
      }),
      error: css({
        background: 'linear-gradient(90deg, #C51919 14.62%, #F02995 119.74%)',
      }),
      warning: css({
        background: 'linear-gradient(90deg, #C27F1B 14.62%, #ECC436 119.74%)',
      }),
    },
  },
});

// eslint-disable-next-line react/display-name
const Notification = forwardRef(({ variant, id, message }, ref) => {
  const { closeSnackbar } = useSnackbar();

  const clickHandler = () => {
    closeSnackbar(id);
  };

  const giveValidIcon = () => {
    switch (variant) {
      case 'info':
        return infoCircleSvg;

      case 'success':
        return tickSquareSvg;

      case 'error':
        return errorCircleSvg;

      case 'warning':
        return warningSvg;
    }
  };

  return (
    <div ref={ref} className={tw(notificationStyles({ variant }))}>
      <div
        className={tw(
          'h-full rounded-lg flex justify-center p-[5px] items-center',
          css({
            aspectRatio: '1/1',
            background: 'rgba(255, 255, 255, 0.24)',
            boxShadow: '3px 3px 16px 4px rgba(30, 154, 19, 0.16)',
          })
        )}
      >
        <img
          className={tw('object-contain')}
          src={giveValidIcon()}
          alt="icons for notification"
        />
      </div>
      {message}

      <img
        onClick={clickHandler}
        className={tw('ml-auto cursor-pointer')}
        src={crossSvg}
        alt="icon to close notification"
      />
    </div>
  );
});

export default Notification;
