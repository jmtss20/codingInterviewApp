import * as actions from '../types/actionTypeStrings'
import { AppActions } from '../types/actions'

const helloWorldReducer = (state = '', action: AppActions): string => {
    switch (action.type) {
        case actions.updateHelloWorld:
            return action.newHelloWorld
        
        default:
            return state
    }
}

export default helloWorldReducer