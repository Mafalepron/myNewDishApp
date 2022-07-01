import React, {useEffect, useState, useContext} from 'react';
import MenuTwoTable from './Components/MenuTwoTable';
import { MyContext } from '../../functions/context';


const MenuTwo = () => {
    const { axiGetRemains, state } = useContext(MyContext);





// useEffect(() => { 
//     axiGetRemains() 
// }, [] );

    return(
        <div>
            <MenuTwoTable products={state.products} remains={state.remains}/>
        </div>

    )
}


export { MenuTwo };