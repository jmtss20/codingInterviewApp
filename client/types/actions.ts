import * as actions from './actionStrings'
import { Person } from './index'

interface HelloWorldAction {
    type: typeof actions.addToHelloWorld
    newString: string
}

interface AddPersonAction {
    type: typeof actions.addPerson
    name: Person
}

export type AppActions = HelloWorldAction | AddPersonAction