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
      if (+e.target.value > 0){
        setOpen(true);
      }else{
        setOpen(false);
      }
    };
  };

  const handleChangeComment = (e) => {
    if(typeof props.onChangeComment === 'function'){
      props.onChangeComment(e.target.value, props.index);
    };
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
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
            onChange={handleChangeQuantity}
            InputLabelProps={{
              shrink: true,
            }}
            size="small"
            sx={{
              minWidth: '120px', 
              backgroundColor: '#FEDDC9',
              '@media screen and (max-width: 450px)': {
                marginRight: '70%',
                width: '60%'
              },
            }}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                причина возврата
              </Typography>
              <TextField
                id="outlined-number"
                value={row.comment}
                type="text"
                onChange={handleChangeComment}
                onFocus={e => e.target.select()}
                InputLabelProps={{
                  shrink: true,
                }}
                size="small"
                sx={{
                  width: '100%', 
                  backgroundColor: '#FEDDC9', 
                  borderColor: (!row.comment && row.quantity>0) ? '#f33' : null,
                  borderRadius: '6px',
                  borderStyle: (!row.comment && row.quantity>0) ? 'solid' : null,
                  borderWidth: (!row.comment && row.quantity>0) ? '2px' : null,
                }}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default Row;