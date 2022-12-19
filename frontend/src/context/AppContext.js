import React,{useState,useReducer,useContext,createContext} from 'react'
import Reducer from './Reducer';
import { REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR, LOGIN_USER_BEGIN, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR } from "./Actions"

const initialState = {
  user:null,
  token:null
}

const appContext = createContext();

const AppProvider = ({children}) => {
  const [values,dispatch] = useReducer(Reducer, initialState)

  const registerUser = async (currentUser) => {
    console.log(currentUser);
  }
  
  return (
    <appContext.Provider value={{...values,registerUser}}>
      {children}
    </appContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(appContext);
}

export {AppProvider,useAppContext,initialState}