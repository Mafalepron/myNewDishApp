import React, {useEffect, useContext, useState} from 'react';
import EndRemainsTable from './EndRemainsTable';
import { MyContext } from '../../functions/context';

import style from './index.module.css';
import Button from '@mui/material/Button';
import CheckBoxIcon from '@mui/icons-material/CheckBox';



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


export default MenuEndRemains;