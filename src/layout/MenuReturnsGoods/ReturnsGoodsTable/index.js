import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';

import style from './index.module.css';

import Row from './Row';
import createData from './createData';
import { MyContext } from '../../../functions/context';


const rows = [
  createData('Водка', 159, 6.0, 24, 4.0, 3.99),
  createData('Пиво', 237, 9.0, 37, 4.3, 4.99),
  createData('Кекс', 262, 16.0, 24, 6.0, 3.79),
  createData('Шпекс', 305, 3.7, 67, 4.3, 2.5),
  createData('Ноги', 356, 16.0, 49, 3.9, 1.5),
];

export default function ReturnsGoodsTable(props) {
  
  const { products, remains} = React.useContext(MyContext);
  
  const onChangeQuantity = (quantityValue, quantityIndex) => {
    if(typeof props.onChangeQuantity === 'function'){
      props.onChangeQuantity(quantityValue, quantityIndex);
    };
  };

  const onChangeComment = (commentValue, commentIndex) => {
    if(typeof props.onChangeComment === 'function'){
      props.onChangeComment(commentValue, commentIndex);
    };
  };

  return (
    <TableContainer className={style.Paper} style={{marginLeft: 20}} component={Paper}>
      <Table aria-label="collapsible table" className={style.Paperbody}>
        <TableHead>
          <TableRow className={style.Paperhead}>
            <TableCell />
            <TableCell>наименование</TableCell>
            <TableCell align="right">количество</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(typeof props.returnInvoice === 'object') ? props.returnInvoice.map((remain, remainIndex) => {
            let row = createData(products[remain.product]?.name, remain.quantity, remain.comment);
            return (
              <Row 
                key={remainIndex} 
                index={remainIndex}
                row={row} 
                onChangeQuantity={onChangeQuantity}
                onChangeComment={onChangeComment}
              />
            );
          })
            : 
            <></>
            
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}