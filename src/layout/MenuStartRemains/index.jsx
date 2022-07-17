import React, {useEffect, useState, useContext} from 'react';
import StartRemainsTable from './StartRemainsTable';
import { MyContext } from '../../functions/context';

import style from './index.module.css';


const MenuStartRemains = () => {
  const context = useContext(MyContext);
  const [invoice, setInvoice] = useState([...context.remains]);

  const onChangeQuantity = (quantityValue, quantityIndex) => {
    let newReturnInvoice = [...invoice];
    let rowIndex = +quantityIndex;
    (typeof newReturnInvoice[rowIndex]?.quantity === 'number' || typeof newReturnInvoice[rowIndex]?.quantity === 'string')
      ? newReturnInvoice[rowIndex].quantity = +quantityValue : null;
    setInvoice(newReturnInvoice);
  };


  const setServerRemains = () => {
    if (!invoice.length){
      let newInvoice = [...context.remains];
      setInvoice(newInvoice);
    }
  };

  useEffect(()=>{
    setServerRemains();
  },[context.remains.length]);

  return(
    <div className={style.table}>
      <StartRemainsTable
        invoice={invoice}
        onChangeQuantity={onChangeQuantity}/>
    </div>

  );
};


export default MenuStartRemains;