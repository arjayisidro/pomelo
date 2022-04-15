import React from 'react';
import { Provider } from 'react-redux';
import TransactionList from './Components/TransactionsList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './Styles/theme';
import store from './Store';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<TransactionList />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
