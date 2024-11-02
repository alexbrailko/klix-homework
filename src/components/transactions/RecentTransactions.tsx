import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchTransactions } from '../../store/transactionsSlice';
import { Loading } from '../requests/Loading';
import { Error } from '../requests/Error';
import { TransactionCard } from './TransactionCard';
import { transactionsRoute } from '../../utils/routes';

export const RecentTransactions = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { transactions, loading, error } = useAppSelector(
    (state) => state.transactions
  );

  const recentTransactions = useMemo(() => {
    return transactions.slice(0, 5);
  }, [transactions]);

  useEffect(() => {
    if (!transactions.length) {
      dispatch(fetchTransactions({}));
    }
  }, [dispatch, transactions]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
      <div className="space-y-4">
        {loading && <Loading />}
        {error && <Error text={error} />}
        {!!transactions.length &&
          recentTransactions.map((transaction) => (
            <TransactionCard transaction={transaction} key={transaction.id} />
          ))}
      </div>
      {!!transactions.length && (
        <button
          onClick={() => navigate(transactionsRoute)}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          View More
        </button>
      )}
    </div>
  );
};
