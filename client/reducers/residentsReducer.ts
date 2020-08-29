import * as actions from '../types/actionTypeStrings'
import { AppActions } from '../types/actions'
import { Resident } from '../types/index'

const deleteResidentDefaultState: Resident[] = []

const residentsReducer = (state = deleteResidentDefaultState, action: AppActions): Resident[] => {
    switch (action.type) {
        case actions.deleteResident:
            return state.filter(resident => action.key !== resident.key)
        
        case actions.addResident:
            return [...state, action.newResident]

        case actions.updateResident:
            return state.map(resident => {
                if (resident.key === action.key) {
                    let updatedResident = {...resident}
                    updatedResident.phase = 'senior'
                    return updatedResident
                } else return resident
            })
        
        default:
            return state
    }
}

export default residentsReducer