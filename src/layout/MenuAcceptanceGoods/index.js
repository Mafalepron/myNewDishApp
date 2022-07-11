import React, {useEffect, useState, useContext} from 'react';
import AcceptanceGoodsTable from './MenuTwoTable';
import { MyContext } from '../../functions/context';


const MenuAcceptanceGoods = () => {
  const { axiGetRemains } = useContext(MyContext);





  // useEffect(() => { 
  //     axiGetRemains() 
  // }, [] );

  return(
    <div>
      <AcceptanceGoodsTable/>
    </div>

  );
};


export default MenuAcceptanceGoods;