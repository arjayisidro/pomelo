import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TransactionsList from './TransactionsList';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../Styles/theme';
import store from '../Store';

const props = {
  transactions: [
    [
      {
        id: 0,
        name: 'Fund Transfer',
        status: 'Pending',
        amount: 5,
        description: 'Transfer to other local bank.',
      },
      {
        id: 1,
        name: 'Fund Transfer',
        status: 'Pending',
        amount: 6,
        description: 'Transfer to other local bank.',
      },
      {
        id: 2,
        name: 'Fund Transfer',
        status: 'Pending',
        amount: 7,
        description: 'Transfer to other local bank.',
      },
      {
        id: 3,
        name: 'PayNow',
        status: 'Pending',
        amount: 5,
        description: 'PayNow to Mobile.',
      },
      {
        id: 4,
        name: 'GIRO',
        status: 'Pending',
        amount: 5,
        description: 'Payment to membership.',
      },
    ],
  ],
  addTransactions: jest.fn(),
  removeTransaction: jest.fn(),
  updateTransaction: jest.fn(),
};

test('Renders TransactionsList', async () => {
  render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <TransactionsList {...props} />
      </Provider>
    </ThemeProvider>
  );
  const root = screen.getByTestId('root-container');
  await waitFor(() => {
    const refundBtn = screen.getAllByTestId('btn-delete');
    expect(refundBtn[0]).toBeInTheDocument();
    fireEvent.click(refundBtn[0]);
  });
  expect(alert).toBeDefined();
  expect(root).toBeDefined();
});
