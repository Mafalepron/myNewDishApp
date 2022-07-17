import React, {useEffect, useState, useContext} from 'react';
import AcceptanceGoodsTable from './AcceptanceGoodsTable';
import { MyContext } from '../../functions/context';
import axi from '../../functions/axiosf';

import style from './index.module.css';




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

  useEffect(()=>{
    axiGetShipmentInvoice();
  },[]);

  return(
    <div className={style.table}>
      <AcceptanceGoodsTable 
        invoice={invoice}
        onChangeQuantity={onChangeQuantity}
      />
    </div>
  );
};


export default MenuAcceptanceGoods;