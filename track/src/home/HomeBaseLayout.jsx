import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { HomeColorProvider } from '../contexts/homeColourContext'

export default function HomeBaseLayout() {
    const [color, setColor] = useState('242424')
    const changeColor = (color) => {
        setColor(color)
    }
    return (
        <HomeColorProvider value={{color, changeColor}}>
            <div className='w-[100vw] min-w-[360px]'>
                <Header/>
                <Outlet/>
                <Footer/>
            </div>
        </HomeColorProvider>
    )
}