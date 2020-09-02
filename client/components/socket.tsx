import React, { FunctionComponent, useState, useEffect, ChangeEvent, FormEvent } from 'react'
import socketIOClient from "socket.io-client"

const ENDPOINT = "http://127.0.0.1:3005";
const socket : SocketIOClient.Socket = socketIOClient(ENDPOINT);

const Socket:FunctionComponent = () => {
    const [response, setResponse] = useState('')
    const [roomNumber, setRoomNumber] = useState('')
    const [randomNum, setRandomNum] = useState('')

    useEffect(() => { 
        socket.on("FromAPI", (data: string) => {
            setResponse(data);
        });

        socket.on('clear-reset-timer', () => {
            setResponse('')
        })

        socket.on('host-disconnected', () => {
            setResponse('Host Disconnected!')
        })

        return () => { 
            socket.disconnect()
        }
      }, []);

    const startTimer = () => randomNum ? socket.emit('start-Timer', randomNum) : null

    const generateRoom = () => {
        let randomNumber = Math.floor(Math.random() * 100000).toString()
        setRandomNum(randomNumber)
        socket.emit('enter-Room', randomNumber)
        setResponse('')
    }
    
    const handleEnterRoomChange = (e: ChangeEvent<HTMLInputElement>) => setRoomNumber((e.target.value))
    
    const enterRoomNumberToJoin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        socket.emit('enter-Room', roomNumber)
        setResponse('')
        setRoomNumber('')
    }

    const reset = (roomId: string) => socket.emit('kill-room', roomId)

    return (
        <>
            <p>
                Time Left: {response}
            </p>
            <button onClick={() => {startTimer()}}>Start Timer</button>
            <button onClick={generateRoom}>Generate Room</button>
            <form onSubmit={enterRoomNumberToJoin}>
                <label>
                    Enter Room #
                    <input type="text" value={roomNumber} onChange={(e: ChangeEvent<HTMLInputElement>): void => handleEnterRoomChange(e)}/>
                </label>
            <input type="submit" value="Submit" />
            </form>
            {randomNum ? <p>Your Room Number is {randomNum}</p>: null}
            <button onClick={() => reset(randomNum)}>Reset</button>
        </>
    )
}

export default Socket