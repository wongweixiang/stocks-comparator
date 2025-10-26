import { useRef, useState } from 'react';
import { useFetchStockData } from './hooks/useFetchStockData';

const StockSection = ({ stockNo }: { stockNo: string }) => {
  const range = '1y';
  const interval = '1d';

  const ref = useRef<HTMLInputElement>(null);
  const [symbol, setSymbol] = useState('');
  const { data, error, isLoading } = useFetchStockData({
    stockNo,
    symbol,
    range,
    interval,
  });

  return (
    <div>
      <div>
        <input placeholder="Enter a stock ticker" ref={ref} />
        <button onClick={() => setSymbol(ref?.current?.value)}>Fetch Data</button>
      </div>
      {isLoading && <p>Loading...</p>}
      {error instanceof Error && <p>Error: {error.message}</p>}
      {!!data?.error && (
        <p>
          {data.error.code} - {data.error.description}
        </p>
      )}
      {!!data?.data && (
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
};

export default StockSection;
