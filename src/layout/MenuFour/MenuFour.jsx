import React, {useEffect, useContext, useState} from 'react';
import MenuFourTable from './Components/MenuFourTable';
import { MyContext } from '../../functions/context';

const MenuFour = () => {
    const { axiGetRemains, state } = useContext(MyContext);





// useEffect(() => { 
//     axiGetRemains()
// }, [] );

    return(
        <div>
            <MenuFourTable products={state.products} remains={state.remains}/>
        </div>

    )
}


export { MenuFour };