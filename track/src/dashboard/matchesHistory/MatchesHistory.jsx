import React, { useEffect, useState } from 'react'
import MatchInstance from './MatchInstance'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loading from '../../assets/Loading'
import { useSelector } from 'react-redux'

export default function MatchesHistory() {
    const theme = useSelector(state => state.globals.theme)
    const domain = useSelector(state => state.globals.domain)
    const [matches, setMatches] = useState([])
    const [status, setStatus] = useState(0)
    
    useEffect(() => {
        document.title = `Dashboard - Match history`
    }, [])

    useEffect(() => {
        const getMatchesHistory = async () => {
            try {
                const response = await axios.post(
                    `${domain}/auth/matches-history`,
                    {},
                    { withCredentials: true }
                )
                setMatches(response.data)
                if(response.data.length) setStatus(1)
                else setStatus(2)
            } catch {
                setStatus(2)
            }
        }
        getMatchesHistory()
    }, [])
    const formatDate = (inputDate) => {
        const date = new Date(inputDate)
        if (isNaN(date)) {
          throw new Error("Invalid date provided")
        }
      
        const options = { day: 'numeric', month: 'long', year: 'numeric' }
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date)
      
        let hours = date.getHours()
        const minutes = date.getMinutes().toString().padStart(2, '0')
        const ampm = hours >= 12 ? 'pm' : 'am'
        hours = hours % 12 || 12
      
        const formattedTime = `${hours}:${minutes}${ampm}`
      
        return `${formattedDate} ${formattedTime}`
    }
    return (
        <div className={`overflow-hidden h-full w-full min-w-[360px] ${theme ? 'bg-[#ffffff]' : 'bg-[#1f1f1f]'}`}>
            <Link to='../create-new-match' className={`hov2 flex items-center z-50 absolute h-[70px] rounded-full right-7 700:right-16 bottom-7 700:bottom-8 cursor-pointer`}>
                <div className={`flex absolute -left-10 items-center justify-center h-[70px] w-[70px] ${theme ? 'bg-[#242424]' : 'bg-[#CCCCCC]'} text-[2rem] rounded-full border-[1px] ${theme ? 'border-[white]' : 'border-[black]'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill={theme ? 'white' : '#2b2b2b'} height="40px" width="40px" version="1.1" id="Layer_1" viewBox="0 0 455 455" xmlSpace="preserve">
                        <polygon points="455,212.5 242.5,212.5 242.5,0 212.5,0 212.5,212.5 0,212.5 0,242.5 212.5,242.5 212.5,455 242.5,455 242.5,242.5   455,242.5 "/>
                    </svg>
                </div>
                <div id='cont' className={`transition-all duration-[.3s] ease-in-out overflow-hidden flex items-center h-[50px] w-[20px] ${theme ? 'bg-[#242424]' : 'bg-[#CCCCCC]'} rounded-full`}>
                    <h1 className={`pl-10 font-robotoSans text-[1.5rem] font-[100] ${theme ? 'text-white' : 'text-[#2b2b2b]'} whitespace-nowrap`}>Start a new match</h1>
                </div>
            </Link>
            {status === 0 ?
                <div className={`${theme ? 'bg-[#ffffff]' : 'bg-[#1f1f1f]'} flex gap-x-3 items-center justify-center h-full w-full`}>
                    <Loading stroke={theme ? 'black' : 'white'} w='45' h='45' />
                </div>
                :
                (status === 1 ?
                    <ul className={`relative px-3 flex flex-col items-center overflow-auto h-full max-h-full ${theme ? '' : 'custom-scrollbar'}`}>
                        {(() => {
                            const arr = [...matches].reverse()
                            return arr
                        })().map((item, index) => (
                            <MatchInstance
                                key={index}
                                index={index + 1}
                                _id={item._id}
                                name={item.name}
                                loc={item.location}
                                date={formatDate(new Date(item.date))}
                                isCompleted={item.isCompleted}
                                matches={matches}
                                setMatches={setMatches}
                                setStatus={setStatus}
                            />
                        ))}
                    </ul>
                    :
                    <div className={`font-[100] flex items-center justify-center h-full w-full text-[1.5rem] 700:text-[2rem] ${theme ? 'text-[#3b3b3b]' : 'text-[#4d4d4d]'} font-robotoSans`}>
                        Nothing here
                    </div>
                )
            }
        </div>
    )
}