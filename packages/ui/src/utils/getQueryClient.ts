import { defaultShouldDehydrateQuery, isServer, MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { apiErrorHandler } from '@ui/utils';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        gcTime: 300 * 1000, // 5 minutes
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff (대기 시간을 늘려가며 재시도)
      },
      mutations: {
        retry: 0,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff (대기 시간을 늘려가며 재시도)
      },
      dehydrate: {
        //TODO: 서버렌더링 사용시 수정 필요
        shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
      },
    },
    queryCache: new QueryCache({
      onError: (error: Error) => {
        apiErrorHandler(error);
      },
    }),
    mutationCache: new MutationCache({
      onError: (error: Error) => {
        apiErrorHandler(error);
      },
    }),
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
