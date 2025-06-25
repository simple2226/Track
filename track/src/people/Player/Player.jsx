import { createContext, useContext } from 'react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Account_Loading from '../../Account_Loading'
import { Outlet, useParams } from 'react-router-dom'
import Header from './Header'
import { useSelector } from 'react-redux'
import Page404 from '../../Page404'

const PlayerContext = createContext()
export const usePlayer = () => useContext(PlayerContext)

export default function Player() {
    const domain = useSelector(state => state.globals.domain)
    const his_id = useParams().id
    const [his_account, setHisAccount] = useState(null)
    const [loading, setLoading] = useState(0)

    
    useEffect(() => {
        const fetchPlayer = async () => {
            const url = `${domain}/accounts/${his_id}`
            try {
                const response = await axios.get(url)
                document.title =`Player - ${response.data.showName}`
                setHisAccount(response.data)
                setLoading(1)
            } catch(err) {
                setLoading(2)
            }
        }
        fetchPlayer()
    }, [his_id])
    return (
        !loading ?
            <Account_Loading/>
        :   
        <>
            {loading === 1 ?
                <div className='font-[100] h-[100vh] overflow-x-hidden overflow-y-auto'>
                <PlayerContext.Provider value={{his_id, his_account, setHisAccount}}>
                    <Header/>
                    <Outlet his_id={his_id} his_account={his_account} setHisAccount={setHisAccount}/>
                </PlayerContext.Provider>
                </div>
            :
                <Page404/>
            }
        </>
    )
}