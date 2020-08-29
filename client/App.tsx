
import * as React from 'react'
import HelloWorld from './components/HelloWorld'
import AddResident from './components/AddResident'
import DisplayResidents from './components/DisplayResidents'




const App = () => {

    return (
      <div>
        <HelloWorld />
        <DisplayResidents />
        <AddResident />
      </div>
    )
}

export default App
