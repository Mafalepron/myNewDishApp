import React from 'react';
import Content from './layout/Content';
import { MyContext } from './functions/context';
import axi from './functions/axiosf';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      name: 'test',
      password: 'test',
      products: [],
      remains: [],
      axiLogInCashier: this.axiLogInCashier,
      axiGetRemains: this.axiGetRemains
    };
  }
  axiLogInCashier = () => {
    axi('logInCashier.php', '', {name: this.state.name, password: this.state.password }).then((result) => {
      if (result.type === 'approved') {
        console.log('Данные подтверждены');
        this.setState({token: result.token});
        let newProducts = {};
        for (let product of result.products) {
          newProducts[product.id] = product;
        };
        this.setState({products: newProducts}); 
        console.log(result); 
        this.axiGetRemains(result.token);
      } else if (result.type === 'no_authorized') {
        console.log('Вы не авторизованы');
      } else if (result.error === 'invalid_password'){
        console.log('Неверный пароль');
      } else if (result.type === 'no_name') {
        console.log('Неверное имя пользователя');
      } 
    }, (e) => {
    }
    );
  };

  axiGetRemains = (authToken) => {
    axi('getRemains.php', '', { token: this.state.token ? this.state.token : authToken}).then((result) => { 
      if (result.type === 'no_authorized') {
        console.log('авторизация не прошла');
      } else {
        console.log('авторизация прошла');
        // this.setState({token: ''});
        // this.setState({password: ''});
      }
      this.setState({remains: result.remains});
      
    }, 
    (e) => {
      console.log(e);
    }
    );
  };

  //временно авторизируемся под тестовым пользователем чтобы дальше работать. 
  //убрать после готовности страницы авторизации.
  componentDidMount() {
    this.axiLogInCashier();
  }

  render() {
    return (
      <MyContext.Provider 
        value={this.state}>
        <Content />
      </MyContext.Provider>
    );
  }
}

export default App;