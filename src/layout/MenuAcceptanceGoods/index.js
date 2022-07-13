import React, {useEffect, useState, useContext} from 'react';
import AcceptanceGoodsTable from './AcceptanceGoodsTable';
import { MyContext } from '../../functions/context';
import axi from '../../functions/axiosf';


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
    <div>
      <AcceptanceGoodsTable invoice={invoice}/>
    </div>

  );
};


export default MenuAcceptanceGoods;