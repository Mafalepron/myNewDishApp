import React, {useEffect, useContext, useState} from 'react';
import StartRemainsTable from './StartRemainsTable';
import Button from '@mui/material/Button';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { MyContext } from '../../functions/context';
import { stylesObj } from '../../stylesObj/stylesObj';


import style from './index.module.css';
import postInvoices from '../../functions/postInvoices';
import CheckIcon from '@mui/icons-material/Check';


const MenuStartRemains = () => {
  const context = useContext(MyContext);
  const [invoice, setInvoice] = useState([...context.remains]);

  const onChangeQuantity = (quantityValue, quantityIndex) => {
    let newReturnInvoice = [...invoice];
    let rowIndex = +quantityIndex;
    (typeof newReturnInvoice[rowIndex]?.quantity === 'number' || typeof newReturnInvoice[rowIndex]?.quantity === 'string')
      ? newReturnInvoice[rowIndex].quantity = +quantityValue : null;
    setInvoice(newReturnInvoice);
  };

  const handlePressOk = async () => {
    let result = await postInvoices('setStartRemainsInvoice.php', context.token, invoice);
    if (result.type === 'no_authorized') {
      if(typeof context.userExit === 'function'){
        context.userExit();
      }
    } else {
      if (typeof result.remains === 'object'){
        if(typeof context.setRemainsState === 'function'){
          context.setRemainsState(result.remains, result.isOpen);
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
      <StartRemainsTable
        invoice={invoice}
        onChangeQuantity={onChangeQuantity}/>
      <Button variant="contained" 
        onClick={handlePressOk}
        endIcon={<CheckIcon />} 
        sx={stylesObj.SendRemainsButton}
      > 
        открыть смену
      </Button>
    </div>
  );
};

export default MenuStartRemains;