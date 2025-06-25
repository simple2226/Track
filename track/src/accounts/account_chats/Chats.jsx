import React, { useEffect, useRef, useState } from 'react'
import NoProfile from '../../assets/NoProfile'
import { io } from 'socket.io-client'
import { useSelector } from 'react-redux'

export default function Chats() {
    const account = useSelector(state => state.account.data)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [openedChat, setOpenedChat] = useState(false)

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => {window.removeEventListener('resize', handleResize)}
    }, [])
    useEffect(() => {
        document.getElementById('option').textContent = 'chats'
    }, [])

    const [arr, setArr] = useState([])
    const [chat, setChat] = useState(null)
    const [inp, setInp] = useState('')
    const [socket, setSocket] = useState(null)
    const [chatList, setChatList] = useState([])

    const chatInfoRef = useRef(chat);
    const openedChatRef = useRef(openedChat);
    const socketRef = useRef(socket)

    useEffect(() => {
        chatInfoRef.current = chat
        openedChatRef.current = openedChat
        socketRef.current = socket
    }, [chat, openedChat, socket])

    const chatListInit = (list) => {
        setChatList(list.sort((a, b) => Date.parse(b.lastUpdated) - Date.parse(a.lastUpdated)))
    }
    const chatInit = (chat) => {
        setArr(chat.messages)
        setChat(chat)
    }
    const receiveMessage = ({message, chatList}) => {
        setArr(prevArr => [...prevArr, message])
        let temp = [...chatList].sort((a, b) => Date.parse(b.lastUpdated) - Date.parse(a.lastUpdated))
        if(chatInfoRef.current && chatInfoRef.current._id === temp[0]._id) {
            socketRef.current.emit('message checked', {chat_id: chatInfoRef.current._id, receiver_id: account._id})
            if(temp[0].userA._id === account._id) {
                temp[0].userA.checked = true
            } else {
                temp[0].userB.checked = true
            }
        }
        setChatList(temp)
    }

    useEffect(() => {
        // https://track-app.up.railway.app
        const socketInstance = io('https://track-app.up.railway.app', {
            transports: ['websocket'],
            withCredentials: true
        })
        socketInstance.emit('register', account?._id)

        socketInstance.on('receive chatlist', chatListInit)
        socketInstance.on('get messages', chatInit)
        socketInstance.on('receive message', receiveMessage)

        setSocket(socketInstance)

        return () => {
            socketInstance.off('receive chatlist', chatListInit)
            socketInstance.off('get messages', chatInit)
            socketInstance.off('receive message', receiveMessage)
            socketInstance.disconnect()
        }
    }, [])

    const chatRef = useRef(null);
    const inpRef = useRef(null)

    useEffect(() => {
        if(chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight
    }, [openedChat, arr])

    const isAtBottom = () => {
        if (!chatRef.current) return false;
        const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
        return scrollHeight - scrollTop <= clientHeight + 20 + 65
    }

    useEffect(() => {
        if (isAtBottom()) {
            setTimeout(() => {
                if (chatRef.current) {
                    chatRef.current.scrollTop = chatRef.current.scrollHeight
                }
            }, 0)
        }
    }, [arr])

    useEffect(() => {
        const handleKeydown = async (event) => {
            if(event.key === 'Enter') {
                socket.emit('send message', {sender_id: account._id, receiver_id: chat.userA._id === account._id ? chat.userB._id : chat.userA._id, chat_id: chat._id, message: inp})
                setInp('')
            }
        }
        document.addEventListener('keydown', handleKeydown)
        return () => {
            document.removeEventListener('keydown', handleKeydown)
        }
    })

    return (
        <div className={`mt-[70px] 700:mt-[80px] flex flex-col overflow-x-hidden overflow-y-auto min-h-[calc(100vh-70px)] 700:min-h-[calc(100vh-80px)] min-w-[360px] w-full overlap-scr`}>
            <ul>
            {chatList.map((chat, index) =>
                <li
                    className={`flex items-center p-3 gap-3 text-[.8rem] 700:text-[1rem] w-full hover:bg-gray-100 cursor-pointer`} key={index}
                    onClick={() => {
                        setOpenedChat(true)
                        socket.emit('request messages', {chat_id: chat._id, my_id: account._id})
                    }}><NoProfile size={windowWidth > 700 ? 40 : 35}/>
                <div className={`${!chat[chat?.userA._id === account._id ? 'userA' : 'userB']?.checked ? 'font-[700]' : 'font-[400]'} *:font-robotoSans flex flex-col`}>
                    <h1>{chat[chat?.userA._id === account._id ? 'userB' : 'userA']?.name}</h1>
                    <h1 className='text-gray-500'>{chat.message ? chat.message.text : 'Start a new conversation'}</h1>
                </div>
                </li>
            )}
            </ul>
            {openedChat ?
                <div className={`z-[10000] *:font-robotoSans flex flex-col animate-showUpFast absolute top-0 right-0 h-[100vh] w-full bg-white`}>
                    <div className={`bg-white fixed top-0 left-0 flex items-center p-2 gap-3 shadow-md text-[.8rem] w-full border-b`}>
                        <div className='cursor-pointer' onClick={() => {
                            setOpenedChat(false)
                            setArr([])
                            setChat(null)
                        }}><NoProfile size={35}/></div>
                        <div className={`font-[400] *:font-robotoSans flex flex-col`}>
                            <h1>User</h1>
                            <h1 className='text-gray-500'>online</h1>
                        </div>
                    </div>
                    <div ref={chatRef} className='px-3 mt-[65px] flex flex-col gap-3 flex-grow overflow-y-auto overlap-scr'>
                        {arr.map((i, index) => {
                            return (
                                <h1 className={`font-robotoSans text-white bg-blue-600 w-fit font-[400] px-3 p-2 rounded-2xl ${!(i.sender === account._id) ? 'rounded-bl-none' : 'rounded-br-none self-end'}`} key={index}>{i.text}</h1>
                            )
                        })}
                    </div>
                    <div className='p-2 relative'>
                        <input
                            ref={inpRef}
                            className='p-2 w-full border border-gray-400 placeholder:text-gray-600 rounded-md'
                            type="text"
                            value={inp}
                            onChange={(e) => setInp(e.target.value)}
                            placeholder='type here...'
                        />
                        <button
                        className='px-2 absolute top-4 right-5'
                        onClick={() => {
                            if(inp) {
                                socket.emit('send message', {sender_id: account._id, receiver_id: chat.userA._id === account._id ? chat.userB._id : chat.userA._id, chat_id: chat._id, message: inp})
                                setInp('')
                                inpRef.current.focus()
                            }
                        }}>Send</button>
                    </div>
                </div>
                :
                <></>
            }
        </div>
    )
}