import { Provider } from '@supabase/supabase-js';
import { supabase } from '../modules/supabase';
import { enqueueSnackbar } from 'notistack';

export const signIn = async (provider: Provider) => {
  try {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/login` },
    });
  } catch (error: any) {
    enqueueSnackbar({
      message: error.message || 'Something went wrong',
      variant: 'error',
    });
  }
};
