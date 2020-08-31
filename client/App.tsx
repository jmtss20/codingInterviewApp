
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from './index'
import { addToHelloWorld } from './actions/index'
import Socket from './components/socket'

const App = () => {
  const helloWorld: string = useSelector((state: AppState) => state.helloWorld)
  const dispatch = useDispatch()
    
    return (
      <>
        <h1>
          {helloWorld}
        </h1>
        <button onClick={() => {dispatch(addToHelloWorld(`${helloWorld}!`))}}>Add "!"</button>
        <Socket />
      </>
    );
}

export default App;
