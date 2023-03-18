/* eslint-disable eqeqeq */
import React, {useEffect, useContext, useState} from 'react';
import Button from '@mui/material/Button';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { MyContext } from '../../functions/context';
import { stylesObj } from '../../stylesObj/stylesObj';

import CircularProgress from '@mui/material/CircularProgress';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';
import LoadingButton from '@mui/lab/LoadingButton';
import CachedIcon from '@mui/icons-material/Cached';

import style from './index.module.css';
import postInvoices from '../../functions/postInvoices';
import CheckIcon from '@mui/icons-material/Check';
import axi from '../../functions/axiosf';
import InOneCheckRow from './InOneCheckRow';
import ShelfPositionRow from './ShelfPositionRow';


const Dashboard = () => {
  const context = useContext(MyContext);
  const [oneCheckMotivationsSettings, setOneCheckMotivationsSettings] = useState([]);
  const [shelfPositionMotivationsSettings, setShelfPositionMotivationsSettings] = useState([]);
  const [allOneCheckMotivations, setAllOneCheckMotivations] = useState([]);
  const [allShelfMotivation, setAllShelfMotivation] = useState([]);
  const [filteringOneCheckMotivations, setFilteringOneCheckMotivations] = useState([]);
  const [filteringShelfMotivations, setFilteringShelfMotivations] = useState([]);
  const [remunerationSum, setRemunerationSum] = useState(0);
  const [isWait, setIsWait] = useState(false);

  const onGetData = async() => {
    let motivationResults = {};
    try{
      setIsWait(true);
      motivationResults = await axi(
        'cashier/motivation/readMotivationsResults.php', 
        '', 
        { token: context.token });
      setOneCheckMotivationsSettings(motivationResults?.oneCheckMotivations);  
      setShelfPositionMotivationsSettings(motivationResults?.shelfPositionMotivations);
      setAllOneCheckMotivations(motivationResults?.oneCheckMotivationRemunerations);
      setAllShelfMotivation(motivationResults?.shelfPositionMotivationRemunerations);

      let newOneCheckFilter = [...motivationResults?.oneCheckMotivationRemunerations];
      let newOneCheckMotivationsSettings = [...motivationResults?.oneCheckMotivations];
      let remunerationSum = 0;
      newOneCheckFilter.map((item, index) => {
        let remuneration = 0;
        //пока что возьмём только достигнутые цели
        let motivationsSettingsArray = newOneCheckMotivationsSettings?.filter((setting)=>{
          return(
            item.quantityInCheck == setting.quantityInCheck
            && item.accumulatedResult >= setting.quantity
          );
        });
        motivationsSettingsArray.sort((a, b) => {
          if (+a.quantity > +b.quantity) {
            return -1;
          }
          if (+a.quantity == +b.quantity) {
            return 0;
          }
          if (+a.quantity < +b.quantity) {
            return 1;
          }
          return 0;
        });


        remuneration = motivationsSettingsArray[0].remuneration;
        newOneCheckFilter[index].remuneration = remuneration;
        remunerationSum = remunerationSum + remuneration;
      });
      
      //тут нужно отфильтровать те newOneCheckFilter, у которых есть достижения
      let OneCheckRemunerationFilter = newOneCheckFilter?.filter((setting)=>{
        return(!!setting.remuneration);
      });
      setFilteringOneCheckMotivations(OneCheckRemunerationFilter);

      
      let newShelfPositionFilter = [...motivationResults?.shelfPositionMotivationRemunerations];
      let newShelfPositionMotivationsSettings = [...motivationResults?.shelfPositionMotivations];
      newShelfPositionFilter.map((item, index) => {
        let remuneration = 0;
        //пока что возьмём только достигнутые цели
        let motivationsSettingsArray = newShelfPositionMotivationsSettings?.filter((setting)=>{
          return(
            item.productId == setting.product
            && item.accumulatedResult >= setting.quantity
          );
        });
        motivationsSettingsArray.sort((a, b) => {
          if (+a.quantity > +b.quantity) {
            return -1;
          }
          if (+a.quantity == +b.quantity) {
            return 0;
          }
          if (+a.quantity < +b.quantity) {
            return 1;
          }
          return 0;
        });


        remuneration = motivationsSettingsArray[0].remuneration;
        newShelfPositionFilter[index].remuneration = remuneration;
        remunerationSum = remunerationSum + remuneration;
      });
      let ShelfPositionRemunerationFilter = newShelfPositionFilter?.filter((setting)=>{
        return(!!setting.remuneration);
      });
      setFilteringShelfMotivations(ShelfPositionRemunerationFilter);

      setRemunerationSum(remunerationSum);

    }catch(e){
      console.log(e);
    }finally{
      setIsWait(false);
    }
  };

  useEffect(()=>{
    onGetData();
  }, []);

  return(
    <div className={style.table}>
      <LoadingButton 
        variant="contained"
        disabled={isWait}
        loading={isWait}
        loadingPosition="end"
        endIcon={<CachedIcon/>}
        onClick={onGetData}
        sx={{marginBottom:  4}}
      >
        Обновить
      </LoadingButton>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {isWait?
            <CircularProgress 
              color="success" 
              style={{
                margin: '2px', 
                width: '20px',
                height: '20px'
              }} 
            />
            :
            <Typography>Дневная премия за сегодня: {remunerationSum} руб.</Typography>
          }
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer className={style.Paper} component={Paper}>
            <Table aria-label="collapsible table" className={style.Paperbody}>
              <TableHead>
                <TableRow className={style.Paperhead}>
                  {/* <TableCell /> */}
                  <TableCell>в чеке, позиций</TableCell>
                  <TableCell align="right">чеков, шт</TableCell>
                  <TableCell align="right">премия, руб</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(typeof filteringOneCheckMotivations === 'object') ? filteringOneCheckMotivations.map((remuneration, remunerationIndex) => {
                  return (
                    <InOneCheckRow 
                      key = {remunerationIndex} 
                      index = {remunerationIndex}
                      row={remuneration} />
                  );
                })
                  : 
                  <></>
            
                }
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer className={style.Paper} component={Paper}>
            <Table aria-label="collapsible table" className={style.Paperbody}>
              <TableHead>
                <TableRow className={style.Paperhead}>
                  {/* <TableCell /> */}
                  <TableCell>товар</TableCell>
                  <TableCell align="right">продано, шт</TableCell>
                  <TableCell align="right">премия, руб</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(typeof filteringShelfMotivations === 'object') ? filteringShelfMotivations.map((remuneration, remunerationIndex) => {
                  return (
                    <ShelfPositionRow
                      key = {remunerationIndex} 
                      index = {remunerationIndex}
                      row={remuneration} />
                  );
                })
                  : 
                  <></>
            
                }
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Dashboard;