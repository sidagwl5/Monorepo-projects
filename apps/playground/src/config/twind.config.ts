import { setup } from 'twind';

export const secondaryBg = '#C8EAD3';
export const nunitoSans = 'Nunito Sans';

setup({
  theme: {
    extend: {
      colors: {
        SecondaryBg: 'green',
      },
      fontFamily: {
        nunitoSans: 'Nunito Sans',
      },
    },
  },
});
