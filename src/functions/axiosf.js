import axios from 'axios';
export default axi;
function axi(url, method, params) {
  return new Promise(function (resolve, reject) {       
    axios({
      method: 'POST',
      headers: { 
        //'Content-Type': 'application/x-www-form-urlencoded', 
        'Content-Type': 'application/json',
        'charset': 'utf-8',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'ReferrerPolicy': 'unsafe-url'},
      url: 'http://pies.businessmod.ru/api/v1/' + url,
      data: {
        'jsonrpc': '2.0',
        'id': 1,
        'method': method,
        'params': params
      },
      responseType: 'json', 
      referrerPolicy: 'unsafe-url', 
    })
      .then((res) => {
        console.log(res);
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });  
}  