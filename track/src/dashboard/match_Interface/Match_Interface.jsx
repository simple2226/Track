import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { fetch_match, setMatchStatus } from '../../redux/Slices'
import Loading from "../../assets/Loading"
import Error404 from '../../assets/Error404'

const CustomNavLink = ({to, children, className, activeClassName}) => {
    const navigate = useNavigate()
    const handleNavClick = (e) => {
        e.preventDefault()
        navigate(to)
    }
    return (
        <NavLink
            to={to}
            className={({isActive}) => `${(className || '')} ${isActive ? activeClassName : ''}`}
            onClick={(e) => {e.preventDefault()}}
            onMouseDown={handleNavClick}
        >
            {children}
        </NavLink>
    )
}

export default function Match_Interface() {
    const {theme, domain, match_status} = useSelector(state => state.globals)
    const activeClassName= `border-t ${theme ? 'border-t-[#005fb8]' : 'border-t-[#0078d4]'} border-b-0 ${theme ? 'bg-[#ffffff]' : 'bg-[#1f1f1f]'}`
    const dispatch = useDispatch()
    const {matchId} = useParams()
    const [loading, setLoading] = useState(1)

    useEffect(() => {
        const getMatch = async () => {
            try {
                const response = await axios.post(`${domain}/auth/matches/${matchId}`, {}, {
                    withCredentials: true
                })
                document.title = `Dashboard - ${response.data.name}`
                dispatch(fetch_match(response.data))
                dispatch(setMatchStatus(1))
            } catch {
                document.title = `Oops! Error`
                dispatch(setMatchStatus(2))
            } finally {
                setLoading(0)
            }
        }
        getMatch()
    }, [dispatch])

    return (
        loading === 1 ?    
        <div className={`${theme ? 'bg-[#ffffff]' : 'bg-[#1f1f1f]'} flex gap-x-3 items-center justify-center h-full w-full min-w-[360px]`}>
            <Loading stroke={theme ? 'black' : 'white'} w='45' h='45' />
        </div>
        : (match_status === 1 ?
            <div className={`font-[100] flex flex-col overflow-hidden h-full w-full min-w-[360px] ${theme ? 'bg-[#ffffff]' : 'bg-[#1f1f1f]'}`}>
                <ul className={`relative flex items-center justify-start w-[100vw] min-h-[30px] max-h-[30px] overflow-y-hidden overflow-x-auto ${theme ? 'bg-[#f8f8f8]' : 'bg-[#111114]'} ${theme ? 'text-[#3b3b3b]' : 'text-[#CCCCCC]'} overlap-scr`}>
                    <CustomNavLink
                        to='track-score'
                        className=''
                        activeClassName={activeClassName}
                    >
                        <li className={`select-none flex items-center text-[.8rem] h-[30px] px-2 border-r ${theme ? 'border-r-[#e5e5e5]' : 'border-r-[#2b2b2b]'} font-robotoSans whitespace-nowrap`}>
                            Track Score
                        </li>
                    </CustomNavLink>
                    <CustomNavLink
                        to='score-card'
                        className=''
                        activeClassName={activeClassName}
                    >
                        <li className={`select-none flex items-center text-[.8rem] h-[30px] px-2 border-r ${theme ? 'border-r-[#e5e5e5]' : 'border-r-[#2b2b2b]'} font-robotoSans whitespace-nowrap`}>
                            Score Card
                        </li>
                    </CustomNavLink>
                    <CustomNavLink
                        to='overs-history'
                        className=''
                        activeClassName={activeClassName}
                    >
                        <li className={`select-none flex items-center text-[.8rem] h-[30px] px-2 border-r ${theme ? 'border-r-[#e5e5e5]' : 'border-r-[#2b2b2b]'} font-robotoSans whitespace-nowrap`}>
                            Overs History
                        </li>
                    </CustomNavLink>
                    <CustomNavLink
                        to='squads-info'
                        className=''
                        activeClassName={activeClassName}
                    >
                        <li className={`select-none flex items-center text-[.8rem] h-[30px] px-2 border-r ${theme ? 'border-r-[#e5e5e5]' : 'border-r-[#2b2b2b]'} font-robotoSans whitespace-nowrap`}>
                            Squads Info
                        </li>
                    </CustomNavLink>
                </ul>
                <Outlet context={matchId}/>
            </div>
            :
            <div className={`font-[100] flex flex-col items-center justify-center h-full w-full text-[1.5rem] 700:text-[2rem] ${theme ? 'bg-white' : 'bg-[#1f1f1f]'} ${theme ? 'text-[#3b3b3b88]' : 'text-[#4d4d4d88] min-w-[360px]'}`}>
                <Error404 color={theme ? '#3b3b3b88' : '#4d4d4d88'}/>
                <h1 className='font-robotoSans'>Failed to load</h1>
            </div>
        )
    )
}