import React, {useEffect, useContext, useState} from 'react';
import EndRemainsTable from './EndRemainsTable';
import { MyContext } from '../../functions/context';
import { stylesObj } from '../../stylesObj/stylesObj';

import style from './index.module.css';
import Button from '@mui/material/Button';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import postInvoices from '../../functions/postInvoices';



const MenuEndRemains = () => {
  const context = useContext(MyContext);

  const [invoice, setInvoice] = useState([...context.remains]);


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
    let result = await postInvoices('setEndRemainsInvoice.php', context.token, invoice);
    if (result.type === 'no_authorized') {
      if(typeof context.userExit === 'function'){
        context.userExit();
      }
    } else {
      if (typeof result.remains === 'object'){
        if(typeof context.setRemainsState === 'function'){
          context.setRemainsState(result.remains);
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
      <Button variant="contained" 
        endIcon={<CheckBoxIcon />}  
        onClick={handlePressOk}
        sx={stylesObj.SendRemainsButton}
      > 
        Отправить
      </Button>
    </div>

  );
};


export default MenuEndRemains;