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
import { Divider } from '@mui/material';
import copyObj from '../../functions/copyObj';


const Dashboard = () => {
  const context = useContext(MyContext);
  const [oneCheckMotivationsSettings, setOneCheckMotivationsSettings] = useState([]);
  const [shelfPositionMotivationsSettings, setShelfPositionMotivationsSettings] = useState([]);
  const [allOneCheckMotivations, setAllOneCheckMotivations] = useState([]);
  const [allShelfMotivation, setAllShelfMotivation] = useState([]);
  const [filteringOneCheckMotivations, setFilteringOneCheckMotivations] = useState([]);
  const [filteringShelfMotivations, setFilteringShelfMotivations] = useState([]);
  const [filteringLeftOneCheckMotivations, setFilteringLeftOneCheckMotivations] = useState([]);
  const [filteringLeftShelfMotivations, setFilteringLeftShelfMotivations] = useState([]);
  const [remunerationSum, setRemunerationSum] = useState(0);
  const [remunerationLeftSum, setRemunerationLeftSum] = useState(0);
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

      let newOneCheckFilter = copyObj(motivationResults?.oneCheckMotivationRemunerations);
      let newOneCheckLeftFilter = copyObj(motivationResults?.oneCheckMotivationRemunerations);
      let newOneCheckMotivationsSettings = copyObj(motivationResults?.oneCheckMotivations);
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

      
      let leftSum = 0;
      newOneCheckLeftFilter.map((item, index) => {
        let remuneration = 0;
        //берём цели, до которых осталось 3 продажи
        let motivationsSettingsLeftArray = newOneCheckMotivationsSettings?.filter((setting)=>{
          return(
            item.quantityInCheck == setting.quantityInCheck
            && +setting.quantity - +item.accumulatedResult <= 3
            && +setting.quantity - +item.accumulatedResult > 0
          );
        });

        remuneration = motivationsSettingsLeftArray[0].remuneration;
        leftSum = leftSum + remuneration;
        newOneCheckLeftFilter[index].remuneration = remuneration;
        newOneCheckLeftFilter[index].accumulatedResult = +motivationsSettingsLeftArray[0].quantity - +item.accumulatedResult;
      });
      
      //тут нужно отфильтровать те newOneCheckFilter, у которых есть достижения
      let OneCheckRemunerationLeftFilter = newOneCheckLeftFilter?.filter((setting)=>{
        return(!!setting.remuneration);
      });
      setFilteringLeftOneCheckMotivations(OneCheckRemunerationLeftFilter);

      
      let newShelfPositionFilter = copyObj(motivationResults?.shelfPositionMotivationRemunerations);
      let newShelfPositionMotivationsSettings = copyObj(motivationResults?.shelfPositionMotivations);
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



      let newShelfPositionLeftFilter = copyObj(motivationResults?.shelfPositionMotivationRemunerations);
      newShelfPositionLeftFilter.map((item, index) => {
        let remuneration = 0;
        //берём цели, до которых осталось 3 продажи
        let motivationsSettingsLeftArray = newOneCheckMotivationsSettings?.filter((setting)=>{
          return(
            item.productId == setting.product
            && +setting.quantity - +item.accumulatedResult <= 3
            && +setting.quantity - +item.accumulatedResult > 0
          );
        });

        remuneration = motivationsSettingsLeftArray[0].remuneration;
        leftSum = leftSum + remuneration;
        newShelfPositionLeftFilter[index].remuneration = remuneration;
        newShelfPositionLeftFilter[index].accumulatedResult = +motivationsSettingsLeftArray[0].quantity - +item.accumulatedResult;
      });
      
      //тут нужно отфильтровать те , у которых есть достижения
      let ShelfPositionRemunerationLeftFilter = newShelfPositionLeftFilter?.filter((setting)=>{
        return(!!setting.remuneration);
      });
      setFilteringLeftShelfMotivations(ShelfPositionRemunerationLeftFilter);
      ////////////////////////////
      setRemunerationSum(remunerationSum);
      setRemunerationLeftSum(leftSum);

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
          
          <Typography>{'Дневная премия  '}
            {isWait?
              <CircularProgress 
                size={16}
                style={{
                  marginLeft: '8px', 
                }} 
              />
              :
              <span>
              за сегодня: {remunerationSum} руб.
              </span> 
            }
          </Typography>
          
        </AccordionSummary>
        <AccordionDetails>
          <Typography>больше продаж в одном чеке.</Typography>
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
          <Divider sx={{marginTop: 1, marginBottom: 1}}/>
          <Typography>больше продаж конкретного товара.</Typography>
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
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Мотивация продаж на сегодня</Typography>
          {isWait &&
            <CircularProgress 
              size={16}
              style={{
                marginLeft: '8px', 
              }} 
            />
           
          }
        </AccordionSummary>
        <AccordionDetails>
          <Typography>  план продаж в одном чеке.</Typography>
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
                {(typeof oneCheckMotivationsSettings === 'object') ? oneCheckMotivationsSettings.map((remuneration, remunerationIndex) => {
                  return (
                    <InOneCheckRow 
                      plan
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
          <Divider sx={{marginTop: 1, marginBottom: 1}}/>
          <Typography>план продаж конкретного товара.</Typography>
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
                {(typeof shelfPositionMotivationsSettings === 'object') ? shelfPositionMotivationsSettings.map((remuneration, remunerationIndex) => {
                  return (
                    <ShelfPositionRow
                      plan
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
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          
          <Typography>{'осталось совсем немного....  '}
            {isWait?
              <CircularProgress 
                size={16}
                style={{
                  marginLeft: '8px', 
                }} 
              />
              :
              <span>
                чтобы заработать ещё: {remunerationLeftSum} руб.
              </span> 
            }
          </Typography>
          
        </AccordionSummary>
        <AccordionDetails>
          <Typography>допродайте в одном чеке:</Typography>
          <TableContainer className={style.Paper} component={Paper}>
            <Table aria-label="collapsible table" className={style.Paperbody}>
              <TableHead>
                <TableRow className={style.Paperhead}>
                  {/* <TableCell /> */}
                  <TableCell>в чеке, позиций</TableCell>
                  <TableCell align="right">осталось сделать, шт</TableCell>
                  <TableCell align="right">будет премия, руб</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(typeof filteringLeftOneCheckMotivations === 'object') ? filteringLeftOneCheckMotivations.map((remuneration, remunerationIndex) => {
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
          <Divider sx={{marginTop: 1, marginBottom: 1}}/>
          <Typography>допродайте конкретного товара:</Typography>
          <TableContainer className={style.Paper} component={Paper}>
            <Table aria-label="collapsible table" className={style.Paperbody}>
              <TableHead>
                <TableRow className={style.Paperhead}>
                  {/* <TableCell /> */}
                  <TableCell>товар</TableCell>
                  <TableCell align="right">ещё продать, шт</TableCell>
                  <TableCell align="right">будет премия, руб</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(typeof filteringLeftShelfMotivations === 'object') ? filteringLeftShelfMotivations.map((remuneration, remunerationIndex) => {
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