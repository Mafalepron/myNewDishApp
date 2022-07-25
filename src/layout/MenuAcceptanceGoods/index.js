import React, {useEffect, useState, useContext} from 'react';
import AcceptanceGoodsTable from './AcceptanceGoodsTable';
import { MyContext } from '../../functions/context';
import { stylesObj } from '../../stylesObj/stylesObj';
import axi from '../../functions/axiosf';

import style from './index.module.css';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import postInvoices from '../../functions/postInvoices';
import { AlertModal } from '../../components/authorization/AlertModal';

const MenuAcceptanceGoods = () => {
  const context = useContext(MyContext);

  const [invoice, setInvoice] = useState([]);
  const [basisInvoice, setBasisInvoice] = useState(0);
  const [isModalCompleteOpen, setIsModalCompleteOpen] = useState(false);


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
      setBasisInvoice(invoiceId);
      console.log(result?.invoicesСontents?.[invoiceId]);
      
    }, 
    (e) => {
      console.log(e);
    }
    );
  };

  const handlePressOk = async () => {
    let result = await postInvoices('setAcceptanceGoodsInvoice.php', context.token, invoice, basisInvoice);
    if (result.type === 'no_authorized') {
      if(typeof context.userExit === 'function'){
        context.userExit();
      }
    } else {
      if (typeof result.remains === 'object'){
        if(typeof context.setRemainsState === 'function'){
          context.setRemainsState(result.remains, result.isOpen);
        }
        setIsModalCompleteOpen(true);
      }
      axiGetShipmentInvoice();
    }
  };

  useEffect(()=>{
    axiGetShipmentInvoice();
  },[]);

  return(
    <div className={style.table}>
      {isModalCompleteOpen &&
      <AlertModal 
        text="товар принят успешно"
        buttonText="продолжить"
        onClose={setIsModalCompleteOpen}
      />
      }
      <AcceptanceGoodsTable 
        invoice={invoice}
        onChangeQuantity={onChangeQuantity}
      />
      <Button variant="contained" 
        endIcon={<AddIcon />} 
        onClick={handlePressOk}
        sx={stylesObj.SendRemainsButton}
      > 
        принять
      </Button>
    </div>
  );
};


export default MenuAcceptanceGoods;