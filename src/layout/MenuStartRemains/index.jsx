import React, {useEffect, useState, useContext} from 'react';
import StartRemainsTable from './StartRemainsTable';
import { MyContext } from '../../functions/context';

import style from './index.module.css';
import postInvoices from '../../functions/postInvoices';
import Button from '@mui/material/Button';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


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
          context.setRemainsState(result.remains);
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
        endIcon={<CheckBoxIcon />} 
        sx={{
          fontSize: '12px', 
          textTransform: 'lowercase', 
          borderRadius: '18px', 
          marginTop: '5px', 
          left: '85%', 
          width: '15%'}}
      > 
        Отправить
      </Button>
    </div>

  );
};


export default MenuStartRemains;