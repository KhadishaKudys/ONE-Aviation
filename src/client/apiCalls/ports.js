import { portsGetterAction } from "../store/portsGetter";


export const listOfPorts = () => {
    return function(dispatch) { 
         return fetch(`https://one-aviation.herokuapp.com/api/v1/port?limit=&page=&order_by=&order_key=`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => 
        response.json())
    .then(response => {
        dispatch(portsGetterAction(response))
    })
  }
}
