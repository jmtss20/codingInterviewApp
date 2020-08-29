import React, { FunctionComponent, useState, ChangeEvent, FormEvent } from 'react'
import { useDispatch } from 'react-redux'
import * as actions from '../actions/index'

let key = 6

const AddResident:FunctionComponent = () => {
    const [newResidentName, setNewResidentName] = useState('')
    const dispatch = useDispatch()

    const handleNewResidentSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        newResidentName.length > 0 ?
        dispatch(actions.addResident({
            name: newResidentName,
            phase: 'junior',
            key: key++
        }))
        : null
        setNewResidentName('')
    }

    return (
        <div className='addResident'>
            <form onSubmit={handleNewResidentSubmit}>
                <label>Add a Resident</label>&nbsp;
                <input type='text'
                    placeholder='enter resident name'
                    value={newResidentName}
                    onChange={(e: ChangeEvent<HTMLInputElement>): void => setNewResidentName(e.target.value)}>
                </input>
                <input type='submit' />
            </form>
        </div>
    )
}

export default AddResident