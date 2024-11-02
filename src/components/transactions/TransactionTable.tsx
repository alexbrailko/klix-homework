import { useCallback, useEffect, useMemo } from 'react';

import { formatCurrency, formatDate } from '../../utils/formatters';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchTransactions } from '../../store/transactionsSlice';
import { Loading } from '../requests/Loading';
import { Error } from '../requests/Error';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

const TransactionTable = () => {
  const dispatch = useAppDispatch();
  const { transactions, page, offset, total, loading, error, filters } =
    useAppSelector((state) => state.transactions);
  const { merchantFilter, currencyFilter, searchQuery } = filters;
  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    if (!transactions.length) {
      dispatch(
        fetchTransactions({
          limit: ITEMS_PER_PAGE,
          offset: 0,
        })
      );
    }
  }, [dispatch, transactions, page]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading ||
      offset >= total
    ) {
      return;
    }
    dispatch(
      fetchTransactions({
        limit: ITEMS_PER_PAGE,
        offset: page * ITEMS_PER_PAGE,
      })
    );
  }, [page, offset, total, loading, dispatch]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, handleScroll]);

  const filteredTransactions = useMemo(
    () =>
      transactions.filter((transaction) => {
        const matchesSearch = [
          transaction.merchant.toLowerCase(),
          formatDate(transaction.date).toLowerCase(),
          formatCurrency(
            transaction.amount,
            transaction.currency
          ).toLowerCase(),
        ].some((field) => field.includes(searchQuery.toLowerCase()));

        const matchesMerchant =
          !merchantFilter || transaction.merchant === merchantFilter;
        const matchesCurrency =
          !currencyFilter || transaction.currency === currencyFilter;

        return matchesSearch && matchesMerchant && matchesCurrency;
      }),
    [transactions, merchantFilter, currencyFilter, searchQuery]
  );

  return (
    <div className="mb-10">
      {!!filteredTransactions.length && (
        <Table>
          <TableHeader className="bg-white">
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Merchant</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id} className="border-b">
                <TableCell className="">
                  {formatDate(transaction.date)}
                </TableCell>
                <TableCell className="">{transaction.merchant}</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(transaction.amount, transaction.currency)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {!filteredTransactions.length && searchQuery && (
        <p className="text-gray-500">No transactions found.</p>
      )}

      {loading && <Loading />}

      {error && <Error text={error} />}
    </div>
  );
};

export default TransactionTable;
