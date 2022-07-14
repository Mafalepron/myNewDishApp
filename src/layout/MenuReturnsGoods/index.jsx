import React, {useEffect, useContext} from 'react';
import ReturnsGoodsTable from './ReturnsGoodsTable';
import { MyContext } from '../../functions/context';

import style from './index.module.css';



const MenuReturnsGoods = () => {


  return(
    <div className={style.table}>
      <ReturnsGoodsTable/>
    </div>

  );
};


export default MenuReturnsGoods;