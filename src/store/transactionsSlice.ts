import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Transaction } from '../types/transaction';
import { fetchTransactionsAPI } from '../api/transactionService';

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  total: number;
  offset: number;
  page: number;
  filters: {
    merchantFilter: string;
    currencyFilter: string;
    searchQuery: string;
  };
}

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
  total: 0,
  offset: 0,
  page: 0,
  filters: {
    merchantFilter: '',
    currencyFilter: '',
    searchQuery: '',
  },
};

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async ({ limit = 20, offset = 0 }: { limit?: number; offset?: number }) => {
    return await fetchTransactionsAPI(limit, offset);
  }
);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.filters.searchQuery = action.payload;
    },
    setMerchantFilter: (state, action) => {
      state.filters.merchantFilter = action.payload;
    },
    setCurrencyFilter: (state, action) => {
      state.filters.currencyFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        const { data, total, offset } = action.payload;

        state.transactions =
          offset === 0 ? data : [...state.transactions, ...data];

        state.total = total;
        state.offset += data.length;
        state.page += 1;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch transactions';
      });
  },
});

export const { setMerchantFilter, setCurrencyFilter, setSearchQuery } =
  transactionSlice.actions;
export default transactionSlice.reducer;
