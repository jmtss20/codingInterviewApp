import React, { FunctionComponent, useCallback } from 'react'
import { Resident } from '../types/index'

interface Props {
    resident: Resident,
    dispatchDeleteToStore: (payload: number) => void,
    dispatchUpdateToStore: (payload: number) => void
  }

const DisplayResident: FunctionComponent<Props> = (props) => {
    const { dispatchDeleteToStore, resident, dispatchUpdateToStore } = props
    return (
        <>
            <div key={resident.key}>
                <p>{resident.name} &nbsp;&nbsp;&nbsp; Phase: {resident.phase}</p>
                {resident.phase === 'senior' ?
                <button onClick={() => {dispatchDeleteToStore(resident.key)}}>Delete Resident</button>  
                : null
                }
                {resident.phase === 'junior' ? 
                <button onClick={() => {dispatchUpdateToStore(resident.key)}}>Update Phase</button>
                : null
                }
            </div>
        </>
    )
}

export default DisplayResident