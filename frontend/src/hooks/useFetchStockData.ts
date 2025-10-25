import { useQuery } from '@tanstack/react-query';
import { fetchStockData } from '../api/yahooFinance';

export const useFetchStockData = ({
  symbol,
  range,
  interval,
}: {
  symbol: string;
  range: string;
  interval: string;
}) => {
  const { data, error, isLoading, refetch, ...otherProps } = useQuery({
    queryKey: ['stock', symbol, range, interval],
    queryFn: () => fetchStockData(symbol, range, interval),
  });

  return { data, error, isLoading, refetch, ...otherProps };
};
