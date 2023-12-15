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
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export default function AcceptanceGoodsTable(props) {
  const context = React.useContext(MyContext);


  const onChangeQuantity = (quantityValue, quantityIndex) => {
    if(typeof props.onChangeQuantity === 'function'){
      props.onChangeQuantity(quantityValue, quantityIndex);
    };
  };

  return (
    <div className={style.MenuTwoTable}>
      <TableContainer className={style.Paper} component={Paper}>
        <Table aria-label="collapsible table" className={style.Paperbody}>
          <TableHead>
            <TableRow className={style.Paperhead}>
              <TableCell />
              <TableCell>наименование</TableCell>
              <TableCell align="right">количество</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(typeof props.invoice === 'object') ? props.invoice.map((item, index) => {
              let row = createData(context.products[item.product]?.name, item.quantity, item.comment);
              if (props.isHideEmpty && +row.quantity === 0){
                return('');
              }else{
                return (
                  <Row 
                    key={index} 
                    index={index}
                    row={row}
                    onChangeQuantity={onChangeQuantity} />
                );
              }
            })
              : 
              <></>
            
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}