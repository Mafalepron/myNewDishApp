import React, {useEffect, useContext} from 'react';
import ReturnsGoodsTable from './ReturnsGoodsTable';
import Button from '@mui/material/Button';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import style from './index.module.css';



const MenuReturnsGoods = () => {


  return(
    <div className={style.table}>
      <ReturnsGoodsTable/>
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