import { nanoid } from '@reduxjs/toolkit'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetch_match } from '../../../redux/Slices'
import Loading from '../../../assets/Loading'
import { useOutletContext } from 'react-router-dom'

const defVal = '- - choose - -'

function SelectTag({label, options, val, set}) {
    const theme = useSelector(state => state.globals.theme)
    return (
        <div className="flex w-full gap-2 items-center mb-3">
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
                className={`font-robotoSans px-2 py-1 ${theme ? 'bg-[#d5d5d5]' : 'bg-[#313131]'} ${theme ? 'text-[#3b3b3b]' : 'text-[#CCCCCC]'} text-[.7rem] 700:text-[.9rem] flex-grow rounded-sm border ${theme ? 'border-[#d5d5d5]' : 'border-[#313131]'} ${theme ? 'hover:bg-[#EEEEEE]' : 'hover:bg-[#363636]'} ${theme ? 'focus:border-[#005fb8]' : 'focus:border-[#0078d4]'} outline-none`}
                value={val}
                onChange={(e) => {set(e.target.value)}}
            >
                {options.map((element, index) => (
                    <option key={nanoid()} className={`font-robotoSans`} value={element}>{element}</option>
                ))}
            </select>
        </div>
    )
}

function InputTag({label, val, set, isWicket, wicketType, runsAmountErr}) {
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
                autoFocus
                type="text"
                placeholder={`Enter here...`}
                className={`font-robotoSans px-3 py-1 ${theme ? 'bg-[#d5d5d5]' : 'bg-[#313131]'} ${theme ? 'text-[#3b3b3b]' : 'text-[#CCCCCC]'} text-[.7rem] 700:text-[.9rem] flex-grow rounded-sm ${theme ? 'hover:bg-[#EEEEEE]' : 'hover:bg-[#363636]'} border ${runsAmountErr ? 'border-red-600' : (theme ? 'border-[#d5d5d5] focus:border-[#005fb8]' : 'border-[#313131] focus:border-[#0078d4]')} outline-none`}
                value={val}
                onChange={(e) => {
                    if(isWicket === 'Yes' && wicketType !== defVal && wicketType !== 'run out') set('0')
                    else set(e.target.value)
                }}
            />
        </div>
    )
}

function NormalBall({val, set, data}) {
    const _data = useSelector(state => state.dashboard.data)
    const { runsAmount, runsAccounted, isWicket, wicketType, catcher, changeEnds, whoIsOut, thrower, keeper, runsAmountErr } = val
    const { setRunsAmount, setRunsAccounted, setIsWicket, setWicketType, setCatcher, setChangeEnds, setWhoIsOut, setThrower, setKeeper } = set
    return (
        <>
            <SelectTag label='runs were' options={['made by batsman', 'byes']} val={runsAccounted} set={setRunsAccounted}/>
            <InputTag label='runs amount' val={runsAmount} set={setRunsAmount} isWicket={isWicket} wicketType={wicketType} runsAmountErr={runsAmountErr}/>
            <SelectTag label='wicket taken?' options={['No', 'Yes']} val={isWicket} set={setIsWicket}/>
            {(() => {
                if(isWicket === defVal) return (<></>)
                if(isWicket === 'Yes') {
                    return (
                        <>
                            <SelectTag label='wicket type' options={[defVal, 'bold', 'LBW', 'catch', 'run out', 'stumped']} val={wicketType} set={setWicketType}/>
                            {(() => {
                                if(wicketType === 'catch') return (
                                    <>
                                    <SelectTag label='player who catched the ball' options={[defVal, ...data.map(element => element.status.name)]} val={catcher} set={setCatcher}/>
                                    {_data.menOnStrike === 'double' ?
                                        <SelectTag label='change ends?' options={['No', 'Yes']} val={changeEnds} set={setChangeEnds}/>
                                        :
                                        <></>
                                    }
                                    </>
                                )
                                if(wicketType === 'run out') return (
                                    <>
                                        {_data.menOnStrike === 'double' ?
                                            <>
                                            <SelectTag label='who is out' options={[defVal, 'on-striker', 'non-striker']} val={whoIsOut} set={setWhoIsOut}/>
                                            <SelectTag label='thrower name' options={[defVal, ...data.map(element => element.status.name)]} val={thrower} set={setThrower}/>
                                            <SelectTag label='change ends?' options={['No', 'Yes']} val={changeEnds} set={setChangeEnds}/>
                                            </>
                                            :
                                            <></>
                                        }
                                        
                                    </>
                                )
                                if(wicketType === 'stumped') return (<SelectTag label='keeper name' options={[defVal, ...data.map(element => element.status.name)]} val={keeper} set={setKeeper}/>)
                            })()}
                        </>
                    )
                }
            })()}
        </>
    )
}

