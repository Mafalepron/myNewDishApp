import React, {useEffect, useState, useContext} from 'react';
import AcceptanceGoodsTable from './AcceptanceGoodsTable';
import { MyContext } from '../../functions/context';
import { stylesObj } from '../../stylesObj/stylesObj';
import axi from '../../functions/axiosf';


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import style from './index.module.css';
import childrenStyles from './AcceptanceGoodsTable/index.module.css';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import postInvoices from '../../functions/postInvoices';
import { AlertModal } from '../../components/authorization/AlertModal';
import { CircularProgress, Divider, Typography } from '@mui/material';


import moment from 'moment';
import 'moment/locale/ru';
import { Fragment } from 'react';

const MenuAcceptanceGoods = () => {
  const context = useContext(MyContext);

  const [invoice, setInvoice] = useState([]);
  const [basisInvoice, setBasisInvoice] = useState(0);
  const [isModalCompleteOpen, setIsModalCompleteOpen] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  
  const [invoicesArr, setInvoicesArr] = useState({});
  const [shipmentOrders, setShipmentOrders] = useState([]);


  const onChangeQuantity = (quantityValue, quantityIndex) => {
    let newReturnInvoice = [...invoice];
    let rowIndex = +quantityIndex;
    (typeof newReturnInvoice[rowIndex]?.quantity === 'number' || typeof newReturnInvoice[rowIndex]?.quantity === 'string')
      ? newReturnInvoice[rowIndex].quantity = +quantityValue : null;
    setInvoice(newReturnInvoice);
  };

  const axiGetShipmentInvoice = () => {
    setIsWaiting(true);
    axi('getShipmentInvoice.php', '', { token: context.token }).then((result) => { 
      if (result.type === 'no_authorized') {
        alert('авторизация не прошла');
      } 
      let invoiceId = +result?.shipmentOrders?.[0]?.id;

      if (typeof result?.invoicesСontents === 'object'){
        setInvoicesArr(result?.invoicesСontents);
      }else{
        setInvoicesArr({});
      }
      
      setShipmentOrders(result?.shipmentOrders);
      setInvoice(result?.invoicesСontents?.[invoiceId]);
      setBasisInvoice(invoiceId);
      console.log(result?.invoicesСontents?.[invoiceId]);
      setIsWaiting(false);
    }, 
    (e) => {
      console.log(e);
    }
    );
  };

  const handleChangeInvoice = (event) => {
    let newInvoiceId = event.target.value;
    setBasisInvoice(newInvoiceId);
    setInvoice(invoicesArr?.[newInvoiceId]);
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
          context.setRemainsState(result.remains, result.isOpen, result.point);
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
      <div className={childrenStyles.MenuTwoTable}>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Накладная</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={basisInvoice}
            label="Накладная"
            onChange={handleChangeInvoice}
          >
            {typeof shipmentOrders === 'object' ?
              shipmentOrders.map((item, index)=>
                <MenuItem 
                  key={index} 
                  value={item.id}>
                  <b>№{item.id}</b> от {moment(+item.time * 1000).format('LLL')} 
                </MenuItem>)
              : null
            }
          </Select>
        </FormControl>
        <Divider sx={{marginTop: 1, marginBottom: 1}}/>
      </div>
      {invoice ?
        <AcceptanceGoodsTable 
          invoice={invoice}
          onChangeQuantity={onChangeQuantity}
        />
        : 
        <Typography className={style.text} variant="h6" gutterBottom component="div">
          На ваш адрес пока не отправлено свежей продукции
        </Typography>
      }
      {invoice &&
        <Fragment>
          {isWaiting ?
            <CircularProgress
              sx={stylesObj.SendRemainsButton}/>
            :
            <Button variant="contained" 
              endIcon={<AddIcon />} 
              onClick={handlePressOk}
              sx={stylesObj.SendRemainsButton}
            > 
              принять
            </Button>
          }
        </Fragment>
      }
    </div>
  );
};


export default MenuAcceptanceGoods;