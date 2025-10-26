export async function fetchStockData(symbol: string, range = '1y', interval = '1d') {
  const url = `http://localhost:4000/api/stock?symbol=${symbol}&range=${range}&interval=${interval}`;
  const res = await fetch(url);

  if (!res.ok) throw new Error(`Failed to fetch stock data`);

  const json = await res.json();

  if (!!json.chart?.error) {
    return { symbol, error: json.chart.error };
  }

  const result = json.chart.result?.[0];

  const timestamps = result.timestamp;
  const closes = result.indicators.quote[0].close;

  const data = timestamps.map((t: number, i: number) => ({
    timestamp: t * 1000,
    close: closes[i],
  }));

  return { symbol, data };
}
