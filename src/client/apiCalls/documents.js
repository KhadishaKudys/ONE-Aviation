import { documentsGetterAction} from "../store/documentsGetter"


export const listOfDocuments = () => {
    return function(dispatch) { 
         return fetch(`https://one-aviation.herokuapp.com/api/v1/profile/document-types`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => 
        response.json())
    .then(response => {
        dispatch(documentsGetterAction(response))
    })
  }
}
