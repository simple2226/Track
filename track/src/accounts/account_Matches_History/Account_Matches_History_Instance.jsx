import React from 'react'
import { Link } from 'react-router-dom'

export default function Account_Matches_History_Instance({id, name, location, date}) {
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
        <Link to={`/match/${id}`} target='_blank' className={`transition ease-linear px-5 py-2 flex flex-col border border-[#bdbdbd] justify-center relative w-[94%] 850:w-[97%] rounded-md hover:bg-[#e4e4e4] cursor-pointer`}>
            <div className={`relative flex flex-col text-[#3b3b3b]`}>
                <div className={`relative`}>
                <div className='py-2 absolute right-0 scale-[.8] 850:scale-[1]'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" id="external-link">
                        <g fill="none" fillRule="evenodd" stroke="black" strokeLinecap="round">
                            <path d="M19 13.012V19.4a1.6 1.6 0 0 1-1.6 1.6H4.6A1.6 1.6 0 0 1 3 19.4V6.6A1.6 1.6 0 0 1 4.6 5h6.452M14 3h6a1 1 0 0 1 1 1v6M20.5 3.5l-9.618 9.618"/>
                        </g>
                    </svg>
                </div>
                </div>
                <h1 className={`pt-2 850:p-1 text-[1.3rem] 850:text-[2rem] font-robotoSans underline underline-offset-8`}>{name}</h1>
                <h1 className={`pt-2 850:p-1 text-[.8rem] 850:text-[1rem] font-robotoSans`}>{location}</h1>
                <h1 className={`py-2 850:p-1 text-[.5rem] 850:text-[.7rem] font-robotoSans`}>{formatDate(date)}</h1>
            </div>
        </Link>
    )
}