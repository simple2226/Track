import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/Logo'
import useColor from '../contexts/homeColourContext'
import { useSelector } from 'react-redux'

export default function footer() {
    const status = useSelector(state => state.globals.status)
    const account = useSelector(state => state.account.data)
    const { color, changeColor } = useColor()
    const [colorChange, setColorChange] = useState('#242424')
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };
    useEffect(() => {
        window.addEventListener('resize', handleResize);
    }, []);
    useEffect(() => {
        changeColor(colorChange.substring(1))
    }, [colorChange])
    return (
        <div
            className='flex justify-center w-[100%] font-[300]'
            style={{
                backgroundColor: `#${color}3d`,
                borderTop: `5px solid #${color}52`,
            }}
        >
            
            <div className='relative px-[20px] 1000:px-[100px] flex items-center justify-between gap-4 h-[150px] 700:h-[300px] w-[100%] max-w-[1369px]'>
                <Link to='' className='flex flex-col items-center my-[200px] transition duration-[.2s] cursor-pointer rounded-lg'>
                        <Logo color={`#${color}`} size={windowWidth > 700 ? '200px' : '100px'}/> 
                    <h1 className='text-[1rem] 700:text-[2.2rem] font-[900]' style={{color: `#${color}`}}>Track©</h1>
                </Link>
                <div className='flex self-start mt-[25px] 700:mt-[50px] gap-x-[15px] 700:gap-x-[40px]'>
                    <ul className='flex flex-col gap-y-[5px] 700:gap-y-[10px]'>
                        <li className='font-[900] text-[.6rem] 700:text-[1rem]'>Get Started</li>
                        <Link to=''><li className='font-robotoSans li text-[.5rem] 700:text-[.8rem]'>Track©</li></Link>
                        {status === 1 ? 
                                <Link to='account' target='_blank'><li className='font-robotoSans li text-[.5rem] 700:text-[.8rem]'>{account?.showName}</li></Link>
                            :
                                <>
                                    <Link to='login'><li className='font-robotoSans li text-[.5rem] 700:text-[.8rem]'>Login</li></Link>
                                    <Link to='signup'><li className='font-robotoSans li text-[.5rem] 700:text-[.8rem]'>SignUp</li></Link>
                                </>
                        }
                    </ul>
                    <ul className='flex flex-col gap-y-[5px] 700:gap-y-[10px]'>
                        <li className='font-[900] text-[.6rem] 700:text-[1rem]'>Explore</li>
                        <Link to='/people/search' target='_blank'><li className='font-robotoSans li text-[.5rem] 700:text-[.8rem]'>Search Players</li></Link>
                        <Link to='/matches/search' target='_blank'><li className='font-robotoSans li text-[.5rem] 700:text-[.8rem]'>Search Matches</li></Link>
                    </ul>
                    <ul className='flex flex-col gap-y-[5px] 700:gap-y-[10px]'>
                        <li className='font-[900] text-[.6rem] 700:text-[1rem]'>Start Tracking!</li>
                        <Link to='/dashboard' target='_blank'><li className='font-robotoSans li text-[.5rem] 700:text-[.8rem]'>Dashboard</li></Link>
                    </ul>
                </div>
                <h1 className='sans absolute bottom-2 700:bottom-[20px] right-3 700:right-[40px] text-[.5rem] 700:text-[1rem] text-[#0000009f]'>© Copyright all rights reserved</h1>
                <input
                    type='color'
                    className='absolute left-0 bottom-0 h-[20px] w-[20px]'
                    value={colorChange}
                    onChange={(e) => {
                        setColorChange(e.target.value)
                        changeColor(e.target.value.substring(1))
                    }}
                />
            </div>
        </div>
    )
}