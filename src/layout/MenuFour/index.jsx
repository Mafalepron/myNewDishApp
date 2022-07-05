import React, {useEffect, useContext, useState} from 'react';
import MenuFourTable from './MenuFourTable';
import { MyContext } from '../../functions/context';

const MenuFour = () => {
  const context = useContext(MyContext);


  // useEffect(() => { 
  //     context.axiGetRemains()
  // }, [] );

  return(
    <div>
      <MenuFourTable/>
    </div>

  );
};


export { MenuFour };