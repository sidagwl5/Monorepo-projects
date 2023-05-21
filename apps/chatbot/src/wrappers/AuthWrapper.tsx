import { Outlet } from 'react-router-dom';
import { useMeQuery } from '../queries/user.query';

const AuthWrapper = () => {
  const { isMeLoading, me } = useMeQuery();

  if (isMeLoading) return <p>Loading</p>;

  if (!me) return <p>Error</p>;

  return <Outlet />;
};

export default AuthWrapper;
