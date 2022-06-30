import React, {useEffect, useContext, useState} from 'react';
import MenuFourTable from './Components/MenuFourTable';
import { MyContext } from '../../functions/context';

const MenuFour = () => {
    const { axiGetRemains, products, remains } = useContext(MyContext);





// useEffect(() => { 
//     axiGetRemains()
// }, [] );

    return(
        <div>
            <MenuFourTable products={products} remains={remains}/>
        </div>

    )
}


export { MenuFour };