import React, {useEffect, useContext, useState} from 'react';
import ReturnsGoodsTable from './ReturnsGoodsTable';
import { MyContext } from '../../functions/context';

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
  
  useEffect(()=>{
    setNullRemains();
  },[]);

  return(
    <div>
      <ReturnsGoodsTable returnInvoice={returnInvoice}/>
    </div>

  );
};


export default MenuReturnsGoods;