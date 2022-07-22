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
        amount: 3,
      },
    ],
  };
};

export default createData;