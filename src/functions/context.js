import React, { createContext } from 'react';

const MyContext = createContext({
  token: '',
  name: '',
  password: '',
  products: [],
  remains: [],
  axiLogInCashier: () => {},
  axiGetRemains:  () => {},
});

export { MyContext };
