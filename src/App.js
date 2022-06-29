import React from 'react';
import Content  from './layout/Content';

import Context from './functions/context';
import axi from './functions/axiosf';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      name,
      password,
      products
    }
  }

    axiLogInCashier = (method, data)=>{
      axi('logInCashier.php', method, { name : this.state.name, password : this.state.password }).then((result) => {
        if (result.type === 'approved') {
          console.log('Данные подтверждены');
          this.setState({token: result.token});
          let newProducts = {};
          for (let product of result.products) {
            newProducts = {...newProducts, product.id : product.name}
          }
          this.setState({products: newProducts})  
        } else if (result.type === 'no_authorized') {
            console.log('Вы не авторизованы')
          } else if (result.error === 'invalid_password'){
              console.log('Неверный пароль')
            } else if (result.type === 'no_name') {
              console.log('Неверное имя пользователя')
              } 
      }, (e) => {
        }
      );
    };


    render() {
        return (
              <Context.Provider value={this.state}>
                <Content />
              </Context.Provider>
        );
    }
}

export default App;