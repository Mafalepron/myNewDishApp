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



export default function EndRemainsTable(props) {
  const { products, remains} = React.useContext(MyContext);

 
  const onChangeQuantity = (quantityValue, quantityIndex) => {
    if(typeof props.onChangeQuantity === 'function'){
      props.onChangeQuantity(quantityValue, quantityIndex);
    };
  };

  return (
    <div className={style.MenuFourTable}>
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
            {(typeof props.invoice === 'object') ? props.invoice.map((remain, remainIndex) => {
              let row = createData(products[remain.product]?.name, remain.quantity);
              return (
                <Row 
                  key={remainIndex} 
                  index={remainIndex}
                  row={row}
                  onChangeQuantity={onChangeQuantity} />
              );
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