import React, { useContext, useEffect } from 'react';
import Content  from './layout/Content';
import { MyContext } from './functions/context';
import axi from './functions/axiosf';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      name: '',
      password: '',
      products: [],
      remains: [],
    }
  }
    axiLogInCashier = (method, data)=> {
      axi('logInCashier.php', method, {name: this.state.name, password: this.state.password }).then((result) => {
        if (result.type === 'approved') {
          console.log('Данные подтверждены');
          this.setState({token: result.token});
          let newProducts = {};
          for (let product of result.products) {
            newProducts = {...newProducts, product }
          };
          this.setState({products: newProducts});  
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

  axiGetRemains = (data) => {
      axi('getRemains.php', {token: this.state.token, password: this.state.password}).then((result) => { 
          if (result.type === 'no_authorized') {
              console.log('авторизация не прошла')
          } else {
            this.setState({token: ''});
            this.setState({password: ''});
              }
          this.setState({remains: result})
      }, 
          (e) => {
          }
      );
  };


        render() {
          return (
                  <MyContext.Provider value={{
                                              state: this.state, 
                                              axiLogInCashier: this.axiLogInCashier,
                                              axiGetRemains: this.axiGetRemains
                                            }}>
                    <Content />
                  </MyContext.Provider>
          )
        }
}

export default App;