import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo';
import useColor from '../contexts/homeColourContext';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Header() {
    const domain = useSelector(state => state.globals.domain)
    const status = useSelector(state => state.globals.status)
    const account = useSelector(state => state.account.data)
    const { color } = useColor()
    const [open, setOpen] = useState(false)
    const menu = useRef(null)
    const menuButton = useRef(null)

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(() => {
        async function exampleFunction() {
            await sleep(200);
            menu.current.style.opacity = '1'
        }
        exampleFunction()
    }, [])

    useEffect(() => {
        const close = (event) => {
            if(!menu.current.contains(event.target) && !menuButton.current.contains(event.target)) setOpen(false)
        }
        document.addEventListener('mousedown', close)
        return () => {
            document.removeEventListener('mousedown', close)
        }
    }, [])

    const logout = async () => {
        try {
            await axios.post(`${domain}/auth/logout`, {}, {
                withCredentials: true
            })
            location.reload()
        } catch (error) {}
    }

    return (
        <div className='flex justify-center font-[300] fixed top-0 left-0 w-full min-w-[360px] z-50' style={{backgroundColor: `#${color}`}}>
            <div className='relative flex items-center justify-between gap-4 p-[5px] 700:p-[20px] h-[70px] w-[100%] max-w-[1349px]'
                style={{backgroundColor: `#${color}`}}>
                <Link to='' className='p-[5px] transition duration-[.2s] flex items-center cursor-pointer border border-[#ffffff00] 700:hover:border-white rounded-lg'>
                    <Logo color={'white'} size={'50px'}/>
                    <h1 className='text-white text-[1rem] 700:text-[1rem] font-[900]'>Track©</h1>
                </Link>
                <ul className='hidden 600:flex ml-10 700:ml-16 gap-x-8 700:gap-x-11 text-[.7rem] 1000:text-[1rem] text-white'>
                    <Link to='/account' target='_blank'><li className='font-robotoSans transition duration-[.1s] ease-linear cursor-pointer border-b border-transparent hover:border-b-white'>Account</li></Link>
                    <Link to='/dashboard' target='_blank'><li className='font-robotoSans transition duration-[.1s] ease-linear cursor-pointer border-b border-transparent hover:border-b-white'>Dashboard</li></Link>
                    <Link to='/people/search' target='_blank'><li className='font-robotoSans transition duration-[.1s] ease-linear cursor-pointer border-b border-transparent hover:border-b-white'>Search Players</li></Link>
                </ul>
                <div className='hidden 600:flex items-center gap-x-[10px] mr-1'>
                    {status === 1 ?
                        <>         
                            <h1 className='font-robotoSans text-white 500:text-[0rem] 700:text-[.7rem]'>{account.showName}</h1>               
                            <Link to='account' target='_blank' className='transition-all duration-[.07s] border border-[#CCCCCC] size-[37px] ease-linear text-[.5rem] 700:text-[.8rem] rounded-full overflow-hidden hover:rounded-[25px] text-white active:brightness-[.9]'>
                                <img src='https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/e1af12bf-3025-44a5-9be7-4d3c46beb99b/892732bc-e5a7-4f8b-ada6-3867d2d9f740.png'/>
                            </Link>
                            <div><button className='font-robotoSans transition-all duration-[.07s] ease-linear px-[20px] py-[8px] text-[.5rem] 700:text-[.8rem] border-[1px] border-white hover:bg-white rounded-[0px] hover:rounded-[25px] text-white active:brightness-[.9]' onClick={logout} style={{backgroundColor: `#${color}`}}>Logout</button></div>
                        </>
                    :
                        <>                            
                            <Link to='login'><button className='font-robotoSans transition-all duration-[.07s] ease-linear px-[20px] py-[8px] text-[.5rem] 700:text-[.8rem] border-[1px] border-white hover:bg-white rounded-[0px] hover:rounded-[25px] text-white active:brightness-[.9]' style={{backgroundColor: `#${color}`}}>Login</button></Link>
                            <Link to='signup'><button className='font-robotoSans transition-all duration-[.07s] ease-linear px-[20px] py-[8px] text-[.5rem] 700:text-[.8rem] border-[1px] border-white hover:bg-white rounded-[0px] hover:rounded-[25px] text-white active:brightness-[.9]' style={{backgroundColor: `#${color}`}}>SignUp</button></Link>
                        </>
                    }
                </div>
                <button
                    ref={menuButton}
                    className={`600:hidden ${open ? 'animate-rotateArrowUp' : 'animate-rotateArrowDown'} mr-1`}
                    onClick={() => {setOpen(!open)}}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white    " strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </button>
                <ul 
                    ref={menu}
                    className={`opacity-0 ${open ? 'animate-goDown' : 'animate-goUp'} -z-10 600:hidden flex flex-col absolute bottom-0 left-0 w-[100%] text-white`}
                    onClick={(event) => {
                        if(menu.current.contains(event.target)) setOpen(false)
                    }}
                >
                    <Link to='/account' target='_blank'>
                        <li
                            className='p-5 border-t border-r-0 border-white cursor-pointer hover:brightness-[1.2] font-robotoSans'
                            style={{backgroundColor: `#${color}`}}
                        >Account</li>
                    </Link>
                    <Link to='/dashboard' target='_blank'>
                        <li
                            className='p-5 border-t border-r-0 border-white cursor-pointer hover:brightness-[1.2] font-robotoSans'
                            style={{backgroundColor: `#${color}`}}
                        >Dashboard</li>
                    </Link>
                    <Link to='/people/search' target='_blank'>
                        <li
                            className='p-5 border-t border-r-0 border-white cursor-pointer hover:brightness-[1.2] font-robotoSans'
                            style={{backgroundColor: `#${color}`}}
                        >Search Players</li>
                    </Link>
                    {status === 1 ? 
                        <div>
                            <li
                                className='p-5 border-t border-r-0 border-white cursor-pointer hover:brightness-[1.2] font-robotoSans'
                                style={{backgroundColor: `#${color}`}}
                                onClick={logout}
                            >Logout</li>
                        </div>
                    :
                        <Link to='login'>
                            <li
                                className='p-5 border-t border-r-0 border-white cursor-pointer hover:brightness-[1.2] font-robotoSans'
                                style={{backgroundColor: `#${color}`}}
                            >Login</li>
                        </Link>
                    }
                    <Link to='signup'>
                        <li
                            className='p-5 border-t border-r-0 border-white cursor-pointer hover:brightness-[1.2] font-robotoSans'
                            style={{backgroundColor: `#${color}`}}
                        >SignUp</li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}