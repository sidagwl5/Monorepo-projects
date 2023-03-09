import { Slider as MuiSlider } from '@mui/material';
import { tw } from 'twind/style';

export const Slider = ({ className, ...rest }) => {
  return (
    <MuiSlider
      {...rest}
      className={tw('', className)}
      classes={{
        thumb: tw('relative'),
        root: tw('text-WildcardBg h-[6px] py-[7px]'),
      }}
    />
  );
};
