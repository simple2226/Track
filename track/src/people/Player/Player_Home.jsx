import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../assets/Loading'
import { usePlayer } from './Player'

export default function Player_Home() {
    const domain = useSelector(state => state.globals.domain)
    const {his_id, his_account, setHisAccount} = usePlayer()
    const dispatch = useDispatch()
    const [buttonLoading, setButtonLoading] = useState(false)
    const my_account = useSelector(state => state.account.data)

    useEffect(() => {
        document.getElementById('option').textContent = 'Home'
    }, [])

    const follow = async () => {
        try {
            setButtonLoading(true)
            const response = await axios.post(`${domain}/auth/follow`, {
                _id: his_id
            }, {
                withCredentials: true
            })
            const temp = his_account
            temp.num_followers = response.data.his_num_followers
            temp.followers = response.data.his_followers
            setHisAccount(temp)
        } catch {} finally {
            setButtonLoading(false)
        }
    }
    
    const unfollow = async () => {
        try {
            setButtonLoading(true)
            const response = await axios.post(`${domain}/auth/unfollow`, {
                _id: his_id
            }, {
                withCredentials: true
            })
            const temp = his_account
            temp.num_followers = response.data.his_num_followers
            temp.followers = response.data.his_followers
            setHisAccount(temp)
        } catch {} finally {
            setButtonLoading(false)
        }
    }

    return (
        <div className={`relative flex flex-col mt-[80px] overflow-x-hidden min-h-[100vh] overflow-y-auto  w-full`}>  
            
            <div className={`shadow-xl ppx-10 self-center py-10 w-[80%] flex flex-col 1100:flex-row 1100:justify-evenly items-center 1100:items-start border border-gray-300 rounded-lg scale-[.9] 1100:scale-[.8]`}>
                <div className={`overflow-hidden h-[12rem] 1100:h-[20rem] w-[12rem] 1100:w-[20rem] rounded-full shadow-lg shadow-gray-800 1100:shadow-2xl 1100:shadow-gray-800`}>
                    <img src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/e1af12bf-3025-44a5-9be7-4d3c46beb99b/892732bc-e5a7-4f8b-ada6-3867d2d9f740.png" alt="" />
                </div>
                <div className={`flex flex-col`}>
                    <h1 className='pt-8 1100:pt-0 text-[2rem] text-[#3d3d3d] 1100:text-[4rem] font-[600] leading-none'>{his_account?.showName}</h1>
                    <h1 className='pl-0 1100:pl-5 p-5 text-[.9rem] 1100:text-[1.2rem] text-[#777777] leading-none font-robotoSans'>Age &nbsp;&nbsp;<b className='text-black'>{his_account?.age}</b></h1>
                    <h1 className='pt-0 pl-0 1100:pl-5 p-5 text-[.9rem] 1100:text-[1.2rem] text-[#777777] leading-none font-robotoSans'>Matches Played &nbsp;&nbsp;<b className='text-black'>{his_account?.career_stats.basic.matches_played}</b></h1>
                    <h1 className='pt-0 pl-0 1100:pl-5 p-5 text-[.9rem] 1100:text-[1.2rem] text-[#777777] leading-none font-robotoSans'>Followers &nbsp;&nbsp;<b className='text-black'>{his_account?.num_followers}</b></h1>
                    <h1 className='pt-0 pl-0 1100:pl-5 p-5 text-[.9rem] 1100:text-[1.2rem] text-[#777777] leading-none font-robotoSans'>Following &nbsp;&nbsp;<b className='text-black'>{his_account?.num_following}</b></h1>
                    {
                        his_account?._id !== my_account?._id ?
                        <div className='flex'>
                            {
                                his_account?.followers.includes(my_account?._id) ?
                                <button
                                    className='flex items-center justify-center border border-gray-300 h-[30px] w-[100px] bg-white hover:brightness-95 active:brightness-90'
                                    onClick={unfollow}
                                >
                                    {!buttonLoading ? 'Unfollow' : <Loading stroke='black'/>}
                                </button>
                                :
                                <button
                                    className='flex items-center justify-center border border-gray-300 h-[30px] w-[100px] bg-white hover:brightness-95 active:brightness-90'
                                    onClick={follow}
                                >
                                    {!buttonLoading ? 'Follow' : <Loading stroke='black'/>}
                                </button>
                            }
                        </div>
                        :
                        ''
                    }
                </div>
            </div>
            <div className={`flex flex-col`}>
                <div
                    className={`flex border-y border-gray-300 items-center gap-x-3 850:gap-x-5 px-4 850:px-10 py-2 850:py-2 w-full`}
                >
                    <div id='arrow1' className={`scale-[.7] 850:scale-100`}>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" height="25px" width="25px" version="1.1" id="Capa_1" viewBox="0 0 227.096 227.096" xmlSpace="preserve" fill='black'>
                            <g>
                                <g>
                                    <polygon points="152.835,39.285 146.933,45.183 211.113,109.373 0,109.373 0,117.723 211.124,117.723 146.933,181.902 152.835,187.811 227.096,113.55"/>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <h1 className={`font-robotoSans text-[1.6rem] 850:text-[2rem] text-[#000000] font-[100]`}>Career Stats</h1>
                </div>
                <div className='flex flex-col w-full'>
                    <h1 className='p-3 text-[1.5rem] 850:text-[2rem] text-[#494949] text-center font-robotoSans underline underline-offset-8 font-[100]'>Basic</h1>
                    <div className='flex justify-center w-full'>
                        <div className='w-[90%] text-[.8rem] 850:text-[1rem] bg-gray-100 border-[1px] border-x-0 border-b-0 border-gray-400 overflow-hidden rounded-sm'>
                            <table className='w-full text-gray-500'>
                                <tbody>
                                    {
                                        (() => {
                                            if(his_account)
                                            return [
                                                ['Matches played', his_account?.career_stats.basic.matches_played],
                                                ['Matches won', his_account?.career_stats.basic.matches_won],
                                                ['Matches lost', his_account?.career_stats.basic.matches_lost],
                                                ['Matches draw', his_account?.career_stats.basic.matches_draw],
                                                ['Best Batting Figure', `${his_account?.career_stats.batting.best_batting_figure.runs}(${his_account?.career_stats.batting.best_batting_figure.balls})`],
                                                ['Best Bowling Figure', `${his_account?.career_stats.bowling.best_bowling_figure.wickets} - ${his_account?.career_stats.bowling.best_bowling_figure.runs}`]
                                            ]
                                            return []
                                        })().map((element, index) => (
                                            <tr key={index}>
                                                <td className='w-1/2 font-robotoSans border-b-[1px] border-b-gray-400 border-r-[1px] border-r-gray-400'>{element[0]}</td>
                                                <td className='text-black font-robotoSans border-b-[1px] border-b-gray-400 border-l-[1px] border-l-gray-400 text-end'>{element[1]}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col w-full'>
                    <h1 className='p-3 pt-10 text-[1.5rem] 850:text-[2rem] text-[#494949] text-center font-robotoSans underline underline-offset-8 font-[100]'>Batting</h1>
                    <div className='flex justify-center w-full'>
                        <div className='w-[90%] text-[.8rem] 850:text-[1rem] bg-gray-100 border-[1px] border-x-0 border-b-0 border-gray-400 overflow-hidden rounded-sm'>
                            <table className='w-full text-gray-500'>
                                <tbody>
                                    {
                                        (() => {
                                            const batting = his_account?.career_stats.batting
                                            const matches_played = his_account?.career_stats.basic.matches_played
                                            if(his_account) {
                                                return [['Runs Scored', batting.runs_scored],
                                                ['Balls Played', batting.balls_played],
                                                ['Strike Rate (Batting)', (batting.strike_rate / Math.max(matches_played, 1)).toFixed(2)],
                                                ['Batting Average', batting.runs_scored / Math.max(matches_played - batting.not_outs, 1)],
                                                ['Chasing Average', batting.chasing_average.runs / Math.max(batting.chasing_average.wickets, 1)],
                                                ['Not Outs', batting.not_outs],
                                                ['Total Boundaries (Fours)', batting.total_fours],
                                                ['Total Sixes', batting.total_sixes],
                                                ['Total Half-Centuries (50s)', batting.total_halfCenturies],
                                                ['Total Centuries (100s)', batting.total_centuries],
                                                ['Total Double Centuries (200s)', batting.total_double_centuries],
                                                ['Total Ducks (0 Runs)', batting.total_ducks]]
                                            }
                                            return []
                                        })().map((element, index) => (
                                            <tr key={index}>
                                                <td className='w-1/2 font-robotoSans border-b-[1px] border-b-gray-400 border-r-[1px] border-r-gray-400'>{element[0]}</td>
                                                <td className='text-black font-robotoSans border-b-[1px] border-b-gray-400 border-l-[1px] border-l-gray-400 text-end'>{element[1]}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col w-full pb-10'>
                    <h1 className='p-3 pt-10 text-[1.5rem] 850:text-[2rem] text-[#494949] text-center font-robotoSans underline underline-offset-8 font-[100]'>Bowling</h1>
                    <div className='flex justify-center w-full'>
                        <div className='w-[90%] text-[.8rem] 850:text-[1rem] bg-gray-100 border-[1px] border-x-0 border-b-0 border-gray-400 overflow-hidden rounded-sm'>
                            <table className='w-full text-gray-500'>
                                <tbody>
                                    {
                                        (() => {
                                            const bowling = his_account?.career_stats.bowling
                                            const matches_played = his_account?.career_stats.basic.matches_played
                                            if(his_account) {
                                            return [['Wickets Taken', bowling.wickets_taken],
                                                ['Runs Conceded', bowling.runs_conceded],
                                                ['Boundaries (Fours) Conceded', bowling.fours_conceded],
                                                ['Sixes Conceded', bowling.sixes_conceded],
                                                ['Overs Bowled', `${Math.floor(bowling.balls_bowled / 6)}${bowling.balls_bowled % 6 ? `.${bowling.balls_bowled % 6}` : ''}`],
                                                ['Balls Bowled', bowling.balls_bowled],
                                                ['Dot Balls Bowled', bowling.dot_balls_bowled],
                                                ['Bowling Average', (bowling.runs_conceded / (!bowling.wickets_taken ? Infinity : bowling.wickets_taken)).toFixed(2)],
                                                ['Strike Rate (Bowling)', (bowling.strike_rate / Math.max(matches_played, 1)).toFixed(2)],
                                                ['Economy Rate', (bowling.economy_rate / Math.max(matches_played, 1)).toFixed(2)],
                                                ['Three-Wicket Hauls', bowling.three_wicket_hauls],
                                                ['Five-Wicket Hauls', bowling.five_wicket_hauls]]
                                            }
                                            return []
                                        })().map((element, index) => (
                                            <tr key={index}>
                                                <td className='w-1/2 font-robotoSans border-b-[1px] border-b-gray-400 border-r-[1px] border-r-gray-400'>{element[0]}</td>
                                                <td className='text-black font-robotoSans border-b-[1px] border-b-gray-400 border-l-[1px] border-l-gray-400 text-end'>{element[1]}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}