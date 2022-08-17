import { createStore, combineReducers, applyMiddleware } from "redux"; 
import weatherApi from "./App/reduser";
import thunk from 'redux-thunk'; 
import storage from 'redux-persist/lib/storage'; 
import { persistStore, persistReducer } from 'redux-persist'; 
import { setIsRegistered } from './Register/action';
import { registerReduser } from "./Register/reduser";

export const reducerCombine = combineReducers({
    weather: weatherApi,
    app: registerReduser,
})

const persistConfig = { 
    key: 'root', 
    storage, 
} 

const persistedReducer = persistReducer(persistConfig, reducerCombine); 

const logger = store => next => action => { 
    // console.group(action.type) 
    // console.info("dispatching", action) 
    let result = next(action) 
    // console.groupEnd() 
    return result 
} 

export const store = createStore((persistedReducer),applyMiddleware(logger, thunk));
export const persistor = persistStore(store)

const isRegistered = localStorage.getItem('isRegistered');
store.dispatch(setIsRegistered(isRegistered === 'true'));