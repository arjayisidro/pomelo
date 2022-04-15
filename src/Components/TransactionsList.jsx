import { useEffect, useState } from 'react';

// Material UI
import CircularProgress from '@mui/material/CircularProgress';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { connect } from 'react-redux';
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import styled from '@material-ui/styles/styled';
import MuiGrid from '@material-ui/core/Grid';
import {
  compose as composeStyles,
  palette,
  sizing,
  spacing,
} from '@material-ui/system';
import useStyles from './TransactionList.styles';
import { TABLE_HEAD } from '../Utility';

const Grid = styled(MuiGrid)(composeStyles(spacing, palette, sizing));

const TransactionsList = ({
  transactions,
  addTransactions,
  removeTransaction,
  updateTransaction,
}) => {
  const classes = useStyles();

  const [isSuccess, setIsSuccess] = useState({
    state: false,
    type: '',
  });
  const [isLoading, setIsLoading] = useState([]);

  useEffect(() => {
    const fetchList = () => {
      fetch(
        'https://gist.githubusercontent.com/arjayisidro/bf2e37987fcdc7d4a5b51e88f2e01725/raw/8ae720490131d13511352b0ad415fc2f0e3c7203/transactions.json'
      )
        .then((response) => response.json())
        .then((json) => {
          addTransactions(json.transactions);
        })
        .catch((e) => console.error(e));
    };
    fetchList();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsSuccess({
        state: false,
        type: '',
      });
    }, 2000);
  }, [isSuccess]);

  const handleUpdateRecord = (index, status) => {
    let loading = isLoading.slice();
    loading[index] = true;
    setIsLoading(loading);
    setTimeout(() => {
      updateTransaction({
        id: index,
        status: status,
      });
      loading[index] = false;
      setIsLoading(loading);
      setIsSuccess({
        state: true,
        type: 'success',
      });
    }, 3000);
  };

  const removeTransactionHandler = (index) => {
    let loading = isLoading.slice();
    loading[index] = true;
    setIsLoading(loading);
    setTimeout(() => {
      removeTransaction({
        id: index,
      });
      loading[index] = false;
      setIsLoading(loading);
      setIsSuccess({
        state: true,
        type: 'error',
      });
    }, 3000);
  };

  return (
    <Grid container className={classes.root} data-testid="root-container">
      <Grid item lg={6} mb={4}>
        <Fade in={isSuccess.state} data-testid="alert">
          <Alert severity={isSuccess.type}>Transaction Status Updated!</Alert>
        </Fade>
      </Grid>
      <Grid item lg={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">{TABLE_HEAD.TNX_TYPE}</TableCell>
                <TableCell align="center">{TABLE_HEAD.AMOUNT}</TableCell>
                <TableCell align="center">{TABLE_HEAD.DESCRIPTION}</TableCell>
                <TableCell align="center">{TABLE_HEAD.STATUS}</TableCell>
                <TableCell align="center">{TABLE_HEAD.ACTIONS}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.flat(1).map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.amount}</TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="center">{row.status}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      data-testid="btn-refund"
                      onClick={() =>
                        handleUpdateRecord(
                          index,
                          row.status === 'REFUNDED' ? 'Pending' : 'REFUNDED'
                        )
                      }
                    >
                      {isLoading[index] ? (
                        <CircularProgress disableShrink size={25} />
                      ) : row.status === 'REFUNDED' ? (
                        'UPDATE'
                      ) : (
                        'REFUND'
                      )}
                    </Button>
                    <Button
                      style={{ marginLeft: 16 }}
                      variant="outlined"
                      color="error"
                      size="small"
                      data-testid="btn-delete"
                      onClick={() => removeTransactionHandler(index)}
                    >
                      {isLoading[index] ? (
                        <CircularProgress disableShrink size={25} />
                      ) : (
                        'DELETE'
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

const mapState = (state) => ({
  transactions: state.transactions,
});

const mapDispatch = (dispatch) => ({
  addTransactions: (transactions) =>
    dispatch.transactions.addTransactions(transactions),
  removeTransaction: ({ id }) =>
    dispatch.transactions.removeTransaction({ id }),
  updateTransaction: ({ id, status }) =>
    dispatch.transactions.updateTransaction({ id, status }),
});

export default connect(mapState, mapDispatch)(TransactionsList);
