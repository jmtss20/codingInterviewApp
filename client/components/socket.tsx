import React, { FunctionComponent, useState, useEffect, ChangeEvent, FormEvent } from 'react'
import socketIOClient from "socket.io-client"


const ENDPOINT = "http://127.0.0.1:4001";
let socket: SocketIOClient.Socket

const Socket:FunctionComponent = () => {
    const [response, setResponse] = useState('')
    const [roomNumber, setRoomNumber] = useState('')
    const [generatedRoomNumber, setGeneratedRoomNumber] = useState('')

    useEffect(() => {
         socket = socketIOClient(ENDPOINT);
            socket.on("FromAPI", (data: string) => {
                setResponse(data);
            });

        return () => {socket.disconnect()}
      }, []);

       const startTimer = () => {
           console.log('this is socket', socket)
        socket.emit('start-Timer')
      }

    const generateRoom = () => {
        let randomRoomNumber = Math.floor(Math.random() * 100000)
        setGeneratedRoomNumber(randomRoomNumber.toString())
        socket.emit('enter-Room', randomRoomNumber)
    }

    const handleEnterRoomChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRoomNumber((e.target.value))
    }
    
    const enterRoomNumberToJoin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        socket.emit('enter-Room', roomNumber)
        setRoomNumber('')
    }

    return (
        <>
        <p>
            Time Left {response}
        </p>
        <button onClick={() => {startTimer()}}>Start Timer</button>
        <button onClick={generateRoom}>Generate Room</button>
        <form onSubmit={enterRoomNumberToJoin}>
            <label>
                Enter Room #
                <input type="text" name="name" value={roomNumber} onChange={(e: ChangeEvent<HTMLInputElement>):void => handleEnterRoomChange(e)}/>
            </label>
        <input type="submit" value="Submit" />
        </form>
        {generatedRoomNumber ? <p>Your Room Number is {generatedRoomNumber}</p>
        : null
        }
        
        </>
    )
}

export default Socket