import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

export default function SearchInstance({showName, id}) {
    const account = useSelector(state => state.account.data)
    return (
        <NavLink
            to={id === account?._id ? '/account' : `/people/id/${id}`}
            target='_blank'
            className={`px-3 flex items-center justify-between min-h-[55px] 700:min-h-[60px] w-full max-w-[1335px] min-w-[360px] border border-gray-300 rounded-lg hover:bg-[#EEEEEE] cursor-pointer`}
        >
            <div className={`flex items-center gap-x-5`}>
                <div className='h-[37px] 700:h-[39px] w-[37px] 700:w-[39px] overflow-hidden rounded-full'>
                    <img src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/e1af12bf-3025-44a5-9be7-4d3c46beb99b/892732bc-e5a7-4f8b-ada6-3867d2d9f740.png" alt="" />
                </div>
                <h1 className='text-[.9rem] 850:text-[1rem]'>{showName}</h1>
            </div>
            <div className='scale-[.8] 850:scale-[1]'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" id="external-link">
                    <g fill="none" fillRule="evenodd" stroke="#4A4A4A" strokeLinecap="round">
                        <path d="M19 13.012V19.4a1.6 1.6 0 0 1-1.6 1.6H4.6A1.6 1.6 0 0 1 3 19.4V6.6A1.6 1.6 0 0 1 4.6 5h6.452M14 3h6a1 1 0 0 1 1 1v6M20.5 3.5l-9.618 9.618"/>
                    </g>
                </svg>
            </div>
        </NavLink>
    )
}