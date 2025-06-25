import { nanoid } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import Graph from './Graph'

export default function Overs() {
    const data = useOutletContext()
    const overs_1 = data.innings.first.overs
    const overs_2 = data.innings.second.overs
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize)
        return () => {window.removeEventListener('resize', handleResize)}
    }, [])
    return (
        <div className={`p-3 w-full h-full overflow-x-auto overflow-auto ${true ? 'text-[#3b3b3b]' :'text-[#CCCCCC]'} ${true ? '' : 'custom-scrollbar'}`}>
            <div className='transition scale-[.8] 500:scale-[1] flex justify-center'>
                {data ? <Graph size={Math.min(300, Math.max(200, windowWidth / 2 - 100))} match={data}/> : ''}
            </div>
            {[
                {label: 'Innings'}
            ].map(({label}) => (
                <div key={label} className={`flex flex-col w-full`}>
                    <div className={`pb-2 mb-2 font-robotoSans text-[1.3rem] 700:text-[1.5rem] border-b ${true ? 'border-b-[#e7e7e7]' : 'border-b-[#3d3d3d]'}`}>{label} <span className='font-robotoSans font-semibold'>#1</span></div>
                    {overs_1.map((over, index) => (
                        <div key={nanoid()} className={`py-2 flex flex-col`}>
                            <div className={`flex 700:gap-x-1`}>
                                <h1 className={`font-robotoSans pr-3 text-[.9rem] 700:text-[1rem] ${true ? 'text-[#3b3b3b] text-nowrap' : 'text-[#797979] text-nowrap'}`}>[ {index + 1} ] &nbsp; <span className='font-robotoSans font-[400] underline underline-offset-4 text-nowrap'>{over[0]}</span></h1>
                                <div className={`flex flex-wrap gap-[.2rem] 700:gap-x-1`}>
                                    {over.slice(1).map((val) => (
                                        <h1 key={nanoid()} className={`flex items-center e${true ? 'text-[#3b3b3b]' :'text-[#CCCCCC]'} ${true ? 'bg-white border border-[#cccccc] hover:border-[#005bf8]' : 'border border-[#37373d] hover:border-[#0078d4] bg-[#37373d]'} font-mono rounded-md leading-none py-1 px-2 700:px-3 text-[.7rem] 700:text-[.9rem] cursor-pointer ${true ? 'hover:brightness-[.95] active:brightness-[.8]' : 'hover:brightness-[1.2] active:brightness-[1]'}`}>{val}</h1>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
            {[
                {label: 'Innings'}
            ].map(({label}) => (
                <div key={label} className={`flex flex-col w-full`}>
                    <div className={`pt-4 pb-2 mb-2 font-robotoSans text-[1.3rem] 700:text-[1.5rem] border-b ${true ? 'border-b-[#e7e7e7]' : 'border-b-[#3d3d3d]'}`}>{label} <span className='font-robotoSans font-semibold'>#2</span></div>
                    {overs_2.map((over, index) => (
                        <div key={nanoid()} className={`py-2 flex flex-col`}>
                            <div className={`flex 700:gap-x-1`}>
                                <h1 className={`font-robotoSans pr-3 text-[.9rem] 700:text-[1rem] ${true ? 'text-[#3b3b3b] text-nowrap' : 'text-[#797979] text-nowrap'}`}>[ {index + 1} ] &nbsp; <span className='font-robotoSans font-[400] underline underline-offset-4 text-nowrap'>{over[0]}</span></h1>
                                <div className={`flex flex-wrap gap-[.2rem] 700:gap-x-1`}>
                                    {over.slice(1).map((val) => (
                                        <h1 key={nanoid()} className={`flex items-center ${true ? 'text-[#3b3b3b]' :'text-[#CCCCCC]'} ${true ? 'bg-white border border-[#cccccc] hover:border-[#005bf8]' : 'border border-[#37373d] hover:border-[#0078d4] bg-[#37373d]'} font-mono rounded-md leading-none py-1 px-2 700:px-3 text-[.7rem] 700:text-[.9rem] cursor-pointer ${true ? 'hover:brightness-[.95] active:brightness-[.8]' : 'hover:brightness-[1.2] active:brightness-[1]'}`}>{val}</h1>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}