import { tw } from 'twind/style';
import { Button } from 'ui-lib';
import { signIn } from '../../hooks/useAuth';
import { useEffect } from 'react';
import { supabase } from '../../modules/supabase';
import jsCookie from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

export const Login = () => {
  const { hash } = useLocation();
  const navigate = useNavigate();

  const isLoading = !!hash;

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const { access_token } = session;
        jsCookie.set('token', access_token);
        navigate('/dashboard');
      }
    });
  }, []);

  return (
    <div
      className={tw(
        'w-full bg-rootContainerClr h-screen p-2 justify-center overflow-hidden flex gap-2'
      )}
    >
      <div
        className={tw(
          'flex h-full max-w-[300px] font-nunitoSans px-4 w-full flex-col gap-12 sm:gap-16 items-center sm:items-start justify-center text-white'
        )}
      >
        <h1
          className={tw(
            'text-2xl md:text-4xl sm:mb-4 font-semibold border-l-8 pl-4 border-[#AC8EFF]'
          )}
        >
          Login
        </h1>

        <div className={tw('flex flex-col item-center w-full gap-4')}>
          <Button
            onClick={signIn.bind(this, 'google')}
            className="font-semibold!"
            disabled={isLoading}
          >
            Continue with Google
          </Button>
          <Button
            onClick={signIn.bind(this, 'github')}
            className="bg-WildcardBg text-white! font-semibold!"
            disabled={isLoading}
          >
            Continue with Github
          </Button>
        </div>

        {isLoading && (
          <CircularProgress size={24} className={tw('text-white')} />
        )}
      </div>
    </div>
  );
};
