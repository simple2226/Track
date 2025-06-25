import React from 'react'
import { useSelector } from 'react-redux'
import Logo from '../../../assets/Logo'

export default function D_nothing() {
    const theme = useSelector(state => state.globals.theme)
    return (
        <div className={`flex flex-col items-center justify-center h-full w-full text-[1.5rem] 700:text-[2rem] ${theme ? 'bg-white' : 'bg-[#1f1f1f]'} ${theme ? 'text-[#3b3b3b88]' : 'text-[#4d4d4d88] min-w-[360px]'}`}>
            <Logo size='250' color={theme ? '#3b3b3b77' : '#4d4d4d77'}/>
            <h1 className='font-robotoSans'>Start Tracking</h1>
        </div>
    )
}