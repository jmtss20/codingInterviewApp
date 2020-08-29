import React, { FunctionComponent } from 'react'
import { Resident } from '../types/index'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../store/store'
import * as actions from '../actions/index'

const DisplayResidents: FunctionComponent = () => {
    const dispatch = useDispatch()
    const residents: Resident[] = useSelector((state: AppState) => state.residents)

    return (
        <>
            {residents.map(resident => {
                return (
                    <div key={resident.key}>
                        <p>{resident.name} &nbsp;&nbsp;&nbsp; Phase: {resident.phase}</p>
                        {resident.phase === 'senior' ?
                        <button onClick={() => {dispatch(actions.deleteResident(resident.key))}}>Delete Resident</button>  
                        : null
                        }
                        {resident.phase === 'junior' ? 
                        <button onClick={() => {dispatch(actions.updateResidentPhase(resident.key))}}>Update Phase</button>
                        : null
                        }
                    </div>
                )
            })}
        </>
    )
}

export default DisplayResidents