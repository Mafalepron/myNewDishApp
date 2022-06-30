import React, {createContext, useState} from 'react';
import axi from './axiosf';

const MyContext = createContext();

const Context = (props) => {
    const [userParams, setUserParams] = useState({
        token: '',
        name: '',
        password: '',
    });
    const [products, setProducts] = useState({
    });
    const [remains, setRemains] = useState([
    ]);

    const axiLogInCashier = (method, data)=> {
        axi('logInCashier.php', method, {name: userParams.name, password: userParams.password }).then((result) => {
          if (result.type === 'approved') {
            console.log('Данные подтверждены');
            setUserParams({token: result.token});
            let newProducts = {};
            for (let product of result.products) {
              newProducts = {...newProducts, id : userParams.name}
            };
            setProducts(newProducts);  
          } else if (result.type === 'no_authorized') {
              console.log('Вы не авторизованы')
            } else if (result.error === 'invalid_password'){
                console.log('Неверный пароль')
              } else if (result.type === 'no_name') {
                console.log('Неверное имя пользователя')
                } 
        }, (e) => {
          }
        )}

    const axiGetRemains = (data) => {
        axi('getRemains.php', {token: userParams.token, password: userParams.password}).then((result) => { 
            if (result.type === 'no_authorized') {
                console.log('авторизация не прошла')
            } else {
              setUserParams({token: ''});
              setUserParams({password: ''});
                }
            setRemains(result)
        }, 
            (e) => {
            }
        );
    }


    const values = {
        userParams,
        products,
        remains,
        axiLogInCashier,
        axiGetRemains

    }

    return  <MyContext.Provider value={values}>
                {props.children}
            </MyContext.Provider>
}


export { MyContext, Context };