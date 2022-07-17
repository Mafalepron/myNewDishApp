import React, {useEffect, useContext, useState} from 'react';
import ReturnsGoodsTable from './ReturnsGoodsTable';
import { MyContext } from '../../functions/context';

import style from './index.module.css';



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
    console.log(rowIndex);
    typeof newReturnInvoice[rowIndex]?.quantity === 'number' ? newReturnInvoice[rowIndex].quantity = +quantityValue : null;
    console.log(newReturnInvoice[rowIndex]?.quantity);
    setReturnInvoice(newReturnInvoice);
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
    </div>

  );
};


export default MenuReturnsGoods;