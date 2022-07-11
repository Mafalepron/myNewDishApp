import React, {useEffect, useState, useContext} from 'react';
import AcceptanceGoodsTable from './AcceptanceGoodsTable';
import { MyContext } from '../../functions/context';


const MenuAcceptanceGoods = () => {
  const { axiGetRemains } = useContext(MyContext);


  return(
    <div>
      <AcceptanceGoodsTable/>
    </div>

  );
};


export default MenuAcceptanceGoods;