import React, { FunctionComponent, useCallback } from 'react'
import { Resident } from '../types/index'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../store/store'
import * as actions from '../actions/index'
import DisplayResident from './DisplayResident'

const DisplayResidents: FunctionComponent = () => {
    const dispatch = useDispatch()
    const dispatchDeleteToStore = useCallback(payload => dispatch(actions.deleteResident(payload)), [dispatch])
    const dispatchUpdateToStore = useCallback(payload => dispatch(actions.updateResidentPhase(payload)), [dispatch])
    const residents: Resident[] = useSelector((state: AppState) => state.residents)

    return (
        <>
            {residents.map(resident =>  
                <DisplayResident 
                key={resident.key}
                resident={resident}
                dispatchDeleteToStore={dispatchDeleteToStore}
                dispatchUpdateToStore={dispatchUpdateToStore}/>
            )}
        </>
    )
}

export default DisplayResidents