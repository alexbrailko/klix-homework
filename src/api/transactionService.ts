import { Transaction } from '../types/transaction';

interface TransactionsResponse {
  data: Transaction[];
  limit: number;
  offset: number;
  total: number;
}

export const fetchTransactionsAPI = async (
  limit: number = 20,
  offset: number = 0
): Promise<TransactionsResponse> => {
  const response = await fetch(
    `https://shop.uat.klix.app/transactions?limit=${limit}&offset=${offset}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  if (!response.ok) throw new Error('Failed to fetch transactions');
  return response.json();
};
