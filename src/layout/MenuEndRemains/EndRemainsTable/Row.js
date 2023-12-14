import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TextField from '@mui/material/TextField';
import { stylesObj } from '../../../stylesObj/stylesObj';

const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  
  
  const handleChangeQuantity = (e) => {
    if(typeof props.onChangeQuantity === 'function'){
      let naturalInt = Math.round(+e.target.value);
      if (naturalInt > 0){
        props.onChangeQuantity(naturalInt, props.index);
      }else{
        props.onChangeQuantity(0, props.index);
      }
    };
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} >
        <TableCell sx={stylesObj.TableCellMinPadding}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" sx={stylesObj.TableCellMinPadding}>
          {row.name}
        </TableCell>
        <TableCell align="right" sx={stylesObj.TableCellMinPadding}>
          <TextField
            id="outlined-number"
            value={row.quantity}
            type="number"
            inputProps = {{min: 0, step: 1}}
            onChange={handleChangeQuantity}
            onFocus={e => e.target.select()}
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
            sx={{width: '80px', backgroundColor: '#B0EEF0',}}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                История (будет в следующих версиях)
              </Typography>
              {/* 
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
               */}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
  

export default Row;