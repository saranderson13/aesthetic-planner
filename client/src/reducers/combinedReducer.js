import { combineReducers } from 'redux'

import userReducer from './userReducer'
import dayPlannerReducer from './dayPlannerReducer'
import trackersReducer from './trackersReducer'
import listsReducer from './listsReducer'
import journalReducer from './journalReducer'
import controlsReducer from './controlsReducer'

const rootReducer = combineReducers({
    dayPlanner: dayPlannerReducer,
    user: userReducer, 
    trackers: trackersReducer,
    lists: listsReducer,
    journals: journalReducer,
    controls: controlsReducer
})

export default rootReducer;
