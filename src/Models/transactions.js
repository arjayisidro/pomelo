const transactions = {
  state: [],
  reducers: {
    addTransactions(state, transactions) {
      return [...state, transactions];
    },
    removeTransaction(state, { id }) {
      return state.flat(1).filter((transaction) => transaction.id !== id);
    },
    updateTransaction(state, { id, status }) {
      const newArray = state.flat(1).map((item) => {
        return item.id === id ? { ...item, status: status } : item;
      });
      return newArray;
    },
  },
};

export default transactions;
