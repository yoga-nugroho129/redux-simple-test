const redux = require('redux')
const createStore = redux.createStore
const combineReducers = redux.combineReducers

// example of middleware using redux-logger
const applyMiddleware = redux.applyMiddleware
const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()

const BUY_CAKE = ' BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'

// Action Creator
const buyCake = () => {
  return {
    type: BUY_CAKE
  }
}
const buyIcecream = () => {
  return {
    type: BUY_ICECREAM
  }
}

// Reducer
const initialCakeState = {
  numberOfCake: 10
}
const initialIcecreamState = {
  numberOfIcecream: 20
}

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE: return {
      ...state,
      numberOfCake: state.numberOfCake -1
    }

    default: return state
  }
}
const iceCreamReducer = (state = initialIcecreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM: return {
      ...state,
      numberOfIcecream: state.numberOfIcecream -1
    }

    default: return state
  }
}

// 10. Combine REDUCERS
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer
})

// Create STORE
// 12. in the store, pass applyMiddleware as second parameter
const store = createStore(rootReducer, applyMiddleware(logger))

// Using subscribe method that accept a function parameter to get the updated state
// const result = store.subscribe(() => console.log('Updated State ==>', store.getState())) // BEFORE apllyMiddleware of logger
const result = store.subscribe(() => {}) // AFTER apllyMiddleware of logger

// Testing Initial State
console.log('Initial State ==>', store.getState())

// Discpatch Action
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
console.log('----------------------')
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())

result()

// 11. Using Middleware inside redux