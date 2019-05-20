import configReducer from './configReducer'
import videoReducer from './videoReducer'
import usersReducer from './usersReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  config: configReducer,
  video: videoReducer,
  users: usersReducer
});

export default rootReducer