import React, {useEffect, useContext, useState} from 'react';
import ReturnsGoodsTable from './ReturnsGoodsTable';
import { MyContext } from '../../functions/context';
import { stylesObj } from '../../stylesObj/stylesObj';

import style from './index.module.css';
import Button from '@mui/material/Button';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { AlertModal } from '../../components/authorization/AlertModal';
import postInvoices from '../../functions/postInvoices';



const MenuReturnsGoods = () => {
  const context = useContext(MyContext);
  const [returnInvoice, setReturnInvoice] = useState([]);
  const [isModalCompleteOpen, setIsModalCompleteOpen] = useState(false);
  const [isButtonShow, setIsButtonShow] = useState(false);

  const setNullRemains = () => {
    let newReturnInvoice = [];
    context.remains?.map((index, item)=>{
      let remainRow = {...index}; //протестировал, `...` работает. но лучше обращать внимание на его работу
      remainRow.quantity = 0;
      remainRow.comment = '';
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
    checkValidInvoice(newReturnInvoice);
  };

  const onChangeComment = (commentValue, commentIndex) => {
    let newReturnInvoice = [...returnInvoice];
    let rowIndex = +commentIndex;
    newReturnInvoice[rowIndex].comment = commentValue;
    setReturnInvoice(newReturnInvoice);
    checkValidInvoice(newReturnInvoice);
  };

  const handlePressOk = async () => {
    let postReturnInvoice = [];
    returnInvoice.map((item, index)=>{
      if(item.quantity>0){
        postReturnInvoice=[...postReturnInvoice, item];
      }
    });
    let result = await postInvoices('setReturnsGoodsInvoice.php', context.token, postReturnInvoice);
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
      setNullRemains();
    }
  };

  const checkValidInvoice = (newReturnInvoice) => {
    let isCommentEmpty = false;
    let isEmpty = true;
    newReturnInvoice.map((item, index)=>{
      if(item.quantity){
        isEmpty = false;
        if(!item.comment.length){
          isCommentEmpty = true;
        }
      }
    });
    let isValidTable = !isCommentEmpty && !isEmpty;
    setIsButtonShow(isValidTable);
  };
  
  useEffect(()=>{
    setNullRemains();
  },[]);

  return(
    <div className={style.table}>
      {isModalCompleteOpen &&
      <AlertModal 
        text="возврат товара оформлен успешно"
        buttonText="продолжить"
        onClose={setIsModalCompleteOpen}
      />
      }
      <ReturnsGoodsTable 
        returnInvoice={returnInvoice}
        onChangeQuantity={onChangeQuantity}
        onChangeComment={onChangeComment}
      />
      {isButtonShow &&
      <Button variant="contained" 
        endIcon={<ReplyAllIcon/>}  
        onClick={handlePressOk}
        sx={stylesObj.SendRemainsButton}
      > 
        вернуть
      </Button>
      }
    </div>

  );
};


export default MenuReturnsGoods;