import * as actions from './actionTypeStrings' 
import { Resident } from './index'

interface SetNewResident {
    type: typeof actions.addResident
    newResident: Resident
}

interface SetUpdateResident {
    type: typeof actions.updateResident
    key: number
}

interface SetUpdateHelloWorld {
    type: typeof actions.updateHelloWorld
    newHelloWorld: string
}

interface SetDeleteResident {
    type: typeof actions.deleteResident
    key: number
}


export type AppActions = SetNewResident | SetUpdateResident | SetUpdateHelloWorld | SetDeleteResident