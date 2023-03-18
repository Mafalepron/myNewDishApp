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
      isOpenWorkDay: true,
      setIsOpenWorkDay: this.setIsOpenWorkDay,
      point: {},
    };
  }


  axiLogInCashier = async (login = this.state.name, pass = this.state.password) => {
    try {
      let result = await axi('logInCashier.php', '', {name: login, password:  pass});
      if (result.type === 'approved') {
        let newProducts = {};        
        for (let product of result.products) {
          newProducts[product.id] = product;
        };
        this.setState({products: newProducts}); 
        this.axiGetRemains(result.token);
        this.setState({token: result.token});
        return ('авторизация прошла успешно');
      } else if (result.error === 'no_authorized') {
        return('Неверное имя пользователя');
      } else if (result.error === 'invalid_password'){
        return('Неверный пароль');
      } else if (result.error === 'no_name') {
        return('введите имя пользователя');
      } 
      return (result.type);
    } catch (e) {
      return (e);
    }
    /* 
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
     */
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
      this.setRemainsState(result.remains, result.isOpen, result.point);
    }, 
    (e) => {
      console.log(e);
    }
    );
  };

  setRemainsState = (remains, isOpen = 0, point) => {
    if (remains){
      this.setState({remains: remains});
    }else{
      alert('остатки не подгрузились!');
    }
    if (point){
      this.setState({point: point});
    }else{
      alert('данные о точке не подгрузились!');
    }
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