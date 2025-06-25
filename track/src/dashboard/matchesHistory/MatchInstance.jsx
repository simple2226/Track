import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../../assets/Loading'
import { useSelector } from 'react-redux'

export default function MatchInstance({index, _id, name, loc, date, isCompleted, matches, setMatches, setStatus}) {
    const theme = useSelector(state => state.globals.theme)
    const domain = useSelector(state => state.globals.domain)
    const [options, setOptions] = useState(false)
    const optionsRef = useRef(null)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (optionsRef.current && !optionsRef.current.contains(event.target)) setOptions(false)
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {document.removeEventListener('mousedown', handleClickOutside)}
    }, [])

    const deleteMatchFromHistory = async () => {
        try {
            setLoading(true)
            setOptions(false)
            await axios.delete(
                `${domain}/auth/delete-match-from-history/${_id}`,
                { withCredentials: true }
            )
            setMatches(matches.filter(item => item._id != _id))
            if(matches.length === 1) setStatus(2)
        } catch {} finally {
            setLoading(false)
        }
    }

    return (
        <li className={`mt-3 flex border ${theme ? 'border-[#e5e5e5]' : 'border-[#2b2b2b]'} w-[99%] border-l-[3px] ${theme ? 'hover:border-l-[#005fb8]' : 'hover:border-l-[#0078d4]'}`}>
            <div className={`m-3 mr-1 700:m-4 min-w-8 font-[100] text-[1rem] ${theme ? 'text-[#3b3b3b]' : 'text-[#CCCCCC]'} font-robotoSans`}>{index}</div>
            <div className={`flex flex-col justify-center relative w-full`}>
                <div className={`relative flex flex-col`}>
                    <Link className={`pt-2 700:pt-2 cursor-pointer text-ellipsis text-[1.3rem] 700:text-[1.7rem] ${theme ? 'text-[#3b3b3b]' : 'text-[#CCCCCC]'} font-robotoSans font-[100] hover:underline ${theme ? 'hover:text-black' : 'hover:text-white'}`} to={`../match-id/${_id}`}>{name}
                    {isCompleted ?
                        <span className='translate-y-1 700;translate-y-0 700:scale-[1.4] pl-2 700:pl-2 inline-flex'><svg xmlns="http://www.w3.org/2000/svg" fill={theme ? 'green' : '#39FF14'} width="25px" height="25px" viewBox="0 0 256 256" id="Flat">
                            <path d="M103.99951,188.00012a3.98852,3.98852,0,0,1-2.82812-1.17139l-56-55.9956a3.99992,3.99992,0,0,1,5.65625-5.65723l53.17187,53.16748L213.17139,69.1759a3.99992,3.99992,0,0,1,5.65625,5.65723l-112,111.9956A3.98855,3.98855,0,0,1,103.99951,188.00012Z"/>
                        </svg></span>
                    :
                        <span className={`translate-y-[2px] 700:translate-y-[2px] ml-2 700:ml-4 inline-flex items-center justify-center h-4 min-h-4 w-4 min-w-4 700:size-6 rounded-full bg-yellow-600`}>
                            <span className={`absolute size-3 700:size-4 rounded-full ${theme ? 'bg-[#ffffff]' : 'bg-[#1f1f1f]'}`}></span>
                        </span>
                    }
                    </Link>
                    <h1 className={`font-[100] pt-2 700:p-1 text-[.8rem] 700:text-[1rem] ${theme ? 'text-[#3b3b3b]' : 'text-[#CCCCCC]'} font-robotoSans`}>{loc}</h1>
                    <h1 className={`mb-1 700:mb-2 py-2 700:p-1 text-[.5rem] 700:text-[.7rem] ${theme ? 'text-[#777777]' : 'text-[#cccccc9f]'} font-[100] font-robotoSans`}>{date}</h1>
                    <h1></h1>
                </div>
            </div>
            <div className={`relative px-3`} ref={optionsRef}>
                <button
                    disabled={loading}
                    className={`700:px-3 py-2 700:py-3 right-3 ${theme ? '' : 'hover:brightness-[2]'}`}
                    onClick={() => {
                        if(!loading) setOptions(!options)
                    }}
                >
                    {!loading ?
                    <svg className={theme ? 'p-1  rounded-sm hover:bg-[#dddddd]' : ''} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                        <circle cx="5" cy="12.5" r="2" fill={theme ? '#3b3b3b' : '#CCCCCC'}/>
                        <circle cx="12.5" cy="12.5" r="2" fill={theme ? '#3b3b3b' : '#CCCCCC'}/>
                        <circle cx="20" cy="12.5" r="2" fill={theme ? '#3b3b3b' : '#CCCCCC'}/>
                    </svg>
                    :
                    <div className='pt-1 pr-1'><Loading stroke={theme ? 'black' : 'white'}/></div>}
                </button>
                {
                    options ?
                    <ul className={`animate-showUpFast absolute top-[30px] 700:top-[35px] right-[10px] 700:right-[20px] ${theme ? 'bg-[#ffffff]' : 'bg-[#1F1F1F]'} border ${theme ? 'border-[#e5e5e5]' : 'border-[#454545]'} rounded-[4px]`}>
                        <li
                            className={`text-[.8rem] ${theme ? 'text-[#3b3b3b]' : 'text-[#CCCCCC]'} ${isCompleted ? 'border-b' : ''} ${theme ? 'border-b-[#e5e5e5]' : 'border-b-[#454545]'} cursor-pointer`}
                            onClick={deleteMatchFromHistory}
                        >
                            <h1 className={`select-none m-1 px-5 pl-2 p-[2.5px] whitespace-nowrap font-robotoSans ${theme ? 'hover:bg-[#005fb8]' : 'hover:bg-[#0078d4]'} hover:text-white rounded-sm`}>Delete Match</h1>
                        </li>
                        {isCompleted === true ?
                        <li>
                            <Link to={`/match/${_id}`} className={`text-[.8rem] ${theme ? 'text-[#3b3b3b]' : 'text-[#CCCCCC]'} cursor-pointer`}>
                                <h1 className={`select-none m-1 px-5 pl-2 p-[2.5px] whitespace-nowrap font-robotoSans ${theme ? 'hover:bg-[#005fb8]' : 'hover:bg-[#0078d4]'} hover:text-white rounded-sm`}>Share Results</h1>
                            </Link>
                        </li>
                        :
                        <></>
                        }
                    </ul>
                    :
                    ''
                }
            </div>
        </li>
    )
}