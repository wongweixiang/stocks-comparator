import { useRef, useState } from 'react';
import { useFetchStockData } from './hooks/useFetchStockData';

function App() {
  const range = '1y';
  const interval = '1d';

  const ref = useRef<HTMLInputElement>(null);
  const [symbol, setSymbol] = useState('');
  const { data, error, isLoading } = useFetchStockData({
    symbol,
    range,
    interval,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div>
        <input placeholder="Enter a stock ticker" ref={ref} />
        <button onClick={() => setSymbol(ref?.current?.value)}>Fetch Data</button>
      </div>
      {!!data && (
        <>
          <h1>{data.symbol} – 1Y Performance</h1>
          <ul>
            {data.data.slice(-10).map((point) => (
              <li key={point.timestamp}>
                {new Date(point.timestamp).toLocaleDateString()}: ${point.close.toFixed(2)}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
