import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    padding: 80,
    '& .MuiTableCell-head': {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
      backgroundColor: '#ccc',
    },
  },
  loader: {
    width: '100%',
    textAlign: 'center',
    padding: 60,
  },
});

export default useStyles;
