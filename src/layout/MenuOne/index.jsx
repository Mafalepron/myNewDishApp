import React, {useEffect, useState, useContext} from 'react';
import MenuOneTable from './MenuOneTable/index';
import { MyContext } from '../../functions/context';

const MenuOne = () => {



  return(
    <div>
      <MenuOneTable/>
    </div>

  );
};


export { MenuOne };