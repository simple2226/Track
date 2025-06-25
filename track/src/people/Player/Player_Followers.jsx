import React, { useEffect, useState } from 'react'
import FollowerInstance from '../../accounts/followers/FollowerInstance'
import { usePlayer } from './Player'
import axios from 'axios'
import { useSelector } from 'react-redux'

export default function Player_Followers() {
    const domain = useSelector(state => state.globals.domain)
    const { his_id } = usePlayer()
    const [followers, setFollowers] = useState([])
    useEffect(() => {
        const getFollowers = async () => {
            const url = `${domain}/accounts/followers/${his_id}`
            try {
                const reponse = await axios.get(url)
                setFollowers(reponse.data)
            } catch {}
        }
        getFollowers()
        document.getElementById('option').textContent = 'Followers'
    }, [])

    
    return (
        followers.length ?
            <div className={`flex flex-col gap-y-1 items-center relative mt-[70px] 700:mt-[80px] overflow-x-hidden overflow-y-auto min-h-[calc(100vh-70px)] 700:min-h-[calc(100vh-80px)] min-w-[360px] w-full py-5 overlap-scr`}>
                {followers.map((element, index) => (
                    <FollowerInstance key={index} showName={element.showName} id={element._id}/>
                ))}
            </div>
        :
            <div className={`flex flex-col gap-y-2 items-center justify-center relative mt-[70px] 700:mt-[80px] overflow-x-hidden overflow-y-auto min-h-[calc(100vh-70px)] 700:min-h-[calc(100vh-80px)] min-w-[360px] w-full py-5 overlap-scr`}>
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#bdbdbd" height="50px" width="50px" version="1.1" id="Capa_1" viewBox="0 0 490 490" xmlSpace="preserve">
                    <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490   489.292,457.678 277.331,245.004 489.292,32.337 "/>
                </svg>
                <h1 className='font-robotoSans text-[#bdbdbd] text-[3rem]'>no followers</h1>
            </div>
    )
}