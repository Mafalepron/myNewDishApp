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



export default function StartRemainsTable() {
  const { products, remains} = React.useContext(MyContext);

 
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
            {(typeof remains === 'object') ? remains.map((remain, remainIndex) => {
              let row = createData(products[remain.product]?.name, remain.quantity);
              return (
                <Row key={remainIndex} row={row} />
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