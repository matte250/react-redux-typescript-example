import { Reducer } from 'redux'
import { HeroesState, HeroesActionTypes } from './types'

// Type-safe initialState!
const initialState: HeroesState = {
  data: [],
  errors: undefined,
  loading: false,
  monkey: {
    name: 'John',
    happy: true,
    banana: {
      isRotten: false,
    }
  },
}

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const reducer: Reducer<HeroesState> = (state = initialState, action) => {
  switch (action.type) {
    case HeroesActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true }
    }
    case HeroesActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload }
    }
    case HeroesActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
    case HeroesActionTypes.CHANGE_BANANA: {
      return {
        ...state, monkey: {
          ...state.monkey,
          banana: { isRotten: !state.monkey.banana.isRotten }
        }
      }
    }
    case HeroesActionTypes.CHANGE_MOOD: {
      return {
        ...state, monkey: { ...state.monkey, happy: !state.monkey.happy }
      }
    }
    default: {
      return state
    }
  }
}

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as heroesReducer }
