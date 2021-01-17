import { createReducer } from '../../utils.js'

const setUser = (state, action) => {
  return {
    ...state,
    user: action.user
  }
}

const unsetUser = (state, action) => {
  return {
    ...state,
    user: null
  }
} 

export const usersReducer = createReducer(
  null,
  {
    SET_USER: setUser,
    UNSET_USER: unsetUser
  }
)
