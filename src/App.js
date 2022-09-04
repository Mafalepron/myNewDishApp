import React from 'react';
import Content from './layout/Content';
import { MyContext } from './functions/context';
import axi from './functions/axiosf';
import LoginModal from './components/authorization/LoginModal';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      name: '',
      password: '',
      products: [],
      remains: [],
      axiLogInCashier: this.axiLogInCashier,
      userExit: this.userExit,
      axiGetRemains: this.axiGetRemains,
      setRemainsState: this.setRemainsState,
      isOpenWorkDay: false,
      setIsOpenWorkDay: this.setIsOpenWorkDay,
    };
  }


  axiLogInCashier = (login = this.state.name, pass = this.state.password) => {
    axi('logInCashier.php', '', {name: login, password:  pass}).then((result) => {
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
      } else if (result.error === 'no_authorized') {
        alert('Вы не авторизованы');
      } else if (result.error === 'invalid_password'){
        alert('Неверный пароль');
      } else if (result.error === 'no_name') {
        alert('Неверное имя пользователя');
      } 
    }, (e) => {
    }
    );
  };

  userExit = () => {
    this.setState({token: ''});
  };

  setIsOpenWorkDay = (isOpen) => {
    this.setState({isOpenWorkDay: isOpen});
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
      this.setRemainsState(result.remains, result.isOpen);
    }, 
    (e) => {
      console.log(e);
    }
    );
  };

  setRemainsState = (remains, isOpen = 0) => {
    this.setState({remains: remains});
    this.setState({isOpenWorkDay: isOpen});
  };

  //временно авторизируемся под тестовым пользователем чтобы дальше работать. 
  //убрать после готовности страницы авторизации.
  /* 
  componentDidUpdate() {
    if (this.state.name) {
      this.axiLogInCashier();
    }
  }
   */

  render() {
    return (
      <MyContext.Provider 
        value={this.state}>
        {
          this.state.token? <Content /> : <LoginModal/>
        }
      </MyContext.Provider>
    );
  }
}

export default App;