import { ReactElement } from 'react';
import {
  QueryClientProvider as ReactQueryClientProvider,
  QueryClient,
} from 'react-query';

const client = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnMount: true, refetchOnWindowFocus: false },
    mutations: { retry: 1 },
  },
});

const QueryClientProvider = ({ children }: { children: ReactElement }) => {
  return (
    <ReactQueryClientProvider client={client}>
      {children}
    </ReactQueryClientProvider>
  );
};

export default QueryClientProvider;
