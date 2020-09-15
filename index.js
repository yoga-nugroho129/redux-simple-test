const redux = require('redux')
const createStore = redux.createStore

  // 1. Create ACTION => object that contain type property
const BUY_CAKE = 'BUY_CAKE'
/* Original Action = { type: BUY_CAKE } */
const BUY_ICECREAM = 'BUY_ICECREAM'

  // 2. Create an ACTION CREATOR =>  a function that return an Action
function buyCake() {
  return {
    type: BUY_CAKE,
    info: 'First Redux Action' // this 'info' is optional
  }
}
function buyIceCream() {
  return {
    type: BUY_ICECREAM
  }
}

  // 3. Create REDUCER => a function with STATE & ACTION as params & return updated STATE --> (prevState, action) => newState
const initialState = {
  numberOfCake: 10,
  numberOfIcecream: 20
}

const reducer = (state = initialState, action) => {
  // using switch to check the ACTION type
  switch (action.type) {
    case BUY_CAKE: return {
      // copy for duplicate the state using spread (...)
      ...state,
      numberOfCake: state.numberOfCake - 1
    }
    case BUY_ICECREAM: return {
      ...state,
      numberOfIcecream: state.numberOfIcecream - 1
    }
  
    default: return state
  }
}

  // 4. Create STORE for holding the application STATE as GLOBAL state
const store = createStore(reducer)

  // 5. Testing for implementation of getState() for getting the GLOBAL STATE
console.log('Initial State ==>', store.getState()) // should show the Initial Global State

  // 6. Using subscribe method that accept a function parameter to get the updated state
const result = store.subscribe(() => console.log('Updated State ==>', store.getState()))

  // 7. DISPATCH an action that accept ACTION CREATOR
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())

  // 8. See the result from the subscribe method
result()

  // 9. Testing with multiple reducer for BUY_ICECREAM

  // 10. Create separation for each STATE, ACTION, & REDUCER on index2.js
  // (initialCakeState, initialIcecreamState, cakeReducer, IcecreamReducer)