import { SET_LOADER_STATUS, SEARCH_PRODUCTS, SET_CONFIRMATION_DIALOG_BOX_STATUS } from '../types/GlobalActionTypes'

const defaultState = {
  loading: false,
  keyword: '',
  confirmationDialogBoxStatus: false
}

const globalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_LOADER_STATUS:
      return {
        ...state,
        loading: action.payload
      }
    case SEARCH_PRODUCTS:
      return {
        ...state,
        keyword: action.payload
      }
    case SET_CONFIRMATION_DIALOG_BOX_STATUS:
      return {
        ...state,
        confirmationDialogBoxStatus: action.payload
      }
    default:
      return state
  }
}

export default globalReducer
