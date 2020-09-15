const redux = require('redux')
const createStore = redux.createStore

const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')

const initialState = {
  loading: false,
  users: [],
  error: ''
}

// ACTION
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS ='FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE ='FETCH_USERS_FAILURE'

// ACTION CREATOR
const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  }
}
const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  }
}
const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error
  }
}

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST: return {
      ...state,
      loading: true
    }
    case FETCH_USERS_SUCCESS: return {
      ...state,
      loading: false,
      users: action.payload,
      error: ''
    }
    case FETCH_USERS_FAILURE: return {
      ...state,
      loading: false,
      users: [],
      error: action.payload
    }
    default: return state
  }
}

// Create ACTION CREATOR for Async Process
// Because of Thunk, It can return function with side effect like async API Call & DISPATCH an action
const fetchUsers = () => {
  return function(dispatch) {
    // first dispatch the fetchUsersRequest to set the loading state
    dispatch(fetchUsersRequest())
    // then create axios api request & dispatch the result
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        // response.data is the result
        const users = response.data.map(user => user.username)
        dispatch(fetchUsersSuccess(users))
      })
      .catch(error => {
        // error.message is the error description
        dispatch(fetchUsersFailure(error.message))
      })
  }
}

// STORE
const store = createStore(reducer, applyMiddleware(thunkMiddleware))

store.subscribe(() => console.log(store.getState()))

store.dispatch(fetchUsers())
