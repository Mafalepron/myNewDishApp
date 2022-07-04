import React, {useEffect, useState, useContext} from 'react';
import MenuTwoTable from './Components/MenuTwoTable';
import { MyContext } from '../../functions/context';


const MenuTwo = () => {
  const { axiGetRemains } = useContext(MyContext);





  // useEffect(() => { 
  //     axiGetRemains() 
  // }, [] );

  return(
    <div>
      <MenuTwoTable/>
    </div>

  );
};


export { MenuTwo };