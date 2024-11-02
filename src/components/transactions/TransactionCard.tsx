import React from 'react';
import { Transaction } from '../../types/transaction';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface TransactionCardProps {
  transaction: Transaction;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
}) => (
  <div className="bg-white shadow rounded-lg p-4 mb-2">
    <div className="flex justify-between">
      <span>{transaction.merchant}</span>
      <span>{formatCurrency(transaction.amount, transaction.currency)}</span>
    </div>
    <div className="text-sm text-gray-500">{formatDate(transaction.date)}</div>
  </div>
);
