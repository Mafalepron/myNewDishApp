import React, {useEffect, useContext, useState} from 'react';
import ReturnsGoodsTable from './ReturnsGoodsTable';
import { MyContext } from '../../functions/context';
import { stylesObj } from '../../stylesObj/stylesObj';

import style from './index.module.css';
import Button from '@mui/material/Button';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import postInvoices from '../../functions/postInvoices';



const MenuReturnsGoods = () => {
  const context = useContext(MyContext);
  const [returnInvoice, setReturnInvoice] = useState([]);

  const setNullRemains = () => {
    let newReturnInvoice = [];
    context.remains?.map((index, item)=>{
      let remainRow = index;
      remainRow.quantity = 0;
      newReturnInvoice = [... newReturnInvoice, remainRow];
    });
    setReturnInvoice(newReturnInvoice);
  };

  
  const onChangeQuantity = (quantityValue, quantityIndex) => {
    let newReturnInvoice = [...returnInvoice];
    let rowIndex = +quantityIndex;
    (typeof newReturnInvoice[rowIndex]?.quantity === 'number' || typeof newReturnInvoice[rowIndex]?.quantity === 'string')
      ? newReturnInvoice[rowIndex].quantity = +quantityValue : null;
    setReturnInvoice(newReturnInvoice);
  };

  const handlePressOk = async () => {
    let result = await postInvoices('setReturnsGoodsInvoice.php', context.token, returnInvoice);
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
    setNullRemains();
  },[]);

  return(
    <div className={style.table}>
      <ReturnsGoodsTable 
        returnInvoice={returnInvoice}
        onChangeQuantity={onChangeQuantity}
      />
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


export default MenuReturnsGoods;