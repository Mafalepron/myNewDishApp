import React, { useContext, useEffect } from 'react';
import Content  from './layout/Content';
import { Context } from './functions/context';
import { MyContext } from './functions/context';


const App = () => {
  // const { axiLogInCashier } = useContext(MyContext);
  
  // useEffect(() => { 
  //   axiLogInCashier() 
  // }, [] );

        return (
              <Context>
                <Content />
              </Context>
        );
}

export default App;