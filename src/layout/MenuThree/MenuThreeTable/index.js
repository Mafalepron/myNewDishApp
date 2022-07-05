import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import s from './MenuThreeTable.module.css';

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

export default function MenuThreeTable() {
  const context = React.useContext(MyContext);
  
  return (
    <div className={s.MenuThreeTable}>
      <TableContainer className={s.Paper} component={Paper}>
        <Table aria-label="collapsible table" className={s.Paperbody}>
          <TableHead>
            <TableRow className={s.Paperhead}>
              <TableCell />
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}