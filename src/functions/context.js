import React, { createContext } from 'react';

const MyContext = createContext({
      token: '',
      name: 'test',
      password: 'test',
      products: [],
      remains: [],
      axiLogInCashier: () => {},
      axiGetRemains:  () => {},
    });

export { MyContext };
