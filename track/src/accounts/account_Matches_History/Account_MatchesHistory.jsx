import React, { useEffect, useState } from 'react'
import Account_Matches_History_Instance from './Account_Matches_History_Instance'
import { useSelector } from 'react-redux'
import axios from 'axios'

export default function Account_MatchesHistory() {
    const [matches, setMatches] = useState([])
    const domain = useSelector(state => state.globals.domain)
    useEffect(() => {
        document.getElementById('option').textContent = 'Matches Played'
        const getMatches = async () => {
            const fetchDocument = (id) => axios.get(`${domain}/matches/search/${id}`).then(res => res.data)
            Promise.allSettled(account.matches_played.map(id => fetchDocument(id)))
            .then(results => {
                const successful = results.filter(res => res.status === 'fulfilled').map(res => res.value)
                setMatches(successful.flat())
            })
        }
        getMatches()
    }, [])
    const account = useSelector(state => state.account.data)

    return (
    account?.matches_played.length ?
        <div className={`flex flex-col gap-y-3 items-center relative mt-[70px] 700:mt-[80px] overflow-x-hidden overflow-y-auto min-h-[calc(100vh-70px)] 700:min-h-[calc(100vh-80px)] min-w-[360px] w-full py-5 overlap-scr`}>
            {matches.map((element, index) => (
                <Account_Matches_History_Instance
                key={index}
                id={element?._id}
                name={element?.name}
                location={element?.location}
                date={element?.date}/>
            ))}
        </div>
    :
        <div className={`flex flex-col gap-y-2 items-center justify-center relative mt-[70px] 700:mt-[80px] overflow-x-hidden overflow-y-auto min-h-[calc(100vh-70px)] 700:min-h-[calc(100vh-80px)] min-w-[360px] w-full py-5 overlap-scr`}>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#bdbdbd" height="50px" width="50px" version="1.1" id="Capa_1" viewBox="0 0 490 490" xmlSpace="preserve">
                <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490   489.292,457.678 277.331,245.004 489.292,32.337 "/>
            </svg>
            <h1 className='font-robotoSans text-[#bdbdbd] text-[3rem]'>no matches</h1>
        </div>
    )
}