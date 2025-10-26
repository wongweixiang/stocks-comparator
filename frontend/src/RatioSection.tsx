import { usePriceRatio } from './hooks/usePriceRatio';

const RatioSection = () => {
  const { stock1, stock2, ratios } = usePriceRatio();

  console.log('Price Ratio Data:', ratios);

  return (
    <div>
      Ratio Section
      {stock1 && stock2 && (
        <h2>
          Price Ratio: {stock1} / {stock2}
        </h2>
      )}
      {!!ratios && (
        <ul>
          {ratios.slice(-20).map((point) => (
            <li key={point.timestamp}>
              {new Date(point.timestamp).toLocaleDateString()}: {point.ratio.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RatioSection;
