import React from 'react';
import EndRemainsTable from './EndRemainsTable';
import Button from '@mui/material/Button';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import style from './index.module.css';



const MenuEndRemains = () => {
  const context = useContext(MyContext);
  const [invoice, setInvoice] = useState([...context.remains]);


  const onChangeQuantity = (quantityValue, quantityIndex) => {
    let newReturnInvoice = [...invoice];
    let rowIndex = +quantityIndex;
    (typeof newReturnInvoice[rowIndex]?.quantity === 'number' || typeof newReturnInvoice[rowIndex]?.quantity === 'string')
      ? newReturnInvoice[rowIndex].quantity = +quantityValue : null;
    setInvoice(newReturnInvoice);

  
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
      <EndRemainsTable
        invoice={invoice}
        onChangeQuantity={onChangeQuantity}/>
    
    <Button variant="contained" 
        endIcon={<CheckBoxIcon />} 
        sx={{fontSize: '80%', textTransform: 'lowercase', borderRadius: '8px', width: '15%', marginTop: '10px', left: '85%' }}
      >
              Подтвердить
    </Button>
    </div>
  );
};


