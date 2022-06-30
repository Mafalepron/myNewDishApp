import React, {useEffect, useContext} from 'react';
import MenuThreeTable from './Components/MenuThreeTable';
import { MyContext } from '../../functions/context';

const MenuThree = () => {
    const { axiGetRemains, products, remains } = useContext(MyContext);





// useEffect(() => { 
//     axiGetRemains()
// }, [] );

    return(
        <div>
            <MenuThreeTable products={products} remains={remains}/>
        </div>

    )
}


export { MenuThree };