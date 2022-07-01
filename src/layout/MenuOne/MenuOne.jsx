import React, {useEffect, useState, useContext} from 'react';
import MenuOneTable from './Components/MenuOneTable';
import { MyContext } from '../../functions/context';

const MenuOne = () => {
    const { axiGetRemains, state } = useContext(MyContext);





// useEffect(() => { 
//     axiGetRemains()
// }, [] );

    return(
        <div>
            <MenuOneTable products={state.products} remains={state.remains}/>
        </div>

    )
}


export { MenuOne };