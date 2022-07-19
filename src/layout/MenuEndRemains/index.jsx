import React from 'react';
import EndRemainsTable from './EndRemainsTable';
import Button from '@mui/material/Button';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import style from './index.module.css';



const MenuEndRemains = () => {
  
  return(
    <div className={style.table}>
      <EndRemainsTable/>
      <Button variant="contained" 
        endIcon={<CheckBoxIcon />} 
        sx={{fontSize: '80%', textTransform: 'lowercase', borderRadius: '8px', width: '15%', marginTop: '10px', left: '85%' }}
      >
              Подтвердить
      </Button>
    </div>

  );
};


export default MenuEndRemains;