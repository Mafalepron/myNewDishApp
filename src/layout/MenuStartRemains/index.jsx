import React, {useEffect, useState, useContext} from 'react';
import StartRemainsTable from './StartRemainsTable';
import { MyContext } from '../../functions/context';

const MenuStartRemains = () => {

  return(
    <div>
      <StartRemainsTable/>
    </div>

  );
};


export default MenuStartRemains;