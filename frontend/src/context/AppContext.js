import React,{useState,useReducer,useContext,createContext} from 'react'
import Reducer from './Reducer';

const initialState = {
  user:null,
  token:null
}

const appContext = createContext();

const AppProvider = ({children}) => {
  const [values,dispatch] = useReducer(Reducer, initialState)
  
  return (
    <appContext.Provider value={{...values}}>
      {children}
    </appContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(appContext);
}

export {AppProvider,useAppContext,initialState}