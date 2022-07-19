import React, {useEffect, useState, useContext} from 'react';
import AcceptanceGoodsTable from './AcceptanceGoodsTable';
import { MyContext } from '../../functions/context';
import axi from '../../functions/axiosf';
import Button from '@mui/material/Button';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


import style from './index.module.css';




const MenuAcceptanceGoods = () => {
  const context = useContext(MyContext);

  const [invoice, setInvoice] = useState([]);

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

  useEffect(()=>{
    axiGetShipmentInvoice();
  },[]);

  return(
    <div className={style.table}>
      <AcceptanceGoodsTable invoice={invoice}/>
      <Button variant="contained" 
        endIcon={<CheckBoxIcon />} 
        sx={{fontSize: '80%', textTransform: 'lowercase', borderRadius: '8px', width: '15%', marginTop: '10px', left: '85%' }}
      >
              Подтвердить
      </Button>
    </div>

  );
};


export default MenuAcceptanceGoods;