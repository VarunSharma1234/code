import { useState, useEffect } from 'react'
import './App.css'
import { io } from 'socket.io-client';

function App() {
  const URL = process.env.NODE_ENV === 'production' ? undefined : 'https://6000-varunsharma1234-code-64utufiycp5.ws-us110.gitpod.io/';
  const socket = io(URL);
  const [count, setCount] = useState(0)
  useEffect(() => {
    function onConnect() {
      console.log("On Connected")
      socket.emit("message","SIrJi result")
    }

    function onDisconnect() {
      console.log("On Disconnected")
    }

    function offConnect() {
      console.log("Off Connected")
    }

    function offDisconnect() {
      console.log("Off Disconnected")
    }
    socket.on("messageji:",(mess)=>{console.log(mess)})
    socket.on('connection', onConnect);
    socket.on('disconnecttion', onDisconnect);
    socket.off('connect', offConnect);
    socket.off('disconnect', offDisconnect);
  },[count])

  return (
    <>
      <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
    </>
  )
}

export default App