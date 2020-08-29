import React, { FunctionComponent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../store/store'
import * as actions from '../actions/index'


const HelloWorld: FunctionComponent = () => {
    const helloWorld: string = useSelector((state: AppState) => state.helloWorld)
    const dispatch = useDispatch()

    return (
        <>
        <h1>
            {helloWorld}
        </h1>
        <button onClick={() => {dispatch(actions.updateHelloWorld(`${helloWorld} Hello World`))}}>Add Hello World</button>
        </>
    )
}

export default HelloWorld