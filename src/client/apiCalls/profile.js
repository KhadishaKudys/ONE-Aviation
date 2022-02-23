import { ordersGetterAction } from "../store/ordersGetter";

let access_token = localStorage.getItem('access_token')

export const orderHistory = () => {
    return function(dispatch) { 
         return fetch('https://one-aviation.herokuapp.com/api/v1/order/history?limit=&page=&order_by=&order_key=', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ access_token
            }
        })
    .then(response => 
        response.json())
    .then(response => {
        dispatch(ordersGetterAction(response))
    })
  }
}
