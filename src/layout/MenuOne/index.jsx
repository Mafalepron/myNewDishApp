import React, {useEffect, useState, useContext} from 'react';
import MenuOneTable from './Components/MenuOneTable';
import { MyContext } from '../../functions/context';

const MenuOne = () => {
  const { axiGetRemains } = useContext(MyContext);


  // useEffect(() => { 
  //     axiGetRemains()
  // }, [] );

  return(
    <div>
      <MenuOneTable/>
    </div>

  );
};


export { MenuOne };