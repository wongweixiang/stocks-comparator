import { usePriceRatio } from './hooks/usePriceRatio';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const RatioSection = () => {
  const { stock1, stock2, ratios } = usePriceRatio();

  console.log({ ratios });

  return (
    <div className="border rounded-xl p-4 m-4">
      {stock1 && stock2 && (
        <h1>
          Price Ratio: {stock1} / {stock2}
        </h1>
      )}
      {!!ratios && (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ratios}>
              <XAxis
                dataKey="timestamp"
                tickFormatter={(ts) => new Date(ts).toLocaleDateString('en-US', { month: 'short' })}
              />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip
                labelFormatter={(ts) => new Date(ts).toLocaleDateString()}
                formatter={(value) => [(value as number).toFixed(2), 'Ratio']}
              />
              <Line type="monotone" dataKey="ratio" stroke="#2563eb" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
};

export default RatioSection;
