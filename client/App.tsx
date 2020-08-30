
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from './index'
import { addToHelloWorld } from './actions/index'

const App = () => {
  const helloWorld: string = useSelector((state: AppState) => state.helloWorld)
  const dispatch = useDispatch()
    
    return (
      <>
        <h1>
          {helloWorld}
        </h1>
        <button onClick={() => {dispatch(addToHelloWorld(`${helloWorld}!`))}}>Add "!"</button>
      </>
    );
}

export default App;
