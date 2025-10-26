import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchStockData } from '../api/yahooFinance';

export const useFetchStockData = ({
  stockNo,
  symbol,
  range,
  interval,
}: {
  stockNo: string;
  symbol: string;
  range: string;
  interval: string;
}) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error, ...otherProps } = useQuery({
    queryKey: [`stock-${stockNo}`, symbol, range, interval],
    queryFn: async () => {
      const result = await fetchStockData(symbol, range, interval);
      queryClient.setQueryData([`stock-${stockNo}`, 'latest'], result);
      return result;
    },
    enabled: !!symbol,
  });

  return { data, isLoading, error, ...otherProps };
};
