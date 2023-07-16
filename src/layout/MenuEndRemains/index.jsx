import React, {useEffect, useContext, useState, Fragment} from 'react';
import EndRemainsTable from './EndRemainsTable';
import { MyContext } from '../../functions/context';
import { stylesObj } from '../../stylesObj/stylesObj';
import Button from '@mui/material/Button';
import style from './index.module.css';
import CheckIcon from '@mui/icons-material/Check';
import postInvoices from '../../functions/postInvoices';
import { CircularProgress } from '@mui/material';




const MenuEndRemains = () => {
  const context = useContext(MyContext);
  const [invoice, setInvoice] = useState([...context.remains]);
  const [isWaiting, setIsWaiting] = useState(false);

  const onChangeQuantity = (quantityValue, quantityIndex) => {
    let newReturnInvoice = [...invoice];
    let rowIndex = +quantityIndex;
    (typeof newReturnInvoice[rowIndex]?.quantity === 'number' || typeof newReturnInvoice[rowIndex]?.quantity === 'string')
      ? newReturnInvoice[rowIndex].quantity = +quantityValue : null;
    setInvoice(newReturnInvoice);
  };
  
  const setServerRemains = () => {
    if (!invoice.length){
      let newInvoice = [...context.remains];
      setInvoice(newInvoice);
    }
  };

  const handlePressOk = async () => {
    setIsWaiting(true);
    let result = await postInvoices('setEndRemainsInvoice.php', context.token, invoice);
    setIsWaiting(false);
    if (result.type === 'no_authorized') {
      if(typeof context.userExit === 'function'){
        context.userExit();
      }
    } 
    if (result.type === 'approved') {
      if (typeof result.remains === 'object'){
        if(typeof context.setRemainsState === 'function'){
          context.setRemainsState([...result.remains], result.isOpen, result.point);
        }
      }
    }
  };

  useEffect(()=>{
    setServerRemains();
  },[context.remains.length]);
  
  return(
    <div className={style.table}>
      <EndRemainsTable
        invoice={invoice}
        onChangeQuantity={onChangeQuantity}/>
      {isWaiting?
        <CircularProgress
          sx={stylesObj.SendRemainsButton}/>
        :
        <Button variant="contained" 
          endIcon={<CheckIcon />}  
          onClick={handlePressOk}
          sx={stylesObj.SendRemainsButton}
        > 
        завершить смену
        </Button>
      }
      
    </div>
  );
};

export default MenuEndRemains;