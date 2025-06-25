import React from 'react'
import Loading from './assets/Loading'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Account_Loading() {
    const location = useLocation()
    const theme = useSelector(state => state.globals.theme)
    return (
        <div
            className={`${location.pathname.includes('dashboard') && !theme ? 'bg-[#1f1f1f]' : ''} flex gap-x-3 items-center justify-center h-[100vh] w-[100vw]`}
            style={{
                background: location.pathname.includes('dashboard') ? '' : 'radial-gradient(circle, white 50%, gray 130%, black 100%)'
            }}
        >
            <h1 className={`font-robotoSans font-[100] text-[2rem] ${!location.pathname.includes('dashboard') || theme ? 'text-black' : 'text-[#CCCCCC]'}`}>Loading</h1>
            <div className='pt-1'><Loading stroke={`${location.pathname.includes('dashboard') && !theme ? 'white' : 'black'}`} w='25' h='25' /></div>
        </div>
    )
}