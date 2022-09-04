import axi from './axiosf';

const postInvoices = async (url, token, invoice, basisInvoice) => {
  try{
    let result = await axi(url, '', { token: token, invoice: invoice, basisInvoice: basisInvoice });
     
    if (result.type === 'no_authorized') {
      console.log('авторизация не прошла');
    } else {
      console.log('авторизация прошла');
    }
    return (result);
    
  }catch(e){
    console.log(e);
    return(e);
  }
};

export default postInvoices;