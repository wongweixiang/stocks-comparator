import { useRef, useState } from 'react';
import { useFetchStockData } from './hooks/useFetchStockData';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

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
    <div className="border rounded-xl p-4">
      <div className="my-4 flex gap-2">
        <input
          className="box-border p-2 border rounded"
          placeholder="Enter a stock ticker"
          ref={ref}
        />
        <button
          onClick={() => {
            if (!ref?.current?.value) return;
            setSymbol(ref?.current?.value);
          }}
        >
          Get Price Data
        </button>
      </div>
      {isLoading && <p>Loading...</p>}
      {error instanceof Error && <p>Error: {error.message}</p>}
      {!!data?.error && (
        <p>
          {data.error.code} - {data.error.description}
        </p>
      )}
      {!!data?.data ? (
        <>
          <h1>{data.symbol} – 1Y Performance</h1>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.data}>
              <XAxis
                dataKey="timestamp"
                tickFormatter={(ts) => new Date(ts).toLocaleDateString('en-US', { month: 'short' })}
              />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip
                labelFormatter={(ts) => new Date(ts).toLocaleDateString()}
                formatter={(value) => [`$${(value as number).toFixed(2)}`, 'Close']}
              />
              <Line type="monotone" dataKey="close" stroke="#2563eb" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </>
      ) : (
        <div className="bg-blue-950 rounded-2xl w-[520px] h-[300px] flex items-center justify-center text-white">
          Search for a stock!
        </div>
      )}
    </div>
  );
};

export default StockSection;
