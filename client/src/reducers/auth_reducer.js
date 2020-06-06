import { AUTH_ATTEMPTING, AUTH_SUCCESS, AUTH_FAILED,REGISTER_ATTEMPTING, USER_LOGGED_OUT,REGISTER_SUCCESS,
  REGISTER_FAILED,
  PROFILE_FEATCHED  } from '../actions/types';

const INITIAL_STATE = {
  attempting: false,
  isAuth: false,
  isReg: false,
  profile: {},
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_ATTEMPTING:
    case REGISTER_ATTEMPTING:
      return { ...state, attempting: true, isAuth: false, error: null };
    case AUTH_SUCCESS:
      return { ...state, attempting: false, isAuth: true, error: null };
    case REGISTER_SUCCESS:
      return { ...state, attempting: false, isReg: true, error: null };
    case AUTH_FAILED:
    case REGISTER_FAILED:
      return {
        ...state,
        attempting: false,
        isAuth: false,
        error: action.payload
      };
      case USER_LOGGED_OUT: 
      return { ...state, isAuth: false, profile: {} };
      case PROFILE_FEATCHED:
        return { ...state, profile: action.payload };
    default:
      return state;
  }
};