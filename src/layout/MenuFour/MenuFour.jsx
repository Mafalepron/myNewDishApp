import React, {useEffect, useContext, useState} from 'react';
import MenuFourTable from './Components/MenuFourTable';
import Context from '../../functions/context';
import axi from '../../functions/axi'

const MenuFour = () => {
    const state = useContext(Context);


    const [token, setToken] = useState(state.token);
    const [password, setPassword] = useState(state.password);
    const [remains, setRemains] = useState([]);



    let axiGetRemains = (data) => {
        axi('getRemains.php', { token, password}).then((result) => { 
            if (result.type === 'no_authorized') {
                console.log('авторизация не прошла')
            } else {
                setToken('');
                setPassword('')
              }
            setRemains(result)
        }, 
            (e) => {
            }
        );
    }

    useEffect(() => {
        axiGetRemains();
        }, []);

    return(
        <div>
            <MenuFourTable />
        </div>

    )
}


export { MenuFour };