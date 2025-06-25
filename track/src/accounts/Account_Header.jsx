import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

export default function Account_Header() {
    const domain = useSelector(state => state.globals.domain)
    const [menu, setMenu] = useState(false)
    const menuRef = useRef(null)
    useEffect(() => {
        const handleMenuClick = (event) => {
            if(!menuRef.current.contains(event.target)) setMenu(false)
        }
        document.addEventListener('mousedown', handleMenuClick)
        return () => {
            document.removeEventListener('mousedown', handleMenuClick)
        }
    }, [])

    const logout = async () => {
        try {
            await axios.post(`${domain}/auth/logout`, {}, {
                withCredentials: true
            })
            setTimeout(() => {location.reload()}, 200)
        } catch (error) {}
    }

    return (
        <>
            <div className={`transition duration-[.2s] ease-in-out flex items-center fixed top-0 left-0 min-h-[70px] 850:min-h-[80px] w-full min-w-[360px] z-50 bg-white border-b border-b-[#CCCCCC]`}>
                <div className={`cursor-pointer px-3 850:px-4 scale-[.9] 850:scale-[1]`} onClick={() => {setMenu(true)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 0 24 24" width="30" focusable="false" aria-hidden="true"><path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"></path></svg>
                </div>
                <div className={`px-1 850:px-3 py-0 flex gap-x-2 850:gap-x-3`}>
                    <h1 className={`text-[1.9rem] 850:text-[2.5rem] leading-none font-[600]`}>Account</h1>
                    <h1 className={`self-end text-[1.1rem] 850:text-[1.5rem] text-[#929292] leading-[1.4rem] 850:leading-[1.7rem]`}>/</h1>
                    <h1 id='option' className={`self-end text-[1.1rem] 850:text-[1.5rem] text-[#929292] leading-[1.27rem] 850:leading-[1.6rem]`}></h1>
                </div>
            </div>
            <div ref={menuRef} className={`transition overflow-auto overlap-scr duration-[.2s] ease-in-out fixed top-0 left-0 flex flex-col z-50 h-[100vh] w-[250px] bg-[#1e2628] ${menu ? '' : 'translate-x-[-250px]'}`}>
                <div className='flex items-center min-h-[70px] 850:min-h-[80px]'>
                    <div className={`cursor-pointer px-3 850:px-4 scale-[.9] 850:scale-[1]`} onClick={() => setMenu(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 0 24 24" width="30" focusable="false" aria-hidden="true" fill='white'><path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"></path></svg>
                    </div>
                    <div>
                        <h1 className={`px-1 text-[1.3rem] text-white font-[600]`}>Menu Options</h1>
                    </div>
                </div>
                <NavLink
                    to='me'
                    className='border-t border-t-[#ffffff48] cursor-pointer hover:bg-[#384447] flex items-center min-h-[50px]'
                    onClick={() => setMenu(false)}
                >
                    <div className={`cursor-pointer px-[18px] scale-[.9] 850:scale-[1]`} onClick={() => setMenu(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="24" height="24" id="me" fill='white'>
                            <path d="M19.7.5H4.3C2.2.5.5 2.2.5 4.3v15.4c0 2.1 1.7 3.8 3.8 3.8h15.4c2.1 0 3.8-1.7 3.8-3.8V4.3c0-2.1-1.7-3.8-3.8-3.8zm-7.2 14.9c0 .3-.2.5-.5.5s-.5-.2-.5-.5v-4.8c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5v4.8c0 .3-.2.5-.5.5s-.5-.2-.5-.5v-4.8c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5v4.8c0 .3-.2.5-.5.5s-.5-.2-.5-.5V8.6c0-.3.2-.5.5-.5s.5.2.5.5v.1c.4-.3.9-.5 1.5-.5.8 0 1.5.4 2 1 .4-.6 1.2-1 2-1 1.3 0 2.4 1.1 2.4 2.4v4.8zm7.6-3.4c-.1.1-.2.2-.4.2h-3.9c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h3.3c-.1-.4-.4-.8-.7-1.1-1.1-1.1-2.9-1.1-4 0s-1.1 2.9 0 4 2.9 1.1 4 0c.2-.2.3-.4.5-.6.1-.2.4-.3.7-.2.2.1.3.4.2.7-.2.4-.4.6-.6.9-.7.7-1.7 1.1-2.7 1.1s-1.9-.4-2.7-1.1c-1.5-1.5-1.5-3.9 0-5.3 1.5-1.5 3.9-1.5 5.3 0 .6.6 1 1.3 1.1 2.2.1 0 0 .1-.1.2z"/>
                        </svg>
                    </div>
                    <div>
                        <h1 className={`text-[.9rem] text-white font-[100] font-robotoSans`}>My Account</h1>
                    </div>
                </NavLink>
                <NavLink
                    to='chats'
                    className='border-t border-t-[#ffffff48] cursor-pointer hover:bg-[#384447] flex items-center min-h-[50px]'
                    onClick={() => setMenu(false)}
                >
                    <div className={`cursor-pointer px-[18px] scale-[.9] 850:scale-[1]`} onClick={() => setMenu(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="24" height="24" id="me" fill='white'>
                            <path d="M19.7.5H4.3C2.2.5.5 2.2.5 4.3v15.4c0 2.1 1.7 3.8 3.8 3.8h15.4c2.1 0 3.8-1.7 3.8-3.8V4.3c0-2.1-1.7-3.8-3.8-3.8zm-7.2 14.9c0 .3-.2.5-.5.5s-.5-.2-.5-.5v-4.8c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5v4.8c0 .3-.2.5-.5.5s-.5-.2-.5-.5v-4.8c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5v4.8c0 .3-.2.5-.5.5s-.5-.2-.5-.5V8.6c0-.3.2-.5.5-.5s.5.2.5.5v.1c.4-.3.9-.5 1.5-.5.8 0 1.5.4 2 1 .4-.6 1.2-1 2-1 1.3 0 2.4 1.1 2.4 2.4v4.8zm7.6-3.4c-.1.1-.2.2-.4.2h-3.9c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h3.3c-.1-.4-.4-.8-.7-1.1-1.1-1.1-2.9-1.1-4 0s-1.1 2.9 0 4 2.9 1.1 4 0c.2-.2.3-.4.5-.6.1-.2.4-.3.7-.2.2.1.3.4.2.7-.2.4-.4.6-.6.9-.7.7-1.7 1.1-2.7 1.1s-1.9-.4-2.7-1.1c-1.5-1.5-1.5-3.9 0-5.3 1.5-1.5 3.9-1.5 5.3 0 .6.6 1 1.3 1.1 2.2.1 0 0 .1-.1.2z"/>
                        </svg>
                    </div>
                    <div>
                        <h1 className={`text-[.9rem] text-white font-[100] font-robotoSans`}>My Chats</h1>
                    </div>
                </NavLink>
                <NavLink
                    to='followers'
                    className='border-t border-t-[#ffffff48] cursor-pointer hover:bg-[#384447] flex items-center min-h-[50px]'
                    onClick={() => setMenu(false)}
                >
                    <div className={`cursor-pointer px-5 scale-[.9] 850:scale-[1]`} onClick={() => setMenu(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="white" version="1.1" id="Capa_1" width="20px" height="20px" viewBox="0 0 575.616 575.616" xmlSpace="preserve">
                            <g>
                                <g>
                                    <path d="M429.248,141.439C429.248,63.33,365.985,0,287.808,0c-78.109,0-141.439,63.33-141.439,141.439    c0,78.11,63.33,141.439,141.439,141.439C365.988,282.878,429.248,219.549,429.248,141.439z M181.727,144.499    c0,0-4.079-40.12,24.82-70.72c20.34,20.389,81.261,70.72,187.342,70.72c0,58.498-47.586,106.081-106.081,106.081    S181.727,202.994,181.727,144.499z"/>
                                    <path d="M45.049,391.68v62.559v80.919c0,22.365,18.136,40.459,40.459,40.459h404.6c22.365,0,40.459-18.097,40.459-40.459v-80.919    V391.68c0-44.688-36.193-80.919-80.919-80.919H377.91c-5.07,0-11.46,3.422-14.271,7.639l-70.735,99.982    c-2.812,4.22-7.372,4.22-10.184,0l-70.738-99.986c-2.812-4.22-9.202-7.638-14.272-7.638h-71.742    C81.319,310.758,45.049,346.991,45.049,391.68z"/>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div>
                        <h1 className={`text-[.9rem] text-white font-[100] font-robotoSans`}>Followers</h1>
                    </div>
                </NavLink>
                <NavLink
                    to='following'
                    className='border-t border-t-[#ffffff48] cursor-pointer hover:bg-[#384447] flex items-center min-h-[50px]'
                    onClick={() => setMenu(false)}
                >
                    <div className={`cursor-pointer px-5 scale-[.9] 850:scale-[1]`} onClick={() => setMenu(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="white" version="1.1" id="Capa_1" width="20px" height="20px" viewBox="0 0 575.616 575.616" xmlSpace="preserve">
                            <g>
                                <g>
                                    <path d="M429.248,141.439C429.248,63.33,365.985,0,287.808,0c-78.109,0-141.439,63.33-141.439,141.439    c0,78.11,63.33,141.439,141.439,141.439C365.988,282.878,429.248,219.549,429.248,141.439z M181.727,144.499    c0,0-4.079-40.12,24.82-70.72c20.34,20.389,81.261,70.72,187.342,70.72c0,58.498-47.586,106.081-106.081,106.081    S181.727,202.994,181.727,144.499z"/>
                                    <path d="M45.049,391.68v62.559v80.919c0,22.365,18.136,40.459,40.459,40.459h404.6c22.365,0,40.459-18.097,40.459-40.459v-80.919    V391.68c0-44.688-36.193-80.919-80.919-80.919H377.91c-5.07,0-11.46,3.422-14.271,7.639l-70.735,99.982    c-2.812,4.22-7.372,4.22-10.184,0l-70.738-99.986c-2.812-4.22-9.202-7.638-14.272-7.638h-71.742    C81.319,310.758,45.049,346.991,45.049,391.68z"/>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div>
                        <h1 className={`text-[.9rem] text-white font-[100] font-robotoSans`}>Following</h1>
                    </div>
                </NavLink>
                <NavLink
                    to='matches-played'
                    className='border-t border-t-[#ffffff48] cursor-pointer hover:bg-[#384447] flex items-center min-h-[50px]'
                    onClick={() => setMenu(false)}
                >
                    <div className={`cursor-pointer px-5 scale-[.9] 850:scale-[1]`} onClick={() => setMenu(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="white" height="20px" width="20px" version="1.1" id="Capa_1" viewBox="0 0 219.15 219.15" xmlSpace="preserve">
                            <g>
                                <path d="M109.575,0C49.156,0,0.001,49.155,0.001,109.574c0,60.42,49.154,109.576,109.573,109.576   c60.42,0,109.574-49.156,109.574-109.576C219.149,49.155,169.995,0,109.575,0z M109.575,204.15   c-52.148,0-94.573-42.427-94.573-94.576C15.001,57.426,57.427,15,109.575,15c52.148,0,94.574,42.426,94.574,94.574   C204.149,161.724,161.723,204.15,109.575,204.15z"/>
                                <path d="M166.112,108.111h-52.051V51.249c0-4.142-3.357-7.5-7.5-7.5c-4.142,0-7.5,3.358-7.5,7.5v64.362c0,4.142,3.358,7.5,7.5,7.5   h59.551c4.143,0,7.5-3.358,7.5-7.5C173.612,111.469,170.254,108.111,166.112,108.111z"/>
                            </g>
                        </svg>
                    </div>
                    <div>
                        <h1 className={`text-[.9rem] text-white font-[100] font-robotoSans`}>Matches Played</h1>
                    </div>
                </NavLink>
                <NavLink
                    to='settings'
                    className='border-t border-t-[#ffffff48] cursor-pointer hover:bg-[#384447] flex items-center min-h-[50px]'
                    onClick={() => setMenu(false)}
                >
                    <div className={`cursor-pointer px-5 scale-[.9] 850:scale-[1]`} onClick={() => setMenu(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="white" height="20px" width="20px" version="1.1" id="Capa_1" viewBox="0 0 54 54" xmlSpace="preserve">
                            <g>
                                <path d="M51.22,21h-5.052c-0.812,0-1.481-0.447-1.792-1.197s-0.153-1.54,0.42-2.114l3.572-3.571   c0.525-0.525,0.814-1.224,0.814-1.966c0-0.743-0.289-1.441-0.814-1.967l-4.553-4.553c-1.05-1.05-2.881-1.052-3.933,0l-3.571,3.571   c-0.574,0.573-1.366,0.733-2.114,0.421C33.447,9.313,33,8.644,33,7.832V2.78C33,1.247,31.753,0,30.22,0H23.78   C22.247,0,21,1.247,21,2.78v5.052c0,0.812-0.447,1.481-1.197,1.792c-0.748,0.313-1.54,0.152-2.114-0.421l-3.571-3.571   c-1.052-1.052-2.883-1.05-3.933,0l-4.553,4.553c-0.525,0.525-0.814,1.224-0.814,1.967c0,0.742,0.289,1.44,0.814,1.966l3.572,3.571   c0.573,0.574,0.73,1.364,0.42,2.114S8.644,21,7.832,21H2.78C1.247,21,0,22.247,0,23.78v6.439C0,31.753,1.247,33,2.78,33h5.052   c0.812,0,1.481,0.447,1.792,1.197s0.153,1.54-0.42,2.114l-3.572,3.571c-0.525,0.525-0.814,1.224-0.814,1.966   c0,0.743,0.289,1.441,0.814,1.967l4.553,4.553c1.051,1.051,2.881,1.053,3.933,0l3.571-3.572c0.574-0.573,1.363-0.731,2.114-0.42   c0.75,0.311,1.197,0.98,1.197,1.792v5.052c0,1.533,1.247,2.78,2.78,2.78h6.439c1.533,0,2.78-1.247,2.78-2.78v-5.052   c0-0.812,0.447-1.481,1.197-1.792c0.751-0.312,1.54-0.153,2.114,0.42l3.571,3.572c1.052,1.052,2.883,1.05,3.933,0l4.553-4.553   c0.525-0.525,0.814-1.224,0.814-1.967c0-0.742-0.289-1.44-0.814-1.966l-3.572-3.571c-0.573-0.574-0.73-1.364-0.42-2.114   S45.356,33,46.168,33h5.052c1.533,0,2.78-1.247,2.78-2.78V23.78C54,22.247,52.753,21,51.22,21z M52,30.22   C52,30.65,51.65,31,51.22,31h-5.052c-1.624,0-3.019,0.932-3.64,2.432c-0.622,1.5-0.295,3.146,0.854,4.294l3.572,3.571   c0.305,0.305,0.305,0.8,0,1.104l-4.553,4.553c-0.304,0.304-0.799,0.306-1.104,0l-3.571-3.572c-1.149-1.149-2.794-1.474-4.294-0.854   c-1.5,0.621-2.432,2.016-2.432,3.64v5.052C31,51.65,30.65,52,30.22,52H23.78C23.35,52,23,51.65,23,51.22v-5.052   c0-1.624-0.932-3.019-2.432-3.64c-0.503-0.209-1.021-0.311-1.533-0.311c-1.014,0-1.997,0.4-2.761,1.164l-3.571,3.572   c-0.306,0.306-0.801,0.304-1.104,0l-4.553-4.553c-0.305-0.305-0.305-0.8,0-1.104l3.572-3.571c1.148-1.148,1.476-2.794,0.854-4.294   C10.851,31.932,9.456,31,7.832,31H2.78C2.35,31,2,30.65,2,30.22V23.78C2,23.35,2.35,23,2.78,23h5.052   c1.624,0,3.019-0.932,3.64-2.432c0.622-1.5,0.295-3.146-0.854-4.294l-3.572-3.571c-0.305-0.305-0.305-0.8,0-1.104l4.553-4.553   c0.304-0.305,0.799-0.305,1.104,0l3.571,3.571c1.147,1.147,2.792,1.476,4.294,0.854C22.068,10.851,23,9.456,23,7.832V2.78   C23,2.35,23.35,2,23.78,2h6.439C30.65,2,31,2.35,31,2.78v5.052c0,1.624,0.932,3.019,2.432,3.64   c1.502,0.622,3.146,0.294,4.294-0.854l3.571-3.571c0.306-0.305,0.801-0.305,1.104,0l4.553,4.553c0.305,0.305,0.305,0.8,0,1.104   l-3.572,3.571c-1.148,1.148-1.476,2.794-0.854,4.294c0.621,1.5,2.016,2.432,3.64,2.432h5.052C51.65,23,52,23.35,52,23.78V30.22z"/>
                                <path d="M27,18c-4.963,0-9,4.037-9,9s4.037,9,9,9s9-4.037,9-9S31.963,18,27,18z M27,34c-3.859,0-7-3.141-7-7s3.141-7,7-7   s7,3.141,7,7S30.859,34,27,34z"/>
                            </g>
                        </svg>
                    </div>
                    <div>
                        <h1 className={`text-[.9rem] text-white font-[100] font-robotoSans`}>Settings</h1>
                    </div>
                </NavLink>
                <div
                    className='border-y border-y-[#ffffff48] cursor-pointer hover:bg-[#384447] flex items-center min-h-[50px]'
                    onClick={logout}
                >
                    <div className={`cursor-pointer px-5 pl-6 scale-[.9] 850:scale-[1]`} onClick={() => setMenu(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="white" height="15px" width="15px" version="1.1" id="Capa_1" viewBox="0 0 384.971 384.971" xmlSpace="preserve">
                            <g>
                                <g id="Sign_Out">
                                    <path d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03    C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03    C192.485,366.299,187.095,360.91,180.455,360.91z"/>
                                    <path d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279    c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179    c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z"/>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div>
                        <h1 className={`text-[.9rem] text-white font-[100] font-robotoSans`}>Logout</h1>
                    </div>
                </div>
            </div>
        </>
    )
}