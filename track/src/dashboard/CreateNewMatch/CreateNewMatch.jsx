import { nanoid } from '@reduxjs/toolkit'
import React, { useEffect, useRef, useState } from 'react'
import Loading from '../../assets/Loading'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

function PlusIcon() {
    const theme = useSelector(state => state.globals.theme)
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#6a6a6a" height="20px" width="20px" version="1.1" id="Layer_1" viewBox="0 0 455 455" xmlSpace="preserve">
            <polygon points="455,212.5 242.5,212.5 242.5,0 212.5,0 212.5,212.5 0,212.5 0,242.5 212.5,242.5 212.5,455 242.5,455 242.5,242.5   455,242.5 "/>
        </svg>
    )
}

function Input({label, autoFocus, placeholder, val, set}) {
    const theme = useSelector(state => state.globals.theme)
    return (
        <div className={`flex w-full gap-2 items-center mb-3`}>
            <h1
                className={`${theme ? 'text-[#3b3b3b]' : 'text-[#CCCCCC]'} ${theme ? 'bg-[#e2e2e2]' : 'bg-[#37373d]'} w-[105px] 700:w-[150px] font-mono rounded-md text-[.7rem] 700:text-[1rem] px-2 700:px-3 py-1 flex-shrink-0`}
                style={{textAlign: "left" }}
            >
                {label}
            </h1>
            <h1 className={`text-[#6d6d6d] font-[100] font-mono text-center flex-shrink-0`} style={{ width: "30px" }}>
                :
            </h1>
            <input
                autoFocus={autoFocus}
                type="text"
                placeholder={placeholder}
                className={`font-robotoSans px-2 py-1 ${theme ? 'bg-[#f8f8f8]' : 'bg-[#313131]'} ${theme ? 'text-[#3b3b3b]' : 'text-[#CCCCCC]'} text-[.7rem] 700:text-[.9rem] flex-grow rounded-sm border ${theme ? 'border-[#d5d5d5]' : 'border-[#313131]'} ${theme ? 'hover:bg-[#EEEEEE]' : 'hover:bg-[#363636]'} ${theme ? 'focus:border-[#005fb8]' : 'focus:border-[#0078d4]'} outline-none`}
                value={val}
                onChange={(e) => {
                    set(e.target.value)
                }}
            />
        </div>
    )
}

function Select({label, val, set, options}) {
    const theme = useSelector(state => state.globals.theme)
    return (
        <div className={`flex w-full gap-2 items-center mb-3`}>
            <h1
                className={`${theme ? 'text-[#3b3b3b]' : 'text-[#CCCCCC]'} ${theme ? 'bg-[#e2e2e2]' : 'bg-[#37373d]'} w-[105px] 700:w-[150px] font-mono rounded-md text-[.7rem] 700:text-[1rem] px-2 700:px-3 py-1 flex-shrink-0`}
                style={{textAlign: "left" }}
            >
                {label}
            </h1>

            <h1 className={`text-[#6d6d6d] font-[100] font-mono text-center flex-shrink-0`} style={{ width: "30px" }}>
                :
            </h1>
            <select
                className={`font-robotoSans px-2 py-1 ${theme ? 'bg-[#f8f8f8]' : 'bg-[#313131]'} ${theme ? 'text-[#3b3b3b]' : 'text-[#CCCCCC]'} text-[.7rem] 700:text-[.9rem] flex-grow rounded-sm border ${theme ? 'border-[#d5d5d5]' : 'border-[#313131]'} ${theme ? 'hover:bg-[#EEEEEE]' : 'hover:bg-[#363636]'} ${theme ? 'focus:border-[#005fb8]' : 'focus:border-[#0078d4]'} outline-none`}
                value={val}
                onChange={(e) => {
                    set(e.target.value)
                }}
            >
                {options.map((element, index) => (
                    <option key={index} className={`font-robotoSans`} value={`${index}`}>{element}</option>
                ))}
            </select>
        </div>
    )
}

