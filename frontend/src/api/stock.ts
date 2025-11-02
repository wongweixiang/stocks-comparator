// frontend/api/stock.ts
import fetch from 'node-fetch';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const symbol = (req.query.symbol as string) || 'MSFT';
  const interval = (req.query.interval as string) || '1d';
  const range = (req.query.range as string) || '1y';

  try {
    const response = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=${interval}&range=${range}`,
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch Yahoo Finance data' });
  }
}
