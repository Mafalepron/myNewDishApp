import React, {useEffect, useContext} from 'react';
import MenuThreeTable from './MenuThreeTable/index';
import { MyContext } from '../../functions/context';

const MenuThree = () => {
  const { axiGetRemains} = useContext(MyContext);





  // useEffect(() => { 
  //     axiGetRemains()
  // }, [] );

  return(
    <div>
      <MenuThreeTable/>
    </div>

  );
};


export { MenuThree };