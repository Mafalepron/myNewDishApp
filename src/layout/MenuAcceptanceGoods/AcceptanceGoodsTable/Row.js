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
      props.onChangeQuantity(e.target.value, props.index);
    };
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell sx={stylesObj.TableCellMinPadding}>
          {!!row.comment &&
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          }
        </TableCell>
        <TableCell sx={stylesObj.TableCellMinPadding} component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell sx={stylesObj.TableCellMinPadding} align="right">
          <TextField
            id="outlined-number"
            value={row.quantity}
            type="number"
            onChange={handleChangeQuantity}
            onFocus={e => e.target.select()}
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
            sx={{minWidth: '120px', backgroundColor: '#A8E9B1',
              '@media screen and (max-width: 450px)': {
                marginRight: '70%',
                width: '60%'
              },}}
          />
        </TableCell>
      </TableRow>
      {!!row.comment &&
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                  Комментарий
              </Typography>
              <Typography gutterBottom component="div">
                {row.comment}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      }
    </React.Fragment>
  );
};

export default Row;