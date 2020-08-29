import { AppActions } from '../types/actions'
import * as actions from '../types/actionStrings'

const helloWorldReducer = (state = "Hello World", action: AppActions): string => {
    switch (action.type) {
        case actions.addToHelloWorld:
            return action.newString
        
        default:
            return state
    }
}

export default helloWorldReducer