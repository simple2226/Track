import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Batter from '../../../assets/Batter'
import Bowler from '../../../assets/Bowler'

export default function D_Squads() {
    const theme = useSelector(state => state.globals.theme)
    const data = useSelector(state => state.dashboard.data)
    const team1_batting = data.innings[data.innings.first.batting === 'team1' ? 'first' : 'second'].current.team1.players
    const team1_bowling = data.innings[data.innings.first.bowling === 'team1' ? 'first' : 'second'].current.team1.players
    const team2_batting = data.innings[data.innings.first.batting === 'team2' ? 'first' : 'second'].current.team2.players
    const team2_bowling = data.innings[data.innings.first.bowling === 'team2' ? 'first' : 'second'].current.team2.players
    const [a1, b1] = useState(false)
    const [a2, b2] = useState(false)
    const [expandedPlayers1, setExpandedPlayers1] = useState({});
    const [expandedPlayers2, setExpandedPlayers2] = useState({});
    const togglePlayer1 = (index) => {
        setExpandedPlayers1(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };
    const togglePlayer2 = (index) => {
        setExpandedPlayers2(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };
    return (
        <div className={`p-3 flex flex-col gap-y-2 h-[100vh] w-full overflow-y-auto ${theme ? 'text-[#3b3b3b]' : 'text-[#CCCCCC]'} ${theme ? '' : 'custom-scrollbar'}`}>
            <div className={`w-full border ${theme ? 'border-[#bbbbbb88]' : 'border-[#99999988]'}`}>
                <div className={`p-1 700:p-2 flex gap-x-1 700:gap-x-2 items-center w-full`}>
                    <div
                        className={`transition duration-75 ease-in-out hover:brightness-[2] 700:px-1 scale-[.75] 700:scale-[1] cursor-pointer ${a1 ? 'rotate-[180deg]' : 'pt-1'}`}
                        onClick={() => {
                            b1(!a1)
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={theme ? '#3b3b3b' : '#CCCCCC'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </div>
                    <h1 className={`select-none font-robotoSans font-[100] text-[1.2rem] 700:text-[1.6rem]`}>Team 1 - <span className='font-robotoSans font-semibold underline'>{data.team1}</span></h1>
                </div>
                <div className={`flex flex-col overflow-hidden ${a1 ? 'p-2' : 'h-0'} gap-y-[.35rem] w-full transition duration-75 ease-in-out`}>
                    {team1_batting.map((player, index) => (
                        <div key={index} className={`${theme ? (player.status.isBatting ? 'bg-[#f3f3f3]' : '') : (player.status.isBatting ? 'bg-[#2f2f2f]' : '')} flex flex-col w-full border ${theme ? 'border-[#bbbbbb80]' : 'border-[#99999960]'}`}>
                            <div className={`flex w-full items-center gap-x-1 px-1 py-1 700:py-2`}>
                                <div
                                    className={`transition duration-75 ease-in-out hover:brightness-[2] 700:px-1 scale-[.65] 700:scale-[.9] cursor-pointer ${expandedPlayers1[index] ? 'rotate-[180deg] pt-1' : 'pt-1'}`}
                                    onClick={() => togglePlayer1(index)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={theme ? '#3b3b3b' : '#CCCCCC'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M6 9l6 6 6-6"/>
                                    </svg>
                                </div>
                                <div className='scale-[.8] 700:scale-[1]'>
                                    {player.status.job === 'bowler' ?
                                        <Bowler size='18px' fill={theme ? '#3b3b3b' : '#CCCCCC'}/>
                                        :
                                        <Batter batter={player.status.job === 'batter'} size='18px' fill={theme ? '#3b3b3b' : '#CCCCCC'}/>
                                    }
                                </div>
                                <h1 className='font-robotoSans font-[100] text-[.8rem] 700:text-[1rem]'>
                                    {player.status.name}&nbsp;&nbsp;
                                    <i className={`font-robotoSans ${!theme ? 'text-[#CCCCCC50]' : 'text-black font-[400]'}`}>
                                        {(() => {
                                            let pl = null
                                            team1_batting.forEach(item => {
                                                if(pl === null && item.status.name === player.status.name)
                                                    pl = item.status
                                            })
                                            if(pl.isTaken != '') return `${pl.isTaken}`
                                            else if(pl.isBatting) return 'not out'
                                            return 'did not bat yet'
                                        })()}
                                    </i>
                                </h1>
                            </div>
                            <div className={`overflow-hidden ${expandedPlayers1[index] ? '' : 'h-0'} flex w-full ${theme ? 'bg-[#f3f3f3]' : 'bg-[#252525]'}`}>
                                <div className={`flex flex-col w-1/2 items-center border-t border-r ${theme ? 'border-[#3b3b3b66]' : 'border-[#999999]'}`}>
                                    <h1 className='font-robotoSans text-[.8rem] 700:text-[1rem] font-semibold'>Batting</h1>
                                    <div className={`py-2 px-4 w-full`}>
                                        {(() => {
                                            let pl = null
                                            team1_batting.forEach(item => {
                                                if(pl === null && item.status.name === player.status.name)
                                                    pl = item.batting
                                            })
                                            return [
                                                ['Runs', pl.runs_scored],
                                                ['Balls', pl.balls_played],
                                                ['Strike rate', pl.strike_rate.toFixed(2)],
                                                ['4\'s', pl.total_fours],
                                                ['6\'s', pl.total_sixes],
                                            ]
                                        })().map((item, index) => (
                                            <div key={index} className={`px-[2px] font-[100] flex justify-between w-full border border-transparent ${theme ? 'hover:border-[#3b3b3b90]' : 'hover:border-[#CCCCCC]'}`}>
                                                <h1 className='font-robotoSans text-[.8rem] 700:text-[1rem]'>{item[0]}</h1>
                                                <h1 className='font-robotoSans text-[.8rem] 700:text-[1rem]'>{item[1]}</h1>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className={`flex flex-col w-1/2 items-center border-t ${theme ? 'border-[#3b3b3b66]' : 'border-[#999999]'}`}>
                                    <h1 className='font-robotoSans text-[.8rem] 700:text-[1rem] font-semibold'>Bowling</h1>
                                    <div className={`py-2 px-4 w-full`}>
                                        {(() => {
                                            let pl = null
                                            team1_bowling.forEach(item => {
                                                if(pl === null && item.status.name === player.status.name)
                                                    pl = item.bowling
                                            })
                                            return [
                                                ['Wickets', pl.wickets_taken],
                                                ['Runs', pl.runs_conceded],
                                                ['Overs', `${Math.floor(pl.balls_bowled / 6)}${pl.balls_bowled % 6 ? `.${pl.balls_bowled % 6}` : ''}`],
                                                ['Strike rate', pl.strike_rate.toFixed(2)],
                                                ['Economy rate', pl.economy_rate.toFixed(2)],  
                                                ['4\'s', pl.fours_conceded],
                                                ['6\'s', pl.sixes_conceded],
                                            ]
                                        })().map((item, index) => (
                                            <div key={index} className={`px-[2px] font-[100] flex justify-between w-full border border-transparent ${theme ? 'hover:border-[#3b3b3b90]' : 'hover:border-[#CCCCCC]'}`}>
                                                <h1 className='font-robotoSans text-[.8rem] 700:text-[1rem]'>{item[0]}</h1>
                                                <h1 className='font-robotoSans text-[.8rem] 700:text-[1rem]'>{item[1]}</h1>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={`w-full border ${theme ? 'border-[#bbbbbb88]' : 'border-[#99999988]'}`}>
                <div className={`p-1 700:p-2 flex gap-x-1 700:gap-x-2 items-center w-full`}>
                    <div
                        className={`transition duration-75 ease-in-out hover:brightness-[2] 700:px-1 scale-[.75] 700:scale-[1] cursor-pointer ${a2 ? 'rotate-[180deg]' : 'pt-1'}`}
                        onClick={() => {
                            b2(!a2)
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={theme ? '#3b3b3b' : '#CCCCCC'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </div>
                    <h1 className={`select-none font-robotoSans font-[100] text-[1.2rem] 700:text-[1.6rem]`}>Team 2 - <span className='font-robotoSans font-semibold underline'>{data.team2}</span></h1>
                </div>
                <div className={`flex flex-col overflow-hidden ${a2 ? 'p-2' : 'h-0'} gap-y-[.35rem] w-full transition duration-75 ease-in-out`}>
                    {team2_batting.map((player, index) => (
                        <div key={index} className={`${theme ? (player.status.isBatting ? 'bg-[#f3f3f3]' : '') : (player.status.isBatting ? 'bg-[#2f2f2f]' : '')} flex flex-col w-full border ${theme ? 'border-[#bbbbbb80]' : 'border-[#99999960]'}`}>
                            <div className={`flex w-full items-center gap-x-1 px-1 py-1 700:py-2`}>
                                <div
                                    className={`transition duration-75 ease-in-out hover:brightness-[2] 700:px-1 scale-[.65] 700:scale-[.9] cursor-pointer ${expandedPlayers2[index] ? 'rotate-[180deg] pt-1' : 'pt-1'}`}
                                    onClick={() => togglePlayer2(index)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={theme ? '#3b3b3b' : '#CCCCCC'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M6 9l6 6 6-6"/>
                                    </svg>
                                </div>
                                <div className='scale-[.8] 700:scale-[1]'>
                                    {player.status.job === 'bowler' ?
                                        <Bowler size='18px' fill={theme ? '#3b3b3b' : '#CCCCCC'}/>
                                        :
                                        <Batter batter={player.status.job === 'batter'} size='18px' fill={theme ? '#3b3b3b' : '#CCCCCC'}/>
                                    }
                                </div>
                                <h1 className='font-robotoSans font-[100] text-[.8rem] 700:text-[1rem]'>
                                    {player.status.name}&nbsp;&nbsp;
                                    <i className={`font-robotoSans ${!theme ? 'text-[#CCCCCC50]' : 'text-black font-[400]'}`}>
                                        {(() => {
                                            let pl = null
                                            team2_batting.forEach(item => {
                                                if(pl === null && item.status.name === player.status.name)
                                                    pl = item.status
                                            })
                                            if(pl.isTaken != '') return `${pl.isTaken}`
                                            else if(pl.isBatting) return 'not out'
                                            return 'did not bat yet'
                                        })()}
                                    </i>
                                </h1>
                            </div>
                            <div className={`overflow-hidden ${expandedPlayers2[index] ? '' : 'h-0'} flex w-full ${theme ? 'bg-[#f3f3f3]' : 'bg-[#252525]'}`}>
                                <div className={`flex flex-col w-1/2 items-center border-t border-r ${theme ? 'border-[#3b3b3b66]' : 'border-[#999999]'}`}>
                                    <h1 className='font-robotoSans text-[.8rem] 700:text-[1rem] font-semibold'>Batting</h1>
                                    <div className={`py-2 px-4 w-full`}>
                                        {(() => {
                                            let pl = null
                                            team2_batting.forEach(item => {
                                                if(pl === null && item.status.name === player.status.name)
                                                    pl = item.batting
                                            })
                                            return [
                                                ['Runs', pl.runs_scored],
                                                ['Balls', pl.balls_played],
                                                ['Strike rate', pl.strike_rate.toFixed(2)],
                                                ['4\'s', pl.total_fours],
                                                ['6\'s', pl.total_sixes],
                                            ]
                                        })().map((item, index) => (
                                            <div key={index} className={`px-[2px] font-[100] flex justify-between w-full border border-transparent ${theme ? 'hover:border-[#3b3b3b90]' : 'hover:border-[#CCCCCC]'}`}>
                                                <h1 className='font-robotoSans text-[.8rem] 700:text-[1rem]'>{item[0]}</h1>
                                                <h1 className='font-robotoSans text-[.8rem] 700:text-[1rem]'>{item[1]}</h1>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className={`flex flex-col w-1/2 items-center border-t ${theme ? 'border-[#3b3b3b66]' : 'border-[#999999]'}`}>
                                    <h1 className='font-robotoSans text-[.8rem] 700:text-[1rem] font-semibold'>Bowling</h1>
                                    <div className={`py-2 px-4 w-full`}>
                                        {(() => {
                                            let pl = null
                                            team2_bowling.forEach(item => {
                                                if(pl === null && item.status.name === player.status.name)
                                                    pl = item.bowling
                                            })
                                            return [
                                                ['Wickets', pl.wickets_taken],
                                                ['Runs', pl.runs_conceded],
                                                ['Overs', `${Math.floor(pl.balls_bowled / 6)}${pl.balls_bowled % 6 ? `.${pl.balls_bowled % 6}` : ''}`],
                                                ['Strike rate', pl.strike_rate.toFixed(2)],
                                                ['Economy rate', pl.economy_rate.toFixed(2)],  
                                                ['4\'s', pl.fours_conceded],
                                                ['6\'s', pl.sixes_conceded],
                                            ]
                                        })().map((item, index) => (
                                            <div key={index} className={`px-[2px] font-[100] flex justify-between w-full border border-transparent ${theme ? 'hover:border-[#3b3b3b90]' : 'hover:border-[#CCCCCC]'}`}>
                                                <h1 className='font-robotoSans text-[.8rem] 700:text-[1rem]'>{item[0]}</h1>
                                                <h1 className='font-robotoSans text-[.8rem] 700:text-[1rem]'>{item[1]}</h1>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}