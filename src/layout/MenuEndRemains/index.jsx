import React, {useEffect, useContext, useState} from 'react';
import EndRemainsTable from './EndRemainsTable';
import { MyContext } from '../../functions/context';

import style from './index.module.css';



const MenuEndRemains = () => {
  const context = useContext(MyContext);


  return(
    <div className={style.table}>
      <EndRemainsTable/>
    </div>

  );
};


export default MenuEndRemains;