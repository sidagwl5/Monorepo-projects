import { UseQueryOptions, useQuery } from 'react-query';
import { axiosInstance } from '../modules/axios';
import jsCookie from 'js-cookie';

export const useMeQuery = (params?: UseQueryOptions) => {
  const {
    data: me,
    isLoading: isMeLoading,
    error: meError,
  } = useQuery({
    cacheTime: Infinity,
    staleTime: Infinity,
    enabled: !!jsCookie.get('token'),
    queryFn: async () => {
      const { data } = await axiosInstance.get('/user/me');
      return data;
    },
    onError: (err) => console.log({ err }),
    queryKey: 'user.me',
    ...params,
  });

  return { me: me as any, isMeLoading, meError };
};
