import React, { FunctionComponent, useState, useEffect } from 'react'
import socketIOClient from "socket.io-client"

const ENDPOINT = "http://127.0.0.1:4001";
let socket: SocketIOClient.Socket

const Socket:FunctionComponent = () => {
    const [response, setResponse] = useState('')

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

    return (
        <>
        <p>
            Time Left {response}
        </p>
        <button onClick={() => {startTimer()}}>Start Timer</button>
        </>
    )
}

export default Socket