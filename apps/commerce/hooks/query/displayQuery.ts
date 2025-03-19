import { useQuery } from '@tanstack/react-query';
import DisplayAPI from 'apis/displayApi';

export const useGetMainDisplayInfo = () =>
  useQuery({
    queryKey: ['getMainDisplayInfo'],
    queryFn: () => DisplayAPI.getMainDisplayInfo(),
    select: (resp) => resp.data,
  });
