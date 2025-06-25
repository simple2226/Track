import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export default function Sample() {
    const [arr, setArr] = useState([])
    const [inp, setInp] = useState('')
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        const socketInstance = io('https://track-app.up.railway.app', {
            transports: ['websocket'],
            withCredentials: true
        })
        setSocket(socketInstance)
        return () => {
            socketInstance.disconnect()
        }
    }, [])
    
    socket?.on('chat message', (msg) => {
        setArr([...arr, msg])
    })

    return (
        <div className='flex h-[100vh] w-[100vw]'>
            <div className='flex gap-2 items-center justify-center border-r border-black h-full w-1/2'>
                <input value={inp} onChange={e => setInp(e.target.value)} type="text" className='border-[2px] border-black'/>
                <button
                    onClick={() => {
                        if(inp) {
                            socket.emit('chat message', inp)
                            setInp('')
                        }
                    }}
                >Send</button>
            </div>
            <div className='flex flex-col border-black h-full w-1/2'>
                <ul>
                    {arr.map((item, index) => <li key={index} className='w-full p-2 border-y border-t-0 border-black'>{item}</li>)}
                </ul>
            </div>
        </div>
    )
}