import React, {useEffect, useState, useContext} from 'react';
import MenuTwoTable from './Components/MenuTwoTable';
import { MyContext } from '../../functions/context';


const MenuTwo = () => {
    const { axiGetRemains, products, remains } = useContext(MyContext);





// useEffect(() => { 
//     axiGetRemains() 
// }, [] );

    return(
        <div>
            <MenuTwoTable products={products} remains={remains}/>
        </div>

    )
}


export { MenuTwo };