import React, { useEffect, useRef, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function Header() {
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
                    to=''
                    className='border-t border-t-[#ffffff48] cursor-pointer hover:bg-[#384447] flex items-center min-h-[50px]'
                    onClick={() => setMenu(false)}
                >
                    <div className={`cursor-pointer px-[18px] scale-[.9] 850:scale-[1]`} onClick={() => setMenu(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="24" height="24" id="me" fill='white'>
                            <path d="M19.7.5H4.3C2.2.5.5 2.2.5 4.3v15.4c0 2.1 1.7 3.8 3.8 3.8h15.4c2.1 0 3.8-1.7 3.8-3.8V4.3c0-2.1-1.7-3.8-3.8-3.8zm-7.2 14.9c0 .3-.2.5-.5.5s-.5-.2-.5-.5v-4.8c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5v4.8c0 .3-.2.5-.5.5s-.5-.2-.5-.5v-4.8c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5v4.8c0 .3-.2.5-.5.5s-.5-.2-.5-.5V8.6c0-.3.2-.5.5-.5s.5.2.5.5v.1c.4-.3.9-.5 1.5-.5.8 0 1.5.4 2 1 .4-.6 1.2-1 2-1 1.3 0 2.4 1.1 2.4 2.4v4.8zm7.6-3.4c-.1.1-.2.2-.4.2h-3.9c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h3.3c-.1-.4-.4-.8-.7-1.1-1.1-1.1-2.9-1.1-4 0s-1.1 2.9 0 4 2.9 1.1 4 0c.2-.2.3-.4.5-.6.1-.2.4-.3.7-.2.2.1.3.4.2.7-.2.4-.4.6-.6.9-.7.7-1.7 1.1-2.7 1.1s-1.9-.4-2.7-1.1c-1.5-1.5-1.5-3.9 0-5.3 1.5-1.5 3.9-1.5 5.3 0 .6.6 1 1.3 1.1 2.2.1 0 0 .1-.1.2z"/>
                        </svg>
                    </div>
                    <div>
                        <h1 className={`text-[.9rem] text-white font-[100] font-robotoSans`}>Home</h1>
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
                    className='border-y border-y-[#ffffff48] cursor-pointer hover:bg-[#384447] flex items-center min-h-[50px]'
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
            </div>
        </>
    )
}