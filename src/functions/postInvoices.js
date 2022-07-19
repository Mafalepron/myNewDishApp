import axi from './axiosf';

const postInvoices = async (url, token, invoice) => {
  try{
    let result = await axi(url, '', { token: token, invoice: invoice });
     
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