import { useFetchStockData } from './hooks/useFetchStockData';

function App() {
  const ticker = 'MSFT';
  const range = '1y';
  const interval = '1d';

  const { data, error, isLoading } = useFetchStockData({ symbol: ticker, range, interval });

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
