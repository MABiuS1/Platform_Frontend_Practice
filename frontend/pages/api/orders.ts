import { Order } from '@/types/types';
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse<Order[] | { error: string }>) {
  const { method } = req;

  try {
    const response = await fetch('http://localhost:4000/orders', {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) throw new Error('Failed to fetch data');

    const data: Order[] = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