function WideBall({val, set, data}) {
    const _data = useSelector(state => state.dashboard.data)
    const { runsAmount, isWicket, wicketType, whoIsOut, thrower, changeEnds, keeper, runsAmountErr } = val
    const { setRunsAmount, setIsWicket, setWicketType, setWhoIsOut, setThrower, setChangeEnds, setKeeper } = set
    return (
        <>
            <InputTag label='runs amount from byes' val={runsAmount} set={setRunsAmount} isWicket={isWicket} wicketType={wicketType} runsAmountErr={runsAmountErr}/>
            <SelectTag label='wicket taken?' options={['No', 'Yes']} val={isWicket} set={setIsWicket}/>
            {(() => {
                if(isWicket === defVal) return (<></>)
                if(isWicket === 'Yes') {
                    return (
                        <>
                            <SelectTag label='wicket type' options={[defVal, 'run out', 'stumped']} val={wicketType} set={setWicketType}/>
                            {(() => {
                                if(wicketType === defVal) return (<></>)
                                if(wicketType === 'run out' && _data.menOnStrike === 'double') return (
                                    <>
                                        <SelectTag label='who is out' options={[defVal, 'on-striker', 'non-striker']} val={whoIsOut} set={setWhoIsOut}/>
                                        <SelectTag label='thrower name' options={[defVal, ...data.map(element => element.status.name)]} val={thrower} set={setThrower}/>
                                        <SelectTag label='change ends?' options={['No', 'Yes']} val={changeEnds} set={setChangeEnds}/>
                                    </>
                                )
                                if(wicketType === 'run out' && _data.menOnStrike === 'single') return (
                                    <>
                                        <SelectTag label='thrower name' options={[defVal, ...data.map(element => element.status.name)]} val={thrower} set={setThrower}/>
                                    </>
                                )
                                if(wicketType === 'stumped') return (<SelectTag label='keeper name' options={[defVal, ...data.map(element => element.status.name)]} val={keeper} set={setKeeper}/>)
                            })()}
                        </>
                    )
                }
            })()}
        </>
    )
}

function NoBall({val, set, data}) {
    const _data = useSelector(state => state.dashboard.data)
    const { runsAmount, runsAccounted, isWicket, wicketType, whoIsOut, thrower, changeEnds, keeper, runsAmountErr } = val
    const { setRunsAmount, setRunsAccounted, setIsWicket, setWicketType, setWhoIsOut, setThrower, setChangeEnds, setKeeper } = set
    return (
        <>
            <SelectTag label='runs were' options={['made by batsman', 'byes']} val={runsAccounted} set={setRunsAccounted}/>
            <InputTag label='runs amount' val={runsAmount} set={setRunsAmount} isWicket={isWicket} wicketType={wicketType} runsAmountErr={runsAmountErr}/>
            <SelectTag label='wicket taken?' options={['No', 'Yes']} val={isWicket} set={setIsWicket}/>
            {(() => {
                if(isWicket === defVal) return (<></>)
                if(isWicket === 'Yes') {
                    return (
                        <>
                            <SelectTag label='wicket type' options={[defVal, 'run out']} val={wicketType} set={setWicketType}/>
                            {(() => {
                                if(wicketType === defVal) return (<></>)
                                if(wicketType === 'run out' && _data.menOnStrike === 'double') return (
                                    <>
                                        <SelectTag label='who is out' options={[defVal, 'on-striker', 'non-striker']} val={whoIsOut} set={setWhoIsOut}/>
                                        <SelectTag label='thrower name' options={[defVal, ...data.map(element => element.status.name)]} val={thrower} set={setThrower}/>
                                        <SelectTag label='change ends?' options={['No', 'Yes']} val={changeEnds} set={setChangeEnds}/>
                                    </>
                                )
                                if(wicketType === 'run out' && _data.menOnStrike === 'single') return (
                                    <>
                                        <SelectTag label='thrower name' options={[defVal, ...data.map(element => element.status.name)]} val={thrower} set={setThrower}/>
                                    </>
                                )
                                if(wicketType === 'stumped') return (<SelectTag label='keeper name' options={[defVal, ...data.map(element => element.status.name)]} val={keeper} set={setKeeper}/>)
                            })()}
                        </>
                    )
                }
            })()}
        </>
    )
}

