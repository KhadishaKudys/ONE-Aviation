const initialState = {
    orders: []
  }  


const GET_ORDERS = "GET_ORDERS"

  export const ordersGetter = (state = initialState, action) => {
    switch (action.type) {
      case GET_ORDERS:
        return {...state, orders: [...action.payload.orders]}
      default:
        return state 
    }
  }

  export const ordersGetterAction = (payload) => ({type: GET_ORDERS, payload})