import React, { useEffect } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

export default function Dashboard() {
    return (
        <div className={`flex flex-col w-[100vw] h-[100vh]`}>
            <Header/>
            <Outlet/>
        </div>
    )
}