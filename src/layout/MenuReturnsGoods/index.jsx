import React, {useEffect, useContext, useState} from 'react';
import ReturnsGoodsTable from './ReturnsGoodsTable';
import Button from '@mui/material/Button';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

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
    (typeof newReturnInvoice[rowIndex]?.quantity === 'number' || typeof newReturnInvoice[rowIndex]?.quantity === 'string')
      ? newReturnInvoice[rowIndex].quantity = +quantityValue : null;
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
      <Button variant="contained" 
        endIcon={<CheckBoxIcon />} 
        sx={{fontSize: '80%', textTransform: 'lowercase', borderRadius: '8px', width: '15%', marginTop: '10px', left: '85%' }}
      >
              Подтвердить
      </Button>
    </div>
  );
};


export default MenuReturnsGoods;