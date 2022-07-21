const createData = (name, quantity, comment) => {
  let numberQuantity = +quantity;
  return {
    name: name,
    quantity: numberQuantity,
    comment: comment,
  };
};

export default createData;