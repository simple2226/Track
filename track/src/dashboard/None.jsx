import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function None() {
    const theme = useSelector(state => state.globals.theme)
    const account = useSelector(state => state.account.data)
    useEffect(() => {
        document.title = `Dashboard - ${account?.showName}`
    }, [])
    return (
        <div className={`font-[100] flex gap-y-3 justify-center items-center h-full w-full ${theme ? 'bg-[#ffffff]' : 'bg-[#1f1f1f]'}`}>
            <div className='flex flex-col p-5 py-2 rounded-md'>
                <Link
                    to='./matches-history'
                    className={`pb-5 flex items-center justify-between gap-2 ${theme ? 'hover:brightness-[.8]' : 'hover:brightness-[1.3]'} cursor-pointer`}
                >
                    <h1 className={`text-[1.5rem] 700:text-[2rem] ${theme ? 'text-[#aaaaaa]' : 'text-[#4b4b4b]'} font-robotoSans`}>Matches History</h1>
                    <div className='scale-[.8] 850:scale-[1]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" id="external-link">
                            <g fill="none" fillRule="evenodd" stroke="#4A4A4A" strokeLinecap="round">
                                <path d="M19 13.012V19.4a1.6 1.6 0 0 1-1.6 1.6H4.6A1.6 1.6 0 0 1 3 19.4V6.6A1.6 1.6 0 0 1 4.6 5h6.452M14 3h6a1 1 0 0 1 1 1v6M20.5 3.5l-9.618 9.618"/>
                            </g>
                        </svg>
                    </div>
                </Link>
                <span className={`w-full border-b ${theme ? 'border-b-[#aaaaaa]' : 'border-b-[#4b4b4b]'}`}></span>
                <Link
                    to='./create-new-match'
                    className={`pt-3 flex items-center justify-between gap-2 ${theme ? 'hover:brightness-[.8]' : 'hover:brightness-[1.3]'} cursor-pointer`}
                >
                    <h1 className={`text-[1.5rem] 700:text-[2rem] ${theme ? 'text-[#aaaaaa]' : 'text-[#4b4b4b]'} font-robotoSans`}>Create a new match</h1>
                    <div className='scale-[.8] 850:scale-[1]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" id="external-link">
                            <g fill="none" fillRule="evenodd" stroke="#4A4A4A" strokeLinecap="round">
                                <path d="M19 13.012V19.4a1.6 1.6 0 0 1-1.6 1.6H4.6A1.6 1.6 0 0 1 3 19.4V6.6A1.6 1.6 0 0 1 4.6 5h6.452M14 3h6a1 1 0 0 1 1 1v6M20.5 3.5l-9.618 9.618"/>
                            </g>
                        </svg>
                    </div>
                </Link>
            </div>
        </div>
    )
}