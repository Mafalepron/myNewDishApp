import React, {useEffect, useState, useContext} from 'react';
import StartRemainsTable from './StartRemainsTable';
import { MyContext } from '../../functions/context';

import style from './index.module.css';


const MenuStartRemains = () => {

  return(
    <div className={style.table}>
      <StartRemainsTable/>
    </div>

  );
};


export default MenuStartRemains;