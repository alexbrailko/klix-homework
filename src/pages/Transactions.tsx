import { lazy, Suspense } from 'react';

import { TransactionsFilters } from '../components/transactions/TransactionFilters';
import { Loading } from '../components/requests/Loading';
const TransactionTable = lazy(
  () => import('../components/transactions/TransactionTable')
);

const Transactions: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <TransactionsFilters />
      <Suspense fallback={<Loading />}>
        <TransactionTable />
      </Suspense>
    </div>
  );
};
export default Transactions;
