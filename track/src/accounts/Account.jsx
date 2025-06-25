import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Account_Loading from '../Account_Loading'
import Account_Header from './Account_Header'
import { useSelector } from 'react-redux'

export default function Account() {
    const status = useSelector(state => state.globals.status)
    const account = useSelector(state => state.account.data)
    useEffect(() => {
        document.title =`Account - ${account ? account.showName : ''}`
    }, [])
    return (
        status !== 0 ?
            <div className='font-[100] h-[100vh] overflow-x-hidden overflow-y-auto'>
                <Account_Header/>
                <Outlet/>
            </div>
        :
            <Account_Loading/>
    )
}