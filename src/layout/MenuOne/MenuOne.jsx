import React, {useEffect, useState, useContext} from 'react';
import MenuOneTable from './Components/MenuOneTable';
import { MyContext } from '../../functions/context';

const MenuOne = () => {
    const { axiGetRemains, products, remains } = useContext(MyContext);





// useEffect(() => { 
//     axiGetRemains()
// }, [] );

    return(
        <div>
            <MenuOneTable products={products} remains={remains}/>
        </div>

    )
}


export { MenuOne };