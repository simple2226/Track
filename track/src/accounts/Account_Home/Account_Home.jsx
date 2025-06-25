import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { MAX } from 'uuid'

export default function Account_Home() {
    const account = useSelector(state => state.account.data)
    useEffect(() => {
        document.getElementById('option').textContent = 'Me'
    }, [])
    return (
        <div className={`relative mt-[70px] 700:mt-[80px] flex flex-col overflow-x-hidden overflow-y-auto min-h-[calc(100vh-70px)] 700:min-h-[calc(100vh-80px)] min-w-[360px] w-full overlap-scr`}>
            <div className={`shadow-xl px-10 self-center py-10 w-[80%] flex flex-col 1100:flex-row 1100:justify-evenly items-center 1100:items-start border border-gray-300 rounded-lg scale-[.9] 1100:scale-[.8]`}>
                <div className={`overflow-hidden h-[12rem] 1100:h-[20rem] w-[12rem] 1100:w-[20rem] rounded-full shadow-lg shadow-gray-800 1100:shadow-2xl 1100:shadow-gray-800`}>
                    <img src="https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/e1af12bf-3025-44a5-9be7-4d3c46beb99b/892732bc-e5a7-4f8b-ada6-3867d2d9f740.png" alt="" />
                </div>
                <div className={`flex flex-col`}>
                    <h1 className='pt-8 1100:pt-0 text-[2rem] text-[#3d3d3d] 1100:text-[4rem] font-[600] leading-none'>{account?.showName}</h1>
                    <h1 className='pl-0 1100:pl-5 p-5 text-[.9rem] 1100:text-[1.2rem] text-[#777777] leading-none font-robotoSans'>Age &nbsp;&nbsp;<b className='text-black'>{account?.age}</b></h1>
                    <h1 className='pt-0 pl-0 1100:pl-5 p-5 text-[.9rem] 1100:text-[1.2rem] text-[#777777] leading-none font-robotoSans'>Matches Played &nbsp;&nbsp;<b className='text-black'>{account?.career_stats.basic.matches_played}</b></h1>
                    <h1 className='pt-0 pl-0 1100:pl-5 p-5 text-[.9rem] 1100:text-[1.2rem] text-[#777777] leading-none font-robotoSans'>Followers &nbsp;&nbsp;<b className='text-black'>{account?.num_followers}</b></h1>
                    <h1 className='pt-0 pl-0 1100:pl-5 p-5 text-[.9rem] 1100:text-[1.2rem] text-[#777777] leading-none font-robotoSans'>Following &nbsp;&nbsp;<b className='text-black'>{account?.num_following}</b></h1>
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
                                            if(account)
                                            return [
                                                ['Matches played', account?.career_stats.basic.matches_played],
                                                ['Matches won', account?.career_stats.basic.matches_won],
                                                ['Matches lost', account?.career_stats.basic.matches_lost],
                                                ['Matches draw', account?.career_stats.basic.matches_draw],
                                                ['Best Batting Figure', `${account?.career_stats.batting.best_batting_figure.runs}(${account?.career_stats.batting.best_batting_figure.balls})`],
                                                ['Best Bowling Figure', `${account?.career_stats.bowling.best_bowling_figure.wickets} - ${account?.career_stats.bowling.best_bowling_figure.runs}`]
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
                                            const batting = account?.career_stats.batting
                                            const matches_played = account?.career_stats.basic.matches_played
                                            if(account) {
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
                                            const bowling = account?.career_stats.bowling
                                            const matches_played = account?.career_stats.basic.matches_played
                                            if(account) {
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