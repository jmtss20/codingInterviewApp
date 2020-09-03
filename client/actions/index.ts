import { AppActions } from '../types/actions'

export const addToHelloWorld = (newString: string): AppActions => ({
    type: "ADD_TO_HELLO_WORLD",
    payload: newString
})