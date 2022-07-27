import React, { createContext } from 'react';

const MyContext = createContext({
  token: '',
  name: '',
  password: '',
  products: [],
  remains: [],
  axiLogInCashier: () => {},
  axiGetRemains:  () => {},
  setRemainsState: () => {},
  isOpenWorkDay: false,
  setIsOpenWorkDay: () => {}
});

export { MyContext };
