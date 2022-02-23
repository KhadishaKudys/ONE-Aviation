import {createStore, combineReducers, applyMiddleware} from "redux";
import {portsGetter} from "./portsGetter"
import { documentsGetter } from "./documentsGetter";
import { ordersGetter } from "./ordersGetter";
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"


const rootReducer = combineReducers({
    ports: portsGetter,
    documents: documentsGetter,
    orders: ordersGetter
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))