function ShowBox({SetShowBox, Index, TeamArr, setTeamArr, Registered, Name, Password, Job}) {
    const theme = useSelector(state => state.globals.theme)
    const domain = useSelector(state => state.globals.domain)
    const [registered, setRegistered] = useState(Registered)
    const [name, setName] = useState(Name)
    const [password, setPassword] = useState(Password)
    const [job, setJob] = useState(Job)

    const [usernameErr, setUsernameErr] = useState(false)
    const [passwordErr, setPasswordErr] = useState(false)

    useEffect(() => {
        if(!registered) setUsernameErr(false)
        setUsernameErr(false)
        setPasswordErr(false)
    }, [registered, name, password])

    const [loading, setLoading] = useState(false)

    const addPlayer = async () => {
        if(!registered && (!name)) return
        if(registered && (!name || !password)) return
        const obj = {
            showBox: false,
        }
        try {
            setLoading(true)
            if(registered) {
                const response = await axios.post(`${domain}/auth/add-registered-player`, {
                    username: name,
                    password
                }, {
                    withCredentials: true
                })
                obj.registered = true
                obj._id = response.data._id
                obj.name = response.data.showName
                obj.job = response.data.job
            } else {
                obj.registered = false
                obj.name = name
                obj.job = job
            }
            let temp = [...TeamArr]
            if(Index < 0) {
                temp.push(obj)
                SetShowBox(false)
            }
            else {
                temp[Index] = obj
            }
            setTeamArr(temp)
        } catch(err) {
            if(err.response.data.message === 'usename does not exist') setUsernameErr(true)
            if(err.response.data.message === 'invalid password') setPasswordErr(true)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className={`p-4 px-3 700:px-5 flex flex-col gap-y-5 items-center w-full border ${theme ? 'border-[#d5d5d5]' : 'border-[#3f3f3f]'} rounded-md`}>
            <div className={`flex gap-x-1 items-center self-center`}>
                <input
                    className={`outline-none size-3`}
                    type="checkbox"
                    checked={registered}
                    onChange={(e) => {setRegistered(e.target.checked)}}
                />
                <h1 className={`font-robotoSans text-[.7rem] 700:text-[.9rem] ${theme ? 'text-[#3b3b3b]' : 'text-[#CCCCCC]'} leading-none`}>Registered</h1>
            </div>
            <div className={`flex flex-col gap-y-2 w-full`}>
                <input
                    autoFocus={true}
                    className={`px-2 py-1 rounded-sm w-full ${theme ? 'bg-[#f8f8f8]' : 'bg-[#313131]'} ${theme ? 'text-[#3b3b3b]' : 'text-[#CCCCCC]'} text-[.7rem] 700:text-[.9rem] font-robotoSans flex-grow border ${usernameErr ? 'border-red-500' : (theme ? 'border-[#d5d5d5]' : 'border-[#313131]')} ${theme ? 'hover:bg-[#EEEEEE]' : 'hover:bg-[#363636]'} ${theme ? 'focus:border-[#005fb8]' : 'focus:border-[#0078d4]'} outline-none`}
                    type="text"
                    value={name}
                    onChange={(e) => {setName(e.target.value)}}
                    placeholder={`${registered ? 'Enter username...' : 'Enter playername...'}`}
                />
                {
                    registered ?
                    <input
                        className={`px-2 py-1 rounded-sm w-full ${theme ? 'bg-[#f8f8f8]' : 'bg-[#313131]'} ${theme ? 'text-[#3b3b3b]' : 'text-[#CCCCCC]'} text-[.7rem] 700:text-[.9rem] font-robotoSans flex-grow border ${passwordErr ? 'border-red-500' : (theme ? 'border-[#d5d5d5]' : 'border-[#313131]')} ${theme ? 'hover:bg-[#EEEEEE]' : 'hover:bg-[#363636]'} ${theme ? 'focus:border-[#005fb8]' : 'focus:border-[#0078d4]'} outline-none`}
                        type="password"
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                        placeholder='Enter password...'
                    />
                    :
                    <select
                        className={`px-1 py-1 rounded-sm w-full ${theme ? 'bg-[#f8f8f8]' : 'bg-[#313131]'} ${theme ? 'text-[#3b3b3b]' : 'text-[#CCCCCC]'} text-[.7rem] 700:text-[.9rem] font-robotoSans flex-grow border ${theme ? 'border-[#d5d5d5]' : 'border-[#313131]'} ${theme ? 'hover:bg-[#EEEEEE]' : 'hover:bg-[#363636]'} ${theme ? 'focus:border-[#005fb8]' : 'focus:border-[#0078d4]'} outline-none`}
                        value={job}
                        onChange={(e) => {setJob(e.target.value)}}
                    >
                        <option className={`font-robotoSans`} value="batter">batter</option>
                        <option className={`font-robotoSans`} value="bowler">bowler</option>
                        <option className={`font-robotoSans`} value="all rounder">all rounder</option>
                    </select>
                }
                <div className={`flex gap-x-2`}>
                    <button
                        className={`p-1 flex justify-center font-robotoSans text-[.6rem] 700:text-[.9rem] ${theme ? 'text-[#3b3b3b]' : 'text-[#CCCCCC]'} w-1/2 ${theme ? 'bg-[#ffffff]' : 'bg-[#1f1f1f]'} border ${theme ? 'border-[#d5d5d5]' : 'border-[#3f3f3f]'} rounded-sm hover:brightness-[.9] active:brightness-[.8]`}
                        onClick={addPlayer}
                    >
                        {loading ? <Loading/> : (TeamArr[Index]?.showBox ? 'Edit Player' : 'Add player')}
                    </button>
                    <button
                        className={`p-1 font-robotoSans text-[.6rem] 700:text-[.9rem] ${theme ? 'text-[#3b3b3b]' : 'text-[#CCCCCC]'} w-1/2 ${theme ? 'bg-[#ffffff]' : 'bg-[#1f1f1f]'} border ${theme ? 'border-[#d5d5d5]' : 'border-[#3f3f3f]'} rounded-sm hover:brightness-[.9] active:brightness-[.8]`}
                        onClick={() => {
                            if(Index < 0) SetShowBox(false)
                            else {
                                let temp = [...TeamArr]
                                temp[Index].showBox = false
                                setTeamArr(temp)
                            }
                        }}
                    >Cancel</button>
                </div>
            </div>
        </div>
    )
}

function PlayerInstance({team, teamArr, setTeamArr, index}) {
    const theme = useSelector(state => state.globals.theme)
    const ref = useRef(null)
    return (
        <div
            ref={ref}
            className={`overflow-x-auto flex flex-wrap gap-2 items-center w-full px-1 700:px-3 py-1 700:py-2 border ${theme ? 'border-[#d5d5d5]' : 'border-[#6a6a6a]'} ${theme ? '' : 'hover:brightness-[1.1]'} rounded-md overlap-scr`}
            onWheel={(e) => {
                const delta = e.deltaY
                ref.current.scrollBy({
                    left: delta,
                    behavior: 'smooth',
                })
            }}
        >
            <div className={`flex gap-x-[2px] 700:gap-x-2`}>
                {[teamArr[index].registered ? 'Y' : 'N', teamArr[index].name, teamArr[index].job].map((info, index) => (
                    <h1
                        key={index}
                        className={`${theme ? 'text-[#3b3b3b]' : 'text-[#CCCCCC]'} ${theme ? 'bg-[#e2e2e2]' : 'bg-[#37373d]'} font-mono rounded-sm 700:rounded-md leading-none py-1 px-[3px] 700:px-5 text-[.4rem] 700:text-[.7rem]`}
                        style={{textAlign: "center" }}
                    >
                        {info}
                    </h1>
                ))}
                <h1
                    className={`${theme ? 'text-[#3b3b3b]' : 'text-[#CCCCCC]'} ${theme ? 'bg-[#e2e2e2]' : 'bg-[#37373d]'} font-mono rounded-sm 700:rounded-md leading-none py-1 px-[3px] 700:px-5 text-[.4rem] 700:text-[.7rem] cursor-pointer ${theme ? 'hover:bg-[#dddddd]' : 'hover:brightness-[1.2]'} ${theme ? 'active:brightness-[.9]' : 'active:brightness-[1]'}`}
                    style={{textAlign: "center" }}
                    onClick={() => {
                        let temp = [...teamArr]
                        temp[index].showBox = true
                        setTeamArr(temp)
                    }}
                >
                    EDIT
                </h1>
                <h1
                    className={`${theme ? 'text-[#3b3b3b]' : 'text-[#CCCCCC]'} ${theme ? 'bg-[#e2e2e2]' : 'bg-[#37373d]'} font-mono rounded-sm 700:rounded-md leading-none py-1 px-[3px] 700:px-5 text-[.4rem] 700:text-[.7rem] cursor-pointer ${theme ? 'hover:bg-[#dddddd]' : 'hover:brightness-[1.2]'} ${theme ? 'active:brightness-[.9]' : 'active:brightness-[1]'}`}
                    style={{textAlign: "center" }}
                    onClick={() => {
                        let temp = [...teamArr]
                        temp = temp.slice(0, index).concat(temp.slice(index + 1))
                        setTeamArr(temp)
                    }}
                >
                    REMOVE
                </h1>
            </div>
        </div>
    )
}

export default function CreateNewMatch() {
    const theme = useSelector(state => state.globals.theme)
    const account = useSelector(state => state.account.data)
    const navigate = useNavigate()
    const domain = useSelector(state => state.globals.domain)

    useEffect(() => {
        document.title = `Dashboard - Create Match`
    }, [])

    const [saveAsPreset, setSaveAsPreset] = useState(false)
    const [newPreset, setNewPreset] = useState('')
    const [matchName, setMatchName] = useState('')
    const [locName, setLocName] = useState('')
    const [numOvers, setNumOvers] = useState('')
    const [team1name, setTeam1name] = useState('')
    const [team2name, setTeam2name] = useState('')
    const [showBox1, setShowBox1] = useState(false)
    const [showBox2, setShowBox2] = useState(false)
    const [team1arr, setTeam1arr] = useState([])
    const [team2arr, setTeam2arr] = useState([])
    const [tossWinTeam, setTossWinTeam] = useState('0')
    const [tossWinDecision, setTossWinDecision] = useState('0')
    const [menOnStrike, setMenOnStrike] = useState('0')
    const [isDisabled, setIsDisabled] = useState(true)
    const [loading, setLoading] = useState(false)

    const map = {
        "match name": [matchName, setMatchName],
        "location name": [locName, setLocName],
        "num overs": [numOvers, setNumOvers],
        "team-1 name": [team1name, setTeam1name],
        "team-2 name": [team2name, setTeam2name]
    }

    useEffect(() => {
        const check = () => {
            if((saveAsPreset && !newPreset) || !matchName || !numOvers || !team1name || !team2name)
                return true
            else if(isNaN(numOvers))
                return true
            if(menOnStrike === '0' && (team1arr.length < 2 || team2arr.length < 2))
                return true
            if(menOnStrike === '1' && (team1arr.length < 1 || team2arr.length < 1)) {
                return true
            }
            return false
        }
        setIsDisabled(check())
    }, [
        saveAsPreset,
        newPreset,
        matchName,
        locName,
        numOvers,
        menOnStrike,
        team1name,
        team2name,
        team1arr,
        team2arr
    ])

    const createMatch = async () => {
        let temp = null
        if(saveAsPreset) {
            temp = {
                presetName: newPreset,
                matchName: matchName,
                locName: locName,
                numOvers: numOvers,
                team1name: team1name,
                team2name: team2name,
                team1arr: team1arr,
                team2arr: team2arr,
                tossWinTeam: tossWinTeam,
                tossWinDecision: tossWinDecision,
                menOnStrike: menOnStrike
            }
        }
        const Player_Schema = ({registered, _id, name, job}) => {
            return {
                status: {
                    registered: registered,
                    _id: _id ? _id : uuidv4(),
                    name: name,
                    job: job,
                },
            }
        }
        const url = `${domain}/auth/create-match`
        const data = {
            name: matchName,
            team1: {
                name: team1name,
                numPlayers: team1arr.length,
                players: team1arr.map(player => Player_Schema(player))
            },
            team2: {
                name: team2name,
                numPlayers: team2arr.length,
                players: team2arr.map(player => Player_Schema(player))
            },
            numOvers: Number(numOvers),
            tossWon: tossWinTeam === '0' ? team1name : team2name,
            tossDecision: tossWinDecision === '0' ? 'batting' : 'bowling',
            batting: tossWinDecision === '0' ? 
                    (tossWinTeam === '0' ? 'team1' : 'team2') : 
                    (tossWinTeam === '0' ? 'team2' : 'team1'),
            bowling: tossWinDecision === '1' ? 
                    (tossWinTeam === '0' ? 'team1' : 'team2') : 
                    (tossWinTeam === '0' ? 'team2' : 'team1'),
            menOnStrike: menOnStrike === '0' ? 'double' : 'single',
            location: locName ? locName : 'Unknown',
            heldBy: account._id,
            preset: temp
        }
        setLoading(true)
        try {
            await axios.post(url, data, {
                withCredentials: true
            })
            navigate('/dashboard/matches-history')
        } catch {} finally {
            setLoading(false)
        }
    }

    return (
        <div className={`overflow-hidden h-full w-full min-w-[360px] ${theme ? 'bg-[#ffffff]' : 'bg-[#1f1f1f]'}`}>
            <form
                className={`py-3 relative px-3 flex flex-col items-center overflow-x-hidden overflow-y-auto max-h-full ${theme ? '' : 'custom-scrollbar'}`}
                onSubmit={(e) => {e.preventDefault()}}
            >
                <div className={`flex gap-x-3 items-center w-full pb-5`}>
                    <h1 className={`${theme ? 'text-[#3b3b3b]' : 'text-[#CCCCCC]'} text-[1.3rem] 700:text-[2rem] font-robotoSans self-start`}>Create a new match</h1>
                    <div className={`flex items-center gap-x-1 700:gap-x-2`}>
                        <h1 className={`${theme ? 'text-[#3b3b3b]' : 'text-[#CCCCCC]'} text-[.7rem] 700:text-[1rem] leading-none font-robotoSans self-start`}>{'('}</h1>
                        <input
                            className={`w-[10px] 700:w-auto`}
                            type="checkbox"
                            checked={saveAsPreset}
                            onChange={(e) => {setSaveAsPreset(e.target.checked)}}
                        />
                        <h1 className={`${theme ? 'text-[#3b3b3b]' : 'text-[#CCCCCC]'} text-[.7rem] 700:text-[1rem] leading-none font-robotoSans self-start`}>Save this as a preset</h1>
                        <h1 className={`${theme ? 'text-[#3b3b3b]' : 'text-[#CCCCCC]'} text-[.7rem] 700:text-[1rem] leading-none font-robotoSans self-start`}>{')'}</h1>
                    </div>
                </div>
                {
                    saveAsPreset ? (
                        <Input label='preset name' autoFocus={true} placeholder='Enter preset name...' val={newPreset} set={setNewPreset}/>
                    )
                    : (
                        ''
                    )
                }
                <div className={`flex w-full gap-2 items-center mb-3`}>
                    <h1
                        className={`${theme ? 'text-[#3b3b3b]' : 'text-[#CCCCCC]'} ${theme ? 'bg-[#e2e2e2]' : 'bg-[#37373d]'} w-[105px] 700:w-[150px] font-mono rounded-md text-[.7rem] 700:text-[1rem] px-2 700:px-3 py-1 flex-shrink-0`}
                        style={{textAlign: "left" }}
                    >
                        applied preset
                    </h1>
                    <h1 className={`text-[#6d6d6d] font-[100] font-mono text-center flex-shrink-0`} style={{ width: "30px" }}>
                        :
                    </h1>
                    <select
                        className={`font-robotoSans px-2 py-1 ${theme ? 'bg-[#f8f8f8]' : 'bg-[#313131]'} ${theme ? 'text-[#3b3b3b]' : 'text-[#CCCCCC]'} text-[.7rem] 700:text-[.9rem] flex-grow rounded-sm border ${theme ? 'border-[#d5d5d5]' : 'border-[#313131]'} ${theme ? 'hover:bg-[#EEEEEE]' : 'hover:bg-[#363636]'} ${theme ? 'focus:border-[#005fb8]' : 'focus:border-[#0078d4]'} outline-none`}
                        onChange={(e) => {
                            if(e.target.value === '0') return
                            if(account) {
                                const arr = account.presets[Number(e.target.value) - 1]
                                setMatchName(arr.matchName)
                                setLocName(arr.locName)
                                setNumOvers(arr.numOvers)
                                setTeam1name(arr.team1name)
                                setTeam2name(arr.team2name)
                                setTeam1arr(arr.team1arr.map(item => ({...item})))
                                setTeam2arr(arr.team2arr.map(item => ({...item})))
                                setTossWinTeam(arr.tossWinTeam)
                                setTossWinDecision(arr.tossWinDecision)
                                setMenOnStrike(arr.menOnStrike)
                            }
                        }}
                    >
                        <option className={`font-robotoSans`} value='0'>none</option>
                        {account?.presets.map((element, index) => (
                            <option key={index} className={`font-robotoSans`} value={`${index + 1}`}>{element.presetName}</option>
                        ))}
                    </select>
                </div>
                {[
                    { label: "match name", placeholder: "Enter here..." },
                    { label: "location name", placeholder: "Enter here..." },
                    { label: "num overs", placeholder: "Enter here..." },
                    { label: "team-1 name", placeholder: "Enter here..." },
                    { label: "team-2 name", placeholder: "Enter here..." },
                ].map(({ label, placeholder }) => (
                    <Input key={label} label={label} autoFocus={label === 'match name' ? true : false} placeholder={placeholder} val={map[label][0]} set={map[label][1]}/>
                ))}
                <div className={`relative my-16 700:my-20 mb-10 700:mb-12 flex w-full`}>
                    <h1 className={`absolute w-full -top-8 700:-top-10 text-center ${theme ? 'text-[#3b3b3b]' : 'text-[#CCCCCC]'} ${theme ? 'bg-[#e2e2e2]' : 'bg-[#37373d]'} rounded-md text-[.7rem] 700:text-[1rem] px-2 700:px-3 py-1 font-mono`}>Add players (min {menOnStrike === '0' ? '2' : '1'})</h1>
                    <div className={`flex flex-col gap-y-2 700:gap-y-3 py-2 w-1/2 700:pl-1 pr-3 700:pr-4 border-r border-r-[#868686]`}>
                        <div className={`flex justify-center`}>
                            <h1 className={`text-center ${theme ? 'text-[#3b3b3b]' : 'text-[#CCCCCC]'} ${theme ? 'bg-[#e2e2e2]' : 'bg-[#37373d]'} w-[90px] 700:w-[150px] font-mono rounded-md text-[.7rem] 700:text-[1rem] px-2 700:px-3 py-1`}>{team1name ? team1name : 'team-1'}</h1>
                        </div>
                        <div className={`flex flex-col gap-2 items-center`}>
                            {team1arr.map((element, index) => (
                                !element.showBox ? (
                                    <PlayerInstance key={nanoid()} team='1' teamArr={team1arr} setTeamArr={setTeam1arr} index={index}/>
                                )
                                :
                                (
                                    <ShowBox key={nanoid()} SetShowBox={setShowBox1} Index={index} TeamArr={team1arr} setTeamArr={setTeam1arr} Registered={element.registered} Name={element.name || ''} Password={element.password || ''} Job={element.job || 'batter'}/>
                                )
                            ))}
                            {
                                !showBox1 ?
                                    <button
                                        onClick={() => {setShowBox1(true)}}
                                        className={`p-2 rounded-md ${theme ? 'hover:bg-[#dddddd]' : 'hover:bg-[#2F3030]'} active:brightness-[.8]`}
                                    >
                                        <PlusIcon/>
                                    </button>
                                :    
                                    <ShowBox SetShowBox={setShowBox1} Index={-1} TeamArr={team1arr} setTeamArr={setTeam1arr} Registered={false} Name={''} Password={''} Job={'batter'}/>
                            }
                        </div>
                    </div>
                    <div className={`flex flex-col gap-y-2 700:gap-y-3 py-2 w-1/2 700:pr-1 pl-3 700:pl-4`}>
                        <div className={`flex justify-center`}>
                            <h1 className={`text-center ${theme ? 'text-[#3b3b3b]' : 'text-[#CCCCCC]'} ${theme ? 'bg-[#e2e2e2]' : 'bg-[#37373d]'} w-[90px] 700:w-[150px] font-mono rounded-md text-[.7rem] 700:text-[1rem] px-2 700:px-3 py-1`}>{team2name ? team2name : 'team-2'}</h1>
                        </div>
                        <div className={`flex flex-col gap-2 items-center`}>
                            {team2arr.map((element, index) => (
                                !element.showBox ? (
                                    <PlayerInstance key={nanoid()} team='2' teamArr={team2arr} setTeamArr={setTeam2arr} index={index}/>
                                )
                                :
                                (
                                    <ShowBox key={nanoid()} SetShowBox={setShowBox2} Index={index} TeamArr={team2arr} setTeamArr={setTeam2arr} Registered={element.registered} Name={element.name || ''} Password={element.password || ''} Job={element.job || 'batter'}/>
                                )
                            ))}
                            {
                                !showBox2 ?
                                    <button
                                        onClick={() => {setShowBox2(true)}}
                                        className={`${showBox2 ? 'hidden' : ''} p-2 rounded-md ${theme ? 'hover:bg-[#dddddd]' : 'hover:bg-[#2F3030]'} active:brightness-[.8]`}
                                    >
                                        <PlusIcon/>
                                    </button>
                                :
                                    <ShowBox SetShowBox={setShowBox2} Index={-1} TeamArr={team2arr} setTeamArr={setTeam2arr} Registered={false} Name={''} Password={''} Job={'batter'}/>
                            }
                        </div>
                    </div>
                </div>
                <Select label='toss won' val={tossWinTeam} set={setTossWinTeam} options={[team1name ? team1name : 'team-1', team2name ? team2name : 'team-2']} />
                <Select label="team's toss decision" val={tossWinDecision} set={setTossWinDecision} options={['batting', 'bowling']} />
                <Select label='men on strike' val={menOnStrike} set={setMenOnStrike} options={['double', 'single']} />
                <button
                    disabled={isDisabled}
                    className={`my-10 700:mt-5 px-10 py-1 font-robotoSans text-[1rem] 700:text-[1.5rem] ${theme ? 'border-[#d5d5d5]' : 'border-[#3b3b3b]'} ${theme ? 'text-[#3b3b3b]' : 'text-[#CCCCCC]'} ${theme ? 'bg-[#ffffff]' : 'bg-[#1f1f1f]'} border rounded-sm ${isDisabled ? 'opacity-[.5] cursor-not-allowed' : 'rounded-sm hover:brightness-[.9] active:brightness-[.8]'}`}
                    onClick={createMatch}
                >
                    {!loading ? 'Submit' : <div className={`px-[16px] 700:px-[28px] py-[2px] 700:py-[8.5px]`}><Loading/></div>}
                </button>
            </form>
        </div>
    )
}