import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  setCurrencyFilter,
  setMerchantFilter,
  setSearchQuery,
} from '../../store/transactionsSlice';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

export const TransactionsFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, transactions } = useAppSelector(
    (state) => state.transactions
  );
  const { merchantFilter, currencyFilter, searchQuery } = useAppSelector(
    (state) => state.transactions.filters
  );
  const all = 'all';

  const merchants = useMemo(() => {
    return Array.from(new Set(transactions.map((t) => t.merchant)));
  }, [transactions]);

  const currencies = useMemo(() => {
    return Array.from(new Set(transactions.map((t) => t.currency)));
  }, [transactions]);

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <Input
        type="text"
        placeholder="Search transactions..."
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        className="lg:flex-1"
        disabled={loading}
      />

      <Select
        value={merchantFilter || all}
        onValueChange={(value) =>
          dispatch(setMerchantFilter(value === all ? '' : value))
        }
      >
        <SelectTrigger className="flex-1 lg:flex-auto w-[180px] bg-white">
          <SelectValue placeholder="Select merchant" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectGroup>
            <SelectItem value={all}>All Merchants</SelectItem>
            {merchants.map((merchant) => (
              <SelectItem key={merchant} value={merchant}>
                {merchant}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={currencyFilter || all}
        onValueChange={(value) =>
          dispatch(setCurrencyFilter(value === all ? '' : value))
        }
      >
        <SelectTrigger className="w-full flex-1 lg:flex-auto md:w-[200px] bg-white">
          <SelectValue placeholder="Select currency" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectGroup>
            <SelectItem value={all}>All Currencies</SelectItem>
            {currencies.map((currency) => (
              <SelectItem key={currency} value={currency}>
                {currency}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
