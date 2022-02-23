const initialState = {
    documents: []
  }  


const GET_DOCUMENTS = "GET_DOCUMENTS"

  export const documentsGetter = (state = initialState, action) => {
    switch (action.type) {
      case GET_DOCUMENTS:
        return {...state, documents: [...action.payload]}
      default:
        return state 
    }
  }

  export const documentsGetterAction = (payload) => ({type: GET_DOCUMENTS, payload})