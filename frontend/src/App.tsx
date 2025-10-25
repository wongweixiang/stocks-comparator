import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchStockData } from './api/yahooFinance';

function App() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['stock', 'MSFT', '1y'],
    queryFn: () => fetchStockData('MSFT', '1y', '1d'),
    enabled: false, // disable automatic fetch
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });

  // Fire exactly once on mount
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;
  if (!data) return null;

  return (
    <div>
      <h1>{data.symbol} – 1Y Performance</h1>
      <ul>
        {data.data.slice(-10).map((point) => (
          <li key={point.timestamp}>
            {new Date(point.timestamp).toLocaleDateString()}: ${point.close.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
