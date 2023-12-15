import React, {useEffect, useContext, useState} from 'react';
import StartRemainsTable from './StartRemainsTable';
import Button from '@mui/material/Button';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { MyContext } from '../../functions/context';
import { stylesObj } from '../../stylesObj/stylesObj';


import style from './index.module.css';
import postInvoices from '../../functions/postInvoices';
import CheckIcon from '@mui/icons-material/Check';
import { Checkbox, CircularProgress, FormControlLabel } from '@mui/material';


const MenuStartRemains = () => {
  const context = useContext(MyContext);
  const [invoice, setInvoice] = useState([]);
  const [isWaiting, setIsWaiting] = useState(false);

  const [isHideEmpty, setHideEmpty] = useState(true);
  
  const handleChangeHideEmpty = (event) => {
    setHideEmpty(event.target.checked);
  };

  useEffect(()=>{
    if(typeof context.remains === 'object' && context.remains.length > 0){
      let newRemains = [...context.remains];
      setInvoice(newRemains);
    }
  }, [context.remains]);

  const onChangeQuantity = (quantityValue, quantityIndex) => {
    let newReturnInvoice = [...invoice];
    let rowIndex = +quantityIndex;
    (typeof newReturnInvoice[rowIndex]?.quantity === 'number' || typeof newReturnInvoice[rowIndex]?.quantity === 'string')
      ? newReturnInvoice[rowIndex].quantity = +quantityValue : null;
    setInvoice(newReturnInvoice);
  };

  const handlePressOk = async () => {
    setIsWaiting(true);
    let result = await postInvoices('setStartRemainsInvoice.php', context.token, invoice);
    setIsWaiting(false);
    
    if (result.type === 'no_authorized') {
      if(typeof context.userExit === 'function'){
        context.userExit();
      }
    } else {
      if (typeof result.remains === 'object'){
        if(typeof context.setRemainsState === 'function'){
          context.setRemainsState(result.remains, result.isOpen, result.point);
        }
      }
    }
  };

  const setServerRemains = () => {
    if (!invoice.length){
      let newInvoice = [...context.remains];
      setInvoice(newInvoice);
    }
  };

  useEffect(()=>{
    setServerRemains();
  },[context.remains.length]);

  return(
    <div className={style.table}>
      <FormControlLabel 
        control={
          <Checkbox
            checked = {isHideEmpty}
            onChange = {handleChangeHideEmpty}
          />
        } 
        label = "Скрывать отсутствующие позиции"
        sx = {{margin: 3}}
      />
      
      <StartRemainsTable
        invoice={invoice}
        isHideEmpty={isHideEmpty}
        onChangeQuantity={onChangeQuantity}/>
      {isWaiting ?
        <CircularProgress
          sx={stylesObj.SendRemainsButton}
        />
        :
        <Button variant="contained" 
          onClick={handlePressOk}
          endIcon={<CheckIcon />} 
          sx={stylesObj.SendRemainsButton}
        > 
        открыть смену
        </Button>
      }
    </div>
  );
};

export default MenuStartRemains;