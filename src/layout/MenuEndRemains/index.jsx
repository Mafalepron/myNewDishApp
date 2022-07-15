import React, {useEffect, useContext, useState} from 'react';
import EndRemainsTable from './EndRemainsTable';
import { MyContext } from '../../functions/context';

const MenuEndRemains = () => {
  const context = useContext(MyContext);


  return(
    <div>
      <EndRemainsTable/>
    </div>

  );
};


export default MenuEndRemains;