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
import { stylesObj } from '../../stylesObj/stylesObj';


const InOneCheckRow = (props) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  

  return (
    <React.Fragment>
      <TableRow sx = {{ '& > *': { borderBottom: 'unset' } }}>
        {/* 
        <TableCell sx = {stylesObj.TableCellMinPadding}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        */}
        <TableCell component="th" scope="row" sx={stylesObj.TableCellMinPadding}>
          {row.quantityInCheck}
        </TableCell>
        <TableCell component="th" scope="row" align="right" sx={stylesObj.TableCellMinPadding}>
          {props.plan ?
            row.quantity
            :row.accumulatedResult}
        </TableCell>
        <TableCell component="th" scope="row" align="right" sx={stylesObj.TableCellMinPadding}>
          {row.remuneration}
        </TableCell>
      </TableRow>
      {/* 
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>

            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      */}
    </React.Fragment>
  );
};

export default InOneCheckRow;