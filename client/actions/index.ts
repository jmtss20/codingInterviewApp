import { AppActions } from '../types/actions'
import { Resident } from '../types/index'
import * as actions from '../types/actionTypeStrings'

export const addResident = (newResident: Resident): AppActions => ({
    type: actions.addResident,
    newResident
})

export const updateHelloWorld = (newHelloWorld: string): AppActions => ({
    type: actions.updateHelloWorld,
    newHelloWorld
})

export const deleteResident = (key: number): AppActions => ({
    type: actions.deleteResident,
    key
})

export const updateResidentPhase = (key: number): AppActions => ({
    type: actions.updateResident,
    key
})