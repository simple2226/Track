import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { toggleTheme } from '../redux/Slices';
export default function Header() {
    const dispatch = useDispatch()
    const locationHook = useLocation()
    const domain = useSelector(state => state.globals.domain)
    const [menu, setMenu] = useState(false)
    const [pathName, setPathName] = useState('')
    const menuRef = useRef(null);
    const theme = useSelector(state => state.globals.theme)
    const data = useSelector(state => state.dashboard.data)
    const account = useSelector(state => state.account.data)

    useEffect(() => {
        setPathName(locationHook.pathname)
    }, [locationHook])
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) setMenu(false)
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {document.removeEventListener('mousedown', handleClickOutside)}
    }, [])

    const logout = async () => {
        try {
            setMenu(false)
            await axios.post(`${domain}/auth/logout`, {}, {
                withCredentials: true
            })
            location.reload()
        } catch (error) {}
    }
    return (
        <div className={`px-3 relative flex items-center gap-3 w-full min-h-[60px] min-w-[360px] ${theme ? 'bg-[#f8f8f8]' : 'bg-[#111114]'} border-b ${theme ? 'border-b-[#e5e5e5]' : 'border-b-[#2b2b2b]'}`}>
            <Link to='/account/me' className={`h-[35px] min-w-[35px] border ${theme ? 'border-[#e5e5e5]' : 'border-[#2b2b2b]'} ${ theme ? 'bg-[#ffffff]' : 'bg-[#2A2A2A]'} rounded-full overflow-hidden`}>
                <img className='h-[40px] min-w-[40px]' src='https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/e1af12bf-3025-44a5-9be7-4d3c46beb99b/892732bc-e5a7-4f8b-ada6-3867d2d9f740.png'/>
            </Link>
            <div className={`font-[100] flex items-center gap-2 transition duration-100 ease-linear h-[35px] w-full border ${theme ? 'border-[#e5e5e5]' : 'border-[#2b2b2b]'} ${theme ? 'hover:border-[#005fb8]' : 'hover:border-[#0078d4]'} ${ theme ? 'bg-[#ffffff]' : 'bg-[#2A2A2A]'} rounded-sm font-robotoSans text-[.9rem] ${theme ? 'text-[#9494b4]' : 'text-[#8a8a8a]'} ${theme ? 'hover:text-[#3b3b3b]' : 'hover:text-[#CCCCCC]'} px-3 text-nowrap overflow-y-hidden overflow-x-auto overlap-scr`}>
                {(() => {
                    if(pathName.includes('match-id')) return `dashboard > match > ${data ? data.name : ''} ${pathName.split('/')[4] ? `> ${pathName.split('/')[4]}` : ''}`
                    return pathName.replace(/\//g, ' > ').substring(3)
                })()}
                {data && pathName.includes('match-id') && account._id !== data?.heldBy ?
                    <i className='font-robotoSans'>{'(This match is held by another user, and you are able to access it only because it is completed, and you cannot update this match in any situation)'.toUpperCase()}</i>
                    :
                    <></>
                }
            </div>
            <div className={`z-50 relative`} ref={menuRef}>
                <button
                    className={`${theme ? 'hover:bg-[#dddddd]' : 'hover:bg-[#2F3030]'} p-2 py-1 rounded-md`}
                    onClick={() => {setMenu(!menu)}}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill={theme ? '#3b3b3b' :'#CCCCCC'} height="25px" width="25px" version="1.1" id="Capa_1" viewBox="0 0 384.97 384.97" xmlSpace="preserve">
                        <g>
                            <g id="Menu">
                                <path d="M12.03,84.212h360.909c6.641,0,12.03-5.39,12.03-12.03c0-6.641-5.39-12.03-12.03-12.03H12.03    C5.39,60.152,0,65.541,0,72.182C0,78.823,5.39,84.212,12.03,84.212z"/>
                                <path d="M372.939,180.455H12.03c-6.641,0-12.03,5.39-12.03,12.03s5.39,12.03,12.03,12.03h360.909c6.641,0,12.03-5.39,12.03-12.03 S379.58,180.455,372.939,180.455z"/>
                                <path d="M372.939,300.758H12.03c-6.641,0-12.03,5.39-12.03,12.03c0,6.641,5.39,12.03,12.03,12.03h360.909 c6.641,0,12.03-5.39,12.03-12.03C384.97,306.147,379.58,300.758,372.939,300.758z"/>
                            </g>
                        </g>
                    </svg>
                </button>
                {
                    menu ?
                    <ul className={`animate-showUpFast absolute right-0 ${theme ? 'bg-[#ffffff]' : 'bg-[#1F1F1F]'} border ${theme ? 'border-[#e5e5e5]' : 'border-[#454545]'} rounded-[4px] ${theme ? 'text-[#3b3b3b]' : 'text-[#CCCCCC]'}`}>
                        <li
                            onClick={() => setMenu(false)}
                        >
                            <Link
                                to='/dashboard/create-new-match'
                                className={`text-[.8rem] cursor-pointer`}
                            >
                                <h1 className={`select-none m-1 px-5 p-[2.5px] whitespace-nowrap font-robotoSans ${theme ? 'hover:bg-[#005fb8]' : 'hover:bg-[#0078d4]'} hover:text-white rounded-sm`}>Create New Match</h1>
                            </Link>
                        </li>
                        <li
                            onClick={() => setMenu(false)}
                        >
                            <Link
                                to='/dashboard/matches-history'
                                className={`text-[.8rem] cursor-pointer`}
                            >
                                <h1 className={`select-none m-1 px-5 p-[2.5px] whitespace-nowrap font-robotoSans ${theme ? 'hover:bg-[#005fb8]' : 'hover:bg-[#0078d4]'} hover:text-white rounded-sm`}>Matches History</h1>
                            </Link>
                        </li>
                        <li
                            className={`text-[.8rem] border-b ${theme ? 'border-b-[#e5e5e5]' : 'border-b-[#454545]'} cursor-pointer`}
                            onClick={() => {
                                dispatch(toggleTheme())
                            }}
                        >
                            <h1 className={`select-none m-1 px-5 p-[2.5px] whitespace-nowrap font-robotoSans ${theme ? 'hover:bg-[#005fb8]' : 'hover:bg-[#0078d4]'} hover:text-white rounded-sm`}>Theme: {theme ? 'Light' : 'Dark'}</h1>
                        </li>
                        <li
                            className={`text-[.8rem] cursor-pointer`}
                            onClick={logout}
                        >
                            <h1 className={`select-none m-1 px-5 p-[2.5px] whitespace-nowrap font-robotoSans ${theme ? 'hover:bg-[#005fb8]' : 'hover:bg-[#0078d4]'} hover:text-white rounded-sm`}>Logout</h1>
                        </li>
                    </ul>
                    :
                    ''
                }
            </div>
        </div>
    )
}