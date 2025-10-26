import { useQuery } from '@tanstack/react-query';

export const usePriceRatio = () => {
  const { data: stock1 } = useQuery({ queryKey: [`stock-1`, 'latest'] });
  const { data: stock2 } = useQuery({ queryKey: [`stock-2`, 'latest'] });

  console.log('Stock 1 Data:', stock1);
  console.log('Stock 2 Data:', stock2);

  let ratios;

  if (!!stock1?.data && !!stock2?.data) ratios = calculatePriceRatios(stock1?.data, stock2?.data);

  return { stock1: stock1?.symbol, stock2: stock2?.symbol, ratios };
};

interface PricePoint {
  timestamp: number;
  close: number;
}

interface RatioPoint {
  timestamp: number;
  ratio: number;
}

const calculatePriceRatios = (stock1: PricePoint[], stock2: PricePoint[]): RatioPoint[] => {
  const stock2Map = new Map(stock2.map((p) => [p.timestamp, p.close]));

  const ratios: RatioPoint[] = [];

  for (const p1 of stock1) {
    const close2 = stock2Map.get(p1.timestamp);
    if (close2 !== undefined && close2 !== 0) {
      ratios.push({
        timestamp: p1.timestamp,
        ratio: p1.close / close2,
      });
    }
  }

  // Ensure ascending order by timestamp
  ratios.sort((a, b) => a.timestamp - b.timestamp);

  return ratios;
};
