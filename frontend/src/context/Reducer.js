import { REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR, LOGIN_USER_BEGIN, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR } from "./Actions"

const Reducer = (state,action) => {
  switch(action.type) {
    case REGISTER_USER_BEGIN:
      return {...state}
      break;
    
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        user:action.payload.user,
        token:action.payload.token
      }
      break;
    
    case REGISTER_USER_ERROR:
      return {...state}
      break;
    
    default:
      throw new Error(`no such ${action.type} found`)
  }
}

export default Reducer