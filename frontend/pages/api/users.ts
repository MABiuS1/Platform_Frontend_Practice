import { User } from '@/types/types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<User[] | User | { message: string }>) {
  const { method } = req;

  try {
    let apiUrl = 'http://localhost:4000/users';
    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Handle POST, PUT, and DELETE methods
    if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
      // Ensure we have a body for POST and PUT
      if (method !== 'DELETE') {
        fetchOptions.body = JSON.stringify(req.body);
      }

      // For PUT and DELETE, append the user ID to the URL
      if (method === 'PUT' || method === 'DELETE') {
        const { id } = req.query;
        apiUrl = `${apiUrl}/${id}`;
      }
    }

    // Send the request to the backend
    const response = await fetch(apiUrl, fetchOptions);

    if (!response.ok) throw new Error(`Failed to ${method} data`);

    const data = await response.json();

    // Respond with the appropriate data
    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
