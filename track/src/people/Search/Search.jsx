import React, { useCallback, useEffect, useState } from 'react'
import SearchInstance from './SearchInstance'
import axios from 'axios'
import Loading from '../../assets/Loading'
import { useSelector } from 'react-redux'

export default function Search() {
    const domain = useSelector(state => state.globals.domain)
    const [search, setSearch] = useState('')
    const [accounts, setAccounts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        document.title =`Track© - Search Players`
    }, [])

    const searchIt = useCallback(async () => {
        if (!search) {
            setAccounts([]);
            return;
        }
        try {
            setLoading(true)
            const response = await axios.get(`${domain}/accounts/search/${encodeURIComponent(search)}`);
            setAccounts(response.data);
        } catch {} finally {
            setLoading(false)
        }
    }, [search]);
    useEffect(() => {
        const handleKeydown = async (event) => {
            if(event.key === 'Enter') {
                await searchIt();
            }
        }
        document.addEventListener('keydown', handleKeydown)
        return () => {
            document.removeEventListener('keydown', handleKeydown)
        }
    }, [searchIt])
    
    return (
        <div className='flex flex-col gap-[50px]'>
            <div className='flex justify-center z-[1000] relative text-[.9rem] pt-3 700:text-[1rem] h-full w-full'>
                <div className='flex p-3 fixed w-full min-w-[360px] max-w-[1360px] h-[50px]'>
                    <div className='relative w-full flex items-center'>
                        <input
                            autoFocus
                            className='p-3 font-robotoSans w-full h-[50px] border border-gray-300 rounded-md'
                            placeholder='Search for players...'
                            value={search}
                            onChange={(e) => {setSearch(e.target.value)}}
                        />
                        <button
                            className={`${loading ? 'pr-1' : ''} absolute right-1 700:right-2 scale-[.8] 700:scale-[1] hover:brightness-[.85] active:brightness-75`}
                            onClick={searchIt}
                        >
                            {
                                loading ?
                                <Loading stroke='black' h='25' w='25'/>
                                :
                                <svg fill='#9ca3af' focusable="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height='35' width='35' ><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
                            }
                        </button>
                    </div>
                </div>
            </div>
            {accounts.length ?
                <div className={`flex flex-col items-center p-3 gap-y-3 relative overflow-hidden py-5`}>
                    {(() => {
                        return accounts
                    })().map((element, index) => (
                        <SearchInstance key={index} showName={element?.showName} id={element?._id}/>
                    ))}
                </div>
                :
                <div className={`flex flex-col items-center justify-center h-[calc(100vh-100px)] w-[100vw] p-3 relative overflow-hidden py-5`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="200px" height="200px" viewBox="0 -0.5 25 25" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.5 11.493C5.50364 8.39226 7.69698 5.72579 10.7388 5.12416C13.7807 4.52253 16.8239 6.15327 18.0077 9.0192C19.1915 11.8851 18.186 15.1881 15.6063 16.9085C13.0265 18.6288 9.59077 18.2874 7.4 16.093C6.18148 14.8725 5.49799 13.2177 5.5 11.493Z" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16.062 16.568L19.5 19.993" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.5303 8.96271C10.2374 8.66982 9.76256 8.66982 9.46967 8.96271C9.17678 9.25561 9.17678 9.73048 9.46967 10.0234L10.5303 8.96271ZM11.4697 12.0234C11.7626 12.3163 12.2374 12.3163 12.5303 12.0234C12.8232 11.7305 12.8232 11.2556 12.5303 10.9627L11.4697 12.0234ZM12.5303 10.9627C12.2374 10.6698 11.7626 10.6698 11.4697 10.9627C11.1768 11.2556 11.1768 11.7305 11.4697 12.0234L12.5303 10.9627ZM13.4697 14.0234C13.7626 14.3163 14.2374 14.3163 14.5303 14.0234C14.8232 13.7305 14.8232 13.2556 14.5303 12.9627L13.4697 14.0234ZM12.5303 12.0234C12.8232 11.7305 12.8232 11.2556 12.5303 10.9627C12.2374 10.6698 11.7626 10.6698 11.4697 10.9627L12.5303 12.0234ZM9.46967 12.9627C9.17678 13.2556 9.17678 13.7305 9.46967 14.0234C9.76256 14.3163 10.2374 14.3163 10.5303 14.0234L9.46967 12.9627ZM11.4697 10.9627C11.1768 11.2556 11.1768 11.7305 11.4697 12.0234C11.7626 12.3163 12.2374 12.3163 12.5303 12.0234L11.4697 10.9627ZM14.5303 10.0234C14.8232 9.73048 14.8232 9.25561 14.5303 8.96271C14.2374 8.66982 13.7626 8.66982 13.4697 8.96271L14.5303 10.0234ZM9.46967 10.0234L11.4697 12.0234L12.5303 10.9627L10.5303 8.96271L9.46967 10.0234ZM11.4697 12.0234L13.4697 14.0234L14.5303 12.9627L12.5303 10.9627L11.4697 12.0234ZM11.4697 10.9627L9.46967 12.9627L10.5303 14.0234L12.5303 12.0234L11.4697 10.9627ZM12.5303 12.0234L14.5303 10.0234L13.4697 8.96271L11.4697 10.9627L12.5303 12.0234Z" fill="#9ca3af"/>
                    </svg>
                    <h1 className='font-robotoSans text-gray-500'>Nothing here</h1>
                </div>
            }
        </div>
    )
}