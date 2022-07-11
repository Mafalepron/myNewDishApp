const createData = (name, /* calories, fat, carbs, protein, price,  */quantity) => {
  return {
    name,
    //calories,
    //fat,
    //carbs,
    //protein,
    //price,
    quantity,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
};

export default createData;