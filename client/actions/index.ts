import * as actions from '../types/actionStrings'
import { AppActions } from '../types/actions'

export const addToHelloWorld = (newString: string): AppActions => ({
    type: actions.addToHelloWorld,
    newString
})