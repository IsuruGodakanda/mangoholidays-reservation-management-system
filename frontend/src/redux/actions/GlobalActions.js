import { SET_LOADER_STATUS, SEARCH_PRODUCTS, SET_CONFIRMATION_DIALOG_BOX_STATUS } from '../types/GlobalActionTypes'

// Set loader status
export const setLoaderStatus = (loaderStatus) => (dispatch) => {
  try {
    dispatch({
      type: SET_LOADER_STATUS,
      payload: loaderStatus
    })
  } catch (error) {
    throw new Error(error)
  }
}

// Search products in the whole site
export const searchProducts = (keyword) => (dispatch) => {
  try {
    dispatch({
      type: SEARCH_PRODUCTS,
      payload: keyword
    })
  } catch (error) {
    throw new Error(error)
  }
}

// Set confirmation dialog box status
export const setConfirmationDialogBoxStatus = (confirmation) => (dispatch) => {
  try {
    dispatch({
      type: SET_CONFIRMATION_DIALOG_BOX_STATUS,
      payload: confirmation
    })
  } catch (error) {
    throw new Error(error)
  }
}
