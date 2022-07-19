import React, {useEffect, useState, useContext} from 'react';
import AcceptanceGoodsTable from './AcceptanceGoodsTable';
import { MyContext } from '../../functions/context';
import axi from '../../functions/axiosf';

import style from './index.module.css';
import Button from '@mui/material/Button';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import postInvoices from '../../functions/postInvoices';

const MenuAcceptanceGoods = () => {
  const context = useContext(MyContext);

  const [invoice, setInvoice] = useState([]);


  const onChangeQuantity = (quantityValue, quantityIndex) => {
    let newReturnInvoice = [...invoice];
    let rowIndex = +quantityIndex;
    (typeof newReturnInvoice[rowIndex]?.quantity === 'number' || typeof newReturnInvoice[rowIndex]?.quantity === 'string')
      ? newReturnInvoice[rowIndex].quantity = +quantityValue : null;
    setInvoice(newReturnInvoice);
  };

  const axiGetShipmentInvoice = () => {
    axi('getShipmentInvoice.php', '', { token: context.token }).then((result) => { 
      if (result.type === 'no_authorized') {
        console.log('авторизация не прошла');
      } else {
        console.log('авторизация прошла');
      }
      let invoiceId = +result?.shipmentOrders?.[0]?.id;
      setInvoice(result?.invoicesСontents?.[invoiceId]);
      console.log(result?.invoicesСontents?.[invoiceId]);
      
    }, 
    (e) => {
      console.log(e);
    }
    );
  };

  const handlePressOk = async () => {
    let result = await postInvoices('setAcceptanceGoodsInvoice.php', context.token, invoice);
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
    axiGetShipmentInvoice();
  },[]);

  return(
    <div className={style.table}>
      <AcceptanceGoodsTable 
        invoice={invoice}
        onChangeQuantity={onChangeQuantity}
      />
      <Button variant="contained" 
        endIcon={<CheckBoxIcon />} 
        onClick={handlePressOk}
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


export default MenuAcceptanceGoods;