export default function TackScore() {
    const data = useSelector(state => state.dashboard.data)
    const theme = useSelector(state => state.globals.theme)
    const matchId = useOutletContext()
    const [ballType, setBallType] = useState(defVal)
    const [runsAccounted, setRunsAccounted] = useState('made by batsman')
    const [runsAmount, setRunsAmount] = useState('')
    const [runsAmountErr, setRunsAmountErr] = useState(false)
    const [isWicket, setIsWicket] = useState('No')
    const [wicketType, setWicketType] = useState(defVal)
    const [catcher, setCatcher] = useState(defVal) // catch
    const [changeEnds, setChangeEnds] = useState('No')
    const [whoIsOut, setWhoIsOut] = useState(defVal) // run-out (striker / non-striker)
    const [thrower, setThrower] = useState(defVal) // run-out (thrower name)
    const [keeper, setKeeper] = useState(defVal) // stumped
    const [isDisabled, setIsDisabled] = useState(true)

    const [onStrike, setOnStrike] = useState(defVal)
    const [nonStrike, setNonStrike] = useState(defVal)
    const [firstBowler, setFirstBowler] = useState(defVal)
    const [nextBatter, setNextBatter] = useState(defVal)
    const [nextBowler, setNextBowler] = useState(defVal)

    useEffect(() => {
        setRunsAccounted('made by batsman')
        setIsWicket('No')
        setWicketType(defVal)
        setCatcher(defVal)
        setWhoIsOut(defVal)
        setThrower(defVal)
        setKeeper(defVal)
    }, [ballType])

    useEffect(() => {
        setWicketType(defVal)
    }, [isWicket])

    useEffect(() => {
        if(wicketType !== defVal && wicketType !== 'run out') setRunsAmount('0')
        setChangeEnds('No')
        setCatcher(defVal)
        setWhoIsOut(defVal)
        setThrower(defVal)
        setKeeper(defVal)
    }, [wicketType])

    useEffect(() => {
        setRunsAmountErr(false)
    }, [runsAmount])

    const [numberOfActiveBatters, setNumberOfActiveBatters] = useState(0)
    const [numberOfActiveBowlers, setNumberOfActiveBowlers] = useState(0)
    useEffect(() => {
        let retVal = 0
        let i = data.innings[data.innings.first.active ? 'first' : 'second'].batting
        data.innings[data.innings.first.active ? 'first' : 'second'].current[i].players.forEach(item => {retVal += item.status.isBatting})
        setNumberOfActiveBatters(retVal)
        retVal = 0
        i = data.innings[data.innings.first.active ? 'first' : 'second'].bowling
        data.innings[data.innings.first.active ? 'first' : 'second'].current[i].players.forEach(item => {retVal += item.status.isBowling})
        setNumberOfActiveBowlers(retVal)
    }, [data])

    useEffect(() => {
        const curr = data?.innings[data.innings.first.active ? 'first' : 'second']
        
        if(data.menOnStrike === 'double') {
            if(numberOfActiveBatters === 0) {
                if(onStrike === defVal || nonStrike === defVal || firstBowler === defVal) setIsDisabled(true)
                else setIsDisabled(false)
            } else if(numberOfActiveBatters === 1) {
                if(numberOfActiveBowlers === 0) {
                    if(nextBowler === defVal || nextBatter === defVal) setIsDisabled(true)
                    else setIsDisabled(false)
                } else {
                    if(nextBatter === defVal) setIsDisabled(true)
                    else setIsDisabled(false)
                }
            } else {
                if(numberOfActiveBowlers === 0) {
                    if(nextBowler === defVal) setIsDisabled(true)
                    else setIsDisabled(false)
                } else {
                    if(ballType === defVal) setIsDisabled(true)
                    else {
                        if(runsAmount === '' || isNaN(runsAmount)) setIsDisabled(true)
                        else if(isWicket === 'No') setIsDisabled(false)
                        else {
                            if(wicketType === defVal) setIsDisabled(true)
                            if(wicketType === 'bold' || wicketType === 'LBW') setIsDisabled(false)
                            if(wicketType === 'catch') {
                                if(catcher !== defVal) setIsDisabled(false)
                                else setIsDisabled(true)
                            }
                            if(wicketType === 'run out') {
                                if(whoIsOut !== defVal && thrower !== defVal) setIsDisabled(false)
                                else setIsDisabled(true)
                            }
                            if(wicketType === 'stumped') {
                                if(keeper !== defVal) setIsDisabled(false)
                                else setIsDisabled(true)
                            }
                        }
                    }
                }
            }
        } else {
            if(numberOfActiveBatters === 0) {
                if(curr.current.stats.balls === 0) {
                    if(onStrike === defVal || firstBowler === defVal) setIsDisabled(true)
                    else setIsDisabled(false)
                } else {
                    if(numberOfActiveBowlers === 0) {
                        if(nextBatter === defVal || nextBowler === defVal) setIsDisabled(true)
                        else setIsDisabled(false)
                    } else {
                        if(nextBatter === defVal) setIsDisabled(true)
                        else setIsDisabled(false)
                    }
                }
            } else {
                if(numberOfActiveBowlers === 0) {
                    if(nextBowler === defVal) setIsDisabled(true)
                    else setIsDisabled(false)
                } else {
                    if(ballType === defVal) setIsDisabled(true)
                    else {
                        if(runsAmount === '' || isNaN(runsAmount)) setIsDisabled(true)
                        else if(isWicket === 'No') setIsDisabled(false)
                        else {
                            if(wicketType === defVal) setIsDisabled(true)
                            if(wicketType === 'bold' || wicketType === 'LBW') setIsDisabled(false)
                            if(wicketType === 'catch') {
                                if(catcher !== defVal) setIsDisabled(false)
                                else setIsDisabled(true)
                            }
                            if(wicketType === 'run out') {
                                if(thrower !== defVal) setIsDisabled(false)
                                else setIsDisabled(true)
                            }
                            if(wicketType === 'stumped') {
                                if(keeper !== defVal) setIsDisabled(false)
                                else setIsDisabled(true)
                            }
                        }
                    }
                }
            }
        }
    }, [ballType, runsAmount, isWicket, wicketType, catcher, whoIsOut, thrower, keeper, onStrike, nonStrike, firstBowler, nextBatter, nextBowler])

    const domain = useSelector(state => state.globals.domain)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const updateData = async () => {
    try {
        setLoading(true)
        const temp = JSON.parse(JSON.stringify(data))

        const curr = temp.innings[temp.innings.first.active ? 'first' : 'second']
        const players_batting = curr.current[curr.batting].players
        const players_bowling = curr.current[curr.bowling].players
        const stats = curr.current.stats
                            
        const inningsFinishCheck = (MenOnStrike) => {
            if(temp.innings.first.active) {
                if(
                    (stats.wickets === (MenOnStrike === 'd' ? players_batting.length - 1 : players_batting.length)) ||
                    (stats.balls === temp.numOvers * 6)
                ) {
                    temp.innings.first.active = false
                    temp.innings.second.active = true
                }
            } else {
                if(
                    (stats.wickets === (MenOnStrike === 'd' ? players_batting.length - 1 : players_batting.length)) ||
                    (stats.balls === temp.numOvers * 6) ||
                    (stats.runs > temp.innings.first.current.stats.runs)
                ) {
                    temp.isCompleted = true
                }
            }
        }

        if(temp.menOnStrike === 'double') {
            if(numberOfActiveBatters === 0) {
                players_batting.forEach(player => {
                    if(player.status.name === onStrike) {
                        player.status.isBatting = true
                        player.status.onStrike = true
                    }
                    if(player.status.name === nonStrike) {
                        player.status.isBatting = true
                    }
                })
                players_bowling.forEach(player => {
                    if(player.status.name === firstBowler) {
                        curr.overs.push([player.status.name])
                        player.status.isBowling = true
                    }
                })
            } else if(numberOfActiveBatters === 1) {
                if(numberOfActiveBowlers === 0) {
                    players_bowling.forEach(player => {
                        if(player.status.name === nextBowler) {
                            curr.overs.push([player.status.name])
                            player.status.isBowling = true
                        }
                    })
                }
                let strike;
                players_batting.forEach(player => {
                    if(player.status.isBatting) strike = !player.status.onStrike
                })
                players_batting.forEach(player => {
                    if(player.status.name === nextBatter) {
                        player.status.isBatting = true
                        player.status.onStrike = strike
                    }
                })
            } else {
                if(numberOfActiveBowlers === 0) {
                    players_bowling.forEach(player => {
                        if(player.status.name === nextBowler) {
                            curr.overs.push([player.status.name])
                            player.status.isBowling = true
                        }
                    })
                } else {
                    if(!runsAmount || isNaN(runsAmount)) {
                        setRunsAmountErr(true)
                        return
                    }
                    const runs = Number(runsAmount)
                    switch (ballType) {
                    case 'normal':
                        stats.runs += runs
                        if(runsAccounted !== 'made by batsman') stats.extras.byes += runs
                        stats.balls += 1
                        curr.runs_balls.push({
                            runs: stats.runs,
                            balls: stats.balls
                        })
                        stats.crr = stats.balls === 0 ? 0 : (stats.runs / stats.balls) * 6;
                        stats.fours += (runs === 4)
                        stats.sixes += (runs === 6)

                        players_batting.forEach(player => {
                            if(player.status.isBatting) {
                                if(player.status.onStrike) {
                                    player.status.onStrike = !(runs & 1)
                                    player.batting.balls_played += 1
                                    if(runsAccounted === 'made by batsman') {
                                        player.batting.runs_scored += runs
                                        player.batting.total_fours += (runs === 4)
                                        player.batting.total_sixes += (runs === 6)
                                    }
                                    player.batting.strike_rate= player.batting.runs_scored /
                                                                player.batting.balls_played
                                                                * 100
                                } else {
                                    player.status.onStrike = runs & 1
                                }
                            }
                        })
                        players_bowling.forEach(player => {
                            if(player.status.isBowling) {
                                player.bowling.balls_bowled += 1
                                if(runsAccounted === 'made by batsman') {
                                    player.bowling.runs_conceded += runs
                                    player.bowling.fours_conceded += (runs === 4)
                                    player.bowling.sixes_conceded += (runs === 6)
                                }
                                player.bowling.dot_balls_bowled += (runs === 0)
                                player.bowling.economy_rate=player.bowling.runs_conceded /
                                                            player.bowling.balls_bowled
                                                            * 6
                                player.bowling.strike_rate= player.bowling.wickets_taken === 0 ?
                                                            0 : 
                                                            player.bowling.balls_bowled / player.bowling.wickets_taken
                            }
                        })
                        if(isWicket === 'Yes') {
                            stats.wickets += 1
                            curr.overs[curr.overs.length - 1].push('Wckt')

                            switch (wicketType) {
                            case 'bold':
                            case 'LBW':
                            case 'catch':
                            case 'stumped':
                                let bowlerName = '????'
                                players_bowling.forEach(player => {
                                    if(player.status.isBowling) {
                                        bowlerName = player.status.name
                                        player.bowling.wickets_taken += 1
                                        player.bowling.strike_rate= player.bowling.balls_bowled /
                                                                    player.bowling.wickets_taken
                                    }
                                })
                                players_batting.forEach(player => {
                                    if(player.status.isBatting
                                    && player.status.onStrike) {
                                        player.status.isBatting = false
                                        player.status.onStrike = false
                                        player.status.isTaken = (() => {
                                            let s = `b ${bowlerName}`
                                            if(wicketType === 'catch') s += `, c ${catcher}`
                                            if(wicketType === 'Stumped') s += `, stmp ${keeper}`
                                            return `[${Math.floor(stats.balls / 6)}.${stats.balls % 6}] ` + s
                                        })()
                                    }
                                })
                                if(wicketType === 'catch') {
                                    if(changeEnds === 'Yes') {
                                        players_batting.forEach(player => {
                                            if(player.status.isBatting) {
                                                player.status.onStrike = !player.status.onStrike
                                            }
                                        })
                                    }
                                }
                                break;
                            case 'run out':
                                players_batting.forEach(player => {
                                    if (player.status.isBatting) {
                                        const isOut = (whoIsOut === 'on-striker' && player.status.onStrike) || 
                                                      (whoIsOut === 'non-striker' && !player.status.onStrike);
                                
                                        if (isOut) {
                                            player.status.isBatting = false;
                                            player.status.onStrike = false;
                                            player.status.isTaken = `[${Math.floor(stats.balls / 6)}.${stats.balls % 6}] run out ${thrower}`;
                                        }
                                    }
                                })
                                if(changeEnds === 'Yes') {
                                    players_batting.forEach(player => {
                                        if(player.status.isBatting) {
                                            player.status.onStrike = !player.status.onStrike
                                        }
                                    })
                                }
                                break;
                            default:
                                break;
                            }
                        } else {
                            curr.overs[curr.overs.length - 1].push(`${runs}`)
                        }

                        inningsFinishCheck('d')

                        if(stats.balls % 6 === 0) {
                            players_batting.forEach(player => {
                                if(player.status.isBatting) {
                                    player.status.onStrike = !player.status.onStrike
                                }
                            })
                            players_bowling.forEach(player => {
                                if(player.status.isBowling) {
                                    player.status.isBowling = false
                                }
                            })
                        }
                        break;
                    case 'wide':
                        stats.runs += runs + 1
                        stats.extras.wides += 1
                        stats.extras.byes += runs
                        stats.crr = stats.balls === 0 ? 0 : (stats.runs / stats.balls) * 6;
                        stats.fours += (runs === 4)
                        stats.sixes += (runs === 6)

                        players_batting.forEach(player => {
                            if(player.status.isBatting) {
                                if(player.status.onStrike) {
                                    player.status.onStrike = !(runs & 1)
                                } else {
                                    player.status.onStrike = runs & 1
                                }
                            }
                        })
                        if(isWicket === 'Yes') {
                            stats.wickets += 1
                            curr.overs[curr.overs.length - 1].push(`Wd(${runs}),Wckt`)

                            switch (wicketType) {
                            case 'stumped':
                                let bowlerName = '????'
                                players_bowling.forEach(player => {
                                    if(player.status.isBowling) {
                                        bowlerName = player.status.name
                                        player.bowling.wickets_taken += 1
                                        player.bowling.strike_rate= player.bowling.balls_bowled /
                                                                    player.bowling.wickets_taken

                                    }
                                })
                                players_batting.forEach(player => {
                                    if(player.status.isBatting
                                    && player.status.onStrike) {
                                        player.status.isBatting = false
                                        player.status.onStrike = false
                                        player.status.isTaken = `[${Math.floor(stats.balls / 6)}.${stats.balls % 6}] b ${bowlerName}, stmp ${keeper}`
                                    }
                                })
                                break;
                            case 'run out':
                                players_batting.forEach(player => {
                                    if (player.status.isBatting) {
                                        const isOut = (whoIsOut === 'on-striker' && player.status.onStrike) || 
                                                      (whoIsOut === 'non-striker' && !player.status.onStrike);
                                
                                        if (isOut) {
                                            player.status.isBatting = false;
                                            player.status.onStrike = false;
                                            player.status.isTaken = `[${Math.floor(stats.balls / 6)}.${stats.balls % 6}] run out ${thrower}`;
                                        }
                                    }
                                })
                                if(changeEnds === 'Yes') {
                                    players_batting.forEach(player => {
                                        if(player.status.isBatting) {
                                            player.status.onStrike = !player.status.onStrike
                                        }
                                    })
                                }
                                break;
                            default:
                                break;
                            }
                        } else {
                            curr.overs[curr.overs.length - 1].push(`Wd(${runs})`)
                        }

                        inningsFinishCheck('d')
                        break;
                    case 'no-ball':
                        stats.runs += runs + 1
                        stats.extras.noBalls += 1
                        if(runsAccounted !== 'made by batsman') stats.extras.byes += runs
                        stats.crr = stats.balls === 0 ? 0 : (stats.runs / stats.balls) * 6;
                        stats.fours += (runs === 4)
                        stats.sixes += (runs === 6)

                        players_batting.forEach(player => {
                            if(player.status.isBatting) {
                                if(player.status.onStrike) {
                                    player.status.onStrike = !(runs & 1)
                                    if(runsAccounted === 'made by batsman') {
                                        player.batting.runs_scored += runs
                                        player.batting.total_fours += (runs === 4)
                                        player.batting.total_sixes += (runs === 6)
                                    }
                                    player.batting.strike_rate= player.batting.runs_scored /
                                                                player.batting.balls_played
                                                                * 100
                                } else {
                                    player.status.onStrike = runs & 1
                                }
                            }
                        })
                        players_bowling.forEach(player => {
                            if(player.status.isBowling) {
                                player.bowling.runs_conceded += 1
                                if(runsAccounted === 'made by batsman') {
                                    player.bowling.runs_conceded += runs
                                    player.bowling.fours_conceded += (runs === 4)
                                    player.bowling.sixes_conceded += (runs === 6)
                                }
                                player.bowling.economy_rate=player.bowling.runs_conceded /
                                                            player.bowling.balls_bowled
                                                            * 6
                            }
                        })
                        if(isWicket === 'Yes') {
                            stats.wickets += 1
                            curr.overs[curr.overs.length - 1].push(`Nb(${runs}),Wckt`)

                            switch (wicketType) {
                            case 'run out':
                                players_batting.forEach(player => {
                                    if (player.status.isBatting) {
                                        const isOut = (whoIsOut === 'on-striker' && player.status.onStrike) || 
                                                      (whoIsOut === 'non-striker' && !player.status.onStrike);
                                
                                        if (isOut) {
                                            player.status.isBatting = false;
                                            player.status.onStrike = false;
                                            player.status.isTaken = `[${Math.floor(stats.balls / 6)}.${stats.balls % 6}] run out ${thrower}`;
                                        }
                                    }
                                })
                                if(changeEnds === 'Yes') {
                                    players_batting.forEach(player => {
                                        if(player.status.isBatting) {
                                            player.status.onStrike = !player.status.onStrike
                                        }
                                    })
                                }
                                break;
                            default:
                                break;
                            }
                        } else {
                            curr.overs[curr.overs.length - 1].push(`Nb(${runs})`)
                        }

                        inningsFinishCheck('d')
                        break;
                    default:
                        break;
                    }
                }
            }
        }
        
        else {
            if(numberOfActiveBatters === 0) {
                if(stats.balls === 0) {
                    players_batting.forEach(player => {
                        if(player.status.name === onStrike) {
                            player.status.isBatting = true
                        }
                    })
                    players_bowling.forEach(player => {
                        if(player.status.name === firstBowler) {
                            curr.overs.push([player.status.name])
                            player.status.isBowling = true
                        }
                    })
                } else {
                    if(numberOfActiveBowlers === 0) {
                        players_bowling.forEach(player => {
                            if(player.status.name === nextBowler) player.status.isBowling = true
                        })
                    }
                    players_batting.forEach(player => {
                        if(player.status.name === nextBatter) {
                            player.status.isBatting = true
                        }
                    })
                }
            } else {
                if(numberOfActiveBowlers === 0) {
                    players_bowling.forEach(player => {
                        if(player.status.name === nextBowler) {
                            curr.overs.push([player.status.name])
                            player.status.isBowling = true
                        }
                    })
                } else {
                    if(!runsAmount || isNaN(runsAmount)) {
                        setRunsAmountErr(true)
                        return
                    }
                    const runs = Number(runsAmount)
                    switch (ballType) {
                    case 'normal':
                        stats.runs += runs
                        if(runsAccounted !== 'made by batsman') stats.extras.byes += runs
                        stats.balls += 1
                        curr.runs_balls.push({
                            runs: stats.runs,
                            balls: stats.balls
                        })
                        stats.crr = stats.balls === 0 ? 0 : (stats.runs / stats.balls) * 6;
                        stats.fours += (runs === 4)
                        stats.sixes += (runs === 6)

                        players_batting.forEach(player => {
                            if(player.status.isBatting) {
                                player.batting.balls_played += 1
                                if(runsAccounted === 'made by batsman') {
                                    player.batting.runs_scored += runs
                                    player.batting.total_fours += (runs === 4)
                                    player.batting.total_sixes += (runs === 6)
                                }
                                player.batting.strike_rate= player.batting.runs_scored /
                                                            player.batting.balls_played
                                                            * 100
                            }
                        })
                        players_bowling.forEach(player => {
                            if(player.status.isBowling) {
                                player.bowling.balls_bowled += 1
                                if(runsAccounted === 'made by batsman') {
                                    player.bowling.runs_conceded += runs
                                    player.bowling.fours_conceded += (runs === 4)
                                    player.bowling.sixes_conceded += (runs === 6)
                                }
                                player.bowling.dot_balls_bowled += (runs === 0)
                                player.bowling.economy_rate=player.bowling.runs_conceded /
                                                            player.bowling.balls_bowled
                                                            * 6
                                player.bowling.strike_rate= player.bowling.wickets_taken === 0 ?
                                                            0 : 
                                                            player.bowling.balls_bowled / player.bowling.wickets_taken
                            }
                        })
                        if(isWicket === 'Yes') {
                            stats.wickets += 1
                            curr.overs[curr.overs.length - 1].push(`Wckt`)

                            switch (wicketType) {
                            case 'bold':
                            case 'LBW':
                            case 'catch':
                            case 'stumped':
                                let bowlerName = '????'
                                players_bowling.forEach(player => {
                                    if(player.status.isBowling) {
                                        bowlerName = player.status.name
                                        player.bowling.wickets_taken += 1
                                        player.bowling.strike_rate= player.bowling.balls_bowled /
                                                                    player.bowling.wickets_taken
                                    }
                                })
                                players_batting.forEach(player => {
                                    if(player.status.isBatting) {
                                        player.status.isBatting = false
                                        player.status.isTaken = (() => {
                                            let s = `b ${bowlerName}`
                                            if(wicketType === 'catch') s += `, c ${catcher}`
                                            if(wicketType === 'Stumped') s += `, stmp ${keeper}`
                                            return `[${Math.floor(stats.balls / 6)}.${stats.balls % 6}] ` + s
                                        })()
                                    }
                                })
                                break;
                            case 'run out':
                                players_batting.forEach(player => {
                                    if(player.status.isBatting) {
                                        player.status.isBatting = false
                                        player.status.isTaken = `[${Math.floor(stats.balls / 6)}.${stats.balls % 6}] run out ${thrower}`
                                    }
                                })
                                break;
                            default:
                                break;
                            }
                        } else {
                            curr.overs[curr.overs.length - 1].push(`${runs}`)
                        }

                        inningsFinishCheck('s')

                        if(stats.balls % 6 === 0) {
                            players_bowling.forEach(player => {
                                if(player.status.isBowling) {
                                    player.status.isBowling = false
                                }
                            })
                        }
                        break;
                    case 'wide':
                        stats.runs += runs + 1
                        stats.extras.wides += 1
                        stats.extras.byes += runs
                        stats.crr = stats.balls === 0 ? 0 : (stats.runs / stats.balls) * 6;
                        stats.fours += (runs === 4)
                        stats.sixes += (runs === 6)

                        if(isWicket === 'Yes') {
                            stats.wickets += 1
                            curr.overs[curr.overs.length - 1].push(`Wd(${runs}),Wckt`)
                            
                            switch (wicketType) {
                            case 'stumped':
                                let bowlerName = '????'
                                players_bowling.forEach(player => {
                                    if(player.status.isBowling) {
                                        bowlerName = player.status.name
                                        player.bowling.wickets_taken += 1
                                        player.bowling.strike_rate= player.bowling.balls_bowled /
                                                                    player.bowling.wickets_taken
                                    }
                                })
                                players_batting.forEach(player => {
                                    if(player.status.isBatting) {
                                        player.status.isBatting = false
                                        player.status.isTaken = `b ${bowlerName}, stmp ${keeper}`
                                    }
                                })
                                break;
                            case 'run out':
                                players_batting.forEach(player => {
                                    if(player.status.isBatting) {
                                        player.status.isBatting = false
                                        player.status.isTaken = `[${Math.floor(stats.balls / 6)}.${stats.balls % 6}] run out ${thrower}`
                                    }
                                })
                                break;
                            default:
                                break;
                            }
                        } else {
                            curr.overs[curr.overs.length - 1].push(`Wd(${runs})`)
                        }

                        inningsFinishCheck('s')
                        break;
                    case 'no-ball':
                        stats.runs += runs + 1
                        stats.extras.noBalls += 1
                        if(runsAccounted !== 'made by batsman') stats.extras.byes += runs
                        stats.crr = stats.balls === 0 ? 0 : (stats.runs / stats.balls) * 6;
                        stats.fours += (runs === 4)
                        stats.sixes += (runs === 6)

                        players_batting.forEach(player => {
                            if(player.status.isBatting) {
                                if(runsAccounted === 'made by batsman') {
                                    player.batting.runs_scored += runs
                                    player.batting.total_fours += (runs === 4)
                                    player.batting.total_sixes += (runs === 6)
                                }
                                player.batting.strike_rate= player.batting.runs_scored /
                                                            player.batting.balls_played
                                                            * 100
                            }
                        })
                        players_bowling.forEach(player => {
                            if(player.status.isBowling) {
                                player.bowling.runs_conceded += 1
                                if(runsAccounted === 'made by batsman') {
                                    player.bowling.runs_conceded += runs
                                    player.bowling.fours_conceded += (runs === 4)
                                    player.bowling.sixes_conceded += (runs === 6)
                                }
                                player.bowling.economy_rate=player.bowling.runs_conceded /
                                                            player.bowling.balls_bowled
                                                            * 6
                            }
                        })
                        if(isWicket === 'Yes') {
                            stats.wickets += 1
                            curr.overs[curr.overs.length - 1].push(`Nb(${runs}),Wckt`)

                            switch (wicketType) {
                            case 'run out':
                                players_batting.forEach(player => {
                                    if(player.status.isBatting) {
                                        player.status.isBatting = false
                                        player.status.isTaken = `[${Math.floor(stats.balls / 6)}.${stats.balls % 6}] run out ${thrower}`
                                    }
                                })
                                break;
                            default:
                                break;
                            }
                        } else {
                            curr.overs[curr.overs.length - 1].push(`Nb(${runs})`)
                        }
                        
                        inningsFinishCheck('s')
                        break;
                    default:
                        break;
                    }
                }
            }
        }

        const { _id, ..._data } = temp
        await axios.put(`${domain}/auth/update-match/${_id}`, {
            data: _data
        }, {
            withCredentials: true
        })
        dispatch(fetch_match(temp))
        setBallType(defVal)
        setRunsAmount('')
        setOnStrike(defVal)
        setNonStrike(defVal)
        setFirstBowler(defVal)
        setNextBatter(defVal)
        setNextBowler(defVal)
    } catch(error) {
        console.error(error)
    } finally {
        setLoading(false)
    }
    }
 

    return (
        <div className={`overflow-hidden h-full w-full min-w-[360px]`}>
            {data.isCompleted ?
                <div className={`font-[100] flex items-center justify-center h-full w-full min-w-[360px]`}>
                    <h1 className={`text-center font-robotoSans 700:text-[1.5rem] ${theme ? 'text-[#3b3b3b88]' : 'text-[#CCCCCC88]'}`}>The match is already Completed,<br/>{(() => {
                        if(data.innings.second.current.stats.runs === data.innings.first.current.stats.runs) {
                            return 'match draw.'
                        } else if(data.innings.second.current.stats.runs > data.innings.first.current.stats.runs) {
                            const winningTeam = data[data.innings.second.batting]
                            return `${winningTeam} won by ${data.innings.second.current[data.innings.second.batting].numPlayers - data.innings.second.current.stats.wickets - 1} wickets.`
                        } else {
                            const winningTeam = data[data.innings.second.bowling]
                            return `${winningTeam} won by ${data.innings.first.current.stats.runs - data.innings.second.current.stats.runs} runs.`
                        }
                    })()}</h1>
                </div>
                :
                <form
                    className={`py-3 relative px-3 flex flex-col items-center overflow-x-hidden overflow-y-auto max-h-full custom-scrollbar`}
                    onSubmit={(e) => {e.preventDefault()}}
                >
                    <h1 className={`w-full pb-3 700:pb-5 700:text-[1.5rem] ${theme ? 'text-[#3b3b3b]' : 'text-[#CCCCCC]'} font-robotoSans`}>Innings <b className='font-robotoSans font-extrabold'>{data.innings.first.active ? '#1' : '#2'}</b> {`(${Math.floor(data.innings[data.innings.first.active ? 'first' : 'second'].current.stats.balls / 6)}${data.innings[data.innings.first.active ? 'first' : 'second'].current.stats.balls % 6 ? `.${data.innings[data.innings.first.active ? 'first' : 'second'].current.stats.balls % 6}` : ''})`}</h1>
                    {data.menOnStrike === 'double' ? (
                        <>{(() => {
                            const curr = data?.innings[data.innings.first.active ? 'first' : 'second']
                            if(numberOfActiveBatters === 0) {
                                return (<>
                                    <SelectTag label='choose striker' options={[defVal, ...curr?.current[curr.batting].players.map(i => i.status.name)]} val={onStrike} set={setOnStrike}/>
                                    <SelectTag label='choose non-striker' options={[defVal, ...curr?.current[curr.batting].players.map(i => i.status.name).filter(name => name !== onStrike)]} val={nonStrike} set={setNonStrike}/>
                                    <SelectTag label='choose first bowler' options={[defVal, ...curr?.current[curr.bowling].players.map(i => i.status.name)]} val={firstBowler} set={setFirstBowler}/>
                                </>)
                            } else if(numberOfActiveBatters === 1) {
                                return (<>
                                    {numberOfActiveBowlers === 0 ?
                                        <SelectTag label='choose next bowler' options={[defVal, ...curr?.current[curr.bowling].players.map(i => i.status.name)]} val={nextBowler} set={setNextBowler}/>
                                        :
                                        <></>
                                    }
                                    <SelectTag label='choose next batter' options={[defVal, ...curr?.current[curr.batting].players.filter(i => !i.status.isBatting && !i.status.isTaken).map(i => i.status.name)]} val={nextBatter} set={setNextBatter}/>
                                </>)
                            } else {
                                if(numberOfActiveBowlers === 0) {
                                    return (
                                        <SelectTag label='choose next bowler' options={[defVal, ...curr?.current[curr.bowling].players.filter(i => !i.status.isBowling).map(i => i.status.name)]} val={nextBowler} set={setNextBowler}/>
                                    )
                                }
                                else {
                                    return (<>
                                        <SelectTag label='ball type' options={[defVal, 'normal', 'wide', 'no-ball']} val={ballType} set={setBallType}/>
                                        {(() =>  {
                                            switch (ballType) {
                                                case defVal:
                                                    return (<></>)
                                                case 'normal':
                                                    return (<NormalBall data={curr?.current[curr.bowling].players} val={{runsAccounted, isWicket, wicketType, runsAmount, catcher ,changeEnds, whoIsOut, thrower, keeper}} set={{setRunsAccounted, setIsWicket, setWicketType, setRunsAmount, setCatcher ,setChangeEnds, setWhoIsOut, setThrower, setKeeper}}/>)
                                                case 'wide':
                                                    return (<WideBall data={curr?.current[curr.bowling].players} val={{runsAccounted, isWicket, wicketType, runsAmount, whoIsOut, thrower, keeper}} set={{setRunsAccounted, setIsWicket, setWicketType, setRunsAmount, setWhoIsOut, setThrower, setKeeper}}/>)
                                                case 'no-ball':
                                                    return (<NoBall data={curr?.current[curr.bowling].players} val={{runsAccounted, isWicket, wicketType, runsAmount, whoIsOut, thrower, keeper}} set={{setRunsAccounted ,setIsWicket, setWicketType, setRunsAmount, setWhoIsOut, setThrower, setKeeper}}/>)
                                            }
                                        })()}
                                    </>)
                                }
                            }
                        })()}</>
                    )
                    : (
                        <>{(() => {
                            const curr = data?.innings[data.innings.first.active ? 'first' : 'second']
                            if(numberOfActiveBatters === 0) {
                                if(curr.current.stats.balls === 0) {
                                    return (<>
                                        <SelectTag label='choose striker' options={[defVal, ...curr?.current[curr.batting].players.map(i => i.status.name)]} val={onStrike} set={setOnStrike}/>
                                        <SelectTag label='choose first bowler' options={[defVal, ...curr?.current[curr.bowling].players.map(i => i.status.name)]} val={firstBowler} set={setFirstBowler}/>
                                    </>)
                                } else {
                                    return (<>
                                        {numberOfActiveBowlers === 0 ?
                                            <SelectTag label='choose next bowler' options={[defVal, ...curr?.current[curr.bowling].players.map(i => i.status.name)]} val={nextBowler} set={setNextBowler}/>
                                            :
                                            <></>
                                        }
                                        <SelectTag label='choose next batter' options={[defVal, ...curr?.current[curr.batting].players.filter(i => !i.status.isBatting && !i.status.isTaken).map(i => i.status.name)]} val={nextBatter} set={setNextBatter}/>
                                    </>)
                                }
                            } else {
                                if(numberOfActiveBowlers === 0) {
                                    return (
                                        <SelectTag label='choose next bowler' options={[defVal, ...curr?.current[curr.bowling].players.filter(i => !i.status.isBowling).map(i => i.status.name)]} val={nextBowler} set={setNextBowler}/>
                                    )
                                }
                                else {
                                    return (<>
                                        <SelectTag label='ball type' options={[defVal, 'normal', 'wide', 'no-ball']} val={ballType} set={setBallType}/>
                                        {(() => {
                                            switch (ballType) {
                                                case defVal:
                                                    return (<></>)
                                                case 'normal':
                                                    return (<NormalBall data={curr?.current[curr.bowling].players} val={{runsAccounted, isWicket, wicketType, runsAmount, catcher, whoIsOut, thrower, keeper, runsAmountErr}} set={{setRunsAccounted, setIsWicket, setWicketType, setRunsAmount, setCatcher, setWhoIsOut, setThrower, setKeeper}}/>)
                                                case 'wide':
                                                    return (<WideBall data={curr?.current[curr.bowling].players} val={{runsAccounted, isWicket, wicketType, runsAmount, whoIsOut, thrower, changeEnds, keeper, runsAmountErr}} set={{setRunsAccounted, setIsWicket, setWicketType, setRunsAmount, setWhoIsOut, setThrower, setChangeEnds, setKeeper}}/>)
                                                case 'no-ball':
                                                    return (<NoBall data={curr?.current[curr.bowling].players} val={{runsAccounted, isWicket, wicketType, runsAmount, whoIsOut, thrower, changeEnds, keeper, runsAmountErr}} set={{setRunsAccounted ,setIsWicket, setWicketType, setRunsAmount, setWhoIsOut, setThrower, setChangeEnds, setKeeper}}/>)
                                            }
                                        })()}
                                    </>)
                                }
                            }
                        })()}</>
                    )}
                    <button
                        className={`animate-showUpFast flex items-center justify-center ${isDisabled ? 'hidden' : ''} min-w-[135px] w-[135x] 700:w-[148px] h-[35px] my-10 700:mt-5 px-7 py-1 font-robotoSans text-[1rem] 700:text-[1.2rem] ${theme ? 'border-[#d5d5d5]' : 'border-[#3b3b3b]'} ${theme ? 'text-[#3b3b3b]' : 'text-[#CCCCCC]'} border rounded-sm hover:brightness-[.9] active:brightness-[.8]`}
                        onClick={updateData}
                    >
                        {!loading ? 'Proceed →' : <Loading/>}
                    </button>
                </form>
            }
        </div>
    )
}