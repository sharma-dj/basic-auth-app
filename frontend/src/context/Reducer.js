import { REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR, LOGIN_USER_BEGIN, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR } from "./Actions"

const Reducer = (state,action) => {
  switch(action.type) {
    case REGISTER_USER_BEGIN:
      break;
    case REGISTER_USER_SUCCESS:
      break;
  }  
  throw new Error(`no such ${action.type} found`)
}

export default Reducer