import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom'
import Loading from '../../assets/Loading'
import Page404 from '../../Page404'

export default function Match() {
    const domain = useSelector(state => state.globals.domain)
    const { matchId } = useParams()
    const [loading, setLoading] = useState(0)
    const [match, setMatch] = useState(null)
    const location = useLocation()
    useEffect(() => {
        const getMatch = async () => {
            try {
                const response = await axios.post(`${domain}/auth/matches/${matchId}`, {}, {
                    withCredentials: true
                })
                if(response.data.isCompleted) {
                    setMatch(response.data)
                    setLoading(1)
                    document.title = `Match - ${response.data.name}`
                } else throw new Error('This match cannot be accessed')
                
            } catch (error) {
                console.error(error)
                setLoading(2)
                document.title = `Match Not found`
            }
        }
        getMatch()
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
        loading === 0 ?
        <div className='flex items-center justify-center h-[100vh] w-full'>
            <Loading stroke='black' w='30px' h='30px'/>
        </div>
        :
        <>
            {loading === 2 ? 
            <Page404/>
            :
            <div className='flex flex-col items-center size-full h-[100vh] overflow-auto'>
                <div className='relative py-3 pb-7 flex flex-col items-center w-full *:font-robotoSans *:font-[100]'>
                    <h1 className='text-center text-[2rem] 700:text-[3rem]'>{match.name}</h1>
                    <h1 className='text-[.7rem] 700:text-[1rem]'>{match.location}</h1>
                    <h1 className='text-[.7rem] 700:text-[1rem]'>{formatDate(match.date)}</h1>
                    <Link
                        to={`/people/id/${match.heldBy}`}
                        target='_blank'
                        className='pt-2 transition duration-200 text-[.5rem] 700:text-[.7rem] cursor-pointer border-b leading-none border-b-white hover:border-b-purple-700 hover:text-purple-700'
                    ><i className='font-robotoSans font-[500]'>(Who held this match?)</i></Link>
                </div>
                <div className='flex flex-col flex-grow w-full'>
                    <div className='text-[.8rem] 700:text-[1rem] flex justify-evenly w-full border-y *:font-robotoSans *:font-[100]'>
                        <NavLink to='scorecard' className={({isActive}) => `py-1 ${isActive ? 'bg-gray-300' : ' hover:bg-gray-100'} transition ease-in-out text-center w-full`}>Scorecard</NavLink>
                        <NavLink to='overs' className={({isActive}) => `py-1 ${isActive ? 'bg-gray-300' : ' hover:bg-gray-100'} transition ease-in-out text-center w-full`}>Overs</NavLink>
                        <NavLink to='squads' className={({isActive}) => `py-1 ${isActive ? 'bg-gray-300' : ' hover:bg-gray-100'} transition ease-in-out text-center w-full`}>Squads</NavLink>
                    </div>
                    <div className='size-full'>
                        {location.pathname === `/match/${matchId}` ?
                            <div className='font-[100] flex items-center justify-center size-full'>
                                <h1 className={`text-center font-robotoSans 700:text-[1.5rem] ${true ? 'text-[#3b3b3b]' : 'text-[#CCCCCC88]'}`}>The match was completed,<br/>{(() => {
                                    if(match.innings.second.current.stats.runs === match.innings.first.current.stats.runs) {
                                        return 'match draw.'
                                    } else if(match.innings.second.current.stats.runs > match.innings.first.current.stats.runs) {
                                        const winningTeam = match[match.innings.second.batting]
                                        return `${winningTeam} won by ${match.innings.second.current[match.innings.second.batting].numPlayers - match.innings.second.current.stats.wickets - 1} wickets.`
                                    } else {
                                        const winningTeam = match[match.innings.second.bowling]
                                        return `${winningTeam} won by ${match.innings.first.current.stats.runs - match.innings.second.current.stats.runs} runs.`
                                    }
                                })()}</h1>
                            </div>
                        :
                            <Outlet context={match}/>
                        }
                    </div>
                </div>
            </div>
            }
        </>
    )
}