import React,{useState,useReducer,useContext,createContext} from 'react'
import Reducer from './Reducer';
import { REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR, LOGIN_USER_BEGIN, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR } from "./Actions"
import axios from 'axios';

const user = localStorage.getItem('user')
const token = localStorage.getItem('token')

const initialState = {
  user: user ? JSON.parse(user):null,
  token: token
}

const appContext = createContext();

const AppProvider = ({children}) => {
  const [values,dispatch] = useReducer(Reducer, initialState)

  const addUserToLocalStorage = ({user,token}) => {
    localStorage.setItem('user',JSON.stringify(user))
    localStorage.setItem('token',token)
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const registerUser = async (currentUser) => {
    //console.log(currentUser);

    dispatch({type: REGISTER_USER_BEGIN})

    try {
      const response = await axios.post('/api/v1/auth/register',currentUser)
      console.log(response);

      const {user,token} = response.data

      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: {
          user,
          token
        }
      })

      addUserToLocalStorage({user,token})

    } catch (error) {
      console.log(error.response)
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: {
          msg:error.response.data.msg
        }
      })
    }
  }

  const loginUser = async (currentUser) => {
    console.log(currentUser)
    dispatch({type:LOGIN_USER_BEGIN})

    try {
      const {data} = await axios.post('/api/v1/auth/login',currentUser)
      const {user,token} = data
      dispatch({
        type:LOGIN_USER_SUCCESS,
        payload:{
          user,
          token
        }
      })
      addUserToLocalStorage({user,token})
    } catch (error) {
      dispatch({
        type:LOGIN_USER_ERROR,
        payload:{
          msg:error.response.data.msg
        }
      })
    }
  }
  
  return (
    <appContext.Provider value={{...values,registerUser,loginUser}}>
      {children}
    </appContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(appContext);
}

export {AppProvider,useAppContext,initialState}