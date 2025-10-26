import { usePriceRatio } from './hooks/usePriceRatio';

const RatioSection = () => {
  const priceRatio = usePriceRatio();

  console.log('Price Ratio Data:', priceRatio);

  return (
    <div>
      Ratio Section
      {!!priceRatio && (
        <ul>
          {priceRatio.slice(-20).map((point) => (
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
