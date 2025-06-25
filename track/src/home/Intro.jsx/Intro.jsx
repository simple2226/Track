import React, { useEffect, useState } from 'react'
import Logo from '../../assets/Logo'
import useColor from '../../contexts/homeColourContext';
import { useSelector } from 'react-redux';

export default function Intro() {
    const { color } = useColor()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };
    const status = useSelector(state => state.globals.status)

    useEffect(() => {
        document.title =`Track© - Welcome${status === 1 ? ' back!' : '!'}`
    }, [])

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => {window.removeEventListener('resize', handleResize)}
    }, [])
    return (
        <div className='mt-[70px] flex flex-col overflow-x-hidden w-[100%]'>
            <div
                className='flex flex-col items-center'
                style={{background: `linear-gradient(135deg, white 45%, #${color}36)`}}
            >
                <div className='flex flex-col 1000:flex-row items-center opacity-0 animate-showUp pt-[40px]'>
                    <Logo color={`#${color}`} size={windowWidth > 1000 ? '400px' : '300px'}/>
                    <h1 className='text-[5rem] 1000:text-[6rem] font-[900]' style={{color: `#${color}`}}>Track©</h1>
                </div>
                <div className='flex justify-center flex-wrap py-[30px] pb-[60px] gap-[.5rem] 1000:gap-[.6rem] text-[2rem] 1000:text-[2.5rem]'>
                    <div className='opacity-0 animate-showUpAndComeUp1'>Don't</div>
                    <div className='opacity-0 animate-showUpAndComeUp2'>just</div>
                    <div className='opacity-0 animate-showUpAndComeUp3'>play.</div>
                    <div className='opacity-0 animate-showUpAndComeUp4 font-[600]' style={{color: `#${color}`}}>Track</div>
                    <div className='opacity-0 animate-showUpAndComeUp5 font-[600]' style={{color: `#${color}`}}>it.</div>
                </div>
            </div>
        </div>
    )
}