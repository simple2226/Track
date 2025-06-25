import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetch_account } from '../../redux/Slices'
import Loading from '../../assets/Loading'

export default function Account_Settings() {
    useEffect(() => {
        document.getElementById('option').textContent = 'Settings'
    }, [])
    const [edit, setEdit] = useState(false)
    const account = useSelector(state => state.account.data)

    const [username, setUsername] = useState(account?.username || '')
    const [showName, setShowName] = useState(account?.showName || '')
    const [age, setAge] = useState(account?.age|| '')
    const [job, setJob] = useState(account?.job || '')
    // const [currentPassword, setCurrentPassword] = useState(account?.username || '')
    // const [newPassword, setNewPassword] = useState(account?.username || '')

    const [loading, setLoading] = useState(false)
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        if(!username || !showName || !age || isNaN(age) || !job) setDisabled(true)
        else if(username === account.username &&
            showName === account.showName &&
            Number(age) === account.age &&
            job === account.job
        ) setDisabled(true)
        else setDisabled(false)
    }, [username, showName, age, job])

    const domain = useSelector(state => state.globals.domain)
    const dispatch = useDispatch()
    const updateAccount = async () => {
        try {
            setLoading(true)
            const updatedUser = await axios.put(`${domain}/auth/update-account/${account._id}`, {
                username,
                showName,
                age,
                job
            }, {withCredentials: true})
            dispatch(fetch_account(updatedUser.data))
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
            setEdit(false)
        }
    }

    return (
        <div className={`flex flex-col gap-y-1 items-center relative mt-[70px] 700:mt-[80px] overflow-x-hidden overflow-y-auto min-h-[calc(100vh-70px)] 700:min-h-[calc(100vh-80px)] min-w-[360px] w-[100vw] py-5 overlap-scr`}>
            {!edit ?
                <div
                    className={`px-4 flex items-center gap-2 min-h-[60px] w-[94%] 850:w-[97%] border border-gray-300 rounded-md  hover:bg-[#EEEEEE] cursor-pointer`}
                    onClick={() => setEdit(true)}
                >
                    <h1>Edit Profile</h1>
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                </div>
                :
                <div
                    className={`rounder-md text-[.9rem] 700:text-[1rem] py-3 px-4 flex flex-col gap-2 w-[94%] 850:w-[97%] border border-gray-300 rounded-md`}
                >
                    <div onClick={() => setEdit(false)} className='cursor-pointer py-2 px-1 w-full hover:bg-[#EEEEEE]'>
                        <button className='font-robotoSans'>← Back</button>
                    </div>
                    {[
                        ['Username', username, setUsername],
                        ['Full Name', showName, setShowName],
                        ['Age', age, setAge],
                    ].map((item, index) => (
                        <div key={index} className='flex gap-2 justify-around *:font-robotoSans'>
                            <h1 className='w-[100px] 700:w-[192px] underline underline-offset-8'>{item[0]}</h1>
                            <h1 className='font-[500]'>:</h1>
                            <input
                                className='p-2 h-[30px] border border-gray-300'
                                type="text"
                                placeholder={`Enter ${item[0].toLowerCase()}`}
                                value={item[1]}
                                onChange={e => item[2](e.target.value)}
                            />
                        </div>
                    ))}
                    <div className='flex gap-2 justify-around *:font-robotoSans'>
                        <h1 className='w-[100px] 700:w-[192px] underline underline-offset-8'>Job</h1>
                        <h1 className='font-[500]'>:</h1>
                        <select
                            className='px-1 w-[171px] 700:w-[192px] h-[30px] border border-gray-300'
                            value={job}
                            onChange={e => setJob(e.target.value)}
                        >
                            <option className='font-robotoSans font-[100]' value="batter">batter</option>
                            <option className='font-robotoSans font-[100]' value="bowler">bowler</option>
                            <option className='font-robotoSans font-[100]' value="all rounder">all rounder</option>
                        </select>
                    </div>
                    <div className='mt-5 flex gap-2 justify-around *:font-robotoSans'>
                        <button
                            disabled={disabled}
                            onClick={updateAccount}
                            className={`flex items-center justify-center border border-gray-500 ${disabled ? 'bg-none brightness-[2]' : 'bg-white hover:brightness-[.9]'} w-[150px] h-[40px]`}
                        >
                            {loading ? <Loading stroke='black'/> : 'Update'}
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}